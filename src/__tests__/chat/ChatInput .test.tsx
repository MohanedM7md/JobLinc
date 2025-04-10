import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatInput from "@chatComponent/ChatInput";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { Paperclip, Image, Smile } from "lucide-react";

// Mock Lucide icons
vi.mock("lucide-react", () => ({
  Paperclip: () => <div data-testid="paperclip-icon" />,
  Image: () => <div data-testid="image-icon" />,
  Smile: () => <div data-testid="smile-icon" />,
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
    expect(screen.getByText("Send")).toBeInTheDocument();
  });

  it("handles text input and typing state", async () => {
    render(<ChatInput {...defaultProps} />);
    const textarea = screen.getByPlaceholderText("Write a message...");

    // Test typing
    await userEvent.type(textarea, "Hello");
    expect(textarea).toHaveValue("Hello");
    expect(mockTypingMessage).toHaveBeenCalledWith(true);

    // Test clearing
    await userEvent.clear(textarea);
    expect(mockTypingMessage).toHaveBeenCalledWith(false);
  });

  it("sends text message when Send button is clicked", async () => {
    render(<ChatInput {...defaultProps} />);
    const textarea = screen.getByPlaceholderText("Write a message...");
    const sendButton = screen.getByText("Send");

    await userEvent.type(textarea, "Test message");
    await userEvent.click(sendButton);

    expect(mockSendMessage).toHaveBeenCalledWith("Test message", "text");
    expect(textarea).toHaveValue("");
  });

  it("does not send empty message", async () => {
    render(<ChatInput {...defaultProps} />);
    const sendButton = screen.getByText("Send");

    await userEvent.click(sendButton);
    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  it("sends media files when Send button is clicked", async () => {
    render(<ChatInput {...defaultProps} />);
    const fileInput = screen.getByTestId("file-input");
    const file = new File(["test"], "test.png", { type: "image/png" });
    const sendButton = screen.getByText("Send");

    fireEvent.change(fileInput, { target: { files: [file] } });
    await userEvent.click(sendButton);

    expect(mockSendMessage).toHaveBeenCalledWith(file, "media");
  });

  it("disables send button when no content", () => {
    render(<ChatInput {...defaultProps} />);
    const sendButton = screen.getByText("Send");

    expect(sendButton).toBeDisabled();
    expect(sendButton).toHaveClass("cursor-not-allowed");
  });

  it("enables send button when text is entered", async () => {
    render(<ChatInput {...defaultProps} />);
    const textarea = screen.getByPlaceholderText("Write a message...");
    const sendButton = screen.getByText("Send");

    await userEvent.type(textarea, "Test");
    expect(sendButton).not.toBeDisabled();
    expect(sendButton).toHaveClass("bg-crimsonRed");
  });

  it("shows focus ring when focused", async () => {
    render(<ChatInput {...defaultProps} />);
    const textarea = screen.getByPlaceholderText("Write a message...");

    fireEvent.focus(textarea);
    expect(textarea).toHaveClass("ring-2 ring-crimsonRed");

    fireEvent.blur(textarea);
    expect(textarea).toHaveClass("ring-1 ring-gray-400");
  });

  it("triggers file input when attachment button is clicked", async () => {
    render(<ChatInput {...defaultProps} />);
    const fileButton = screen.getByTestId("attach-button");
    const fileInput = screen.getByTestId("file-input");
    const clickSpy = vi.spyOn(fileInput, "click");

    await userEvent.click(fileButton);
    expect(clickSpy).toHaveBeenCalled();
  });
});
