import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import PostCreate from "../components/Posts//PostCreate";



describe("PostCreate Component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <PostCreate />
      </BrowserRouter>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("renders correctly", () => {
    expect(screen.getByText("Create a new Post")).toBeInTheDocument();
    expect(screen.getByLabelText("Enter your text here:")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("submits a new post", async () => {
    const textarea = screen.getByLabelText("Enter your text here:");
    await userEvent.type(textarea, "Test post");

    const submitButton = screen.getByText("Submit");
    await userEvent.click(submitButton);

    expect(screen.getByText("Test post")).toBeInTheDocument();
  });
});
