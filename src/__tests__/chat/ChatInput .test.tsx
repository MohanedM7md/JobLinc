import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatInput from "@chatComponent/ChatInput";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { Paperclip, Image, Smile, X, Loader2 } from "lucide-react";

// Mock Lucide icons
vi.mock("lucide-react", () => ({
  Paperclip: () => <div data-testid="paperclip-icon" />,
  Image: () => <div data-testid="image-icon" />,
  Smile: () => <div data-testid="smile-icon" />,
  X: () => <div data-testid="x-icon" />,
  Loader2: () => <div data-testid="loader-icon" />,
}));

// Mock uploadingMedia API service
vi.mock("@services/api/chatServices", () => ({
  uploadingMedia: vi.fn().mockResolvedValue("https://example.com/upload-url"),
}));

describe("ChatInput Component", () => {
  const mockSendMessage = vi.fn();
  const mockTypingMessage = vi.fn();
  const defaultProps = {
    chatId: "test-chat-id",
    onSendMessage: mockSendMessage,
    onTypingMessage: mockTypingMessage,
    className: "",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<ChatInput {...defaultProps} />);

    expect(
      screen.getByPlaceholderText("Write a message..."),
    ).toBeInTheDocument();
    expect(screen.getByTestId("paperclip-icon")).toBeInTheDocument();
    expect(screen.getByTestId("image-icon")).toBeInTheDocument();
    expect(screen.getByTestId("smile-icon")).toBeInTheDocument();
    expect(screen.getByText("➤")).toBeInTheDocument();
  });

  it("handles text input and typing state", async () => {
    render(
      <ChatInput
        {...defaultProps}
        onTypingMessage={mockTypingMessage} // Pass the spy to the component
      />,
    );
    const textarea = screen.getByPlaceholderText("Write a message...");

    await userEvent.type(textarea, "Hello");
    screen.debug();
    expect(textarea).toHaveValue("Hello");
    fireEvent.focus(textarea);
    expect(mockTypingMessage).toHaveBeenCalledWith(true);

    await userEvent.clear(textarea);
    expect(mockTypingMessage).toHaveBeenCalledWith(false);
  });

  it("sends text message when Send button is clicked", async () => {
    render(<ChatInput {...defaultProps} />);
    const textarea = screen.getByPlaceholderText("Write a message...");
    const sendButton = screen.getByText("➤"); // Changed from "Send" to arrow symbol

    await userEvent.type(textarea, "Test message");
    await userEvent.click(sendButton);

    expect(mockSendMessage).toHaveBeenCalledWith("Test message", "text");
    expect(textarea).toHaveValue("");
  });

  it("does not send empty message", async () => {
    render(<ChatInput {...defaultProps} />);
    const sendButton = screen.getByText("➤"); // Changed from "Send" to arrow symbol

    await userEvent.click(sendButton);
    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  it("sends media files when Send button is clicked", async () => {
    render(<ChatInput {...defaultProps} />);

    // Get the hidden file input
    const fileInput = screen
      .getByRole("textbox")
      .parentElement?.querySelector('input[type="file"]');
    expect(fileInput).not.toBeNull();

    const file = new File(["test"], "test.png", { type: "image/png" });
    const sendButton = screen.getByText("➤"); // Changed from "Send" to arrow symbol

    if (fileInput) {
      fireEvent.change(fileInput, { target: { files: [file] } });
    }

    await userEvent.click(sendButton);

    expect(mockSendMessage).toHaveBeenCalledWith(
      "https://example.com/upload-url",
      "image",
    );
  });

  it("disables send button when no content", () => {
    render(<ChatInput {...defaultProps} />);
    const sendButton = screen.getByText("➤"); // Changed from "Send" to arrow symbol

    expect(sendButton).toBeDisabled();
    expect(sendButton.closest("button")).toHaveClass("cursor-not-allowed");
  });

  it("enables send button when text is entered", async () => {
    render(<ChatInput {...defaultProps} />);
    const textarea = screen.getByPlaceholderText("Write a message...");
    const sendButton = screen.getByText("➤"); // Changed from "Send" to arrow symbol

    await userEvent.type(textarea, "Test");
    expect(sendButton).not.toBeDisabled();
    expect(sendButton.closest("button")).toHaveClass("bg-crimsonRed");
  });

  it("shows focus ring when focused", async () => {
    render(<ChatInput {...defaultProps} />);
    const textarea = screen.getByPlaceholderText("Write a message...");

    fireEvent.focus(textarea);
    expect(textarea).toHaveClass("ring-2 ring-crimsonRed");

    fireEvent.blur(textarea);
    expect(textarea).toHaveClass("ring-1 ring-gray-300"); // Changed from ring-gray-400 to ring-gray-300
  });

  it("triggers file input when attachment button is clicked", async () => {
    render(<ChatInput {...defaultProps} />);

    // Find the paperclip button (first one in the toolbar)
    const fileButtons = screen.getAllByTestId("paperclip-icon");
    const attachButton = fileButtons[0].closest("button");

    // Find the hidden file input
    const fileInput = screen
      .getByRole("textbox")
      .parentElement?.querySelector('input[type="file"]');
    expect(fileInput).not.toBeNull();

    if (fileInput) {
      const clickSpy = vi.spyOn(HTMLInputElement.prototype, "click");

      // Click the attachment button
      await userEvent.click(attachButton!);

      expect(clickSpy).toHaveBeenCalled();
    }
  });

  it("displays file information when file is selected", async () => {
    render(<ChatInput {...defaultProps} />);
    const fileInput = screen
      .getByRole("textbox")
      .parentElement?.querySelector('input[type="file"]');
    expect(fileInput).not.toBeNull();

    const file = new File(["test"], "test.png", { type: "image/png" });

    if (fileInput) {
      fireEvent.change(fileInput, { target: { files: [file] } });
    }

    expect(screen.getByText(/test.png/)).toBeInTheDocument();

    const removeButton = screen.getByTestId("x-icon").closest("button");
    await userEvent.click(removeButton!);

    expect(screen.queryByText(/test.png/)).not.toBeInTheDocument();
  });
});
