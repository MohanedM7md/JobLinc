import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navigate_Component from "../../../components/Authentication/Utilities/Navigate_Component";


describe("Navigate_Component", () => {
    it("renders the navigation link correctly", () => {
        const labelText = "Forgot password?";
        const navigateTo = "/Signin/forgot-password";

        render(
            <MemoryRouter>
                <Navigate_Component labelText={labelText} navigateTo={navigateTo} />
            </MemoryRouter>
        );

        const linkElement = screen.getByRole("link", { name: labelText });

        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute("href", navigateTo);
    });
});
