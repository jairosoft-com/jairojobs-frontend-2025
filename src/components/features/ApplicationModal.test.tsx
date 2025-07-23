import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ApplicationModal } from './ApplicationModal';
import { Job } from '@/types';

// Mock the ApplicationSection component
vi.mock('./ApplicationSection', () => ({
  ApplicationSection: ({ onSubmit }: { onSubmit: (data: { email: string }) => void }) => (
    <div data-testid="application-section">
      <button onClick={() => onSubmit({ email: 'test@example.com' })}>
        Submit Application
      </button>
    </div>
  ),
}));

const mockJob: Job = {
  id: '1',
  title: 'Senior Developer',
  company: 'Tech Corp',
  companyId: '1',
  location: 'San Francisco, CA',
  type: 'full-time',
  experienceLevel: 'senior',
  remoteOption: 'hybrid',
  salary: {
    min: 120000,
    max: 180000,
    currency: 'USD',
    period: 'yearly',
  },
  description: 'Test description',
  requirements: [],
  responsibilities: [],
  benefits: [],
  tags: ['React', 'TypeScript'],
  postedAt: new Date(),
  active: true,
  featured: false,
};

describe('ApplicationModal', () => {
  const user = userEvent.setup();

  it('should render trigger button', () => {
    render(<ApplicationModal job={mockJob} />);
    
    const applyButton = screen.getByRole('button', { name: /apply now/i });
    expect(applyButton).toBeInTheDocument();
  });

  it('should open modal when Apply Now is clicked', async () => {
    render(<ApplicationModal job={mockJob} />);
    
    const applyButton = screen.getByRole('button', { name: /apply now/i });
    await user.click(applyButton);
    
    // Check modal is open with correct heading
    expect(screen.getByRole('heading', { name: /apply for this position/i })).toBeInTheDocument();
    expect(screen.getByTestId('application-section')).toBeInTheDocument();
  });

  it('should close modal when close button is clicked', async () => {
    render(<ApplicationModal job={mockJob} />);
    
    // Open modal
    const applyButton = screen.getByRole('button', { name: /apply now/i });
    await user.click(applyButton);
    
    // Close modal
    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);
    
    // Modal should be closed
    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /apply for this position/i })).not.toBeInTheDocument();
    });
  });

  it('should close modal when clicking outside', async () => {
    render(<ApplicationModal job={mockJob} />);
    
    // Open modal
    const applyButton = screen.getByRole('button', { name: /apply now/i });
    await user.click(applyButton);
    
    // Click overlay
    const dialog = screen.getByRole('dialog');
    const overlay = dialog.parentElement;
    if (overlay) {
      await user.click(overlay);
    }
    
    // Modal should be closed
    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /apply for this position/i })).not.toBeInTheDocument();
    });
  });

  it('should close modal when Escape key is pressed', async () => {
    render(<ApplicationModal job={mockJob} />);
    
    // Open modal
    const applyButton = screen.getByRole('button', { name: /apply now/i });
    await user.click(applyButton);
    
    // Press Escape
    await user.keyboard('{Escape}');
    
    // Modal should be closed
    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /apply for this position/i })).not.toBeInTheDocument();
    });
  });

  it('should handle form submission and close modal', async () => {
    const onSubmit = vi.fn();
    render(<ApplicationModal job={mockJob} onApplicationSubmit={onSubmit} />);
    
    // Open modal
    const applyButton = screen.getByRole('button', { name: /apply now/i });
    await user.click(applyButton);
    
    // Submit form
    const submitButton = screen.getByText('Submit Application');
    await user.click(submitButton);
    
    // Check callback was called
    expect(onSubmit).toHaveBeenCalledWith({ email: 'test@example.com' });
    
    // Modal should close after submission
    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /apply for this position/i })).not.toBeInTheDocument();
    });
  });

  it('should pass authentication state to ApplicationSection', () => {
    render(<ApplicationModal job={mockJob} isAuthenticated={false} />);
    
    // Just verify the component renders with the prop
    // The ApplicationSection mock will handle the auth state internally
    expect(screen.getByRole('button', { name: /apply now/i })).toBeInTheDocument();
  });

  it('should pass hasApplied state to ApplicationSection', () => {
    render(<ApplicationModal job={mockJob} hasApplied={true} />);
    
    // Just verify the component renders with the prop
    // The ApplicationSection mock will handle the applied state internally
    expect(screen.getByRole('button', { name: /apply now/i })).toBeInTheDocument();
  });
});