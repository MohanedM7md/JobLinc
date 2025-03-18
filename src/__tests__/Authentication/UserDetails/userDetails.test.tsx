import UserDetails from "../../../components/Authentication/UserDetails";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {describe, it, expect} from "vitest";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom/vitest";

describe("UserDetails Component", () => {
    it("renders the form and inputs correctly", () => {
        render(
          <MemoryRouter>
            <UserDetails />
          </MemoryRouter>
        );
    
        // Check if header, form, and labels are present
        expect(screen.getByText("Make the most of your professional life")).toBeInTheDocument();
        expect(screen.getByLabelText("First name")).toBeInTheDocument();
        expect(screen.getByLabelText("Last name")).toBeInTheDocument();
        expect(screen.getByText("Continue")).toBeInTheDocument(); // Submit button
      });

      it("shows validation errors for invalid first and last name", async () => {
        render(
          <MemoryRouter>
            <UserDetails />
          </MemoryRouter>
        );
      
        const firstNameInput = screen.getByLabelText(/first name/i);
        const lastNameInput = screen.getByLabelText(/last name/i);
        const continueButton = screen.getAllByText("Continue")[0];
      
        // Type invalid names (numbers in this case)
        await userEvent.type(firstNameInput, "123");
        await userEvent.type(lastNameInput, "123");
      
        // Click the continue button
        await userEvent.click(continueButton);
      
        // Ensure validation messages appear for invalid input
        expect(screen.getByText("Please enter a valid first name.")).toBeInTheDocument();
        expect(screen.getByText("Please enter a valid last name.")).toBeInTheDocument();
      });

      it("shows validation error for invalid first and last name", async () => {
        render(
          <MemoryRouter>
            <UserDetails />
          </MemoryRouter>
        );
    
        const firstNameInput = screen.getByLabelText("First name");
        const lastNameInput = screen.getByLabelText("Last name");
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
        expect(screen.getByText("Please enter a valid first name.")).toBeInTheDocument();
        expect(screen.getByText("Please enter a valid last name.")).toBeInTheDocument();
      });


    {/* Not Working Yet */}
    it("opens modal on valid form submission", async () => {
        render(
          <MemoryRouter>
            <UserDetails />
          </MemoryRouter>,
          { container: document.body } // Fix portal issue
        );
      
        const firstNameInput = screen.getByLabelText("First name");
        const lastNameInput = screen.getByLabelText("Last name");
        const continueButton = screen.getAllByText("Continue")[0];
      
        // Enter valid names
        await userEvent.type(firstNameInput, "John");
        await userEvent.type(lastNameInput, "Doe");
      
        // Click submit
        await userEvent.click(continueButton);
      
        // Ensure no validation errors exist in the DOM
        await waitFor(() => {
          expect(screen.queryByText("Please enter a valid first name.")).not.toBeVisible();
          expect(screen.queryByText("Please enter a valid last name.")).not.toBeVisible();
        });
      
        // Ensure modal appears
        await waitFor(() => {
          expect(screen.getByRole("dialog")).toBeInTheDocument();
        }, { timeout: 1000 });
      
        // Ensure modal contains the expected text
        await waitFor(() => {
          expect(screen.getByText(/security verification/i)).toBeInTheDocument();
        });
      });
      
      
      

    {/* Not Working Yet */}

    // it("validates phone number input correctly", async () => {
    //     render(
    //       <MemoryRouter>
    //         <UserDetails />
    //       </MemoryRouter>
    //     );
    
    //     // Open the modal
    //     const firstNameInput = screen.getByLabelText("First name");
    //     const lastNameInput = screen.getByLabelText("Last name");
    //     await userEvent.type(firstNameInput, "John");
    //     await userEvent.type(lastNameInput, "Doe");
    //     await userEvent.click(screen.getAllByText("Continue")[0]);
    
    //     // Wait for modal to open
    //     await waitFor(() => screen.getByText("Security Verification"));
    
    //     // Select country and enter invalid phone number
    //     const phoneInput = screen.getByPlaceholderText("Enter your phone number");
    //     await userEvent.type(phoneInput, "12345");
    
    //     // Click submit
    //     await userEvent.click(screen.getByText("Continue"));
    
    //     // Check for validation error
    //     expect(screen.getByText("Please enter a valid Phone Number")).toBeInTheDocument();
    //   });

    {/* Not Working Yet */}
    // it("allows submitting a valid phone number", async () => {
    //     render(
    //       <MemoryRouter>
    //         <UserDetails />
    //       </MemoryRouter>
    //     );
    
    //     // Open the modal
    //     await userEvent.type(screen.getByLabelText("First name"), "John");
    //     await userEvent.type(screen.getByLabelText("Last name"), "Doe");
    //     await userEvent.click(screen.getByText("Continue"));
    
    //     await waitFor(() => screen.getByText("Security Verification"));
    
    //     // Select Egypt and enter a valid phone number
    //     const phoneInput = screen.getByPlaceholderText("Enter your phone number");
    //     await userEvent.type(phoneInput, "1012345678"); // Valid for Egypt
    
    //     await userEvent.click(screen.getByText("Continue"));
    
    //     // Ensure no validation error appears
    //     expect(screen.queryByText("Please enter a valid Phone Number")).not.toBeInTheDocument();
    //   });

    {/* Not Working Yet */}
    // it("closes the modal when clicking outside", async () => {
    //     render(
    //       <MemoryRouter>
    //         <UserDetails />
    //       </MemoryRouter>
    //     );
    
    //     // Open the modal
    //     await userEvent.type(screen.getByLabelText("First name"), "John");
    //     await userEvent.type(screen.getByLabelText("Last name"), "Doe");
    //     await userEvent.click(screen.getByText("Continue"));
    
    //     await waitFor(() => screen.getByText("Security Verification"));
    
    //     // Click outside the modal
    //     const overlay = screen.getByTestId("modal-overlay");
    //     await userEvent.click(overlay);
    
    //     // Wait for modal to close
    //     await waitFor(() => expect(screen.queryByText("Security Verification")).not.toBeInTheDocument());
    //   });
});
