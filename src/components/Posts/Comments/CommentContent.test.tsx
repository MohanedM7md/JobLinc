import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import CommentContent from "./CommentContent";
import "@testing-library/jest-dom/vitest";

describe("CommentContent", () => {
  const commentText = "This is a test comment";

  beforeEach(() => {
    render(<CommentContent commentText={commentText} />);
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the comment text", () => {
    expect(screen.getByText(commentText)).toBeInTheDocument();
  });
});
