import { useAppSelector } from "@store/hooks";
import { Navigate, Outlet } from "react-router-dom";

function AuthRoute() {
  const userId = localStorage.getItem("userId");
  return userId ? <Navigate to="/home" replace /> : <Outlet />;
}
export default AuthRoute;
