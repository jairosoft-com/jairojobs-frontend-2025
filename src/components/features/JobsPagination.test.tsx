import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { JobsPagination } from './JobsPagination';

describe('JobsPagination', () => {
  const mockOnPageChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders pagination with correct page numbers', () => {
    render(
      <JobsPagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows current page as active', () => {
    render(
      <JobsPagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const currentPageLink = screen.getByText('3').closest('a');
    expect(currentPageLink).toHaveAttribute('aria-current', 'page');
  });

  it('handles page clicks', async () => {
    const user = userEvent.setup();
    render(
      <JobsPagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    await user.click(screen.getByText('3'));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('handles previous button click', async () => {
    const user = userEvent.setup();
    render(
      <JobsPagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    await user.click(screen.getByText('Previous'));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('handles next button click', async () => {
    const user = userEvent.setup();
    render(
      <JobsPagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    await user.click(screen.getByText('Next'));
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it('disables previous button on first page', () => {
    render(
      <JobsPagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const previousButton = screen.getByText('Previous').closest('a');
    expect(previousButton).toHaveClass('pointer-events-none opacity-50');
  });

  it('disables next button on last page', () => {
    render(
      <JobsPagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const nextButton = screen.getByText('Next').closest('a');
    expect(nextButton).toHaveClass('pointer-events-none opacity-50');
  });

  it('shows ellipsis for many pages', () => {
    render(
      <JobsPagination
        currentPage={5}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />,
    );

    // Should show: Previous 1 ... 4 5 6 ... 10 Next
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();

    // Check for ellipsis (dots) - look for the icon containers
    const ellipses = screen.getAllByText('More pages');
    expect(ellipses).toHaveLength(2);
  });

  it('handles single page', () => {
    render(
      <JobsPagination
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Previous').closest('a')).toHaveClass(
      'pointer-events-none',
    );
    expect(screen.getByText('Next').closest('a')).toHaveClass(
      'pointer-events-none',
    );
  });

  it('shows correct pages at beginning', () => {
    render(
      <JobsPagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />,
    );

    // Should show: Previous 1 2 ... 10 Next
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();

    // Check for single ellipsis
    const ellipses = screen.getAllByText('More pages');
    expect(ellipses).toHaveLength(1);
  });

  it('shows correct pages at end', () => {
    render(
      <JobsPagination
        currentPage={10}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />,
    );

    // Should show: Previous 1 ... 9 10 Next
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();

    // Check for single ellipsis
    const ellipses = screen.getAllByText('More pages');
    expect(ellipses).toHaveLength(1);
  });
});
