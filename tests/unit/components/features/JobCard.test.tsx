import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { JobCard } from '@/components/features/JobCard';
import { mockJobs } from '@/lib/db/mockData';

const mockJob = mockJobs[0];

describe('JobCard', () => {
  it('should render job title and company name', () => {
    render(<JobCard job={mockJob} />);
    
    const title = screen.getByRole('heading', { name: mockJob.title });
    expect(title).toBeInTheDocument();
    
    const company = screen.getByText(mockJob.company);
    expect(company).toBeInTheDocument();
  });

  it('should render location and job type', () => {
    render(<JobCard job={mockJob} />);
    
    const location = screen.getByText(mockJob.location);
    expect(location).toBeInTheDocument();
    
    // Job type should be formatted nicely
    const jobType = screen.getByText(/full time/i);
    expect(jobType).toBeInTheDocument();
  });

  it('should render salary range', () => {
    render(<JobCard job={mockJob} />);
    
    // Should format salary with currency
    const salaryMin = screen.getByText(/\$150k/i);
    expect(salaryMin).toBeInTheDocument();
    
    const salaryMax = screen.getByText(/\$200k/i);
    expect(salaryMax).toBeInTheDocument();
  });

  it('should render job tags', () => {
    render(<JobCard job={mockJob} />);
    
    // Should show first 4 tags
    mockJob.tags.slice(0, 4).forEach(tag => {
      const tagElement = screen.getByText(tag);
      expect(tagElement).toBeInTheDocument();
    });
    
    // Should show "+X more" for remaining tags
    if (mockJob.tags.length > 4) {
      const moreText = `+${mockJob.tags.length - 4} more`;
      const moreBadge = screen.getByText(moreText);
      expect(moreBadge).toBeInTheDocument();
    }
  });

  it('should render remote option badge', () => {
    render(<JobCard job={mockJob} />);
    
    const remoteBadge = screen.getByText(/hybrid/i);
    expect(remoteBadge).toBeInTheDocument();
  });

  it('should render featured badge for featured jobs', () => {
    render(<JobCard job={mockJob} />);
    
    const featuredBadge = screen.getByText(/featured/i);
    expect(featuredBadge).toBeInTheDocument();
  });

  it('should not render featured badge for non-featured jobs', () => {
    const nonFeaturedJob = { ...mockJob, featured: false };
    render(<JobCard job={nonFeaturedJob} />);
    
    const featuredBadge = screen.queryByText(/featured/i);
    expect(featuredBadge).not.toBeInTheDocument();
  });

  it('should call onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(<JobCard job={mockJob} onClick={handleClick} />);
    
    const card = screen.getByRole('article');
    await user.click(card);
    
    expect(handleClick).toHaveBeenCalledWith(mockJob);
  });

  it('should have hover effect', () => {
    render(<JobCard job={mockJob} />);
    
    const card = screen.getByRole('article');
    expect(card).toHaveClass('hover:shadow-lg');
  });
});