import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import FloatingChatSystem from "@chatComponent/FloatingChat/FloatingChatSystem";
import { ChatIdProvider } from "@context/ChatIdProvider";
import { NetworkUserIdProvider } from "@context/NetworkUserIdProvider";
// Mock the useChats hook
vi.mock("@hooks/useChats", () => ({
  default: () => ({
    opnedChats: [
      {
        chatId: "chat1",
        usersId: ["user1", "user2"],
        chatName: "Test Chat 1",
        chatImage: ["image1.jpg"],
      },
      {
        chatId: "chat2",
        usersId: ["user1", "user3"],
        chatName: "Test Chat 2",
        chatImage: ["image2.jpg"],
      },
    ],
  }),
}));

// Mock the ChatSocket service
vi.mock("@services/api/ChatSocket", () => ({
  connectToChat: vi.fn().mockResolvedValue(true),
  disconnectChatSocket: vi.fn(),
}));

// Mock the child components
vi.mock("./FloatingChatSidebar", () => ({
  default: () => <div data-testid="floating-chat-sidebar" />,
}));

vi.mock("./FloatingChatWindow", () => ({
  default: ({
    chatName,
    chatPicture,
  }: {
    chatName: string;
    chatPicture: string;
  }) => (
    <div data-testid="floating-chat-window">
      <div>{chatName}</div>
      <img src={chatPicture} alt={chatName} />
    </div>
  ),
}));

describe("FloatingChatSystem", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the chat system with sidebar and windows", async () => {
    render(<FloatingChatSystem />);

    // Verify sidebar is rendered
    expect(screen.getByTestId("floating-chat-sidebar")).toBeInTheDocument();
  });
});
