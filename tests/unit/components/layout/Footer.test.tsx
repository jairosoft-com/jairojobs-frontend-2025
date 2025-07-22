import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/layout/Footer';

describe('Footer', () => {
  it('should render the company name and tagline', () => {
    render(<Footer />);

    const companyName = screen.getByRole('heading', {
      name: /jairojobs/i,
      level: 2,
    });
    expect(companyName).toBeInTheDocument();

    const tagline = screen.getByText(/find your dream job/i);
    expect(tagline).toBeInTheDocument();
  });

  it('should render quick links section', () => {
    render(<Footer />);

    const quickLinksHeading = screen.getByRole('heading', {
      name: /quick links/i,
    });
    expect(quickLinksHeading).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: /about us/i });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');

    const contactLink = screen.getByRole('link', { name: /contact/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('should render for job seekers section', () => {
    render(<Footer />);

    const jobSeekersHeading = screen.getByRole('heading', {
      name: /for job seekers/i,
    });
    expect(jobSeekersHeading).toBeInTheDocument();

    const browseJobsLink = screen.getByRole('link', { name: /browse jobs/i });
    expect(browseJobsLink).toBeInTheDocument();
    expect(browseJobsLink).toHaveAttribute('href', '/jobs');

    const companiesLink = screen.getByRole('link', { name: /companies/i });
    expect(companiesLink).toBeInTheDocument();
    expect(companiesLink).toHaveAttribute('href', '/companies');
  });

  it('should render for employers section', () => {
    render(<Footer />);

    const employersHeading = screen.getByRole('heading', {
      name: /for employers/i,
    });
    expect(employersHeading).toBeInTheDocument();

    const postJobLink = screen.getByRole('link', { name: /post a job/i });
    expect(postJobLink).toBeInTheDocument();
    expect(postJobLink).toHaveAttribute('href', '/post-job');
  });

  it('should render social media links', () => {
    render(<Footer />);

    const followUsHeading = screen.getByRole('heading', { name: /follow us/i });
    expect(followUsHeading).toBeInTheDocument();

    // Social links should have aria-labels for accessibility
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toBeInTheDocument();

    const twitterLink = screen.getByRole('link', { name: /twitter/i });
    expect(twitterLink).toBeInTheDocument();
  });

  it('should render copyright information', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const copyright = screen.getByText(
      new RegExp(`© ${currentYear} JairoJobs`, 'i'),
    );
    expect(copyright).toBeInTheDocument();
  });
});
