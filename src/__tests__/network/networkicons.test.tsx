import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ManageNetworkIcons from '../../components/MyNetwork/ManageNetworkIcons';

describe('ManageNetworkIcons Component', () => {
  const mockProps = {
    id: 'icon-1',
    Icon: 'fa-solid fa-user-circle',
    IconName: 'Profile',
    Number: '42',
  };

  test('renders the component with all props', () => {
    const { container } = render(
      <MemoryRouter>
        <ManageNetworkIcons {...mockProps} />
      </MemoryRouter>
    );

    // Check icon rendering using container.querySelector
    const iconElement = container.querySelector(`.${mockProps.Icon.split(' ').join('.')}`);
    expect(iconElement).toBeInTheDocument();

    // Check IconName rendering
    const iconNameElement = screen.getByText(mockProps.IconName);
    expect(iconNameElement).toBeInTheDocument();

    // Check Number rendering
    const numberElement = screen.getByText(mockProps.Number);
    expect(numberElement).toBeInTheDocument();
  });

  test('renders without Number prop', () => {
    const propsWithoutNumber = {
      ...mockProps,
      Number: undefined,
    };

    const { container } = render(
      <MemoryRouter>
        <ManageNetworkIcons {...propsWithoutNumber} />
      </MemoryRouter>
    );

    // Check that the Number span is not rendered
    const numberElement = screen.queryByText(mockProps.Number);
    expect(numberElement).not.toBeInTheDocument();
  });

  test('renders the correct link', () => {
    render(
      <MemoryRouter>
        <ManageNetworkIcons {...mockProps} />
      </MemoryRouter>
    );

    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/Signup');
  });
});