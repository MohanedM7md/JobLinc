import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "../../../test/setupTests";

import PageChatSystem from "../../components/chat/PageChat/PageChatSystem";
import { UserProvider } from "../../components/chat/mockUse";
import { expect, it, describe } from "vitest";

describe("PageChatSystem ", () => {
  it("Should RenderChatSystem: ", () => {
    const { container } = render(
      <UserProvider userId="0">
        <PageChatSystem />
      </UserProvider>,
    );
    expect(container).toMatchSnapshot();
  });
  it("fetches and displays chat cards and there contents", async () => {
    render(
      <UserProvider userId="4">
        <PageChatSystem />
      </UserProvider>,
    );
    expect(screen.getByText("Messaging")).toBeInTheDocument();
    await waitFor(
      () => (
        expect(screen.getByText("Mohaned")).toBeInTheDocument(),
        expect(
          screen.getByText("Sounds good! See you then."),
        ).toBeInTheDocument(),
        expect(screen.getByText("Michael")).toBeInTheDocument(),
        expect(screen.getByText("Happy birthday bro!")).toBeInTheDocument(),
        expect(
          screen.getByText("Choose a chat to start messaging"),
        ).toBeInTheDocument()
      ),
    );
  });
  describe("Clicks on a chat card", () => {
    it("Should display page chat window", async () => {
      render(
        <UserProvider userId="4">
          <PageChatSystem />
        </UserProvider>,
      );

      const mohanedCard = await screen.findByText("Mohaned");
      expect(mohanedCard).toBeInTheDocument();
      await userEvent.click(mohanedCard);

      const chatWindow = await screen.findByTestId("test-PageWindow");
      expect(chatWindow).toBeInTheDocument();
    });

    it("Should displays messages correctly", async () => {
      render(
        <UserProvider userId="4">
          <PageChatSystem />
        </UserProvider>,
      );

      const mohanedCard = await screen.findByText("Mohaned");
      expect(mohanedCard).toBeInTheDocument();
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
