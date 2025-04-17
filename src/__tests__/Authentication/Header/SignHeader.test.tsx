import SignHeader from "../../../components/Authentication/Headers/SignHeader";
import { render, screen } from "@testing-library/react";
import {describe, it, expect} from "vitest";
import "@testing-library/jest-dom/vitest";

describe("SignHeader Component", () => {
    it("renders without crashing", () => {
      render(<SignHeader />);
      
      expect(screen.getByTestId("header-test")).toBeInTheDocument();
  
      expect(screen.getByAltText("JobLinc Logo")).toBeInTheDocument();
    });
  });