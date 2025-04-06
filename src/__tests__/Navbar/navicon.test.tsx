import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavIcon from '../../components/NavigationBar/NavIcon';
import { JSX } from 'react';


describe('NavIcon Component', () => {
  const mockProps = {
    id: 'nav-icon-1',
    rightBorder: 'border-right',
    Icon: 'fas fa-home',
    Name: 'Home',
    Link: '/home',
  };

  const renderWithRouter = (component: JSX.Element) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('renders the NavIcon component with correct props', () => {
    renderWithRouter(<NavIcon {...mockProps} />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('id', 'nav-icon-1');
    expect(linkElement).toHaveAttribute('href', '/home');
    expect(linkElement).toHaveClass('border-right');

    const iconElement = screen.getByText((content, element) => element?.tagName === 'I');
    expect(iconElement).toHaveClass('fas fa-home');

    const nameElement = screen.getByText('Home');
    expect(nameElement).toBeInTheDocument();
  });

  it('conditionally renders the dropdown icon if Dropdown prop is provided', () => {
    renderWithRouter(<NavIcon {...mockProps} Dropdown="fas fa-chevron-down" />);
    const dropdownElement = screen.getByText((content, element) => element?.tagName === 'I' && element?.className.includes('fa-chevron-down'));
    expect(dropdownElement).toBeInTheDocument();
  });

  it('does not render the dropdown icon if Dropdown prop is not provided', () => {
    renderWithRouter(<NavIcon {...mockProps} />);
    const dropdownElement = screen.queryByText((content, element) => element?.tagName === 'I' && element?.className.includes('fa-chevron-down'));
    expect(dropdownElement).toBeNull(); // Check that it doesn't exist
  });
});