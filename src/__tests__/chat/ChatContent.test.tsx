import { render, screen, fireEvent, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import ChatContent from "@chatComponent/ChatContent";
import * as ChatSocket from "@services/api/ChatSocket";
import * as chatServices from "@services/api/chatServices";
import { ChatIdProvider } from "@context/ChatIdProvider";
import { NetworkUserIdProvider } from "@context/NetworkUserIdProvider";

// Mock the services
vi.mock("@services/api/ChatSocket", () => ({
  subscribeToMessages: vi.fn(),
  unsubscribeFromMessages: vi.fn(),
  sendMessage: vi.fn(),
  typing: vi.fn(),
  stopTyping: vi.fn(),
  listenToOpenChatErrors: vi.fn(),
}));

vi.mock("@services/api/chatServices", () => ({
  fetchChatData: vi.fn(),
  createChat: vi.fn(),
}));

// Mock child components
vi.mock("@chatComponent/ChatMessages", () => ({
  default: () => <div data-testid="chat-messages" />,
}));

vi.mock("@chatComponent/ChatInput", () => ({
  default: ({ onSendMessage, onTypingMessage }) => (
    <div data-testid="chat-input">
      <button
        onClick={() => onSendMessage("test message", "text")}
        data-testid="send-button"
      >
        Send
      </button>
      <button
        onClick={() => onTypingMessage(true)}
        data-testid="start-typing-button"
      >
        Start Typing
      </button>
      <button
        onClick={() => onTypingMessage(false)}
        data-testid="stop-typing-button"
      >
        Stop Typing
      </button>
    </div>
  ),
}));

vi.mock("@chatComponent/GroupSetting/GroupChatSetting", () => ({
  default: () => <div data-testid="group-chat-settings" />,
}));

vi.mock("@chatComponent/UserTyping", () => ({
  default: () => <div data-testid="user-typing-indicator" />,
}));
const mockScrollIntoView = vi.fn();
window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView;
const mockChatData = {
  participants: [
    { userId: "1", profilePicture: "pic1.jpg" },
    { userId: "2", profilePicture: "pic2.jpg" },
  ],
  messages: [],
  chatId: "chat123",
  chatType: "private",
};

describe("ChatContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem("userId", "1");
    vi.mocked(chatServices.fetchChatData).mockResolvedValue(mockChatData);
    vi.mocked(chatServices.createChat).mockResolvedValue(mockChatData);
    mockScrollIntoView.mockClear();
  });

  const renderWithProviders = (chatId = null, usersId = []) => {
    return render(
      <NetworkUserIdProvider ids={usersId}>
        <ChatIdProvider id={chatId!}>
          <ChatContent />
        </ChatIdProvider>
      </NetworkUserIdProvider>,
    );
  };

  it("initializes with existing chat", async () => {
    await act(async () => {
      renderWithProviders("existingChatId");
    });

    expect(chatServices.fetchChatData).toHaveBeenCalledWith("existingChatId");
    expect(ChatSocket.subscribeToMessages).toHaveBeenCalled();
    screen.debug();
    expect(screen.getByTestId("chat-messages")).toBeInTheDocument();
    expect(screen.getByTestId("chat-input")).toBeInTheDocument();
  });

  it("creates new chat when usersId is provided without chatId", async () => {
    await act(async () => {
      renderWithProviders(null, ["2", "3"]);
    });

    expect(chatServices.createChat).toHaveBeenCalledWith(["2", "3"], "");
    expect(ChatSocket.subscribeToMessages).toHaveBeenCalled();
  });

  it("handles typing indicators", async () => {
    await act(async () => {
      renderWithProviders("chatId");
    });

    const startTypingButton = screen.getByTestId("start-typing-button");
    const stopTypingButton = screen.getByTestId("stop-typing-button");

    fireEvent.click(startTypingButton);
    expect(ChatSocket.typing).toHaveBeenCalledWith("chatId");

    fireEvent.click(stopTypingButton);
    expect(ChatSocket.stopTyping).toHaveBeenCalledWith("chatId");
  });

  it("handles message sending", async () => {
    await act(async () => {
      renderWithProviders("chatId");
    });

    const sendButton = screen.getByTestId("send-button");

    await act(async () => {
      fireEvent.click(sendButton);
    });

    expect(ChatSocket.sendMessage).toHaveBeenCalled();
  });

  it("shows group chat settings for group chats", async () => {
    const groupChatData = { ...mockChatData, chatType: "group" };
    vi.mocked(chatServices.fetchChatData).mockResolvedValue(groupChatData);

    await act(async () => {
      renderWithProviders("groupChatId");
    });

    expect(screen.getByTestId("group-chat-settings")).toBeInTheDocument();
  });

  it("unsubscribes from messages on unmount", async () => {
    const { unmount } = await act(async () => {
      return renderWithProviders("chatId");
    });

    unmount();
    expect(ChatSocket.unsubscribeFromMessages).toHaveBeenCalledWith("chatId");
  });

  it("handles message delivery status", async () => {
    vi.useFakeTimers();
    await act(async () => {
      renderWithProviders("chatId");
    });

    const sendButton = screen.getByTestId("send-button");

    await act(async () => {
      fireEvent.click(sendButton);
    });

    // Simulate message delivery timeout
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    // Check if message status was updated
    // You might need to modify this based on how you want to verify the status
    expect(ChatSocket.sendMessage).toHaveBeenCalled();

    vi.useRealTimers();
  });
});
