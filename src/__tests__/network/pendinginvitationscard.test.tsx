import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import PendingInvitationsCard from '../../components/MyNetwork/PendingInvitationsCard';
import { getPendingInvitations } from '../../services/api/networkServices';
import '@testing-library/jest-dom';

vi.mock('../../services/api/networkServices', () => ({
  getPendingInvitations: vi.fn(),
}));

describe('PendingInvitationsCard', () => {
  const mockInvitations = [
    {
      userName: 'John Doe',
      userBio: 'Software Developer',
      profilePicture: 'https://example.com/john.jpg',
      Mutuals: '5 mutuals',
      acknowledged: false,
    },
    {
      userName: 'Jane Smith',
      userBio: 'Product Manager',
      profilePicture: 'https://example.com/jane.jpg',
      Mutuals: '2 mutuals',
      acknowledged: true,
    },
  ];

  beforeEach(() => {
    vi.mocked(getPendingInvitations).mockResolvedValue(mockInvitations);
  });

  test('renders PendingInvitationsCard and displays the invitations count', async () => {
    render(<PendingInvitationsCard manageButtonid="manage-button" />);

    await waitFor(() => expect(getPendingInvitations).toHaveBeenCalled());

    expect(screen.getByTestId('invitation-count')).toHaveTextContent('Invitations (1)');
  });

  test('displays correct invitation data', async () => {
    render(<PendingInvitationsCard manageButtonid="manage-button" />);

    await waitFor(() => expect(getPendingInvitations).toHaveBeenCalled());

    expect(screen.getByTestId('invitation-name-unacknowledged-0')).toHaveTextContent('John Doe');
    expect(screen.getByTestId('invitation-bio-0')).toHaveTextContent('Software Developer');
    expect(screen.getByTestId('invitation-name-1')).toHaveTextContent('Jane Smith');
  });

  test('calls accept handler on accept button click', async () => {
    render(<PendingInvitationsCard manageButtonid="manage-button" />);

    await waitFor(() => expect(getPendingInvitations).toHaveBeenCalled());

    const acceptButton = screen.getByTestId('accept-button-0');
    fireEvent.click(acceptButton);

    expect(screen.getByTestId('invitation-name-0')).toHaveTextContent('John Doe is now a connection!');
  });

  test('opens modal when "Show All" button is clicked', async () => {
    render(<PendingInvitationsCard manageButtonid="manage-button" />);

    await waitFor(() => expect(getPendingInvitations).toHaveBeenCalled());

    const manageButton = screen.getByTestId('manage-button');
    fireEvent.click(manageButton);

    expect(screen.getByTestId('modal-title')).toHaveTextContent('All Invitations');
  });
});
