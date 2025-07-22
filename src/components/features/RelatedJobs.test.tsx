import { render, screen } from '@testing-library/react';
import { RelatedJobs } from './RelatedJobs';
import { Job } from '@/types';

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'TechCorp',
    companyId: '1',
    companyLogo: '/logo1.png',
    location: 'San Francisco, CA',
    type: 'full-time',
    experienceLevel: 'mid',
    remoteOption: 'hybrid',
    salary: {
      min: 100000,
      max: 140000,
      currency: 'USD',
      period: 'yearly',
    },
    description: 'Test description 1',
    requirements: [],
    responsibilities: [],
    benefits: [],
    tags: ['React', 'TypeScript'],
    postedAt: new Date('2025-01-15'),
    applicants: 25,
    featured: false,
    active: true,
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: 'TechCorp',
    companyId: '1',
    companyLogo: '/logo1.png',
    location: 'New York, NY',
    type: 'full-time',
    experienceLevel: 'senior',
    remoteOption: 'remote',
    salary: {
      min: 130000,
      max: 180000,
      currency: 'USD',
      period: 'yearly',
    },
    description: 'Test description 2',
    requirements: [],
    responsibilities: [],
    benefits: [],
    tags: ['Node.js', 'Python'],
    postedAt: new Date('2025-01-10'),
    applicants: 40,
    featured: false,
    active: true,
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    company: 'StartupHub',
    companyId: '2',
    companyLogo: '/logo2.png',
    location: 'Austin, TX',
    type: 'contract',
    experienceLevel: 'senior',
    remoteOption: 'onsite',
    salary: {
      min: 150000,
      max: 200000,
      currency: 'USD',
      period: 'yearly',
    },
    description: 'Test description 3',
    requirements: [],
    responsibilities: [],
    benefits: [],
    tags: ['AWS', 'Kubernetes'],
    postedAt: new Date('2025-01-20'),
    applicants: 15,
    featured: true,
    active: true,
  },
];

describe('RelatedJobs', () => {
  it('renders the component title', () => {
    render(<RelatedJobs jobs={mockJobs} />);

    expect(screen.getByText('Similar Jobs')).toBeInTheDocument();
  });

  it('displays all provided jobs', () => {
    render(<RelatedJobs jobs={mockJobs} />);

    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Backend Engineer')).toBeInTheDocument();
    expect(screen.getByText('DevOps Engineer')).toBeInTheDocument();
  });

  it('shows company names for each job', () => {
    render(<RelatedJobs jobs={mockJobs} />);

    expect(screen.getAllByText('TechCorp')).toHaveLength(2);
    expect(screen.getByText('StartupHub')).toBeInTheDocument();
  });

  it('displays job locations', () => {
    render(<RelatedJobs jobs={mockJobs} />);

    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
    expect(screen.getByText('New York, NY')).toBeInTheDocument();
    expect(screen.getByText('Austin, TX')).toBeInTheDocument();
  });

  it('shows salary ranges', () => {
    render(<RelatedJobs jobs={mockJobs} />);

    expect(screen.getByText('$100k - $140k/year')).toBeInTheDocument();
    expect(screen.getByText('$130k - $180k/year')).toBeInTheDocument();
    expect(screen.getByText('$150k - $200k/year')).toBeInTheDocument();
  });

  it('displays job type badges', () => {
    render(<RelatedJobs jobs={mockJobs} />);

    // Full Time appears twice
    expect(screen.getAllByText('Full Time')).toHaveLength(2);
    expect(screen.getByText('Contract')).toBeInTheDocument();
  });

  it('displays tags for each job', () => {
    render(<RelatedJobs jobs={mockJobs} />);

    // Check that tags are displayed
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
  });

  it('renders custom title when provided', () => {
    render(<RelatedJobs jobs={mockJobs} title="More Jobs at TechCorp" />);

    expect(screen.getByText('More Jobs at TechCorp')).toBeInTheDocument();
    expect(screen.queryByText('Similar Jobs')).not.toBeInTheDocument();
  });

  it('handles empty jobs array', () => {
    render(<RelatedJobs jobs={[]} />);

    expect(screen.getByText('No similar jobs found')).toBeInTheDocument();
  });

  it('limits displayed jobs to 4 by default', () => {
    const manyJobs = [
      ...mockJobs,
      { ...mockJobs[0], id: '4', title: 'Job 4' },
      { ...mockJobs[0], id: '5', title: 'Job 5' },
    ];
    render(<RelatedJobs jobs={manyJobs} />);

    // Should only show first 4 jobs
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Backend Engineer')).toBeInTheDocument();
    expect(screen.getByText('DevOps Engineer')).toBeInTheDocument();
    expect(screen.getByText('Job 4')).toBeInTheDocument();
    expect(screen.queryByText('Job 5')).not.toBeInTheDocument();
  });

  it('shows view all button when there are more jobs', () => {
    const manyJobs = [
      ...mockJobs,
      { ...mockJobs[0], id: '4', title: 'Job 4' },
      { ...mockJobs[0], id: '5', title: 'Job 5' },
    ];
    render(<RelatedJobs jobs={manyJobs} />);

    expect(
      screen.getByRole('link', { name: /view all jobs/i }),
    ).toBeInTheDocument();
  });

  it('does not show view all button when jobs are 4 or less', () => {
    render(<RelatedJobs jobs={mockJobs} />);

    expect(
      screen.queryByRole('link', { name: /view all jobs/i }),
    ).not.toBeInTheDocument();
  });
});
