import { render, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import PostUtilityButton from "../../components/Posts/PostUtilityButton";
import { PostInterface } from "../../interfaces/postInterfaces";
import "@testing-library/jest-dom/vitest";
import { BrowserRouter } from "react-router-dom";

describe("PostUtilityButton", () => {
  let mockDelete: () => void;
  let mockPost: PostInterface;

  beforeEach(() => {
    mockDelete = vi.fn();
    mockPost = {
      postId: "1",
      userId: "1",
      firstname: "John",
      lastname: "Doe",
      headline: "Software Engineer",
      profilePicture: "https://example.com/profile.jpg",
      companyId: null,
      companyName: null,
      companyLogo: null,
      text: "This is a post",
      time: new Date(),
      mediaURL: [],
      likes: 10,
      comments: 5,
      reposts: 2,
      repost: null,
    };
    render(
      <BrowserRouter>
        <PostUtilityButton
          delete={mockDelete}
          postId={mockPost.postId}
          postText={mockPost.text}
        />
      </BrowserRouter>,
    );
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
