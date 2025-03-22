import { Route, Routes } from "react-router-dom";
import PlayGround from "./pages/PlayGround";
import "./context/ThemeProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import LandPage from "./pages/LandPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ForgotPassword from "./pages/ForgotPassword";
import MainPage from "./pages/MainPage";
import UserDetails from "./components/Authentication/UserDetails";
import { Provider } from "react-redux";
import store from "./store/store";
import MessagingPage from "./pages/Messaging";
import HomePage from "./pages/HomePage";
import MyNetwork from "./pages/MyNetworkPage";
import PostContainer from "./components/Posts/PostContainer";
import PostCreate from "./components/Posts/PostCreate";
import PostEdit from "./components/Posts/PostEdit";
import ChangePassword from "./pages/ChangePassword";
import ResetPassword from "./pages/ResetPassword";
import UpdateEmail from "./pages/UpdateEmail";
import UpdateUsername from "./pages/UpdateUsername";

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
        <Route path="/UserDetails" element={<UserDetails />} />
        <Route path="/post/create" element={<PostCreate />} />
        <Route path="/post" element={<PostContainer />} />
        <Route path="/post/:postID/edit" element={<PostEdit />} />
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
