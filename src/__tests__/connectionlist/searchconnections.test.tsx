import { render, screen, fireEvent } from "@testing-library/react";
import SearchConnections from "../../components/Connections/SearchConnections";
import { vi } from "vitest";

const mockSetSearchTerm = vi.fn();

const mockProps = {
  searchTerm: "John",
  setSearchTerm: mockSetSearchTerm,
};

describe("SearchConnections component", () => {
  it("renders the input field with correct placeholder and value", () => {
    render(<SearchConnections {...mockProps} />);

    const inputField = screen.getByPlaceholderText("Search by name");
    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveValue("John");
  });

  it("calls setSearchTerm when input value is changed", () => {
    render(<SearchConnections {...mockProps} />);

    const inputField = screen.getByPlaceholderText("Search by name");
    fireEvent.change(inputField, { target: { value: "Doe" } });

    expect(mockSetSearchTerm).toHaveBeenCalledWith("Doe");
  });

  it("focuses the input when the container is focused", () => {
    render(<SearchConnections {...mockProps} />);

    const container = screen.getByRole("textbox").parentElement!;
    fireEvent.focus(container);

    const inputField = screen.getByPlaceholderText("Search by name");
    expect(document.activeElement).toBe(inputField);
  });

  it("renders the magnifying glass icon", () => {
    render(<SearchConnections {...mockProps} />);
    const magnifyingGlassIcon = screen.getByTestId("magnifying-glass-icon");
    expect(magnifyingGlassIcon).toHaveClass("fa-solid fa-magnifying-glass");
  });
});