import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { BrowserRouter, Link } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import PostCreate from "./PostCreate";
import { createPost } from "../../api/api";

vi.mock("../../api/api", () => ({
  createPost: vi.fn().mockResolvedValue({}),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

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

    expect(createPost).toHaveBeenCalledWith("Test post");
    expect(mockNavigate).toHaveBeenCalledWith("/post");
  });
});
