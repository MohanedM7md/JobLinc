import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ForgotPassword from "../../../pages/ForgotPassword";
import store from "../../../store/store";
import { useNavigate } from "react-router-dom";

import { forgotPassword } from "../../../store/user/userSlice";
// Mock Redux store
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock("../../../store/userSlice", async () => {
  const actual = await vi.importActual("../../../store/userSlice"); // Import other actual exports

  return {
    ...actual, // Preserve other exports
    forgotPassword: vi.fn(), // Mock forgotPassword
  };
});

describe("ForgotPassword Component Rendering", () => {
  it("renders all expected elements correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ForgotPassword />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText("Forgot Password")).toBeInTheDocument();

    expect(screen.getByRole("textbox")).toBeInTheDocument();

    expect(screen.getByText("Next")).toBeInTheDocument();

    expect(screen.getByText("Back")).toBeInTheDocument();

    expect(
      screen.getByText(
        "We'll send a verification code to this Email if it matches an existing JobLinc account.",
      ),
    ).toBeInTheDocument();
  });

  it("shows an error when entering an invalid email", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ForgotPassword />
        </MemoryRouter>
      </Provider>,
    );

    // Find the email input field
    const emailInput = screen.getByRole("textbox");

    // Enter an invalid email
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    // Click the "Next" button to trigger validation
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    // Expect an error message to be displayed
    expect(
      screen.getByText("Please enter a valid email address."),
    ).toBeInTheDocument();
  });

  it("navigates to '/Signin' when clicking 'Back'", () => {
    const navigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(navigate);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/ForgotPassword"]}>
          <ForgotPassword />
        </MemoryRouter>
      </Provider>,
    );

    const backButton = screen.getByText("Back");
    fireEvent.click(backButton);

    expect(navigate).toHaveBeenCalledWith("/Signin");
  });

  it("simulates the forgotPassword API request", async () => {
    // Mock forgotPassword API call success
    vi.mocked(forgotPassword).mockResolvedValue({
      payload: { forgotToken: "mockedToken123" },
    } as any);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ForgotPassword />
        </MemoryRouter>
      </Provider>,
    );

    // Type a valid email
    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, {
      target: { value: "omar.ashrafofficial1@gmail.com" },
    });

    // Click the "Next" button
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    // Wait for the modal to appear
    await waitFor(() => {
      expect(screen.getByTestId("modal-overlay")).toBeInTheDocument();
    });

    // Ensure forgotPassword was called with the correct payload
    expect(forgotPassword).toHaveBeenCalledWith({
      email: "omar.ashrafofficial1@gmail.com",
    });
  });

  it("simulates the forgotPassword API request", async () => {
    // Mock forgotPassword API call success
    vi.mocked(forgotPassword).mockResolvedValue({
      payload: { forgotToken: "mockedToken123" },
    } as any);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ForgotPassword />
        </MemoryRouter>
      </Provider>,
    );

    // Type a valid email
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, {
      target: { value: "omar.ashrafofficial1@gmail.com" },
    });

    // Click the "Next" button
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    // Wait for the modal to appear
    await waitFor(() => {
      expect(screen.getByText("Email sent successfully!")).toBeInTheDocument();
    });

    // Ensure forgotPassword was called with the correct payload
    expect(forgotPassword).toHaveBeenCalledWith(
      { email: "omar.ashrafofficial1@gmail.com" },
      expect.anything(),
    );
  });
});
