import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import ReplyCard from "../../components/Posts/Replies/ReplyCard";
import { RepliesInterface } from "../../interfaces/postInterfaces";

const mockReply: RepliesInterface = {
  replyId: "1",
  postId: "0",
  commentId: "0",
  userId: "user1",
  firstname: "John",
  lastname: "Doe",
  headline: "Software Engineer",
  profilePicture: "path/to/profile.jpg",
  replyText: "This is a reply",
};

describe("ReplyCard", () => {
  beforeEach(() => {
    render(<ReplyCard reply={mockReply} />);
  });

  afterEach(() => {
    cleanup();
  });

  it("should render commenter details and comment content", () => {
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("This is a reply")).toBeInTheDocument();
  });

  it("registers a like", async () => {
    const likeButton = screen.getByText("Like");
    await userEvent.click(likeButton);
    expect(screen.getByText("Liked")).toBeInTheDocument();
  });
});
