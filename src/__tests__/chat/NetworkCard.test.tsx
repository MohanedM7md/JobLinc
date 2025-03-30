import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, describe, vi } from "vitest";
import NetworkCard from "@chatComponent/NetworkCard"; // Adjust the path if needed

describe("NetworkCard Component", () => {
  const mockProps = {
    userId: "123",
    chatPicture: "https://example.com/profile.jpg",
    chatName: "John Doe",
    onClick: vi.fn(),
  };

  it("renders correctly with given props", () => {
    render(<NetworkCard {...mockProps} />);

    expect(screen.getByText(mockProps.chatName)).toBeInTheDocument();

    const img = screen.getByRole("img", { name: mockProps.chatName });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockProps.chatPicture);
  });

  it("triggers onClick when clicked", async () => {
    render(<NetworkCard {...mockProps} />);

    const card = screen.getByText(mockProps.chatName);
    await userEvent.click(card);
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });
});
