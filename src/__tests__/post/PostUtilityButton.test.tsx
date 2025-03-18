import { render, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import PostUtilityButton from "../../components/Posts/PostUtilityButton";
import { PostInterface } from "../../interfaces/postInterfaces";
import "@testing-library/jest-dom/vitest";

describe("PostUtilityButton", () => {
  let mockDelete: () => void;
  let mockPost: PostInterface;

  beforeEach(() => {
    mockDelete = vi.fn();
    mockPost = {
      postID: "1",
      userID: "1",
      firstName: "John",
      lastName: "Doe",
      headline: "Software Engineer",
      profilePicture: "https://example.com/profile.jpg",
      text: "This is a post",
      pics: [],
      likes: 10,
      commentsNum: 5,
      reposts: 2,
    };
    render(<PostUtilityButton delete={mockDelete} post={mockPost} />);
  });

  afterEach(() => {
    cleanup();
  });

  it("should render Edit and Delete buttons", () => {
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("should call delete function when Delete button is clicked", async () => {
    const deleteButton = screen.getByText("Delete");
    await userEvent.click(deleteButton);
    expect(mockDelete).toHaveBeenCalled();
  });
});
