import { Route, Routes } from "react-router-dom";
import PlayGround from "./pages/PlayGround";
import "./context/ThemeProvider";
import LandPage from "./pages/LandPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ForgotPassword from "./pages/ForgotPassword";
import MainPage from "./pages/MainPage";
//import { Provider } from "react-redux";
import store from "./store/store";
import { ThemeProvider } from "./context/ThemeProvider";
import PostContainer from "./components/Posts/PostContainer";
import { Provider } from "react-redux";

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
        ></Route>
        <Route path="/Signup" element={<SignUpPage />}></Route>
        <Route path="/Signin" element={<SignInPage />}></Route>
        <Route
          path="/Signin/ForgotPassword"
          element={<ForgotPassword />}
        ></Route>
        <Route path="/MainPage" element={<MainPage />}></Route>
        {/* <Route
          path="/playground"
          element={
            <Provider store={store}>
              <PlayGround />
            </Provider>
          }
        /> */}
        <Route
          path="/post"
          element={
            <Provider store={store}>
              <PostContainer />
            </Provider>
          }
        />
        <Route
          path="/*"
          element={<div className="text-red-500">Erorr 404</div>}
        />
      </Routes>
    </>
  );
}

export default App;
