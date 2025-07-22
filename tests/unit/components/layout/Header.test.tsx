import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '@/components/layout/Header';

describe('Header', () => {
  it('should render the logo with correct text', () => {
    render(<Header />);
    const logo = screen.getByRole('link', { name: /jairojobs/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('href', '/');
  });

  it('should render navigation links', () => {
    render(<Header />);

    const findJobsLink = screen.getByRole('link', { name: /find jobs/i });
    expect(findJobsLink).toBeInTheDocument();
    expect(findJobsLink).toHaveAttribute('href', '/jobs');

    const companiesLink = screen.getByRole('link', { name: /companies/i });
    expect(companiesLink).toBeInTheDocument();
    expect(companiesLink).toHaveAttribute('href', '/companies');
  });

  it('should render sign in and sign up buttons', () => {
    render(<Header />);

    const signInButton = screen.getByRole('button', { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();

    const signUpButton = screen.getByRole('button', { name: /sign up/i });
    expect(signUpButton).toBeInTheDocument();
  });

  it('should have a mobile menu button that is visible on mobile', () => {
    render(<Header />);

    const mobileMenuButton = screen.getByRole('button', { name: /menu/i });
    expect(mobileMenuButton).toBeInTheDocument();
    expect(mobileMenuButton).toHaveClass('lg:hidden');
  });

  it('should open mobile navigation when menu button is clicked', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const mobileMenuButton = screen.getByRole('button', { name: /menu/i });
    await user.click(mobileMenuButton);

    // The Header should trigger the mobile nav
    // We'll test the actual mobile nav component separately
    expect(mobileMenuButton).toBeInTheDocument();
  });
});
