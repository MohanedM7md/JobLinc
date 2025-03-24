import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatProvider from "../../context/ChatsIdProvider";
import ChatContent from "@chatComponent/ChatContent";
import { UserProvider } from "../../components/chat/mockUse";
import { expect, it, describe, beforeEach } from "vitest";

describe("ChatContent", () => {
  let sendButton: HTMLButtonElement;
  let textArea: HTMLTextAreaElement;
  let container: HTMLElement;

  beforeEach(() => {
    const renderResult = render(
      <UserProvider userId={"4"}>
        <ChatProvider>
          <ChatContent />
        </ChatProvider>
      </UserProvider>,
    );

    container = renderResult.container;
    sendButton = screen.getByRole("button", { name: /send/i });
    textArea = screen.getByPlaceholderText(/write a message/i);
  });

  it("matches snapshot", () => {
    expect(container).toMatchSnapshot();
  });

  it("displays the input button and text area correctly", () => {
    expect(sendButton).toBeInTheDocument();
    expect(textArea).toBeInTheDocument();
  });

  it("sends a message and displays it correctly", async () => {
    await userEvent.type(textArea, "Hello, world!");
    await userEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText("Hello, world!")).toBeInTheDocument();
    });
  });
});
