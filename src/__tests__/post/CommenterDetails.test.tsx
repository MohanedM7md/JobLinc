import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import CommenterDetails from "../../components/Posts/Comments/CommenterDetails";
import "@testing-library/jest-dom/vitest";

describe("CommenterDetails", () => {
  const props = {
    userID: "123",
    name: "John Doe",
    profilePicture: "https://example.com/profile.jpg",
    headline: "Software Engineer",
  };

  beforeEach(() => {
    render(<CommenterDetails {...props} />);
  });

  afterEach(() => {
    cleanup();
  });

  it("should render the commenter details correctly", () => {
    const profileImage = screen.getByAltText(props.name);
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute("src", props.profilePicture);

    const nameElement = screen.getByText(props.name);
    expect(nameElement).toBeInTheDocument();

    const headlineElement = screen.getByText(props.headline);
    expect(headlineElement).toBeInTheDocument();
  });
});
