import { render, screen } from "@testing-library/react";
import "../../../test/setupTests";

import ChatCard from "../../components/chat/ChatCard";
import { ChatCardProps } from "../../components/chat/interfaces/Chat.interfaces";
import { expect, it, describe, vi } from "vitest";
// Mock Props
const mockProps: ChatCardProps = {
  chatId: "chat-123",
  chatPicture: "https://via.placeholder.com/50",
  chatName: "John Doe",
  lastMessage: "Hello, how are you?",
  sentDate: "10:30 AM",
  onClick: vi.fn(),
  unseenCount: 2,
};

describe("ChatCard Component", () => {
  it("renders correctly with given props", async () => {
    render(<ChatCard {...mockProps} />);

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();

    expect(screen.getByText(/Hello, how are you?/i)).toBeInTheDocument();

    expect(screen.getByText(/10:30 AM/i)).toBeInTheDocument();

    const chatImage = await screen.findByAltText("John Doe");

    expect(chatImage).toHaveAttribute("src", mockProps.chatPicture);
  });
});
