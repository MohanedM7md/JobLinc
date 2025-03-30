import { Route, Routes } from "react-router-dom";
import PlayGround from "./pages/PlayGround";
import "./context/ThemeProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import LandPage from "./pages/Land";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import UserDetails from "./components/Authentication/UserDetails";
import MessagingPage from "./pages/Messaging";
import Home from "./pages/Home";
import MyNetwork from "./pages/MyNetworkPage";
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

function App() {
  return (
    <>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<LandPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route
            path="/user-details"
            element={<UserDetails email="" password="" />}
          />
          <Route path="/signin/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/confirm-email"
            element={<ConfirmEmail email="" token="" />}
          />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/my-network" element={<MyNetwork />} />
{/*               <Route path="/messaging" element={<MessagingPage />} />
 */}
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/update-email" element={<UpdateEmail />} />
              <Route path="/update-username" element={<UpdateUsername />} />
              <Route path="/post">
                <Route index element={<PostContainer />} />
                <Route path="create" element={<PostCreate />} />
                <Route path=":postId/edit" element={<PostEdit />} />
              </Route>
            </Route>

            <Route path="/playground" element={<PlayGround />} />
          </Route>

          <Route path="*" element={<Error404 />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
