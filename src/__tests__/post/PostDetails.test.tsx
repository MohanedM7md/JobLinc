import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, it, beforeEach, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import PostDetails from "../../components/Posts/PostDetails";

describe("PostDetails", () => {
  const text =
    "This is a sample post text that is long enough to be truncated.";
  const media = ["image1.jpg", "image2.jpg"];

  beforeEach(() => {
    render(<PostDetails text={text} media={media} />);
  });

  afterEach(() => {
    cleanup();
  });

  it("renders post text", () => {
    expect(screen.getByText(/This is a sample post text/)).toBeInTheDocument();
  });

  it("renders Show more button", () => {
    expect(screen.getByText("Show more")).toBeInTheDocument();
  });

  it("toggles text display on button click", async () => {
    const button = screen.getByText("Show more");
    await userEvent.click(button);
    expect(screen.getByText("Show less")).toBeInTheDocument();
  });

  it("renders PostMedia component when media is provided", () => {
    expect(screen.getByTestId("media-rendering")).toBeInTheDocument();
  });

  it("does not render PostMedia component when no media is provided", () => {
    cleanup();
    render(<PostDetails text={text} media={[]} />);
    expect(screen.queryByTestId("media-rendering")).toBeNull();
  });
});
