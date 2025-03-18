import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "../../../test/setupTests";
import ChatProvider from "../../context/ChatsIdProvider";
import FloatingChatSystem from "../../components/chat/FloatingChat/FloatingChatSystem";
import { UserProvider } from "../../components/chat/mockUse";
import { expect, it, describe } from "vitest";

describe("FloatingChatSystem \n", () => {
  it("Should RenderChatSystem", () => {
    const { container } = render(
      <UserProvider userId={"0"}>
        <ChatProvider>
          <FloatingChatSystem />
        </ChatProvider>
      </UserProvider>,
    );
    expect(container).toMatchSnapshot();
  });
  it("fetches and displays chat cards with correct data", async () => {
    render(
      <UserProvider userId={"4"}>
        <ChatProvider>
          <FloatingChatSystem />
        </ChatProvider>
      </UserProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Mohaned")).toBeInTheDocument();
      expect(
        screen.getByText("Sounds good! See you then."),
      ).toBeInTheDocument();
      expect(screen.getByText("Michael")).toBeInTheDocument();
      expect(screen.getByText("Happy birthday bro!")).toBeInTheDocument();
    });
  });
  describe("Clicks on a certain chat card\n", () => {
    it("Renders Flaoting chat window", async () => {
      render(
        <UserProvider userId={"4"}>
          <ChatProvider>
            <FloatingChatSystem />
          </ChatProvider>
        </UserProvider>,
      );
      const mohanedCard = await screen.findByText("Mohaned");
      await userEvent.click(mohanedCard);
      expect(screen.getByTestId("test-floatingWindow")).toBeInTheDocument();
    });

    it("Should displays messages correctly", async () => {
      render(
        <UserProvider userId={"4"}>
          <ChatProvider>
            <FloatingChatSystem />
          </ChatProvider>
        </UserProvider>,
      );

      const mohanedCard = await screen.findByText("Mohaned");
      expect(mohanedCard).toBeInTheDocument();

      const michaelCard = await screen.findByText("Michael");
      expect(michaelCard).toBeInTheDocument();

      await userEvent.click(mohanedCard);

      const mohanedMessage = await screen.findByTestId("1-1633024800000");
      expect(mohanedMessage).toBeInTheDocument();
      expect(mohanedMessage).toHaveTextContent("Mohaned");
      expect(mohanedMessage).toHaveTextContent("Hey John!");

      const johnMessage = await screen.findByTestId("4-1633024800001");
      expect(johnMessage).toBeInTheDocument();
      expect(johnMessage).toHaveTextContent("John");
      expect(johnMessage).toHaveTextContent("Hey Mohaned!");
    });
  });
});
