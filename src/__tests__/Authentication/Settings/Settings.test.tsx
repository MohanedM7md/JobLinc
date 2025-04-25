import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import {describe, it, expect} from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Settings from "@pages/Settings/Settings";
import "@testing-library/jest-dom/vitest";
import AccountPreferences from "@pages/Settings/AccountPreferences";
import SignInAndSecurity from "@pages/Settings/SignInAndSecurity";
import Visibility from "@pages/Settings/Visibility";
import DataAndPrivacy from "@pages/Settings/DataAndPrivacy";
import AdvertisingData from "@pages/Settings/AdvertisingData";
import Notifications from "@pages/Settings/Notifications";


vi.mock("../../components/Authentication/Headers/SignHeader", () => ({
  default: () => <div data-testid="sign-header">SignHeader</div>
}));

vi.mock("../../components/Logo", () => ({
  default: () => <div data-testid="logo">Logo</div>
}));

vi.mock("./AccountPreferences", () => ({
  default: () => <div data-testid="account-preferences">Account Preferences Section</div>
}));

vi.mock("./Notifications", () => ({
  default: () => <div data-testid="notifications">Notifications Section</div>
}));

vi.mock("./SignInAndSecurity", () => ({
  default: () => <div data-testid="sign-in-security">Sign In & Security Section</div>
}));

vi.mock("./Visibility", () => ({
  default: () => <div data-testid="visibility">Visibility Section</div>
}));

vi.mock("./DataAndPrivacy", () => ({
  default: () => <div data-testid="data-privacy">Data Privacy Section</div>
}));

vi.mock("./AdvertisingData", () => ({
  default: () => <div data-testid="advertising-data">Advertising Data Section</div>
}));

describe("Settings Component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/settings/account-preferences"]}>
        <Routes>
          <Route path="/settings" element={<Settings />}>
            <Route path="account-preferences" element={<AccountPreferences />} />
            <Route path="sign-in-security" element={<SignInAndSecurity />} />
            <Route path="visibility" element={<Visibility />} />
            <Route path="data-privacy" element={<DataAndPrivacy />} />
            <Route path="advertising-data" element={<AdvertisingData />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  });

  it("renders the header and logo", () => {
    expect(screen.getByTestId("header-test")).toBeInTheDocument();
  });

  it("renders sidebar items", () => {
    expect(screen.getByText("Account preferences")).toBeInTheDocument();
    expect(screen.getByText("Sign in & security")).toBeInTheDocument();
    expect(screen.getByText("Visibility")).toBeInTheDocument();
    expect(screen.getByText("Data privacy")).toBeInTheDocument();
    expect(screen.getByText("Advertising data")).toBeInTheDocument();
    expect(screen.getByText("Notifications")).toBeInTheDocument();
  });

  it("renders Account Preferences by default", () => {
    expect(screen.getByTestId("account-preferences")).toBeInTheDocument();
  });

  it("renders Notifications section on click", () => {
    const notificationsTab = screen.getByText("Notifications");
    fireEvent.click(notificationsTab);
    expect(screen.getByTestId("notifications")).toBeInTheDocument();
  });

  it("renders Sign in & Security section on click", () => {
    const signInTab = screen.getByText("Sign in & security");
    fireEvent.click(signInTab);
    expect(screen.getByTestId("sign-in-security")).toBeInTheDocument();
  });

  it("renders Visibility section on click", () => {
    fireEvent.click(screen.getByText("Visibility"));
    expect(screen.getByTestId("visibility")).toBeInTheDocument();
  });

  it("renders Data Privacy section on click", () => {
    fireEvent.click(screen.getByText("Data privacy"));
    expect(screen.getByTestId("data-privacy")).toBeInTheDocument();
  });

  it("renders Advertising Data section on click", () => {
    fireEvent.click(screen.getByText("Advertising data"));
    expect(screen.getByTestId("advertising-data")).toBeInTheDocument();
  });
});
