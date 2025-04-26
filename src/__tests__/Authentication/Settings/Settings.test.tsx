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
import DarkMode from "@pages/Settings/AccountPreferences/Display/DarkMode";


describe("Settings Component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/settings/account-preferences"]}>
        <Routes>
          <Route path="/settings" element={<Settings />}>
            <Route path="account-preferences" element={<AccountPreferences />} />
            <Route path="account-preferences/display/dark-mode" element={<DarkMode />} />
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
    expect(screen.getByText("Profile information")).toBeInTheDocument();
    expect(screen.getByText("Display")).toBeInTheDocument();
    expect(screen.getByText("General preferences")).toBeInTheDocument();
    expect(screen.getByText("Syncing options")).toBeInTheDocument();
    expect(screen.getByText("Subscriptions & payments")).toBeInTheDocument();
    expect(screen.getByText("Partners & services")).toBeInTheDocument();
    expect(screen.getByText("Account management")).toBeInTheDocument();


  });

  it("renders Notifications section on click", () => {
    const notificationsTab = screen.getByText("Notifications");
    fireEvent.click(notificationsTab);
    expect(screen.getByText("Notifications you receive")).toBeInTheDocument();
  });

  it("renders Sign in & Security section on click", () => {
    const signInTab = screen.getByText("Sign in & security");
    fireEvent.click(signInTab);
    expect(screen.getByText("Account access")).toBeInTheDocument();
  });

  it("renders Visibility section on click", () => {
    fireEvent.click(screen.getByText("Visibility"));
    expect(screen.getByText("Visibility of your profile & network")).toBeInTheDocument();
    expect(screen.getByText("Visibility of your JobLinc activity")).toBeInTheDocument();

  });

  it("renders Data Privacy section on click", () => {
    fireEvent.click(screen.getByText("Data privacy"));
    expect(screen.getByText("How JobLinc uses your data")).toBeInTheDocument();
    expect(screen.getByText("Who can reach you")).toBeInTheDocument();
    expect(screen.getByText("Messaging experience")).toBeInTheDocument();
    expect(screen.getByText("Job seeking preferences")).toBeInTheDocument();
    expect(screen.getByText("Other applications")).toBeInTheDocument();

  });

  it("renders Advertising Data section on click", () => {
    fireEvent.click(screen.getByText("Advertising data"));
    expect(screen.getByText("Profile data")).toBeInTheDocument();
    expect(screen.getByText("Activity and inferred data")).toBeInTheDocument();
    expect(screen.getByText("Third-party data")).toBeInTheDocument();

  });
});
