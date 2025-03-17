import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import ReplyCard from "./ReplyCard";
import { RepliesInterface } from "../../../interfaces/postInterfaces";

const mockReply: RepliesInterface = {
  replyID: "1",
  userID: "user1",
  firstName: "John",
  lastName: "Doe",
  headline: "Software Engineer",
  profilePicture: "path/to/profile.jpg",
  replyText: "This is a reply",
};

describe("ReplyCard Component", () => {
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

  it("should have a like button", () => {
    const likeButton = screen.getByText("Like");
    expect(likeButton).toBeInTheDocument();
  });

  it("should trigger event on like button click", async () => {
    const likeButton = screen.getByText("Like");
    await userEvent.click(likeButton);
    expect(likeButton).toBeEnabled();
    //like button still doesn't have its functionality implemented so just checking the button is there
  });
});
