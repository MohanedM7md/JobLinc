import { Route, Routes } from "react-router-dom";
import "./context/ThemeProvider";
import LandPage from "./pages/LandPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
              <LandPage />
          }>
          
        </Route>
        <Route path="/Signup" element={<SignUpPage />}></Route>
        <Route path="/Signin" element={<SignInPage />}></Route>
        <Route path="/Signin/ForgotPassword" element={<ForgotPassword/>}></Route>
        
      </Routes>
    </>
  );
}

export default App;
