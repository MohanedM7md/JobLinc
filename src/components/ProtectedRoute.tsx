import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@store/hooks";
import { useState } from "react";

function ProtectedRoute() {
  const user = useAppSelector((state) => state.user);
  const refreshToken = localStorage.getItem("refreshToken");
  // return user.loggedIn ? <Outlet /> : <Navigate to="/Signin" replace />;
  return user.loggedIn  ? <Outlet /> : <Navigate to="/Signin" replace />;
}

export default ProtectedRoute;
