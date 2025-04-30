import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PendingInvitationsCard from "../../components/MyNetwork/PendingInvitationsCard";
import { getPendingInvitations } from "../../services/api/networkServices";
import { Mock, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

vi.mock("../../services/api/networkServices");

describe("PendingInvitationsCard Component", () => {
  const mockInvitations = [
    {
      userName: "User 1",
      userBio: "Bio 1",
      Mutuals: "3 mutual friends",
      profilePicture: "profile-1.jpg",
      acknowledged: false,
    },
    {
      userName: "User 2",
      userBio: "Bio 2",
      Mutuals: "2 mutual friends",
      profilePicture: "profile-2.jpg",
      acknowledged: true,
    },
    {
      userName: "User 3",
      userBio: "Bio 3",
      Mutuals: "1 mutual friend",
      profilePicture: "profile-3.jpg",
      acknowledged: false,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders the correct number of invitations", async () => {
    (getPendingInvitations as Mock).mockResolvedValue(mockInvitations);

    render(<PendingInvitationsCard />);

    await waitFor(() => {
      const invitations = screen.getAllByRole("listitem");
      expect(invitations.length).toBe(3);
    });
  });


  test("handles accept behavior correctly", async () => {
    (getPendingInvitations as Mock).mockResolvedValue(mockInvitations);

    render(<PendingInvitationsCard />);
    await waitFor(() => {
    const acceptButton = screen.getAllByTestId("accept-inv-button")[0];
    fireEvent.click(acceptButton);
    screen.debug();
    });
    await waitFor(() => {
    const updatedText = screen.getAllByText(/is now a connection!/i)[0];
    expect(updatedText).toBeInTheDocument();
    });
  });

  test("handles reject behavior correctly", async () => {
    (getPendingInvitations as Mock).mockResolvedValue(mockInvitations);

    render(<PendingInvitationsCard />);
    
    await waitFor(() => {
      const rejectButton = screen.getAllByTestId("ignore-inv-button")[0];
      fireEvent.click(rejectButton);

      const userName = screen.queryByText("User 1");
      expect(userName).not.toBeInTheDocument();
    });
  });

  test("removes acknowledged invitations correctly", async () => {
    (getPendingInvitations as Mock).mockResolvedValue(mockInvitations);

    render(<PendingInvitationsCard />);

    await waitFor(() => {
      const removeAcknowledgmentButton = screen.getAllByText(/×/i)[0];
      fireEvent.click(removeAcknowledgmentButton);

      const acknowledgedText = screen.queryByText(/is now a connection!/i);
      expect(acknowledgedText).not.toBeInTheDocument();
    });
  });

  test("opens and closes the modal correctly", async () => {
    (getPendingInvitations as Mock).mockResolvedValue(mockInvitations);

    render(<PendingInvitationsCard />);


    await waitFor(() => {
      const modalButton = screen.getByTestId("manage-showall-button");
      fireEvent.click(modalButton);

      
      const modalHeader = screen.getByText(/all invitations/i);
      expect(modalHeader).toBeInTheDocument();

      const closeButton = screen.getAllByText(/×/i)[1];
      fireEvent.click(closeButton);

      expect(modalHeader).not.toBeInTheDocument();
    });
  });
  

  test("handles empty state gracefully", async () => {
    (getPendingInvitations as Mock).mockResolvedValue([]);

    render(<PendingInvitationsCard />);

    await waitFor(() => {
      const emptyText = screen.getByText(/no pending invitations/i);
      expect(emptyText).toBeInTheDocument();
    });
  });

  test("handles fetch errors gracefully", async () => {
    (getPendingInvitations as Mock).mockRejectedValue(new Error("Network error"));

    render(<PendingInvitationsCard />);

    await waitFor(() => {
      const emptyText = screen.getByText(/no pending invitations/i);
      expect(emptyText).toBeInTheDocument();
    });
  });
});