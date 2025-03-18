import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "../../../test/setupTests";

import MessageBubble from "../../components/chat/MessageBubble";
import { UserProvider } from "../../components/chat/mockUse";
import { expect, it, describe } from "vitest";

describe("MessageBubble ", () => {
  it("it should Render message bubble the custom inputs", () => {
    render(
      <UserProvider userId="2">
        <MessageBubble
          message={{
            sender: {
              userId: "user123",
              firstName: "Ahmed",
              lastName: "Ali",
              profilePicture: "https://via.placeholder.com/150",
            },
            sentDate: new Date("2015"),
            messageId: "1-1633024800000",
            content: {
              text: "Hello! How are you?",
            },
          }}
        />
      </UserProvider>,
    );
    expect(screen.getByText("Hello! How are you?")).toBeInTheDocument();
    expect(screen.getByText("Ahmed")).toBeInTheDocument();
    expect(screen.getByText("Hello! How are you?")).toBeInTheDocument();
  });
});
