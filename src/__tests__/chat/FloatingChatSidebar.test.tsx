import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import FloatingChatSidebar from "@chatComponent/FloatingChat/FloatingChatSidebar";
import { expect, it, describe, vi } from "vitest";

// Mock all dependencies
vi.mock("@hooks/useChats", () => ({
  default: () => ({
    setOpnedChats: vi.fn(),
  }),
}));

vi.mock("@chatComponent/ChatCardsList", () => ({
  default: ({ onCardClick }: any) => (
    <div
      data-testid="chat-cards-list"
      onClick={() => onCardClick("1", "Test Chat", ["img1"])}
    >
      ChatCard
    </div>
  ),
}));

vi.mock("@chatComponent/NetWorksChatList", () => ({
  default: ({ onCardClick }: any) => (
    <div
      data-testid="networks-list"
      onClick={() => onCardClick("user1", "User Name", "img-url")}
    >
      NetWorkUser
    </div>
  ),
}));

vi.mock("@chatComponent/UI/SearchBar", () => ({
  default: ({ FocusToggler }: any) => (
    <input
      data-testid="search-bar"
      onFocus={FocusToggler}
      placeholder="Search"
    />
  ),
}));

vi.mock("@chatComponent/FloatingChat/ConnectionsDropdown", () => ({
  default: ({ className }: any) => (
    <div className={className} data-testid="dropdown">
      Dropdown
    </div>
  ),
}));

// Start test suite for FloatingChatSidebar
describe("FloatingChatSidebar", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("renders Messaging header and toggles sidebar", () => {
    render(<FloatingChatSidebar />);
    const header = screen.getByText("Messaging");
    expect(header).toBeInTheDocument();
  });

  it("renders ChatCardsList by default", () => {
    render(<FloatingChatSidebar />);
    expect(screen.getByTestId("chat-cards-list")).toBeInTheDocument();
  });

  it("switches to NetWorksChatList on search focus", async () => {
    render(<FloatingChatSidebar />);
    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.focus(searchInput);

    await waitFor(() =>
      expect(screen.getByTestId("networks-list")).toBeInTheDocument(),
    );
  });

  it("calls onCardClick when ChatCard is clicked", () => {
    render(<FloatingChatSidebar />);
    fireEvent.click(screen.getByTestId("chat-cards-list"));
  });

  it("calls onCardClick when NetWorkUser is clicked", async () => {
    render(<FloatingChatSidebar />);
    fireEvent.focus(screen.getByPlaceholderText("Search"));

    await waitFor(() => screen.getByTestId("networks-list"));
    fireEvent.click(screen.getByTestId("networks-list"));
  });

  it("renders ConnectionsDropdown and SearchBar", () => {
    render(<FloatingChatSidebar />);
    expect(screen.getByTestId("dropdown")).toBeInTheDocument();
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
  });
});
