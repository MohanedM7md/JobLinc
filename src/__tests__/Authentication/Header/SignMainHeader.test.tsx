import SignMain from "../../../components/Authentication/SignMain";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, cleanup, waitFor, act } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("SignMain Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders successfully with navigation items", () => {
    render(
      <MemoryRouter>
        <SignMain />
      </MemoryRouter>
    );

    expect(screen.getByRole("img", { name: /logo/i })).toBeInTheDocument();
    expect(screen.getByText("Articles")).toBeInTheDocument();
    expect(screen.getByText("People")).toBeInTheDocument();
    expect(screen.getByText("Learning")).toBeInTheDocument();
    expect(screen.getByText("Jobs")).toBeInTheDocument();
    expect(screen.getByText("Games")).toBeInTheDocument();
    expect(screen.getByText("Get the app")).toBeInTheDocument();
    expect(screen.getByText("Businesses")).toBeInTheDocument();
  });

  it("checks if navigation links point to the correct routes", async () => {
    render(
      <MemoryRouter>
        <SignMain />
      </MemoryRouter>
    );

    const user = userEvent.setup();

    // Ensure elements exist before clicking
    const articlesLink = screen.getAllByText("Articles")[0].closest("a");
    const peopleLink = screen.getByText("People").closest("a");
    const learningLink = screen.getByText("Learning").closest("a");
    const jobsLink = screen.getByText("Jobs").closest("a");

    expect(articlesLink).toHaveAttribute("href", "/Home");
    expect(peopleLink).toHaveAttribute("href", "/Home");
    expect(learningLink).toHaveAttribute("href", "/Home");
    expect(jobsLink).toHaveAttribute("href", "/Home");

    await act(async () => {
      await user.click(articlesLink as HTMLElement);
      await user.click(peopleLink as HTMLElement);
      await user.click(learningLink as HTMLElement);
      await user.click(jobsLink as HTMLElement);
    });

    await waitFor(() => {
      expect(articlesLink).toHaveAttribute("href", "/Home");
    });
  });
});
