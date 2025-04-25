import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import ConnectCard from "../../components/MyNetwork/ConnectCard";

describe("ConnectCard Component", () => {
  const mockProps = {
    lincbuttonid: "test-button",
    profilePicture: "test-profile.jpg",
    userName: "Test User",
    userBio: "This is a test bio.",
    Mutuals: "2 mutual friends",
  };

  test("renders the component with provided props", () => {
    render(<ConnectCard {...mockProps} />);

   
    const profileImg = screen.getByAltText("User Profile Photo");
    expect(profileImg).toHaveAttribute("src", "test-profile.jpg");

    
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("This is a test bio.")).toBeInTheDocument();

    
    const mutualFriendImg = screen.getByAltText("Mutual Friend Photo");
    expect(mutualFriendImg).toHaveAttribute("src", "test-profile.jpg");

    
    expect(screen.getByText("2 mutual friends")).toBeInTheDocument();
  });

  test("toggles button text and class on click", () => {
    render(<ConnectCard {...mockProps} />);

   
    const button = screen.getByRole("button", { name: "Linc" });
    expect(button).toHaveClass("text-crimsonRed border-crimsonRed");

    
    fireEvent.click(button);
    expect(button).toHaveTextContent("Pending");
    expect(button).toHaveClass("text-darkGray border-darkGray");

    
    fireEvent.click(button);
    expect(button).toHaveTextContent("Linc");
    expect(button).toHaveClass("text-crimsonRed border-crimsonRed");
  });
});