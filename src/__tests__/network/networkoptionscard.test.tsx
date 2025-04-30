import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import MyNetworkOptionsCard from "../../components/MyNetwork/MyNetworkOptionsCard";

describe("MyNetworkOptionsCard Component", () => {
  test("renders the component with options", () => {
    render(<MyNetworkOptionsCard />);

    const growOption = screen.getByText("Grow");
    const catchUpOption = screen.getByText("Catch up");

    expect(growOption).toBeInTheDocument();
    expect(catchUpOption).toBeInTheDocument();
  });

  test("handles click events and updates active state", () => {
    render(<MyNetworkOptionsCard />);


    const growOption = screen.getByText("Grow");
    const catchUpOption = screen.getByText("Catch up");


    fireEvent.click(growOption);
    expect(growOption).toHaveClass("border-b-2 border-darkBurgundy text-darkBurgundy bg-gray-200");
    expect(catchUpOption).not.toHaveClass("border-b-2 border-darkBurgundy text-darkBurgundy bg-gray-200");


    fireEvent.click(catchUpOption);
    expect(catchUpOption).toHaveClass("border-b-2 border-darkBurgundy text-darkBurgundy bg-gray-200");
    expect(growOption).not.toHaveClass("border-b-2 border-darkBurgundy text-darkBurgundy bg-gray-200");
  });
});