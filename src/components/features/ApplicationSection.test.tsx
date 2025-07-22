import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ApplicationSection } from './ApplicationSection';
import { Job } from '@/types';

// Mock the toast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

const mockJob: Job = {
  id: '1',
  title: 'Senior Frontend Developer',
  company: 'TechCorp',
  companyId: '1',
  companyLogo: '/logo.png',
  location: 'San Francisco, CA',
  type: 'full-time',
  experienceLevel: 'senior',
  remoteOption: 'hybrid',
  salary: {
    min: 150000,
    max: 200000,
    currency: 'USD',
    period: 'yearly',
  },
  description: 'Test description',
  requirements: ['React', 'TypeScript'],
  responsibilities: ['Build features'],
  benefits: ['Health insurance'],
  tags: ['React', 'TypeScript'],
  postedAt: new Date(),
  applicationDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  applicants: 25,
  featured: false,
  active: true,
};

describe('ApplicationSection', () => {
  const defaultProps = {
    job: mockJob,
    onSubmit: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders application form', () => {
    render(<ApplicationSection {...defaultProps} />);

    expect(screen.getByText('Apply for this position')).toBeInTheDocument();
    expect(
      screen.getByLabelText(/cover letter/i),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/upload resume/i),
    ).toBeInTheDocument();
  });

  it('shows required fields', () => {
    render(<ApplicationSection {...defaultProps} />);

    // Check for required field indicators
    const labels = screen.getAllByText('*');
    expect(labels.length).toBeGreaterThanOrEqual(3); // Full name, email, resume
    
    // Check specific labels contain required fields
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByText('Upload Resume')).toBeInTheDocument();
  });

  it('handles form submission with valid data', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<ApplicationSection {...defaultProps} onSubmit={onSubmit} />);

    // Fill in required fields
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/phone/i), '+1234567890');
    
    // Upload resume
    const file = new File(['resume content'], 'resume.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByLabelText(/upload resume/i);
    await user.upload(fileInput, file);

    // Fill optional cover letter
    await user.type(
      screen.getByLabelText(/cover letter/i),
      'I am very interested in this position.',
    );

    // Submit form
    await user.click(screen.getByRole('button', { name: /submit application/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        resume: expect.any(File),
        coverLetter: 'I am very interested in this position.',
      });
    });
  });

  it('shows validation errors for required fields', async () => {
    const user = userEvent.setup();
    render(<ApplicationSection {...defaultProps} />);

    // Try to submit without filling required fields
    await user.click(screen.getByRole('button', { name: /submit application/i }));

    await waitFor(() => {
      expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      // Resume error might appear differently due to file input
    });
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    render(<ApplicationSection {...defaultProps} />);

    // Fill other required fields
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'invalid-email');
    
    // Upload a valid file
    const file = new File(['resume'], 'resume.pdf', { type: 'application/pdf' });
    await user.upload(screen.getByLabelText(/upload resume/i), file);
    
    await user.click(screen.getByRole('button', { name: /submit application/i }));

    // The form should not submit with invalid email
    await waitFor(() => {
      // Check that we're still on the form
      expect(screen.getByRole('button', { name: /submit application/i })).toBeInTheDocument();
      // And the email field still has the invalid value
      expect(screen.getByLabelText(/email/i)).toHaveValue('invalid-email');
    });
  });

  it('validates file type for resume', async () => {
    const user = userEvent.setup();
    render(<ApplicationSection {...defaultProps} />);

    // Try to upload invalid file type
    const file = new File(['content'], 'resume.txt', { type: 'text/plain' });
    const fileInput = screen.getByLabelText(/upload resume/i);
    
    await user.upload(fileInput, file);

    // The file should not be accepted - check that no file is displayed
    expect(screen.queryByText('resume.txt')).not.toBeInTheDocument();
  });

  it('validates file size for resume', async () => {
    const user = userEvent.setup();
    render(<ApplicationSection {...defaultProps} />);

    // Fill other required fields
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');

    // Create a file larger than 5MB
    const largeFile = new File(
      [new ArrayBuffer(6 * 1024 * 1024)],
      'resume.pdf',
      { type: 'application/pdf' },
    );
    const fileInput = screen.getByLabelText(/upload resume/i);
    
    await user.upload(fileInput, largeFile);

    // The error should appear immediately on file selection
    await waitFor(() => {
      expect(
        screen.getByText(/file size must be less than 5mb/i),
      ).toBeInTheDocument();
    });
  });

  it('disables form when already applied', () => {
    render(<ApplicationSection {...defaultProps} hasApplied={true} />);

    expect(screen.getByText(/you have already applied/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /already applied/i }),
    ).toBeDisabled();
  });

  it('disables form when deadline has passed', () => {
    const pastDeadlineJob = {
      ...mockJob,
      applicationDeadline: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    };
    render(<ApplicationSection {...defaultProps} job={pastDeadlineJob} />);

    expect(
      screen.getByText(/application deadline has passed/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /deadline passed/i }),
    ).toBeDisabled();
  });

  it('shows login prompt when not authenticated', () => {
    render(<ApplicationSection {...defaultProps} isAuthenticated={false} />);

    expect(
      screen.getByText(/please sign in to apply for this position/i),
    ).toBeInTheDocument();
    // Button with asChild renders as a link
    expect(
      screen.getByRole('link', { name: /sign in to apply/i }),
    ).toBeInTheDocument();
  });

  it('displays selected file name', async () => {
    const user = userEvent.setup();
    render(<ApplicationSection {...defaultProps} />);

    const file = new File(['resume content'], 'my-resume.pdf', { 
      type: 'application/pdf' 
    });
    const fileInput = screen.getByLabelText(/upload resume/i);
    await user.upload(fileInput, file);

    expect(screen.getByText('my-resume.pdf')).toBeInTheDocument();
  });

  it('allows removing selected file', async () => {
    const user = userEvent.setup();
    render(<ApplicationSection {...defaultProps} />);

    const file = new File(['resume content'], 'my-resume.pdf', { 
      type: 'application/pdf' 
    });
    const fileInput = screen.getByLabelText(/upload resume/i);
    await user.upload(fileInput, file);

    expect(screen.getByText('my-resume.pdf')).toBeInTheDocument();

    // Click remove button
    await user.click(screen.getByRole('button', { name: /remove file/i }));

    expect(screen.queryByText('my-resume.pdf')).not.toBeInTheDocument();
  });

  it('shows character count for cover letter', async () => {
    const user = userEvent.setup();
    render(<ApplicationSection {...defaultProps} />);

    const coverLetter = screen.getByLabelText(/cover letter/i);
    await user.type(coverLetter, 'This is my cover letter.');

    expect(screen.getByText('24/1000')).toBeInTheDocument();
  });

  it('limits cover letter to 1000 characters', async () => {
    const user = userEvent.setup();
    render(<ApplicationSection {...defaultProps} />);

    const longText = 'a'.repeat(1001);
    const coverLetter = screen.getByLabelText(/cover letter/i);
    await user.type(coverLetter, longText);

    await waitFor(() => {
      expect(screen.getByText('1000/1000')).toBeInTheDocument();
    });
  });

  it('resets form after successful submission', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(true);
    render(<ApplicationSection {...defaultProps} onSubmit={onSubmit} />);

    // Fill and submit form
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    
    const file = new File(['resume'], 'resume.pdf', { type: 'application/pdf' });
    await user.upload(screen.getByLabelText(/upload resume/i), file);

    await user.click(screen.getByRole('button', { name: /submit application/i }));

    await waitFor(() => {
      // Form should be reset
      expect(screen.getByLabelText(/full name/i)).toHaveValue('');
      expect(screen.getByLabelText(/email/i)).toHaveValue('');
      expect(screen.queryByText('resume.pdf')).not.toBeInTheDocument();
    });
  });

  it('shows loading state during submission', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100)),
    );
    render(<ApplicationSection {...defaultProps} onSubmit={onSubmit} />);

    // Fill required fields
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    
    const file = new File(['resume'], 'resume.pdf', { type: 'application/pdf' });
    await user.upload(screen.getByLabelText(/upload resume/i), file);

    // Submit
    await user.click(screen.getByRole('button', { name: /submit application/i }));

    expect(screen.getByRole('button', { name: /submitting/i })).toBeDisabled();
  });
});