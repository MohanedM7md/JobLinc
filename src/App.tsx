import { Route, Routes } from "react-router-dom";
import "./context/ThemeProvider";
import { lazy } from "react";
import { ThemeProvider } from "./context/ThemeProvider";
import LandPage from "./pages/Land";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import UserDetails from "./components/Authentication/UserDetails";
const Messaging = lazy(() => import("./pages/Messaging"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
//const MyNetwork = lazy(() => import("./pages/MyNetwork"));
import Home from "./pages/Home";
import MyNetwork from "./pages/MyNetwork";
import PostContainer from "./components/Posts/PostContainer";
import PostCreate from "./components/Posts/PostCreate";
import PostEdit from "./components/Posts/PostEdit";
import ChangePassword from "./pages/ChangePassword";
import ResetPassword from "./pages/ResetPassword";
import UpdateEmail from "./pages/UpdateEmail";
import UpdateUsername from "./pages/UpdateUsername";
import ConfirmEmail from "./pages/ConfirmEmail";
import Error404 from "@pages/Eror404";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";
import Connections from "./pages/Connections";
import ProfileContainer from "./components/User Profile/ProfileContainer";
import FullExperiences from "./components/User Profile/Experiences/FullExperiences";
import FullCertificates from "./components/User Profile/Certificates/FullCertificates";
import FullSkills from "./components/User Profile/Skills/FullSkills";
import Settings from "@pages/Settings/Settings";
import AccountPreferences from "@pages/Settings/AccountPreferences";
import Notifications from "@pages/Settings/Notifications";
import SignInAndSecurity from "@pages/Settings/SignInAndSecurity";
import Visibility from "@pages/Settings/Visibility";
import DataAndPrivacy from "@pages/Settings/DataAndPrivacy";
import AdvertisingData from "@pages/Settings/AdvertisingData";
import DarkMode from "@pages/Settings/AccountPreferences/Display/DarkMode";

import CloseAccount from "@pages/Settings/AccountPreferences/AccountManagement/CloseAccount";

import ThankYouPage from "./pages/ThankYouPage";

import SubscriptionLandingPage from "./pages/SubscriptionLandingPage";
import SubscriptionManagePage from "./pages/SubscriptionManagePage";
import RecurringPaymentPage from "./pages/RecurringPaymentPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Toaster } from "react-hot-toast";
import SubscriptionManager from "./pages/SubscriptionManager";

// const stripePromise = loadStripe("pk_test_...");

function App() {
  return (
    <>
      <ThemeProvider>
        {/* <Elements stripe={stripePromise}> */}
          <Routes>
            <Route element={<AuthRoute />}>
              <Route path="/" element={<LandPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route
                path="/user-details"
                element={<UserDetails /* email="" password="" */ />}
              />
              <Route
                path="/signin/forgot-password"
                element={<ForgotPassword />}
              />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/my-network" element={<MyNetwork />} />
                <Route path="/connections" element={<Connections />} />
                <Route path="/messaging" element={<Messaging />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/confirm-email" element={<ConfirmEmail />} />

                <Route path="/settings" element={<Settings />}>
                  <Route index element={<AccountPreferences />} />
                  <Route
                    path="account-preferences"
                    element={<AccountPreferences />}
                  />
                  <Route
                    path="account-preferences/display/dark-mode"
                    element={<DarkMode />}
                  />
                  <Route
                    path="account-preferences/account-management/close-account"
                    element={<CloseAccount />}
                  />

                  <Route
                    path="sign-in-security"
                    element={<SignInAndSecurity />}
                  />
                  <Route
                    path="sign-in-security/account-access/change-password"
                    element={<ChangePassword />}
                  />

                  <Route path="visibility" element={<Visibility />} />
                  <Route path="data-privacy" element={<DataAndPrivacy />} />
                  <Route
                    path="advertising-data"
                    element={<AdvertisingData />}
                  ></Route>
                  <Route path="notifications" element={<Notifications />} />
                </Route>

                <Route path="/update-email" element={<UpdateEmail />} />
                <Route path="/update-username" element={<UpdateUsername />} />
                <Route path="/profile/:userId">
                  <Route index element={<ProfileContainer />} />
                  <Route
                    path="details/experiences"
                    element={<FullExperiences />}
                  />
                  <Route
                    path="details/certificates"
                    element={<FullCertificates />}
                  />
                  <Route path="details/skills" element={<FullSkills />} />
                </Route>
                {/* <Route path="/thank-you" element={<ThankYouPage />} />
                <Route path="/premium" element={<SubscriptionLandingPage />} />
                <Route
                  path="/manage-subscription"
                  element={<SubscriptionManager />}
                />

                <Route
                  path="/subscription-manage"
                  element={<SubscriptionManagePage />}
                />
                <Route
                  path="/recurring-payment"
                  element={<RecurringPaymentPage />}
                /> */}
                <Route path="/post">
                  <Route path="create" element={<PostCreate />} />
                  <Route path=":postId/edit" element={<PostEdit />} />
                </Route>
              </Route>
            </Route>

            <Route path="*" element={<Error404 />} />
          </Routes>
        {/* </Elements> */}
        {/* <Toaster position="top-right" reverseOrder={false} />{" "} */}
      </ThemeProvider>
    </>
  );
}

export default App;
