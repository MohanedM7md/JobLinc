import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ConnectCard from "../../components/MyNetwork/ConnectCard";
import { sendConnectionRequest } from "@services/api/networkServices";
import { Mock, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock("@services/api/networkServices", () => ({
  sendConnectionRequest: vi.fn(),
}));

describe("ConnectCard Component", () => {
  const mockProps = {
    userId: "67fbcbde912042b8580eed94",
    profilePicture: "test-profile.jpg",
    firstName: "Test",
    lastName: "User",
    userBio: "Test Bio",
    mutuals: "You have 5 mutual connections",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders user information correctly", () => {
    render(
    <MemoryRouter>
      <ConnectCard {...mockProps} />
    </MemoryRouter>
  );

    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("Test Bio")).toBeInTheDocument();
    expect(screen.getByText("You have 5 mutual connections")).toBeInTheDocument();
    expect(screen.getByAltText("User Profile Photo")).toHaveAttribute(
      "src",
      "test-profile.jpg"
    );
  });

  it("button shows 'Linc' initially and calls the API on click", async () => {
    render(
      <MemoryRouter>
        <ConnectCard {...mockProps} />
      </MemoryRouter>
    );
    const button = screen.getByRole("button", { name: /linc/i });

    fireEvent.click(button);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText(/pending/i)).toBeInTheDocument());
    expect(sendConnectionRequest).toHaveBeenCalledWith("targetuserid", "currentUserId");
  });

  it("displays error message when the API call fails", async () => {
    (sendConnectionRequest as Mock).mockRejectedValueOnce(new Error("API error"));

    render(
      <MemoryRouter>
        <ConnectCard {...mockProps} />
      </MemoryRouter>
    );
    const button = screen.getByRole("button", { name: /linc/i });

    fireEvent.click(button);

    await waitFor(() =>
      expect(screen.getByText(/unable to send connection request/i)).toBeInTheDocument()
    );
  });

  it("opens and closes the modal when the button is clicked after 'Pending' state", async () => {
    (sendConnectionRequest as Mock).mockResolvedValueOnce({ success: true });

    render(
      <MemoryRouter>
        <ConnectCard {...mockProps} />
      </MemoryRouter>
    );
    const button = screen.getByRole("button", { name: /linc/i });

    fireEvent.click(button);

    await waitFor(() => expect(screen.getByText(/pending/i)).toBeInTheDocument());

    fireEvent.click(button);
    expect(screen.getByText(/Withdraw Invitation./i)).toBeInTheDocument();

    const cancelButton = screen.getByTestId("cancel-modal-button");
    fireEvent.click(cancelButton);

    expect(screen.queryByText(/Withdraw Invitation./i)).not.toBeInTheDocument();
  });

  it("withdraws invitation and resets state", async () => {
    (sendConnectionRequest as Mock).mockResolvedValueOnce({ success: true });

    render(
      <MemoryRouter>
        <ConnectCard {...mockProps} />
      </MemoryRouter>
    );
    const button = screen.getByRole("button", { name: /linc/i });

    fireEvent.click(button);

    await waitFor(() => expect(screen.getByText(/pending/i)).toBeInTheDocument());

    fireEvent.click(button);

    const withdrawButton = screen.getByTestId("withdraw-modal-button");
    fireEvent.click(withdrawButton);    

    await waitFor(() => expect(screen.getByText(/linc/i)).toBeInTheDocument());
  });
});