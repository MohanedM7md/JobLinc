import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const Layout = lazy(() => import("./components/Layout"));
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";
import Error404 from "@pages/Eror404";
import LoadingScreen from "@pages/LoadingScreen";

const UserProfile = lazy(() => import("./pages/UserProfile"));

const SubscriptionManager = lazy(() => import("./pages/SubscriptionManager"));

//  auth and frequently used pages
const LandPage = lazy(() => import("./pages/Land"));
const SignUpPage = lazy(() => import("./pages/SignUp"));
const SignInPage = lazy(() => import("./pages/SignIn"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const UserDetails = lazy(
  () => import("./components/Authentication/UserDetails"),
);
const ChangePassword = lazy(() => import("./pages/ChangePassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const UpdateUsername = lazy(() => import("./pages/UpdateUsername"));
const Connections = lazy(() => import("./pages/Connections"));
/* import AllCompanies from "@pages/Company/AllCompanies"; */

//Home & Static pages
const Home = lazy(() => import("./pages/Home"));
const Messaging = lazy(() => import("./pages/Messaging"));
import MyNetwork from "./pages/MyNetwork";

// Profile components
import ProfileContainer from "./components/User Profile/ProfileContainer";
import FullExperiences from "./components/User Profile/Experiences/FullExperiences";
import FullCertificates from "./components/User Profile/Certificates/FullCertificates";
import FullSkills from "./components/User Profile/Skills/FullSkills";
import FullActivity from "@components/User Profile/Miscellaneous/FullActivity";
import SavedPosts from "@components/User Profile/Miscellaneous/SavedPosts";

// Post components
import PostEdit from "./components/Posts/PostEdit";
import Post from "@pages/Post";

// Settings components
const Settings = lazy(() => import("@pages/Settings/Settings"));
const AccountPreferences = lazy(
  () => import("@pages/Settings/AccountPreferences"),
);
const Notifications = lazy(() => import("@pages/Settings/Notifications"));
const SignInAndSecurity = lazy(
  () => import("@pages/Settings/SignInAndSecurity"),
);
const Visibility = lazy(() => import("@pages/Settings/Visibility"));
const DataAndPrivacy = lazy(() => import("@pages/Settings/DataAndPrivacy"));
const AdvertisingData = lazy(() => import("@pages/Settings/AdvertisingData"));
const DarkMode = lazy(
  () => import("@pages/Settings/AccountPreferences/Display/DarkMode"),
);
const CloseAccount = lazy(
  () =>
    import("@pages/Settings/AccountPreferences/AccountManagement/CloseAccount"),
);
const EmailAddress = lazy(
  () => import("@pages/Settings/SignInAndSecurity/AccountAccess/EmailAddress"),
);
const DemographicInfo = lazy(
  () =>
    import(
      "@pages/Settings/AccountPreferences/ProfileInformation/DemographicInfo"
    ),
);

// Componay Pages
const Admin = lazy(() => import("./pages/Company/Admin"));
const MyCompanies = lazy(() => import("./pages/Company/MyCompanies"));
const Member = lazy(() => import("@pages/Company/Member"));
import CreateForm from "@pages/Company/CreateForm";
import FullEducations from "@components/User Profile/Educations/FullEducations";
import BlockList from "@components/Connections/BlockList";

const queryClient = new QueryClient();

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
        <Routes>
          {/* Public Routes */}
          <Route element={<AuthRoute />}>
            <Route path="/" element={<LandPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/user-details" element={<UserDetails />} />
            <Route
              path="/signin/forgot-password"
              element={<ForgotPassword />}
            />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          {/* Protected Routes with Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              {/* Main App Routes */}
              <Route path="/home" element={<Home />} />
              <Route path="/my-network" element={<MyNetwork />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/messaging" element={<Messaging />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/update-username" element={<UpdateUsername />} />

              {/* Profile Routes */}
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
                <Route path="details/education" element={<FullEducations />} />
                <Route path="details/activity" element={<FullActivity />} />
                <Route path="details/skills" element={<FullSkills />} />
                <Route path="details/saved-items" element={<SavedPosts />} />
              </Route>

              {/* Post Routes */}
              <Route path="/post">
                <Route path=":postId/edit" element={<PostEdit />} />
                <Route path=":postId" element={<Post />} />
              </Route>

              {/* Settings Routes */}
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
                  path="account-preferences/profile-information/demographic-info"
                  element={<DemographicInfo />}
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
                  element={<BlockList />}
                />
                <Route path="data-privacy" element={<DataAndPrivacy />} />
                <Route path="advertising-data" element={<AdvertisingData />} />
                <Route path="notifications" element={<Notifications />} />
              </Route>

              {/* Company Routes */}
              <Route path="/company">
                <Route path="setup/new" element={<CreateForm />} />
                <Route path="my-companies" element={<MyCompanies />} />
                <Route path="admin/:companyId" element={<Admin />} />
                <Route path="member/:slug" element={<Member />} />
              </Route>
            </Route>
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
