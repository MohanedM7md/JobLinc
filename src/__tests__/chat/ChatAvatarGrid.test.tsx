// ChatAvatarGrid.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ChatAvatarGrid from "@chatComponent/ChatAvatarGrid";

describe("ChatAvatarGrid Component", () => {
  const mockChatName = "Test Group Chat";

  it("should render nothing when chatPicture is empty array", () => {
    const { container } = render(
      <ChatAvatarGrid chatPicture={[]} chatName={mockChatName} />,
    );
    expect(container.firstChild?.firstChild).toBeNull();
  });

  it("should render single avatar correctly", () => {
    const singleImage = ["https://example.com/avatar1.jpg"];
    render(
      <ChatAvatarGrid chatPicture={singleImage} chatName={mockChatName} />,
    );

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(1);
    expect(images[0]).toHaveAttribute("src", singleImage[0]);
    expect(images[0]).toHaveAttribute("alt", mockChatName);
    expect(screen.queryByText(/\+/)).toBeNull();
  });

  it("should render two avatars with 2-column grid", () => {
    const twoImages = [
      "https://example.com/avatar1.jpg",
      "https://example.com/avatar2.jpg",
    ];
    const { container } = render(
      <ChatAvatarGrid chatPicture={twoImages} chatName={mockChatName} />,
    );

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    expect(container.firstChild).toHaveClass("grid-cols-2");
  });

  it("should render three avatars with 3-column grid", () => {
    const threeImages = [
      "https://example.com/avatar1.jpg",
      "https://example.com/avatar2.jpg",
      "https://example.com/avatar3.jpg",
    ];
    const { container } = render(
      <ChatAvatarGrid chatPicture={threeImages} chatName={mockChatName} />,
    );

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(3);
    expect(container.firstChild).toHaveClass("grid-cols-3");
  });

  it("should render first two avatars and count for four images", () => {
    const fourImages = [
      "https://example.com/avatar1.jpg",
      "https://example.com/avatar2.jpg",
      "https://example.com/avatar3.jpg",
      "https://example.com/avatar4.jpg",
    ];
    render(<ChatAvatarGrid chatPicture={fourImages} chatName={mockChatName} />);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    expect(screen.getByText("+2")).toBeInTheDocument();
  });

  it("should render first two avatars and correct count for more than four images", () => {
    const manyImages = [
      "https://example.com/avatar1.jpg",
      "https://example.com/avatar2.jpg",
      "https://example.com/avatar3.jpg",
      "https://example.com/avatar4.jpg",
      "https://example.com/avatar5.jpg",
    ];
    render(<ChatAvatarGrid chatPicture={manyImages} chatName={mockChatName} />);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    expect(screen.getByText("+3")).toBeInTheDocument();
  });

  it("should apply rounded-full class to images", () => {
    const singleImage = ["https://example.com/avatar1.jpg"];
    render(
      <ChatAvatarGrid chatPicture={singleImage} chatName={mockChatName} />,
    );

    const image = screen.getByRole("img");
    expect(image).toHaveClass("rounded-full");
  });
});
