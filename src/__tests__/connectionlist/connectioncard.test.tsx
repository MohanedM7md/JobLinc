import { render, screen, fireEvent } from "@testing-library/react";
import ConnectionCard from "../../components/Connections/ConnectionCard";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

const mockOnRemove = vi.fn(); 

const mockProps = {
  userId: "1",
  profileImage: "test-image.jpg",
  firstName: "John",
  lastName: "Doe",
  userBio: "Software Developer",
  connectedDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
  onRemove: mockOnRemove,
};

describe("ConnectionCard component", () => {
  it("renders the component with user details", () => {
    render(
      <MemoryRouter>
        <ConnectionCard {...mockProps} />
      </MemoryRouter>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Software Developer")).toBeInTheDocument();
    expect(screen.getByText("connected 1 day ago")).toBeInTheDocument();
    expect(screen.getByAltText("Profile Picture")).toHaveAttribute("src", "test-image.jpg");
  });

  it("opens and closes the popup when ellipsis button is clicked", () => {
    render(
      <MemoryRouter>
        <ConnectionCard {...mockProps} />
      </MemoryRouter>
    );

    const ellipsisButton = screen.getByTestId("ellipsis-button");
    fireEvent.click(ellipsisButton);
    expect(screen.getByTestId("remove-connection-button")).toBeInTheDocument();

    fireEvent.click(ellipsisButton);
    expect(screen.queryByTestId("remove-connection-button")).not.toBeInTheDocument();
  });

  it("opens the modal when remove connection button is clicked", () => {
    render(
      <MemoryRouter>
        <ConnectionCard {...mockProps} />
      </MemoryRouter>
    );

    const ellipsisButton = screen.getByTestId("ellipsis-button");
    fireEvent.click(ellipsisButton);

    const removeConnectionButton = screen.getByTestId("remove-connection-button");
    fireEvent.click(removeConnectionButton);
    screen.debug();

    expect(screen.getByText("Remove Connection.")).toBeInTheDocument();
    expect(
      screen.getByText(/Are you sure you want to remove your connection/i)
    ).toBeInTheDocument();
  });

  it("calls onRemove when confirm remove button is clicked", () => {
    render(
      <MemoryRouter>
        <ConnectionCard {...mockProps} />
      </MemoryRouter>
    );

    const ellipsisButton = screen.getByTestId("ellipsis-button");
    fireEvent.click(ellipsisButton);

    const removeConnectionButton = screen.getByTestId("remove-connection-button");
    fireEvent.click(removeConnectionButton);

    const confirmButton = screen.getByTestId("confirm-remove-connection-button");
    fireEvent.click(confirmButton);
    
    expect(mockOnRemove).toHaveBeenCalledWith("1");
  });

  it("closes the modal when cancel button is clicked", () => {
    render(
      <MemoryRouter>
        <ConnectionCard {...mockProps} />
      </MemoryRouter>
    );

    const ellipsisButton = screen.getByTestId("ellipsis-button");
    fireEvent.click(ellipsisButton);

    const removeConnectionButton = screen.getByTestId("remove-connection-button");
    fireEvent.click(removeConnectionButton);

    const cancelButton = screen.getByTestId("cancel-remove-connection-button");
    fireEvent.click(cancelButton);

    expect(screen.queryByText("Are you sure you want to remove your connection")).not.toBeInTheDocument();
  });

  it("message button navigates to messaging", () => {
    render(
      <MemoryRouter>
        <ConnectionCard {...mockProps} />
      </MemoryRouter>
    );

    const messageButton = screen.getByTestId("message-button-route");
    expect(messageButton).toHaveAttribute("href", "/messaging");
  });
});