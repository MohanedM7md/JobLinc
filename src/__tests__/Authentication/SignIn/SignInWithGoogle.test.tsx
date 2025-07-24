import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter  } from "react-router-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import store from "@store/store";
import { AuthenticationGoogleButton } from "../../../components/Authentication/AuthenticationButtons";

// Mock the GoogleLogin component to bypass actual OAuth flow
vi.mock("@react-oauth/google", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@react-oauth/google")>();
  return {
    ...actual,
    GoogleLogin: ({ onSuccess, onError }: any) => (
      <button
        data-testid="mock-google-login"
        onClick={() => {
          // Simulate successful login
          onSuccess({ credential: "mock-google-token" });
          // Alternatively simulate error:
          // onError(new Error("Login failed"));
        }}
      >
        Sign in with Google
      </button>
    ),
  };
});

// Mock your API client
vi.mock("@services/api/authService", () => ({
  loginWithGoogleAPI: vi.fn(() => 
    Promise.resolve({
      userId: "123",
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
      email: "test@example.com",
      role: "user",
      confirmed: true
    })
  )
}));

describe("Sign in with Google test", () => {
  it("renders correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <GoogleOAuthProvider clientId="mock-client-id">
            <AuthenticationGoogleButton />
          </GoogleOAuthProvider>
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByTestId("auth-with-google")).toBeInTheDocument();
  });

 
});