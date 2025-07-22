import { render, screen } from '@testing-library/react';
import { JobDetailsHeader } from './JobDetailsHeader';
import { Job, Company } from '@/types';

const mockJob: Job = {
  id: '1',
  title: 'Senior Software Engineer',
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
  requirements: [],
  responsibilities: [],
  benefits: [],
  tags: [],
  postedAt: new Date('2025-01-01'),
  applicationDeadline: new Date('2025-02-01'),
  applicants: 45,
  featured: true,
  active: true,
};

const mockCompany: Company = {
  id: '1',
  name: 'TechCorp',
  logo: '/company-logo.png',
  description: 'Leading tech company',
  website: 'https://techcorp.com',
  industry: 'technology',
  size: 'large',
  founded: 2010,
  headquarters: 'San Francisco, CA',
  locations: ['San Francisco, CA', 'New York, NY'],
  employees: { min: 1000, max: 5000 },
  culture: 'Innovative and collaborative',
  benefits: ['Health insurance', '401k'],
  techStack: ['React', 'Node.js'],
  socialLinks: {},
  verified: true,
  featured: false,
};

describe('JobDetailsHeader', () => {
  it('renders job title and company name', () => {
    render(<JobDetailsHeader job={mockJob} company={mockCompany} />);

    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('TechCorp')).toBeInTheDocument();
  });

  it('displays company logo when available', () => {
    render(<JobDetailsHeader job={mockJob} company={mockCompany} />);

    const logo = screen.getByAltText('TechCorp logo');
    expect(logo).toBeInTheDocument();
    // Next.js Image component transforms the src
    expect(logo).toHaveAttribute('src');
    expect(logo.getAttribute('src')).toContain('company-logo.png');
  });

  it('shows location and remote option', () => {
    render(<JobDetailsHeader job={mockJob} company={mockCompany} />);

    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
    expect(screen.getByText('Hybrid')).toBeInTheDocument();
  });

  it('displays job type and experience level badges', () => {
    render(<JobDetailsHeader job={mockJob} company={mockCompany} />);

    expect(screen.getByText('Full Time')).toBeInTheDocument();
    expect(screen.getByText('Senior Level')).toBeInTheDocument();
  });

  it('shows salary range', () => {
    render(<JobDetailsHeader job={mockJob} company={mockCompany} />);

    expect(screen.getByText('$150k - $200k/year')).toBeInTheDocument();
  });

  it('displays applicant count', () => {
    render(<JobDetailsHeader job={mockJob} company={mockCompany} />);

    expect(screen.getByText('45 applicants')).toBeInTheDocument();
  });

  it('shows posted date', () => {
    render(<JobDetailsHeader job={mockJob} company={mockCompany} />);

    expect(screen.getByText(/Posted/)).toBeInTheDocument();
  });

  it('displays application deadline', () => {
    render(<JobDetailsHeader job={mockJob} company={mockCompany} />);

    expect(screen.getByText(/Deadline:/)).toBeInTheDocument();
    // Check for formatted date - the exact format may vary
    const deadlineText =
      screen.getByText(/Deadline:/).parentElement?.textContent;
    expect(deadlineText).toContain('2025');
  });

  it('shows featured badge when job is featured', () => {
    render(<JobDetailsHeader job={mockJob} company={mockCompany} />);

    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('does not show featured badge when job is not featured', () => {
    const regularJob = { ...mockJob, featured: false };
    render(<JobDetailsHeader job={regularJob} company={mockCompany} />);

    expect(screen.queryByText('Featured')).not.toBeInTheDocument();
  });

  it('renders apply button', () => {
    render(<JobDetailsHeader job={mockJob} company={mockCompany} />);

    const applyButton = screen.getByRole('button', { name: /apply now/i });
    expect(applyButton).toBeInTheDocument();
  });

  it('renders save job button', () => {
    render(<JobDetailsHeader job={mockJob} company={mockCompany} />);

    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).toBeInTheDocument();
  });

  it('shows deadline warning when deadline is soon', () => {
    const jobWithSoonDeadline = {
      ...mockJob,
      applicationDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    };
    render(
      <JobDetailsHeader job={jobWithSoonDeadline} company={mockCompany} />,
    );

    expect(screen.getByText(/Deadline in \d+ days/)).toBeInTheDocument();
  });

  it('handles missing application deadline', () => {
    const jobWithoutDeadline = { ...mockJob, applicationDeadline: undefined };
    render(<JobDetailsHeader job={jobWithoutDeadline} company={mockCompany} />);

    expect(screen.queryByText(/Deadline:/)).not.toBeInTheDocument();
  });

  it('handles missing company logo', () => {
    const companyWithoutLogo = { ...mockCompany, logo: undefined };
    render(<JobDetailsHeader job={mockJob} company={companyWithoutLogo} />);

    expect(screen.queryByAltText('TechCorp logo')).not.toBeInTheDocument();
  });
});
