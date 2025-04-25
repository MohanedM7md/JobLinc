import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@store/hooks";

function ProtectedRoute() {
  const user = useAppSelector((state) => state.user);

  return user.loggedIn ? <Outlet /> : <Navigate to="/Signin" replace />;
}

export default ProtectedRoute;
