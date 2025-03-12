import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./context/ThemeProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import LandPage from "./pages/LandPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ThemeProvider>
              <Home />
              <LandPage />
            </ThemeProvider>
          }>
        </Route>
        <Route path="Signup" element={<SignUpPage />}></Route>
        <Route path="Signin" element={<SignInPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
