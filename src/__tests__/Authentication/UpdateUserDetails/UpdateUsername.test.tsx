import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import UpdateUsername from "../../../pages/UpdateUsername";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "../../../store/store";


// Mock external components
vi.mock("../components/Authentication/SignHeader", () => ({
  default: () => <div data-testid="sign-header" />,
}));

vi.mock("../components/Authentication/Utilities/NameFieldNormal", () => ({
  default: ({ labelText }: { labelText: string }) => (
    <label data-testid="name-field">{labelText}</label>
  ),
}));

vi.mock("../components/Authentication/AuthenticationButtons", () => ({
  AuthenticationSignInButton: ({ text }: { text: string }) => (
    <button data-testid="auth-button">{text}</button>
  ),
}));

describe("Update Username Component", () => {
  it("renders the Update Username component correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UpdateUsername />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId("header-test")).toBeInTheDocument();
    expect(screen.getByLabelText("Username *")).toBeInTheDocument();
    expect(screen.getAllByText("Update Username")[0]).toBeInTheDocument();
  });
});
