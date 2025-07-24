import { MemoryRouter, Routes, Route, useNavigate } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import {describe, it, expect, vi, beforeAll, afterEach} from "vitest";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "@store/store";
import { api } from "@services/api/api";
import { cleanup } from "@testing-library/react";

import Home from "@pages/Home";
import "@testing-library/jest-dom/vitest";

import SignInInformation from "../../../components/Authentication/SignInInformation";



// const mockNavigate = vi.fn();
//     vi.mock("react-router-dom", async () => {
//     const actual = await vi.importActual("react-router-dom");
//     return {
//         ...actual,
//         useNavigate: () => mockNavigate,
//     };
// });

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: vi.fn(),
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
                    <SignInInformation />
                </MemoryRouter>
            </Provider>

        );

        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByText("Sign in")).toBeInTheDocument();
    });

    it("shows validation error for invalid email", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <SignInInformation />
                </MemoryRouter>
            </Provider>
        );

        const emailInput = screen.getByLabelText("Email");
        const passInput = screen.getByLabelText("Password");

        const signInButton = screen.getAllByText("Sign in")[0];

        await userEvent.type(emailInput, "John");
        await userEvent.type(passInput, "1234567");

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
                    <SignInInformation />
                </MemoryRouter>
            </Provider>
        );

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");
        const signInButton = screen.getAllByText("Sign in")[0];

        
        await userEvent.type(emailInput, "test@example.com");
        await userEvent.type(passwordInput, "123");
        await userEvent.click(signInButton);



        await waitFor(() => {
            expect(screen.getByText("The password must have at least 6 characters.")).toBeInTheDocument();
        });
    });

    // it("shows validation error for not checking recaptcha", async () => {

        
    //     render(
    //         <Provider store={store}>
    //             <MemoryRouter>
    //                 <SignInInformation />
    //             </MemoryRouter>
    //         </Provider>
    //     );

    //     const emailInput = screen.getByLabelText("Email");
    //     const passwordInput = screen.getByLabelText("Password");
    //     const signInButton = screen.getAllByText("Sign in")[0];

        
    //     await userEvent.type(emailInput, "test@example.com");
    //     await userEvent.type(passwordInput, "password123");
    //     await userEvent.click(signInButton);

    //     await waitFor(() => {
    //         expect(screen.getByTestId("errorRECAPTCHA")).toBeInTheDocument();
    //     });
    // });

    it("shows error modal for wrong email/password", async () => {
        // global.window.grecaptcha.getResponse = vi.fn(() => "valid-recaptcha-response");

        vi.spyOn(api, "post").mockResolvedValue({
            status: "FAILED",
            // message: "Invalid email or password",
        });
        render(
            <Provider store={store}>
                <MemoryRouter>  
                    <SignInInformation />
                </MemoryRouter>
            </Provider>
        );

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");
        const signInButton = screen.getAllByText("Sign in")[0];

        
        await userEvent.type(emailInput, "tf@example.com");
        await userEvent.type(passwordInput, "password123");
        await userEvent.click(signInButton);

        // await waitFor(() => {
        //     expect(screen.getByTestId("wrong-email-or-password")).toBeInTheDocument();
        // });
    });


    it("logs in the user and navigates to /home", async () => {
        // global.window.grecaptcha.getResponse = vi.fn(() => "valid-recaptcha-response");
    
        vi.spyOn(api, "post").mockResolvedValue({
            success: true,  
            data: { token: "fake-jwt-token" },
        });
    
        const navigate = vi.fn();
        vi.mocked(useNavigate).mockReturnValue(navigate);

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/signin"]}> 
                    <Routes>
                        <Route path="/signin" element={<SignInInformation />} />
                        <Route path="/home" element={<Home />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    
        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");
        const signInButton = screen.getAllByText("Sign in")[0];
    
        await userEvent.type(emailInput, "hello@mail.com");
        await userEvent.type(passwordInput, "password");
        await userEvent.click(signInButton);
        
        await waitFor(() => {
            expect(navigate).toHaveBeenCalledWith("/home");
        });

        
    });

});
