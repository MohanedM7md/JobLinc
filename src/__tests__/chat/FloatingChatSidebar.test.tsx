import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatProvider from "../../context/ChatsIdProvider";
import FloatingChatSidebar from "../../components/chat/FloatingChat/FloatingChatSidebar";
import { UserProvider } from "../../components/chat/mockUse";
import { expect, test, describe, beforeEach } from "vitest";

describe("FloatingChatSidebar", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders FloatingChatSidebar correctly", () => {
    render(
      <UserProvider userId={"0"}>
        <ChatProvider>
          <FloatingChatSidebar />
        </ChatProvider>
      </UserProvider>,
    );
    expect(screen.getByText("Messaging")).toBeInTheDocument();
  });
  test("renders searchbar UI", () => {
    render(
      <UserProvider userId={"4"}>
        <ChatProvider>
          <FloatingChatSidebar />
        </ChatProvider>
      </UserProvider>,
    );
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });
  test("renders filter UI", () => {
    render(
      <UserProvider userId={"0"}>
        <ChatProvider>
          <FloatingChatSidebar />
        </ChatProvider>
      </UserProvider>,
    );
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(screen.getByTestId("test-search-icon")).toBeInTheDocument();
    expect(screen.getByTestId("test-filter-icon")).toBeInTheDocument();
  });
  test("should toggle sidebar when header is clicked", async () => {
    render(
      <UserProvider userId={"4"}>
        <ChatProvider>
          <FloatingChatSidebar />
        </ChatProvider>
      </UserProvider>,
    );

    const header = screen.getByText("Messaging");
    await userEvent.click(header);
    expect(localStorage.getItem("chatSidebarActive")).toBe("true");
    await userEvent.click(header);
    expect(localStorage.getItem("chatSidebarActive")).toBe("false");
  });
});
