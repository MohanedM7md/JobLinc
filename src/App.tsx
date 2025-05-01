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
const Admin = lazy(() => import("./pages/Company/Admin"));
const MyCompanies = lazy(() => import("./pages/Company/MyCompanies"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
import Home from "./pages/Home";
import MyNetwork from "./pages/MyNetwork";
import PostContainer from "./components/Posts/PostContainer";
import { CreateForm } from "@pages/Company/CreateForm";
import PostCreate from "./components/Posts/PostCreate";
import PostEdit from "./components/Posts/PostEdit";
import ChangePassword from "./pages/ChangePassword";
import ResetPassword from "./pages/ResetPassword";
import UpdateUsername from "./pages/UpdateUsername";
import Error404 from "@pages/Eror404";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";
import MyConnections from "./pages/Connections";
import ProfileContainer from "./components/User Profile/ProfileContainer";
import FullExperiences from "./components/User Profile/Experiences/FullExperiences";
import FullCertificates from "./components/User Profile/Certificates/FullCertificates";
import FullSkills from "./components/User Profile/Skills/FullSkills";
const Settings = lazy(() => import("@pages/Settings/Settings"));
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
import Member from "@pages/Company/Member";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EmailAddress from "@pages/Settings/SignInAndSecurity/AccountAccess/EmailAddress";
import Metrics from "./components/Company/Metrics";
import BlockedUsers from "@pages/BlockedUsers";
import UserConnections from "@pages/UserConnections";
import FollowersFollowing from "@pages/FollowersFollowing";
import DemographicInfo from "@pages/Settings/AccountPreferences/ProfileInformation/DemographicInfo";
import SearchResult from "@pages/SearchResult";

const queryClient = new QueryClient();

const stripePromise = loadStripe("pk_test_...");

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <QueryClientProvider client={queryClient}>
        <Elements stripe={stripePromise}>
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
                <Route path="/my-connections" element={<MyConnections />} />
                <Route path="/search-results" element={<SearchResult/>}/>
                <Route
                  path="/followers-following"
                  element={<FollowersFollowing />}
                />
                <Route path="/messaging" element={<Messaging />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/metrics" element={<Metrics />} />
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
                <Route path="/thank-you" element={<ThankYouPage />} />
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
                />
                <Route path="/post">
                  <Route path="create" element={<PostCreate />} />
                  <Route path=":postId/edit" element={<PostEdit />} />
                </Route>
                <Route path="/settings" element={<Settings />}>
                  <Route index element={<AccountPreferences />} />
                  <Route
                    path="account-preferences"
                    element={<AccountPreferences />}
                  />
                  <Route
                    path="account-preferences/profile-information/demographic-info"
                    element={<DemographicInfo />}
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
                  <Route
                    path="sign-in-security/account-access/email-address"
                    element={<EmailAddress />}
                  />
                  <Route path="visibility" element={<Visibility />} />
                  <Route
                    path="visibility/profile-network/blocking"
                    element={<BlockedUsers />}
                  />
                  <Route path="data-privacy" element={<DataAndPrivacy />} />
                  <Route
                    path="advertising-data"
                    element={<AdvertisingData />}
                  />
                  <Route path="notifications" element={<Notifications />} />
                </Route>
                <Route path="/update-username" element={<UpdateUsername />} />
                <Route path="/profile/:userId">
                  <Route index element={<ProfileContainer />} />
                  <Route path="connections" element={<UserConnections />} />
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
                <Route path="/thank-you" element={<ThankYouPage />} />
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
                />
                <Route path="/post">
                  <Route path="create" element={<PostCreate />} />
                  <Route path=":postId/edit" element={<PostEdit />} />
                </Route>
              </Route>

              <Route path="/company">
                <Route path="setup/new" element={<CreateForm />} />
                <Route path="my-companies" element={<MyCompanies />} />
                <Route path={`admin/:companyId`} element={<Admin />} />
                <Route path={`member/:slug`} element={<Member />} />
              </Route>
            </Route>

            <Route path="*" element={<Error404 />} />
          </Routes>
        </Elements>
      </QueryClientProvider>
    </>
  );
}

export default App;
