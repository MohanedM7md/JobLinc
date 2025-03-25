import ExploreButtons from "../../../components/Helpers/ExploreButtons"; 
import { render, screen } from "@testing-library/react";
import {describe, it, expect} from "vitest";
import "@testing-library/jest-dom/vitest";

describe("Explore Buttons", () => {
    it("renders Explore Button", () => {
        render(<ExploreButtons text="Show all" />);
        expect(screen.getByText("Show all")).toBeInTheDocument();
    });

    it("renders Explore Button", () => {
        render(<ExploreButtons />);
        expect(screen.getByText("Default")).toBeInTheDocument();
    });
});