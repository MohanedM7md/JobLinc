import { useAppSelector } from "@store/hooks";
import { Navigate, Outlet } from "react-router-dom";

function AuthRoute() {
  //const user = useAppSelector((state) => state.user);
  const user = { loggedIn: true }; // Fake user for testing
  return user.loggedIn ? <Navigate to="/home" replace /> : <Outlet />;
}
export default AuthRoute;

// //!For Testing Only

// import { Outlet } from "react-router-dom";

// function AuthRoute() {
//   // 🟢 During development, allow all access to login-protected routes too
//   return <Outlet />;
// }

// export default AuthRoute;
