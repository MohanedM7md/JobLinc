import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import CommenterDetails from "./CommenterDetails";
import "@testing-library/jest-dom/vitest";

describe("CommenterDetails Component", () => {
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
    // Check if the profile picture is rendered
    const profileImage = screen.getByAltText(props.name);
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute("src", props.profilePicture);

    // Check if the name is rendered
    const nameElement = screen.getByText(props.name);
    expect(nameElement).toBeInTheDocument();

    // Check if the headline is rendered
    const headlineElement = screen.getByText(props.headline);
    expect(headlineElement).toBeInTheDocument();
  });
});
