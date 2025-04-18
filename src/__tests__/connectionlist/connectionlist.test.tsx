import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Mock, vi } from "vitest";
import { getUserConnections } from "@services/api/networkServices";
import ConnectionsListCard from "../../components/Connections/ConnectionsListCard";
vi.mock("../../services/api/networkServices");
const mockConnections = [
  {
    id: "1",
    profileImage: "test-image-1.jpg",
    firstName: "John",
    lastName: "Doe",
    userBio: "Software Developer",
    connectedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
  },
  {
    id: "2",
    profileImage: "test-image-2.jpg",
    firstName: "Jane",
    lastName: "Smith",
    userBio: "Graphic Designer",
    connectedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  },
];

describe("ConnectionsListCard component", () => {


it("renders the correct number of ConnectionCard components", async () => {
    (getUserConnections as Mock).mockResolvedValue(mockConnections);

    render(<ConnectionsListCard />);
  
    expect(screen.getByText("Connections")).toBeInTheDocument();
        //screen.debug();
    const connectionCards = screen.getByAltText("Profile Picture");
    
  });

  it("filters connections based on search term", async () => {
    render(<ConnectionsListCard />);

    const searchInput = screen.getByPlaceholderText("Search by name");
    fireEvent.change(searchInput, { target: { value: "Jane" } });

    expect(await screen.findByText("Jane Smith")).toBeInTheDocument();
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
  });

  it("sorts connections by first name", async () => {
    render(<ConnectionsListCard />);

    const sortDropdown = screen.getByRole("combobox");
    fireEvent.change(sortDropdown, { target: { value: "firstname" } });

    const connectionCards = await screen.findAllByRole("heading", { name: /.+/ });
    expect(connectionCards[0]).toHaveTextContent("Jane Smith");
    expect(connectionCards[1]).toHaveTextContent("John Doe");
  });

  it("removes a connection when onRemove is called", async () => {
    render(<ConnectionsListCard />);

    const removeButton = await screen.findByText("Remove Connection");
    fireEvent.click(removeButton);

    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
  });

  it("handles API errors gracefully", async () => {
    vi.spyOn(networkServices, "getUserConnections").mockRejectedValue(new Error("API Error"));

    render(<ConnectionsListCard />);

    expect(await screen.queryByText("John Doe")).not.toBeInTheDocument();
    expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
  });
});