import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatContent from "@chatComponent/ChatContent";
import { expect, vi, describe, it, beforeEach } from "vitest";

// Mock all external dependencies
vi.mock("@services/api/ChatSocket", () => ({
  subscribeToMessages: vi.fn(),
  unsubscribeFromMessages: vi.fn(),
  sendMessage: vi.fn(),
  typing: vi.fn(),
  stopTyping: vi.fn(),
}));

vi.mock("@services/api/chatServices", () => ({
  fetchChatData: vi.fn(),
  createChat: vi.fn(),
}));

vi.mock("@context/ChatIdProvider", () => ({
  useChatid: vi.fn(),
}));

vi.mock("@context/NetworkUserIdProvider", () => ({
  useNetworkUserId: vi.fn(),
}));

vi.mock("@store/store", () => ({
  default: {
    getState: vi.fn(() => ({
      user: {
        userId: "test-user-id",
      },
    })),
  },
}));

// Mock child components
vi.mock("./ChatMessages", () => ({
  default: () => <div data-testid="mock-chat-messages" />,
}));

vi.mock("./ChatInput", () => ({
  default: ({
    onSendMessage,
  }: {
    onSendMessage: (msg: string, type: string) => void;
  }) => (
    <div data-testid="mock-chat-input">
      <button onClick={() => onSendMessage("test message", "text")}>
        Send
      </button>
    </div>
  ),
}));

vi.mock("./UserTyping", () => ({
  default: () => <div data-testid="mock-typing-indicator" />,
}));

describe("ChatContent Component", () => {
  const mockSetChatId = vi.fn();
  const mockSubscribeToMessages = vi.fn();
  const mockUnsubscribeFromMessages = vi.fn();
  const mockSendMessage = vi.fn();
  const mockTyping = vi.fn();
  const mockStopTyping = vi.fn();
  const mockFetchChatData = vi.fn();
  const mockCreateChat = vi.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    // Setup default mock implementations
    /*   vi.mocked(useChatid).mockReturnValue({
      chatId: "test-chat-id",
      setChatId: mockSetChatId,
    });

    vi.mocked(useNetworkUserId).mockReturnValue({
      usersId: ["user1", "user2"],
    });

    vi.mocked(subscribeToMessages).mockImplementation(mockSubscribeToMessages);
    vi.mocked(unsubscribeFromMessages).mockImplementation(
      mockUnsubscribeFromMessages,
    );
    vi.mocked(sendMessage).mockImplementation(mockSendMessage);
    vi.mocked(typing).mockImplementation(mockTyping);
    vi.mocked(stopTyping).mockImplementation(mockStopTyping); */

    mockFetchChatData.mockResolvedValue({
      participants: [
        { userId: "1", profilePicture: "user1.jpg" },
        { userId: "2", profilePicture: "user2.jpg" },
      ],
      messages: [
        {
          senderId: "1",
          time: new Date(),
          seenBy: ["1"],
          content: { text: "Hello" },
        },
      ],
    });

    mockCreateChat.mockResolvedValue({
      chatId: "new-chat-id",
      participants: [
        { userId: "1", profilePicture: "user1.jpg" },
        { userId: "1", profilePicture: "user2.jpg" },
      ],
      messages: [],
    });
  });

  it("renders with existing chat", async () => {
    render(<ChatContent />);

    await waitFor(() => {
      expect(screen.getByTestId("mock-chat-messages")).toBeInTheDocument();
      expect(screen.getByTestId("mock-chat-input")).toBeInTheDocument();
    });

    expect(mockFetchChatData).toHaveBeenCalledWith("test-chat-id");
    expect(mockSubscribeToMessages).toHaveBeenCalled();
  });

  it("creates new chat when no chatId exists", async () => {
    render(<ChatContent />);

    await waitFor(() => {
      expect(mockCreateChat).toHaveBeenCalledWith(["user1", "user2"]);
      expect(mockSetChatId).toHaveBeenCalledWith("new-chat-id");
    });
  });

  it("handles sending text messages", async () => {
    render(<ChatContent />);

    await waitFor(() => {
      const sendButton = screen.getByText("Send");
      userEvent.click(sendButton);

      expect(mockSendMessage).toHaveBeenCalledWith(
        "test-chat-id",
        expect.objectContaining({
          content: { text: "test message" },
        }),
        expect.any(Function),
      );
    });
  });

  it("handles sending file messages", async () => {
    render(<ChatContent />);

    await waitFor(() => {
      const sendFileButton = screen.getByText("Send File");
      userEvent.click(sendFileButton);

      expect(mockSendMessage).toHaveBeenCalledWith(
        "test-chat-id",
        expect.objectContaining({
          content: { text: expect.any(File) },
        }),
        expect.any(Function),
      );
    });
  });

  it("handles typing events", async () => {
    render(<ChatContent />);

    await waitFor(() => {
      expect(mockTyping).toHaveBeenCalled();
      expect(mockStopTyping).toHaveBeenCalled();
    });
  });

  it("cleans up on unmount", async () => {
    const { unmount } = render(<ChatContent />);

    await waitFor(() => {
      expect(mockSubscribeToMessages).toHaveBeenCalled();
    });

    unmount();

    expect(mockUnsubscribeFromMessages).toHaveBeenCalledWith("test-chat-id");
  });
});
