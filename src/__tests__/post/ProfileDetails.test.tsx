import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import PostHeader from "../../components/Posts/PostHeader";
import "@testing-library/jest-dom/vitest";

describe("ProfileDetails", () => {
  const props = {
    id: "1",
    name: "John Doe",
    headline: "Software Engineer",
    profilePicture: "https://example.com/profile.jpg",
    isFollowing: false,
  };

  beforeEach(() => {
    render(<PostHeader {...props} />);
  });

  afterEach(() => {
    cleanup();
  });

  it("should render profile details correctly", () => {
    expect(screen.getByAltText(props.name)).toBeInTheDocument();
    expect(screen.getByText(props.name)).toBeInTheDocument();
    expect(screen.getByText(props.headline)).toBeInTheDocument();
    expect(screen.getByText("Follow")).toBeInTheDocument();
  });

  it("should toggle follow state on click", async () => {
    const followButton = screen.getByText("Follow");
    await userEvent.click(followButton);

    expect(screen.getByText("Followed")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Followed"));

    expect(screen.getByText("Follow")).toBeInTheDocument();
  });
});
