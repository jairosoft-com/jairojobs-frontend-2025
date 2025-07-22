import { render, screen } from '@testing-library/react';
import { CompanyCard } from './CompanyCard';
import { Company } from '@/types';

const mockCompany: Company = {
  id: '1',
  name: 'TechCorp Solutions',
  logo: '/company-logo.png',
  description:
    'Leading technology solutions provider specializing in cloud infrastructure and enterprise software.',
  website: 'https://techcorp.example.com',
  industry: 'technology',
  size: 'large',
  founded: 2010,
  headquarters: 'San Francisco, CA',
  locations: ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Remote'],
  employees: {
    min: 1000,
    max: 5000,
  },
  culture:
    'Innovation-driven culture with focus on work-life balance and continuous learning.',
  benefits: [
    'Comprehensive health insurance',
    'Unlimited PTO',
    '401(k) matching',
    'Remote work options',
  ],
  techStack: ['React', 'Node.js', 'AWS', 'Python', 'Kubernetes'],
  socialLinks: {
    linkedin: 'https://linkedin.com/company/techcorp',
    twitter: 'https://twitter.com/techcorp',
  },
  verified: true,
  featured: false,
};

describe('CompanyCard', () => {
  it('renders company name and logo', () => {
    render(<CompanyCard company={mockCompany} />);

    expect(screen.getByText('TechCorp Solutions')).toBeInTheDocument();
    const logo = screen.getByAltText('TechCorp Solutions');
    expect(logo).toBeInTheDocument();
  });

  it('displays company description', () => {
    render(<CompanyCard company={mockCompany} />);

    expect(screen.getByText(mockCompany.description)).toBeInTheDocument();
  });

  it('shows industry and size', () => {
    render(<CompanyCard company={mockCompany} />);

    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('Large company')).toBeInTheDocument();
  });

  it('displays headquarters location', () => {
    render(<CompanyCard company={mockCompany} />);

    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
  });

  it('shows employee count range', () => {
    render(<CompanyCard company={mockCompany} />);

    expect(screen.getByText('1,000 - 5,000 employees')).toBeInTheDocument();
  });

  it('displays founded year', () => {
    render(<CompanyCard company={mockCompany} />);

    expect(screen.getByText('Founded 2010')).toBeInTheDocument();
  });

  it('shows verified badge when company is verified', () => {
    render(<CompanyCard company={mockCompany} />);

    expect(screen.getByText('Verified')).toBeInTheDocument();
  });

  it('does not show verified badge when company is not verified', () => {
    const unverifiedCompany = { ...mockCompany, verified: false };
    render(<CompanyCard company={unverifiedCompany} />);

    expect(screen.queryByText('Verified')).not.toBeInTheDocument();
  });

  it('displays website link', () => {
    render(<CompanyCard company={mockCompany} />);

    const websiteLink = screen.getByRole('link', { name: /visit website/i });
    expect(websiteLink).toHaveAttribute('href', mockCompany.website);
  });

  it('shows tech stack when available', () => {
    render(<CompanyCard company={mockCompany} />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('AWS')).toBeInTheDocument();
  });

  it('displays social links when available', () => {
    render(<CompanyCard company={mockCompany} />);

    const linkedinLink = screen.getByLabelText('LinkedIn');
    expect(linkedinLink).toHaveAttribute(
      'href',
      mockCompany.socialLinks?.linkedin,
    );

    const twitterLink = screen.getByLabelText('Twitter');
    expect(twitterLink).toHaveAttribute(
      'href',
      mockCompany.socialLinks?.twitter,
    );
  });

  it('handles company without logo', () => {
    const companyWithoutLogo = { ...mockCompany, logo: undefined };
    render(<CompanyCard company={companyWithoutLogo} />);

    expect(screen.queryByAltText('TechCorp Solutions')).not.toBeInTheDocument();
  });

  it('handles company without tech stack', () => {
    const companyWithoutTech = { ...mockCompany, techStack: undefined };
    render(<CompanyCard company={companyWithoutTech} />);

    expect(screen.queryByText('React')).not.toBeInTheDocument();
  });

  it('handles company without social links', () => {
    const companyWithoutSocial = { ...mockCompany, socialLinks: undefined };
    render(<CompanyCard company={companyWithoutSocial} />);

    expect(screen.queryByLabelText('LinkedIn')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Twitter')).not.toBeInTheDocument();
  });

  it('renders view all jobs button', () => {
    render(<CompanyCard company={mockCompany} />);

    const viewJobsButton = screen.getByRole('button', {
      name: /view all jobs/i,
    });
    expect(viewJobsButton).toBeInTheDocument();
  });
});
