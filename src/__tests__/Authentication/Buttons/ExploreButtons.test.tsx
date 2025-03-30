import ExploreButtons from "../../../components/utils/ExploreButtons";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("Explore Buttons", () => {
  it("renders Explore Button", () => {
    render(
      <MemoryRouter>
        <ExploreButtons text="Show all" />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("showall")).toBeInTheDocument();
  });

  it("renders the word default if no text is given as input", () => {
    render(
      <MemoryRouter>
        <ExploreButtons />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("default")).toBeInTheDocument();
  });
});
