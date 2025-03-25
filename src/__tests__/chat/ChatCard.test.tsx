import { render, screen, act, waitFor } from "@testing-library/react";
import ChatCard from "@chatComponent/ChatCard";
import { ChatCardProps } from "@chatComponent/interfaces/Chat.interfaces";
import { expect, it, describe, vi } from "vitest";
import userEvent from "@testing-library/user-event";

// Mock Props
const mockProps: ChatCardProps = {
  chatId: "chat-123",
  chatPicture: "https://via.placeholder.com/50",
  chatName: "John Doe",
  lastMessage: "Hello, how are you?",
  sentDate: "10:30 AM",
  onClick: vi.fn(),
  isRead: true,
  unseenCount: 0,
};

describe("ChatCard Component", () => {
  it("displays correct chat details", async () => {
    render(<ChatCard {...mockProps} />);

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Hello, how are you?/i)).toBeInTheDocument();
    expect(screen.getByText(/10:30 AM/i)).toBeInTheDocument();
  });

  it("does not show unseen count when it is zero", () => {
    render(<ChatCard {...mockProps} />);
    expect(screen.queryByTestId("unseen-count")).not.toBeInTheDocument();
  });

  it("displays correct chat image", async () => {
    render(<ChatCard {...mockProps} />);
    const chatImage = await screen.findByAltText("John Doe");
    expect(chatImage).toHaveAttribute("src", mockProps.chatPicture);
  });
  it("shows unseen count when updated and applies correct styles", async () => {
    const { unmount } = render(<ChatCard {...mockProps} />);

    expect(screen.queryByTestId("unseen-count")).not.toBeInTheDocument();
    unmount();

    render(<ChatCard {...mockProps} unseenCount={2} isRead={false} />);

    const unseenDiv = await screen.findByTestId("unseen-count");

    expect(unseenDiv).toHaveTextContent("2");

    const johnChat = screen.getByTestId(mockProps.chatId);
    expect(johnChat).toHaveClass("bg-SoftRed");
  });
  it("triggers onClick when clicked", async () => {
    render(<ChatCard {...mockProps} />);

    const card = screen.getByText(mockProps.chatName);
    await userEvent.click(card);

    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });
});
