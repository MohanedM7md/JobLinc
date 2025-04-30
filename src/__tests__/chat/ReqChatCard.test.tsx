import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import ReqChatCard from "@chatComponent/ReqChatCard";
import { X, Check } from "lucide-react";

vi.mock("@utils/DateFormatter", () => ({
  getRelativeTimeString: vi.fn().mockReturnValue("2 hours ago"),
}));

vi.mock("lucide-react", () => ({
  X: () => <span>X</span>,
  Check: () => <span>✓</span>,
}));

describe("ReqChatCard", () => {
  const mockProps = {
    chatId: "123",
    chatPicture: ["/test-image.jpg"],
    chatName: "Test User",
    lastMessage: "Hello there!",
    sentDate: new Date(),
    unreadCount: 3,
    isRead: false,
    senderName: "Sender",
    handleAcceptRequest: vi.fn(),
    handleRejectRequest: vi.fn(),
    onClick: vi.fn(),
  };

  it("renders correctly with all props", () => {
    render(<ReqChatCard {...mockProps} />);

    expect(screen.getByText(mockProps.chatName)).toBeInTheDocument();
    expect(screen.getByText(mockProps.lastMessage)).toBeInTheDocument();
    expect(screen.getByText("2 hours ago")).toBeInTheDocument();
    expect(
      screen.getByText(mockProps.unreadCount.toString()),
    ).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      mockProps.chatPicture[0],
    );
  });

  it("shows default avatar when no chatPicture is provided", () => {
    render(<ReqChatCard {...{ ...mockProps, chatPicture: [] }} />);
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "/default-avatar.png",
    );
  });

  it("does not show unread count when zero", () => {
    render(<ReqChatCard {...{ ...mockProps, unreadCount: 0 }} />);
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("calls handleAcceptRequest when accept button is clicked", async () => {
    const user = userEvent.setup();
    render(<ReqChatCard {...mockProps} />);

    const acceptButton = screen.getByTitle("Accept Chat Request");
    await user.click(acceptButton);

    expect(mockProps.handleAcceptRequest).toHaveBeenCalledWith(
      mockProps.chatId,
      "Accepted",
    );
  });

  it("calls handleRejectRequest when reject button is clicked", async () => {
    const user = userEvent.setup();
    render(<ReqChatCard {...mockProps} />);

    const rejectButton = screen.getByTitle("Reject Chat Request");
    await user.click(rejectButton);

    expect(mockProps.handleRejectRequest).toHaveBeenCalledWith(
      mockProps.chatId,
      "Rejected",
    );
  });

  it("prevents event propagation when buttons are clicked", async () => {
    const user = userEvent.setup();
    const mockStopPropagation = vi.fn();
    render(<ReqChatCard {...mockProps} />);

    const acceptButton = screen.getByTitle("Accept Chat Request");
    const rejectButton = screen.getByTitle("Reject Chat Request");

    acceptButton.onclick = (e) => {
      mockProps.handleAcceptRequest(mockProps.chatId, "Accepted");
      e.stopPropagation = mockStopPropagation;
      e.stopPropagation();
    };

    rejectButton.onclick = (e) => {
      mockProps.handleRejectRequest(mockProps.chatId, "Rejected");
      e.stopPropagation = mockStopPropagation;
      e.stopPropagation();
    };

    await user.click(acceptButton);
    await user.click(rejectButton);

    expect(mockStopPropagation).toHaveBeenCalledTimes(4);
  });
});
