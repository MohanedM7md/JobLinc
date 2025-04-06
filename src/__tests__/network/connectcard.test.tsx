import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import ConnectCard from '../../components/MyNetwork/ConnectCard';

describe('ConnectCard Component', () => {
  const mockProps = {
    lincbuttonid: 'linc-button-1',
    profilePicture: 'https://via.placeholder.com/150',
    userName: 'John Doe',
    userBio: 'A passionate developer and tech enthusiast.',
    Mutuals: '3 mutual friends',
  };

  test('renders the component with all props', () => {
    render(<ConnectCard {...mockProps} />);

    // Check profile picture
    const profileImage = screen.getAllByAltText('Profile Photo')[0];
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute('src', mockProps.profilePicture);

    // Check user name
    const userName = screen.getByText(mockProps.userName);
    expect(userName).toBeInTheDocument();

    // Check user bio
    const userBio = screen.getByText(mockProps.userBio);
    expect(userBio).toBeInTheDocument();

    // Check mutual friends
    const mutuals = screen.getByText(mockProps.Mutuals);
    expect(mutuals).toBeInTheDocument();

    // Check button
    const button = screen.getByRole('button', { name: /Linc/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Linc');
  });

  test('toggles button text and style when clicked', () => {
    render(<ConnectCard {...mockProps} />);

    const button = screen.getByRole('button', { name: /Linc/i });

    // Initial state
    expect(button).toHaveTextContent('Linc');
    expect(button).toHaveClass('text-crimsonRed border-crimsonRed');

    // Simulate click
    fireEvent.click(button);

    // After click
    expect(button).toHaveTextContent('Pending');
    expect(button).toHaveClass('text-darkGray border-darkGray');
  });
});