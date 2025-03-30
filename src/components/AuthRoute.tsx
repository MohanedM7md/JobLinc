// components/AuthRoute.tsx
import { useAppSelector } from "@store/hooks";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthRoute() {
  const user = useAppSelector((state) => state.user);

  return user.loggedIn ? <Navigate to="/home" replace /> : <Outlet />;
}
