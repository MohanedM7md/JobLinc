import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { useEffect, useState } from "react";
import { setUserDetails } from "@store/user/userThunks";
import LoadingScreen from "@pages/LoadingScreen";
import store from "@store/store";
function ProtectedRoute() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(setUserDetails()).unwrap();
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  if (isCheckingAuth) {
    return <LoadingScreen />; // Or your custom loading component
  }

  return user.loggedIn ? <Outlet /> : <Navigate to="/Signin" replace />;
}

export default ProtectedRoute;
