import { TheNothingButton } from "../components/TheNothingButton";
import { GetNothing } from "../api/api";
import useTheme from "../hooks/useTheme";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../store/userSlice";
import { useEffect } from "react";

function PlayGround() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUser()); // Load user data on mount
  }, [dispatch]);
  const { darkMode, setDarkMode } = useTheme();
  GetNothing();
  return (
    <div className="h-full dark:bg-charcoalBlack">
      <h1>Welcome Home</h1>
      <TheNothingButton />
      <button
        className="bg-darkBurgundy cursor-pointer"
        onClick={() => {
          setDarkMode(!darkMode);
          console.log("themeSwitched");
        }}
      >
        ThemeModeToggler
      </button>
      <div>
        <h1>Welcome, !</h1>
      </div>
    </div>
  );
}

export default PlayGround;
