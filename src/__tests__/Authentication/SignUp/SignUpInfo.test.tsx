import { MemoryRouter, Routes, Route } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import {describe, it, expect, vi, beforeAll, afterEach} from "vitest";
import SignUpInformation from "../../../components/Authentication/SignUpInformation";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../../../store/store";
import UserDetails from "../../../components/Authentication/UserDetails";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import api from "@services/api/api";


const mockNavigate = vi.fn();
    vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});


describe("SignInInformation Component", () => {
    
    // beforeAll(() => {
    //     global.window.grecaptcha = {
    //         ready: vi.fn((cb) => cb()),
    //         getResponse: vi.fn(() => ""),
    //         render: vi.fn(() => "mocked-recaptcha-widget"),
    //         reset: vi.fn(),
    //     };
    // });

    
    afterEach(() => {
        cleanup();
    });

    
    it("renders input fields and submit button", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <SignUpInformation />
                </MemoryRouter>
            </Provider>
            
        );

        expect(screen.getByLabelText("Email *")).toBeInTheDocument();
        expect(screen.getByLabelText("Password *")).toBeInTheDocument();
        expect(screen.getByText("Agree & Join")).toBeInTheDocument();
    });


    it("shows validation error for invalid email", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <SignUpInformation />
                </MemoryRouter>
            </Provider>
        );

        const emailInput = screen.getByLabelText("Email *");
        const passInput = screen.getByLabelText("Password *");

        const signInButton = screen.getAllByText("Agree & Join")[0];

        await userEvent.type(emailInput, "John");
        await userEvent.type(passInput, "123");

        // Click Sign in
        await userEvent.click(signInButton);

        await waitFor(() => {
            expect(screen.getByTestId("errorEmail")).toBeInTheDocument();
        });
    });


    it("shows validation error for short password", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <SignUpInformation />
                </MemoryRouter>
            </Provider>
        );

        const emailInput = screen.getByLabelText("Email *");
        const passwordInput = screen.getByLabelText("Password *");
        const signInButton = screen.getAllByText("Agree & Join")[0];

        
        await userEvent.type(emailInput, "test@example.com");
        await userEvent.type(passwordInput, "123");
        await userEvent.click(signInButton);



        await waitFor(() => {
            expect(screen.getByTestId("errorPass")).toBeInTheDocument();
        });
    });
    

    it("shows validation error for not checking recaptcha", async () => {

        
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <SignUpInformation />
                </MemoryRouter>
            </Provider>
        );

        const emailInput = screen.getByLabelText("Email *");
        const passwordInput = screen.getByLabelText("Password *");
        const signInButton = screen.getAllByText("Agree & Join")[0];

        
        await userEvent.type(emailInput, "test@example.com");
        await userEvent.type(passwordInput, "password123");
        await userEvent.click(signInButton);

        await waitFor(() => {
            expect(screen.getByTestId("errorRECAPTCHA")).toBeInTheDocument();
        });
    });

    it("renders modal to take first name and last name, and navigates to /UserDetails", async () => {
        // global.window.grecaptcha.getResponse = vi.fn(() => "valid-recaptcha-response");
        
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/signup"]}>
                    <Routes>
                        <Route path="/signup" element={<SignUpInformation />} />
                        <Route path="/UserDetails" element={<UserDetails />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        const emailInput = screen.getByLabelText("Email *");
        const passwordInput = screen.getByLabelText("Password *");
        const signInButton = screen.getAllByText("Agree & Join")[0];

        await userEvent.type(emailInput, "omar.ashrafofficial1@gmail.com");
        await userEvent.type(passwordInput, "pass123");
        await userEvent.click(signInButton);

        await waitFor(() => {
            expect(screen.getByLabelText("First Name *"));
        });


    });

});
