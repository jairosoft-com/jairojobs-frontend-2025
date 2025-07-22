import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '@/components/features/SearchBar';

describe('SearchBar', () => {
  it('should render search input with placeholder', () => {
    render(<SearchBar onSearch={vi.fn()} />);

    const searchInput = screen.getByPlaceholderText(/job title or keywords/i);
    expect(searchInput).toBeInTheDocument();
  });

  it('should render location input with placeholder', () => {
    render(<SearchBar onSearch={vi.fn()} />);

    const locationInput = screen.getByPlaceholderText(/location/i);
    expect(locationInput).toBeInTheDocument();
  });

  it('should render search button', () => {
    render(<SearchBar onSearch={vi.fn()} />);

    const searchButton = screen.getByRole('button', { name: /search jobs/i });
    expect(searchButton).toBeInTheDocument();
  });

  it('should have search icon in search input', () => {
    render(<SearchBar onSearch={vi.fn()} />);

    const searchIcon = screen.getByTestId('search-icon');
    expect(searchIcon).toBeInTheDocument();
  });

  it('should have location icon in location input', () => {
    render(<SearchBar onSearch={vi.fn()} />);

    const locationIcon = screen.getByTestId('location-icon');
    expect(locationIcon).toBeInTheDocument();
  });

  it('should call onSearch with input values when search button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnSearch = vi.fn();

    render(<SearchBar onSearch={mockOnSearch} />);

    const searchInput = screen.getByPlaceholderText(/job title or keywords/i);
    const locationInput = screen.getByPlaceholderText(/location/i);
    const searchButton = screen.getByRole('button', { name: /search jobs/i });

    await user.type(searchInput, 'React Developer');
    await user.type(locationInput, 'San Francisco');
    await user.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith({
      query: 'React Developer',
      location: 'San Francisco',
    });
  });

  it('should call onSearch when Enter key is pressed in search input', async () => {
    const user = userEvent.setup();
    const mockOnSearch = vi.fn();

    render(<SearchBar onSearch={mockOnSearch} />);

    const searchInput = screen.getByPlaceholderText(/job title or keywords/i);
    await user.type(searchInput, 'Frontend Engineer{Enter}');

    expect(mockOnSearch).toHaveBeenCalledWith({
      query: 'Frontend Engineer',
      location: '',
    });
  });

  it('should call onSearch when Enter key is pressed in location input', async () => {
    const user = userEvent.setup();
    const mockOnSearch = vi.fn();

    render(<SearchBar onSearch={mockOnSearch} />);

    const locationInput = screen.getByPlaceholderText(/location/i);
    await user.type(locationInput, 'New York{Enter}');

    expect(mockOnSearch).toHaveBeenCalledWith({
      query: '',
      location: 'New York',
    });
  });

  it('should allow search with empty fields', async () => {
    const user = userEvent.setup();
    const mockOnSearch = vi.fn();

    render(<SearchBar onSearch={mockOnSearch} />);

    const searchButton = screen.getByRole('button', { name: /search jobs/i });
    await user.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith({
      query: '',
      location: '',
    });
  });

  it('should have responsive layout classes', () => {
    render(<SearchBar onSearch={vi.fn()} />);

    const container = screen.getByTestId('search-bar-container');
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('lg:grid-cols-12');
  });
});
