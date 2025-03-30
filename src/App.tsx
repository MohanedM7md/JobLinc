import { Route, Routes } from "react-router-dom";
import PlayGround from "./pages/PlayGround";
import "./context/ThemeProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import LandPage from "./pages/Land";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import MainPage from "./pages/Main";
import UserDetails from "./components/Authentication/UserDetails";
import { Provider } from "react-redux";
import store from "./store/store";
import MessagingPage from "./pages/Messaging";
import HomePage from "./pages/Home";
import MyNetwork from "./pages/MyNetworkPage";
import PostContainer from "./components/Posts/PostContainer";
import PostCreate from "./components/Posts/PostCreate";
import PostEdit from "./components/Posts/PostEdit";
import ChangePassword from "./pages/ChangePassword";
import ResetPassword from "./pages/ResetPassword";
import UpdateEmail from "./pages/UpdateEmail";
import UpdateUsername from "./pages/UpdateUsername";
import ConfirmEmail from "./pages/ConfirmEmail";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ThemeProvider>
              <LandPage />
            </ThemeProvider>
          }
        />
        <Route path="/Signup" element={<SignUpPage />} />
        <Route path="/Signin" element={<SignInPage />} />
        <Route path="/Signin/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/ChangePassword" element={<ChangePassword />}></Route>
        <Route path="/UpdateEmail" element={<UpdateEmail />} />
        <Route path="/UpdateUsername" element={<UpdateUsername />} />

        <Route path="/messaging" element={<MessagingPage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/MyNetwork" element={<MyNetwork />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/UserDetails" element={<UserDetails email="" password="" />} />
        <Route path="/ConfirmEmail" element={<ConfirmEmail email="" token=""/>} />
        <Route path="/post/create" element={<PostCreate />} />
        <Route path="/post" element={<PostContainer />} />
        <Route path="/post/:postId/edit" element={<PostEdit />} />
        <Route
          path="/playground"
          element={
            <ThemeProvider>
              <Provider store={store}>
                <PlayGround />
              </Provider>
            </ThemeProvider>
          }
        />

        <Route
          path="/*"
          element={<div className="text-red-500">Error 404</div>}
        />
      </Routes>
    </>
  );
}

export default App;
