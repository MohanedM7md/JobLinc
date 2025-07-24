import { AuthenticationAppleButton, AuthenticationGoogleButton, AuthenticationMicrosoftButton, AuthenticationSignInButton } from "../../../components/Authentication/AuthenticationButtons";
import { render, screen } from "@testing-library/react";
import {describe, it, expect} from "vitest";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@store/store";

describe("Authentication Buttons", () => {
    it("renders AuthenticationGoogleButton", () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <AuthenticationGoogleButton />
                </Provider>
            </MemoryRouter>
        );
        expect(screen.getByTestId("auth-with-google")).toBeInTheDocument();
    });
    
    it("renders AuthenticationAppleButton", () => {
        render(<AuthenticationAppleButton />);
        expect(screen.getByText("Sign in with Apple")).toBeInTheDocument();
    });
    
    it("renders AuthenticationMicrosoftButton", () => {
        render(<AuthenticationMicrosoftButton />);
        expect(screen.getByText("Continue with Microsoft")).toBeInTheDocument();
    });
    
    it("renders AuthenticationSignInButton with provided text", () => {
        render(<AuthenticationSignInButton text="Sign in" id="sign-in-btn" />);
        expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
    });

    it("renders AuthenticationSignInButton with no text when an empty string is provided", () => {
        render(<AuthenticationSignInButton text="" id="sign-in-btn" />);
        
        const button = screen.getByRole("button", { name: "" });
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("");
    });
    

    
});