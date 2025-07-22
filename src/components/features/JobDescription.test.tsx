import { render, screen } from '@testing-library/react';
import { JobDescription } from './JobDescription';
import { Job } from '@/types';

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
  description: `We are looking for a Senior Software Engineer to join our growing team. 

This is an exciting opportunity to work on cutting-edge technologies and make a real impact on our products.

You will be working with a talented team of engineers in a fast-paced, collaborative environment.`,
  requirements: [
    '5+ years of experience in software development',
    'Strong proficiency in React and TypeScript',
    'Experience with cloud platforms (AWS preferred)',
    'Excellent problem-solving skills',
    'Strong communication skills',
  ],
  responsibilities: [
    'Design and develop scalable web applications',
    'Lead technical projects from conception to deployment',
    'Mentor junior developers',
    'Collaborate with product managers and designers',
    'Participate in code reviews',
  ],
  benefits: [
    'Competitive salary and equity',
    'Comprehensive health insurance',
    'Unlimited PTO',
    '401(k) matching',
    'Professional development budget',
  ],
  tags: ['React', 'TypeScript', 'AWS', 'Node.js', 'Full Stack'],
  postedAt: new Date('2025-01-01'),
  applicationDeadline: new Date('2025-02-01'),
  applicants: 45,
  featured: true,
  active: true,
};

describe('JobDescription', () => {
  it('renders job description with proper formatting', () => {
    render(<JobDescription job={mockJob} />);

    expect(
      screen.getByText(/We are looking for a Senior Software Engineer/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/This is an exciting opportunity/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/You will be working with a talented team/),
    ).toBeInTheDocument();
  });

  it('displays all requirements', () => {
    render(<JobDescription job={mockJob} />);

    expect(screen.getByText('Requirements')).toBeInTheDocument();
    mockJob.requirements.forEach(req => {
      expect(screen.getByText(req)).toBeInTheDocument();
    });
  });

  it('displays all responsibilities', () => {
    render(<JobDescription job={mockJob} />);

    expect(screen.getByText('Responsibilities')).toBeInTheDocument();
    mockJob.responsibilities.forEach(resp => {
      expect(screen.getByText(resp)).toBeInTheDocument();
    });
  });

  it('displays all benefits', () => {
    render(<JobDescription job={mockJob} />);

    expect(screen.getByText('Benefits')).toBeInTheDocument();
    mockJob.benefits.forEach(benefit => {
      expect(screen.getByText(benefit)).toBeInTheDocument();
    });
  });

  it('displays skills/tags', () => {
    render(<JobDescription job={mockJob} />);

    expect(screen.getByText('Required Skills')).toBeInTheDocument();
    mockJob.tags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('renders section headings correctly', () => {
    render(<JobDescription job={mockJob} />);

    expect(screen.getByText('About the Role')).toBeInTheDocument();
    expect(screen.getByText('Requirements')).toBeInTheDocument();
    expect(screen.getByText('Responsibilities')).toBeInTheDocument();
    expect(screen.getByText('Benefits')).toBeInTheDocument();
    expect(screen.getByText('Required Skills')).toBeInTheDocument();
  });

  it('handles empty requirements array', () => {
    const jobWithoutReqs = { ...mockJob, requirements: [] };
    render(<JobDescription job={jobWithoutReqs} />);

    expect(screen.queryByText('Requirements')).not.toBeInTheDocument();
  });

  it('handles empty responsibilities array', () => {
    const jobWithoutResp = { ...mockJob, responsibilities: [] };
    render(<JobDescription job={jobWithoutResp} />);

    expect(screen.queryByText('Responsibilities')).not.toBeInTheDocument();
  });

  it('handles empty benefits array', () => {
    const jobWithoutBenefits = { ...mockJob, benefits: [] };
    render(<JobDescription job={jobWithoutBenefits} />);

    expect(screen.queryByText('Benefits')).not.toBeInTheDocument();
  });

  it('handles empty tags array', () => {
    const jobWithoutTags = { ...mockJob, tags: [] };
    render(<JobDescription job={jobWithoutTags} />);

    expect(screen.queryByText('Required Skills')).not.toBeInTheDocument();
  });

  it('preserves line breaks in description', () => {
    render(<JobDescription job={mockJob} />);

    const descriptionSection = screen.getByText(
      /We are looking for a Senior Software Engineer/,
    ).parentElement;
    expect(descriptionSection?.children.length).toBeGreaterThan(1);
  });
});
