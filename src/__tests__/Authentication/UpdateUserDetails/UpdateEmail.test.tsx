import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import UpdateEmail from "../../../pages/UpdateEmail";


describe("UpdateEmail Component", () => {
    it("renders SignHeader component", () => {
        render(<UpdateEmail />);
        expect(screen.getByTestId("header-test")).toBeInTheDocument();
    });

    it("renders EmailFieldNormal component", () => {
        render(<UpdateEmail />);
        expect(screen.getByLabelText("Email *")).toBeInTheDocument();
    });

    it("renders the update email button", () => {
        render(<UpdateEmail />);
        expect(screen.getAllByText("Update Email")[0]).toBeInTheDocument();
    });

});
