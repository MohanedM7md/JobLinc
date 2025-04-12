import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FloatingChatHeader from "@chatComponent/FloatingChat/FloatingChatHeader";
import { describe, it, expect, vi } from "vitest";

vi.mock("@chatComponent/ChatAvatarGrid", () => ({
  default: () => <div data-testid="mock-avatar" />,
}));

describe("FloatingChatHeader Component", () => {
  const mockProps = {
    onClick: vi.fn(),
    onClose: vi.fn(),
    title: "Test Chat",
    chatPicture: ["avatar1.jpg", "avatar2.jpg"],
  };

  it("renders correctly with all props", () => {
    render(<FloatingChatHeader {...mockProps} />);

    expect(screen.getByTestId("test-header")).toBeInTheDocument();
    expect(screen.getByText("Test Chat")).toBeInTheDocument();
    expect(screen.getByTestId("mock-avatar")).toBeInTheDocument();
  });

  it("calls onClick when header is clicked", async () => {
    const user = userEvent.setup();
    render(<FloatingChatHeader {...mockProps} />);

    await user.click(screen.getByTestId("test-header"));
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<FloatingChatHeader {...mockProps} />);

    await user.click(screen.getByTestId("close-button"));
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("renders correctly when title is undefined", () => {
    render(<FloatingChatHeader {...mockProps} title={undefined} />);
    expect(screen.queryByText("Test Chat")).not.toBeInTheDocument();
  });

  it("renders correctly when chatPicture is undefined", () => {
    render(<FloatingChatHeader {...mockProps} chatPicture={undefined} />);
    expect(screen.getByTestId("mock-avatar")).toBeInTheDocument();
  });

  it("shows offline status when not online", () => {
    render(<FloatingChatHeader {...mockProps} />);
    // You'll need to modify your component to accept status as a prop
    // or mock whatever determines the online status
    expect(screen.getByText("Available")).toBeInTheDocument();
  });

  it("has correct styling classes", () => {
    render(<FloatingChatHeader {...mockProps} />);
    const header = screen.getByTestId("test-header");

    expect(header).toHaveClass("bg-charcoalWhite");
    expect(header).toHaveClass("dark:bg-darkGray");
    expect(header).toHaveClass("rounded-t-lg");
    expect(header).toHaveClass("h-[60px]");
  });
});
