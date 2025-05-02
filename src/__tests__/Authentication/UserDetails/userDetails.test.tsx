import UserDetails from "../../../pages/UserDetails";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {describe, it, expect, afterEach} from "vitest";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../../../store/store";
import { vi } from "vitest"

import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";


describe("UserDetails Component", () => {
      afterEach(() => {
        cleanup();
      });

      vi.mock("react-router-dom", async () => {
        const actual = await vi.importActual("react-router-dom");
        return {
          ...actual,
          useLocation: () => ({
            state: { email: "test@example.com", password: "securepassword123" },
          }),
        };
      });
      

      it("renders the form and inputs correctly", () => {
        render(
          <MemoryRouter>
            <Provider store={store}>
              <UserDetails />
            </Provider>
          </MemoryRouter>
        );
    
        // Check if header, form, and labels are present
        expect(screen.getByText("Make the most of your professional life")).toBeInTheDocument();
        expect(screen.getByLabelText("First Name *")).toBeInTheDocument();
        expect(screen.getByLabelText("Last Name *")).toBeInTheDocument();
        expect(screen.getByText("Continue")).toBeInTheDocument(); // Submit button
      });

      it("shows validation errors for invalid first and last name", async () => {
        render(
          <MemoryRouter>
            <Provider store={store}>
              <UserDetails />
            </Provider>
          </MemoryRouter>
        );
      
        const firstNameInput = screen.getByLabelText("First Name *");
        const lastNameInput = screen.getByLabelText("Last Name *");
        const continueButton = screen.getAllByText("Continue")[0];
      
        // Type invalid names (numbers in this case)
        await userEvent.type(firstNameInput, "123");
        await userEvent.type(lastNameInput, "123");
      
        // Click the continue button
        await userEvent.click(continueButton);
      
        // Ensure validation messages appear for invalid input
        expect(screen.getByText("Please enter a valid firstname.")).toBeVisible();
        expect(screen.getByText("Please enter a valid lastname.")).toBeVisible();
      });

      it("shows validation error for invalid first and last name", async () => {
        render(
          <MemoryRouter>
            <Provider store={store}>
              <UserDetails />
            </Provider>
          </MemoryRouter>
        );
    
        const firstNameInput = screen.getByLabelText("First Name *");
        const lastNameInput = screen.getByLabelText("Last Name *");
        const continueButton = screen.getAllByText("Continue")[0];
    
        // Enter invalid names
        await userEvent.type(firstNameInput, "123");
        await userEvent.type(lastNameInput, "@@@");
    
        // Blur inputs to trigger validation
        fireEvent.blur(firstNameInput);
        fireEvent.blur(lastNameInput);
    
        // Click submit
        await userEvent.click(continueButton);
    
        // Ensure validation messages appear
        expect(screen.getByText("Please enter a valid firstname.")).toBeInTheDocument();
        expect(screen.getByText("Please enter a valid lastname.")).toBeInTheDocument();
      });

      it("opens modal on valid form submission", async () => {
        render(
          <MemoryRouter>
            <Provider store={store}>
              <UserDetails />
            </Provider>
          </MemoryRouter>,
        );
      
        const firstNameInput = screen.getByLabelText("First Name *");
        const lastNameInput = screen.getByLabelText("Last Name *");
        const continueButton = screen.getAllByText("Continue")[0];
      
        // Enter valid names
        await userEvent.type(firstNameInput, "John");
        await userEvent.type(lastNameInput, "Doe");
      
        // Click continue
        await userEvent.click(continueButton);
      
        // Ensure no validation errors exist in the DOM
        await waitFor(() => {
          expect(screen.queryByText("Please enter a valid firstname.")).not.toBeInTheDocument();
          expect(screen.queryByText("Please enter a valid lastname.")).not.toBeInTheDocument();
        });
      
        // Ensure modal appears
        await waitFor(() => {
          expect(screen.getByTestId("modal-overlay")).toBeInTheDocument();
        });

      });
      
    it("validates phone number input correctly", async () => {
        render(
          <MemoryRouter>
            <Provider store={store}>
              <UserDetails />
            </Provider>
          </MemoryRouter>
        );
    
        // Open the modal
        const firstNameInput = screen.getByLabelText("First Name *");
        const lastNameInput = screen.getByLabelText("Last Name *");
        await userEvent.type(firstNameInput, "John");
        await userEvent.type(lastNameInput, "Doe");
        await userEvent.click(screen.getAllByText("Continue")[0]);
    
        // Wait for modal to open
        await waitFor(() => screen.getByText("Security Verification"));
    
        // Select country and enter invalid phone number
        const phoneInput = screen.getByPlaceholderText("Enter your phone number");
        await userEvent.type(phoneInput, "12345");
    
        // Click submit
        await userEvent.click(screen.getAllByText("Continue")[1]);
    
        // Check for validation error
        expect(screen.getByText("Please enter a valid Phone Number")).toBeInTheDocument();
      });

    it("allows submitting a valid phone number", async () => {
        render(
          <MemoryRouter>
            <Provider store={store}>
              <UserDetails />
            </Provider>
          </MemoryRouter>
        );
    
        // Open the modal
        await userEvent.type(screen.getByLabelText("First Name *"), "John");
        await userEvent.type(screen.getByLabelText("Last Name *"), "Doe");
        await userEvent.click(screen.getAllByText("Continue")[0]);
    
        await waitFor(() => screen.getByText("Security Verification"));
    
        // Select Egypt and enter a valid phone number
        const phoneInput = screen.getByPlaceholderText("Enter your phone number");
        await userEvent.type(phoneInput, "1012345678"); // Valid for Egypt
    
        await userEvent.click(screen.getAllByText("Continue")[1]);
    
        // Ensure no validation error appears
        expect(screen.queryByText("Please enter a valid Phone Number")).not.toBeInTheDocument();
      });

});
