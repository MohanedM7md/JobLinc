import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatProvider from "../../context/ChatsIdProvider";
import ChatContent from "@chatComponent/ChatContent";
import { UserProvider } from "../../components/chat/mockUse";
import { expect, it, describe } from "vitest";

describe("ChatContent \n", () => {
  it("Should ChatContent", () => {
    const { container } = render(
      <UserProvider userId={"4"}>
        <ChatProvider>
          <ChatContent userId="2" />
        </ChatProvider>
      </UserProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it("Should display the input button and text area correctly", async () => {
    render(
      <UserProvider userId={"4"}>
        <ChatProvider>
          <ChatContent userId="2" />
        </ChatProvider>
      </UserProvider>,
    );
    const sendButton = screen.getByRole("button", { name: /send/i });
    const textArea = screen.getByPlaceholderText(/write a message/i);
    expect(sendButton).toBeInTheDocument();
    expect(textArea).toBeInTheDocument();
  });
  it("Should Sned Message and appears correctly", async () => {
    render(
      <UserProvider userId={"4"}>
        <ChatProvider>
          <ChatContent userId="2" />
        </ChatProvider>
      </UserProvider>,
    );
    const sendButton = screen.getByRole("button", { name: /send/i });
    const textArea = screen.getByPlaceholderText(/write a message/i);
    await userEvent.type(textArea, "Hello, world!");
    await userEvent.click(sendButton);
    expect(screen.getByText("Hello, world!")).toBeInTheDocument();
  });
});
