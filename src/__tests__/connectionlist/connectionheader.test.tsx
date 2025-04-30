import { render, screen, fireEvent } from "@testing-library/react";
import ConnectionsHeader from "../../components/Connections/ConnectionsHeader";
import { vi } from "vitest";

const mockSetSearchTerm = vi.fn();
const mockSetSortBy = vi.fn();

const mockProps = {
  searchTerm: "John",
  setSearchTerm: mockSetSearchTerm,
  setSortBy: mockSetSortBy,
};

describe("ConnectionsHeader component", () => {
  it("renders the component with correct text and inputs", () => {
    render(<ConnectionsHeader {...mockProps} />);

    expect(screen.getByText("Connections")).toBeInTheDocument();
    expect(screen.getByText("Sort by:")).toBeInTheDocument();
    expect(screen.getByText("Search with filters")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("calls setSortBy when a sort option is selected", () => {
    render(<ConnectionsHeader {...mockProps} />);

    const sortDropdown = screen.getByRole("combobox");
    fireEvent.change(sortDropdown, { target: { value: "firstname" } });

    expect(mockSetSortBy).toHaveBeenCalledWith("firstname");
  });

  it("renders SearchConnections component and calls setSearchTerm", () => {
    render(<ConnectionsHeader {...mockProps} />);

    const searchInput = screen.getByRole("textbox");
    fireEvent.change(searchInput, { target: { value: "Doe" } });

    expect(mockSetSearchTerm).toHaveBeenCalledWith("Doe");
  });

  it("renders all sort options correctly", () => {
    render(<ConnectionsHeader {...mockProps} />);

    const sortDropdown = screen.getByRole("combobox");
    expect(sortDropdown).toHaveTextContent("Recently added");
    expect(sortDropdown).toHaveTextContent("First Name");
    expect(sortDropdown).toHaveTextContent("Last Name");
  });

  it("renders 'Search with filters' as a clickable element", () => {
    render(<ConnectionsHeader {...mockProps} />);

    const searchWithFilters = screen.getByText("Search with filters");
    expect(searchWithFilters).toHaveClass("cursor-pointer");
  });
});