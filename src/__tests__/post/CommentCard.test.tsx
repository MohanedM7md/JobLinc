import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import CommentCard from "../../components/Posts/Comments/CommentCard";
import { CommentInterface } from "../../interfaces/postInterfaces";
import * as api from "../../services/api/postServices"
import "@testing-library/jest-dom/vitest";

vi.mock("../../services/api/postServices");

const mockComment: CommentInterface = {
  postID: "1",
  commentID: "1",
  userID: "1",
  firstName: "John",
  lastName: "Doe",
  headline: "Developer",
  profilePicture: "https://example.com/profile.jpg",
  commentText: "This is a comment",
};

describe("CommentCard", () => {
  beforeEach(() => {
    render(<CommentCard comment={mockComment} />);
  });

  afterEach(() => {
    cleanup();
  });

  it("renders component", () => {
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("This is a comment")).toBeInTheDocument();
  });

  it("registers a like", async () => {
    const likeButton = screen.getByText("Like");
    await userEvent.click(likeButton);
    expect(screen.getByText("Liked")).toBeInTheDocument();
  });

  it("shows replies when Reply button is clicked", async () => {
    const mockReplies = [
      {
        replyID: "1",
        replyText: "This is a reply",
        userID: "2",
        firstName: "Jane",
        lastName: "Doe",
        profilePicture: "https://example.com/profile2.jpg",
      },
    ];
    (api.getReplies as jest.Mock).mockResolvedValue(mockReplies);

    const replyButton = screen.getByText("Reply");
    await userEvent.click(replyButton);

    expect(api.getReplies).toHaveBeenCalledWith("1", "1");
    expect(await screen.findByText("This is a reply")).toBeInTheDocument();
  });

  it("adds a new reply", async () => {
    const mockReplies = [
      {
        replyID: "1",
        replyText: "This is a reply",
        userID: "2",
        firstName: "Jane",
        lastName: "Doe",
        profilePicture: "https://example.com/profile2.jpg",
      },
    ];
    (api.getReplies as jest.Mock).mockResolvedValue(mockReplies);
    (api.createReply as jest.Mock).mockResolvedValue({});

    const replyButton = screen.getByText("Reply");
    await userEvent.click(replyButton);

    const replyInput = screen.getByPlaceholderText("Write a reply...");
    await userEvent.type(replyInput, "New reply");
    const sendButton = screen.getByText("send");
    await userEvent.click(sendButton);

    expect(api.createReply).toHaveBeenCalledWith("1", "1", "New reply");
    expect(api.getReplies).toHaveBeenCalledWith("1", "1");
    expect(await screen.findByText("This is a reply")).toBeInTheDocument();
  });
});
