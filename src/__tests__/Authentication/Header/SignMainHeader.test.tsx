import SignMain from "../../../components/Authentication/SignMain";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import { render, screen } from "@testing-library/react";
import {describe, it, expect} from "vitest";
import "@testing-library/jest-dom/vitest";

describe("SignMain Component", () => {
    it("renders successfully", () => {
      render(
        <MemoryRouter>
          <SignMain />
        </MemoryRouter>
      );
  
      // Check if the logo is rendered
      expect(screen.getByAltText("JobLinc Logo")).toBeInTheDocument();
  
      // Check if navigation items are present
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("About Us")).toBeInTheDocument();
      expect(screen.getByText("Why Us")).toBeInTheDocument();
  
      // Check if "Join now" and "Sign in" links are present
      expect(screen.getByText("Join now")).toBeInTheDocument();
      expect(screen.getByText("Sign in")).toBeInTheDocument();
    });
  
    it("navigates correctly when clicking 'Join now' and 'Sign in'", async () => {
        render(
          <MemoryRouter>
            <SignMain />
          </MemoryRouter>
        );
    
        const user = userEvent.setup();
    
        // Check if links point to the correct routes
        const joinNowLink = screen.getAllByText("Join now")[0];
        expect(joinNowLink).toHaveAttribute("href", "/Signup");
    
        const signInLink = screen.getAllByText("Sign in")[0];
        expect(signInLink).toHaveAttribute("href", "/Signin");
    
        // Simulate clicking the links
        await user.click(joinNowLink);
        await user.click(signInLink);
      });
  });