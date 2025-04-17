import { useAppSelector } from "@store/hooks";
import { Navigate, Outlet } from "react-router-dom";

function AuthRoute() {
  const user = useAppSelector((state) => state.user);
  return user.loggedIn ? <Navigate to="/home" replace /> : <Outlet />;
}
export default AuthRoute;
