import { render, screen, cleanup, queryByText } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import PostCard from "./PostCard";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

const mockPost = {
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

describe("PostCard", () => {
  beforeEach(() => {
    render(
      <Router>
        <PostCard post={mockPost} />
      </Router>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("renders profile and post details", () => {
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("This is a post")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("registers a like", async () => {
    const likeButton = screen.getByText("Like");
    await userEvent.click(likeButton);
    expect(screen.getByText("Liked")).toBeInTheDocument();
  });

  it("shows and hides comments section", async () => {
    const commentButton = screen.getByText("Comment");
    await userEvent.click(commentButton);
    expect(
      screen.getByPlaceholderText("Write a comment..."),
    ).toBeInTheDocument();

    await userEvent.click(commentButton);
    expect(
      screen.queryByPlaceholderText("Write a comment..."),
    ).not.toBeInTheDocument();
  });

  it("calls delete post function", async () => {
    const moreButton = screen.getByText("more_horiz");
    await userEvent.click(moreButton);

    const deleteButton = screen.getByText("Delete");
    await userEvent.click(deleteButton);
    window.history.pushState({}, "Test page", "/post");
    expect(screen.queryByText("John")).toBeNull();
  });
});
