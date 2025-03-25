import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import PostCard from "../../components/Posts/PostCard";
import { BrowserRouter } from "react-router-dom";
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
  postId: "1",
  userId: "1",
  firstname: "John",
  lastname: "Doe",
  headline: "Software Engineer",
  profilePicture: "https://example.com/profile.jpg",
  text: "This is a post",
  pics: [],
  likes: 10,
  comments: 5,
  reposts: 2,
};

describe("PostCard", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <PostCard post={mockPost} />
      </BrowserRouter>,
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
});
