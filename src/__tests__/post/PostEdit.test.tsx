import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import PostEdit from "../../components/Posts/PostEdit";
import { MemoryRouter, Route, Routes} from "react-router-dom";

describe("PostEdit", () => {
   const mockLocation = {
     state: {
       postID: "0",
       postText: "Initial text",
     },
   };
  beforeEach(() => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/edit", state: mockLocation.state }]}
      >
        <Routes>
          <Route path="/edit" element={<PostEdit />} />
        </Routes>
      </MemoryRouter>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("renders correctly with initial text", () => {
    expect(screen.getByText("Edit Post")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Initial text")).toBeInTheDocument();
  });

  it("updates text on change", async () => {
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    await userEvent.clear(textarea);
    await userEvent.type(textarea, "Updated text");
    expect(textarea.value).toBe("Updated text");
  });
});
