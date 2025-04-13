import { render, screen } from "@testing-library/react";
import UserTypingIndicator from "@chatComponent/UserTyping";
import { expect, describe, it, vi } from "vitest";

describe("UserTypingIndicator Component", () => {
  it("renders with user image and typing dots", () => {
    const testImage = "https://example.com/user.jpg";
    render(<UserTypingIndicator userImage={testImage} />);

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", testImage);
    expect(image).toHaveClass(
      "w-4",
      "h-4",
      "rounded-full",
      "border",
      "border-gray-300",
    );

    const dots = screen.getAllByTestId("typing-dot");
    expect(dots).toHaveLength(3);

    expect(dots[0]).toHaveStyle("animation-delay: 0s");
    expect(dots[1]).toHaveStyle("animation-delay: 0.1s");
    expect(dots[2]).toHaveStyle("animation-delay: 0.2s");
  });
  it("applies animation classes correctly", () => {
    render(<UserTypingIndicator userImage="test.jpg" />);

    const dots = screen.getAllByTestId("typing-dot");
    dots.forEach((dot) => {
      expect(dot).toHaveClass("animate-bounce");
    });
  });

  it("has correct container styling", () => {
    render(<UserTypingIndicator userImage="test.jpg" />);

    const container = screen.getByTestId("typing-indicator-container");
    expect(container).toHaveClass("relative", "bg-gray-100", "ml-1");

    const innerDiv = container.firstChild;
    expect(innerDiv).toHaveClass("absolute", "left-2");
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<UserTypingIndicator userImage="test.jpg" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("includes alt text for screen readers", () => {
    render(<UserTypingIndicator userImage="test.jpg" />);
    expect(screen.getByAltText("User typing indicator")).toBeInTheDocument();
  });
});
