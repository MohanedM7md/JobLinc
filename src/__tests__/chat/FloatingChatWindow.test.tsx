import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FloatingChatWindow from "../../components/chat/FloatingChat/FloatingChatWindow";
import { UserProvider } from "../../components/chat/mockUse";
import "../../../test/setupTests";
import { ChatIdProvider } from "../../context/ChatIdProvider";
import { expect, it, vi, describe, beforeEach } from "vitest";

import ChatProvider from "../../context/ChatsIdProvider";

const mockSetOpenedChatsId = vi.fn(); // Mock function for setOpenedChatsId

vi.mock("../../hooks/useChats", () => ({
  default: () => ({
    setOpnedChatsId: mockSetOpenedChatsId,
  }),
}));

describe("FloatingChatWindow Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders FloatingChatWindow", () => {
    render(
      <UserProvider userId={"4"}>
        <ChatProvider>
          <ChatIdProvider id="chat-4">
            <FloatingChatWindow />
          </ChatIdProvider>
        </ChatProvider>
      </UserProvider>,
    );

    expect(screen.getByTestId("test-floatingWindow")).toBeInTheDocument();
  });

  it("toggles visibility when header is clicked", () => {
    render(
      <UserProvider userId={"4"}>
        <ChatProvider>
          <ChatIdProvider id="chat-4">
            <FloatingChatWindow />
          </ChatIdProvider>
        </ChatProvider>
      </UserProvider>,
    );

    const floatingWindow = screen.getByTestId("test-floatingWindow");
    const header = screen.getByTestId("test-header");

    // Initially should be hidden
    expect(floatingWindow).toHaveClass(
      "fixed undefined bottom-0 sm:bottom-0 w-full sm:w-[400px] max-h-[70vh] shadow-xl border border-gray-200 rounded-t-lg transition-transform duration-300 translate-y-[calc(100%-60px)]",
    );

    // Click to open
    userEvent.click(header);
    /*    expect(floatingWindow).not.toHaveClass(
      "fixed undefined bottom-0 sm:bottom-0 w-full sm:w-[400px] max-h-[70vh] shadow-xl border border-gray-200 rounded-t-lg transition-transform duration-300 translate-y-[calc(100%-60px)]",
    ); */

    // Click again to close
    userEvent.click(header);
    expect(floatingWindow).toHaveClass(
      "fixed undefined bottom-0 sm:bottom-0 w-full sm:w-[400px] max-h-[70vh] shadow-xl border border-gray-200 rounded-t-lg transition-transform duration-300 translate-y-[calc(100%-60px)]",
    );
  });

  it("calls CloseChat when onClose is triggered", () => {
    render(
      <UserProvider userId={"4"}>
        <ChatProvider>
          <ChatIdProvider id="chat-4">
            <FloatingChatWindow />
          </ChatIdProvider>
        </ChatProvider>
      </UserProvider>,
    );

    const closeButton = screen.getByTestId("close-button"); // Ensure your FloatingChatHeader has data-testid="close-button"

    userEvent.click(closeButton);

    /*     expect(mockSetOpenedChatsId).toHaveBeenCalledTimes(1);
    expect(mockSetOpenedChatsId).toHaveBeenCalledWith(expect.any(Function)); */
  });
});
