import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FloatingChatWindow from "../../components/chat/FloatingChat/FloatingChatWindow";
import { ChatIdProvider } from "../../context/ChatIdProvider";
import { expect, it, vi, describe, beforeEach } from "vitest";
// In your test setup file or at the top of your test file
vi.mock("@chatComponent/FloatingChatHeader", () => ({
  default: () => <div data-testid="mock-FloatingChatHeader" />,
}));
vi.mock("@chatComponent/ChatContent", () => ({
  default: () => <div data-testid="mock-ChatContent" />,
}));

const mockSetOpenedChatsId = vi.fn();
vi.mock("@hooks/useChats", () => ({
  default: () => ({
    opnedChats: [
      {
        chatId: "chat1",
        usersId: ["user1", "user2"],
        chatName: "Test Chat",
        chatImage: ["test.jpg"],
      },
    ],
    setOpnedChats: vi.fn(),
  }),
}));

describe("FloatingChatWindow Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders FloatingChatWindow", () => {
    render(
      <ChatIdProvider key={"chat-1"} id={"chat-1"}>
        <FloatingChatWindow
          key={"chat-1"}
          chatName={"chatName"}
          chatPicture={["chatImage.jpg"]}
        />
      </ChatIdProvider>,
    );

    expect(screen.getByTestId("test-floatingWindow")).toBeInTheDocument();
  });

  it("toggles visibility when header is clicked", async () => {
    render(
      <ChatIdProvider key={"chat-1"} id={"chat-1"}>
        <FloatingChatWindow
          key={"chat-1"}
          chatName={"chatName"}
          chatPicture={["chatImage.jpg"]}
        />
      </ChatIdProvider>,
    );

    const floatingWindow = screen.getByTestId("test-floatingWindow");

    expect(floatingWindow).not.toHaveClass(/translate-y-\[calc\(100%-60px\)\]/);
  });

  it("calls CloseChat when onClose is triggered", async () => {
    render(
      <ChatIdProvider key={"chat-1"} id={"chat-1"}>
        <FloatingChatWindow
          key={"chat-1"}
          chatName={"chatName"}
          chatPicture={["chatImage.jpg"]}
        />
      </ChatIdProvider>,
    );
  });
});
