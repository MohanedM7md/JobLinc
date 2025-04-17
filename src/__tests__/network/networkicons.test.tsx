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

    const iconElement = container.querySelector(`.${mockProps.Icon.split(' ').join('.')}`);
    expect(iconElement).toBeInTheDocument();


    const iconNameElement = screen.getByText(mockProps.IconName);
    expect(iconNameElement).toBeInTheDocument();


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