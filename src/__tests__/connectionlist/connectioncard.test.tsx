import { render, screen } from "@testing-library/react";
import ConnectionCard from "../../components/Connections/ConnectionCard"; 
import { ConnectionInterface } from "../../interfaces/networkInterfaces";

describe("ConnectionCard Component", () => {

  const mockConnection: ConnectionInterface = {
    profileImage: "src/assets/Tyrone.jpg",
    firstName: "John",
    lastName: "Doe",
    userBio: "Software Developer",
    connectedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  };

  test("renders connection profile details correctly", () => {
    render(<ConnectionCard {...mockConnection} />);
  
    const imageElement = screen.getByRole("img", { name: /profile picture/i });
    expect(imageElement).toHaveAttribute("src", mockConnection.profileImage);

  
    const nameElement = screen.getByText(/john doe/i);
    expect(nameElement).toBeInTheDocument();


    const bioElement = screen.getByText(/software developer/i);
    expect(bioElement).toBeInTheDocument();


    const relativeTimeElement = screen.getByText(/connected 2 days ago/i);
    expect(relativeTimeElement).toBeInTheDocument();
  });

  test("renders message button with correct styles", () => {
    render(<ConnectionCard {...mockConnection} />);
    
    const messageButton = screen.getByText(/message/i);
    expect(messageButton).toHaveClass("border-2 px-5 py-0.5 text-crimsonRed border-crimsonRed");
  });

  test("finds ellipsis button by its id", () => {
    render(<ConnectionCard {...mockConnection} />);
    
    const ellipsisButton = screen.getByTestId("ellipsisbuttonid");
    expect(ellipsisButton).toBeInTheDocument();
    
  });

  test("handles edge case", () => {
    const edgeCaseConnection: ConnectionInterface = {
      profileImage: "",
      firstName: "",
      lastName: "",
      userBio: "",
      connectedDate: new Date(),
    };

    render(<ConnectionCard {...edgeCaseConnection} />);
    
    const nameElement = screen.getByText(/ /);
    expect(nameElement).toBeInTheDocument();

    const relativeTimeElement = screen.getByText(/connected just now/i);
    expect(relativeTimeElement).toBeInTheDocument();
  });
});