import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import PostEdit from "./PostEdit";
import { BrowserRouter as Router } from "react-router-dom";

describe("PostEdit Component", () => {
  const mockPost = {
    postID: "1",
    userID: "user1",
    firstName: "John",
    lastName: "Doe",
    profilePicture: "profile.jpg",
    headline: "Software Engineer",
    text: "Initial text",
    likes: 0,
    commentsNum: 0,
    reposts: 0,
    pics: [],
  };

  beforeEach(() => {
    render(
      <Router>
        <PostEdit {...mockPost} />
      </Router>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("renders correctly with initial text", () => {
    expect(screen.getByText("Create a new Post")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Initial text")).toBeInTheDocument();
  });

  it("updates text on change", async () => {
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    await userEvent.clear(textarea);
    await userEvent.type(textarea, "Updated text");
    expect(textarea.value).toBe("Updated text");
  });

  it("submits the form on submit button click", () => {

    
    const submitButton = screen.getByText("Submit");
    userEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalled();
  });

  it("navigates to /post on cancel button click", () => {
    const cancelButton = screen.getByText("Cancel");
    userEvent.click(cancelButton);
    // Add your assertion here to check if the navigation happened
    // This might require using a mock router or checking the URL
  });
});
