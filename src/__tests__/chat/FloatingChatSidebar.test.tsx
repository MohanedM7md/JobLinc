import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatProvider from "../../context/ChatsIdProvider";
import FloatingChatSidebar from "../../components/chat/FloatingChat/FloatingChatSidebar";
import { UserProvider } from "../../components/chat/mockUse";
import { vi, expect, test, describe, beforeEach } from "vitest";

vi.mock("@services/api/ChatSocket", () => ({
  connectToChat: vi.fn(),
  disconnectChatSocket: vi.fn(),
}));

describe("FloatingChatSidebar", () => {
  const mockHandleNetWorkUserClick = vi.fn();
  const mockHandleConversationClick = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });
  beforeAll(() => {
    render(
      <UserProvider userId={"4"}>
        <ChatProvider>
          <FloatingChatSidebar />
        </ChatProvider>
      </UserProvider>,
    );
  });
  test("renders FloatingChatSidebar correctly", () => {
    expect(screen.getByText("Messaging")).toBeInTheDocument();
  });
  it("renders the messaging header with correct elements", () => {
    expect(screen.getByAltText("User Avatar")).toBeInTheDocument();
    expect(screen.getByText("Messaging")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button").querySelector("svg")).toBeInTheDocument();
  });
});
