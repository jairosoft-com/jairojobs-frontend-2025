import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { JobFilters } from './JobFilters';
import { JobFilters as JobFiltersType } from '@/types';

describe('JobFilters', () => {
  const mockOnFiltersChange = vi.fn();
  const defaultFilters: JobFiltersType = {};

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all filter sections', () => {
    render(
      <JobFilters 
        filters={defaultFilters} 
        onFiltersChange={mockOnFiltersChange}
      />
    );

    expect(screen.getByText('Job Type')).toBeInTheDocument();
    expect(screen.getByText('Experience Level')).toBeInTheDocument();
    expect(screen.getByText('Work Location')).toBeInTheDocument();
    expect(screen.getByText('Salary Range')).toBeInTheDocument();
  });

  it('renders job type checkboxes', () => {
    render(
      <JobFilters 
        filters={defaultFilters} 
        onFiltersChange={mockOnFiltersChange}
      />
    );

    expect(screen.getByLabelText('Full Time')).toBeInTheDocument();
    expect(screen.getByLabelText('Part Time')).toBeInTheDocument();
    expect(screen.getByLabelText('Contract')).toBeInTheDocument();
    expect(screen.getByLabelText('Internship')).toBeInTheDocument();
    expect(screen.getByLabelText('Temporary')).toBeInTheDocument();
  });

  it('handles job type filter changes', async () => {
    const user = userEvent.setup();
    render(
      <JobFilters 
        filters={defaultFilters} 
        onFiltersChange={mockOnFiltersChange}
      />
    );

    const fullTimeCheckbox = screen.getByLabelText('Full Time');
    await user.click(fullTimeCheckbox);

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      type: ['full-time']
    });
  });

  it('handles multiple job type selections', async () => {
    const user = userEvent.setup();
    render(
      <JobFilters 
        filters={{ type: ['full-time'] }} 
        onFiltersChange={mockOnFiltersChange}
      />
    );

    const partTimeCheckbox = screen.getByLabelText('Part Time');
    await user.click(partTimeCheckbox);

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      type: ['full-time', 'part-time']
    });
  });

  it('handles experience level filter changes', async () => {
    const user = userEvent.setup();
    render(
      <JobFilters 
        filters={defaultFilters} 
        onFiltersChange={mockOnFiltersChange}
      />
    );

    const seniorCheckbox = screen.getByLabelText('Senior Level');
    await user.click(seniorCheckbox);

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      experienceLevel: ['senior']
    });
  });

  it('handles remote option filter changes', async () => {
    const user = userEvent.setup();
    render(
      <JobFilters 
        filters={defaultFilters} 
        onFiltersChange={mockOnFiltersChange}
      />
    );

    const remoteCheckbox = screen.getByLabelText('Remote');
    await user.click(remoteCheckbox);

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      remoteOption: ['remote']
    });
  });

  it('handles salary range selection', async () => {
    const user = userEvent.setup();
    render(
      <JobFilters 
        filters={defaultFilters} 
        onFiltersChange={mockOnFiltersChange}
      />
    );

    const salaryRadio = screen.getByLabelText('$100k - $150k');
    await user.click(salaryRadio);

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      salaryMin: 100000,
      salaryMax: 150000
    });
  });

  it('handles clear all filters', async () => {
    const user = userEvent.setup();
    render(
      <JobFilters 
        filters={{
          type: ['full-time'],
          experienceLevel: ['senior'],
          remoteOption: ['remote'],
          salaryMin: 100000,
          salaryMax: 150000
        }} 
        onFiltersChange={mockOnFiltersChange}
      />
    );

    // Get the Clear all button in the header (has X icon)
    const clearButtons = screen.getAllByText('Clear all');
    const headerClearButton = clearButtons.find(button => 
      button.previousElementSibling?.classList.contains('lucide-x')
    ) || clearButtons[0];
    
    await user.click(headerClearButton);

    expect(mockOnFiltersChange).toHaveBeenCalledWith({});
  });

  it('shows active filter count', () => {
    render(
      <JobFilters 
        filters={{
          type: ['full-time', 'part-time'],
          experienceLevel: ['senior'],
          remoteOption: ['remote']
        }} 
        onFiltersChange={mockOnFiltersChange}
      />
    );

    // 4 active filters total (2 type + 1 experience + 1 remote)
    expect(screen.getByText('4 filters active')).toBeInTheDocument();
    // Clear all buttons exist
    expect(screen.getAllByText('Clear all')).toHaveLength(2);
  });

  it('renders in mobile-friendly mode', () => {
    render(
      <JobFilters 
        filters={defaultFilters} 
        onFiltersChange={mockOnFiltersChange}
        isMobile={true}
      />
    );

    // In mobile mode, filters should be in a trigger button
    const filterButton = screen.getByRole('button');
    expect(filterButton).toHaveTextContent('Filters');
  });

  it('preserves selected filters when re-rendered', () => {
    const { rerender } = render(
      <JobFilters 
        filters={{ type: ['full-time'] }} 
        onFiltersChange={mockOnFiltersChange}
      />
    );

    const fullTimeCheckbox = screen.getByLabelText('Full Time');
    expect(fullTimeCheckbox).toBeChecked();

    rerender(
      <JobFilters 
        filters={{ type: ['full-time', 'part-time'] }} 
        onFiltersChange={mockOnFiltersChange}
      />
    );

    expect(screen.getByLabelText('Full Time')).toBeChecked();
    expect(screen.getByLabelText('Part Time')).toBeChecked();
  });
});