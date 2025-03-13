import { TheNothingButton } from "../components/TheNothingButton";
import { GetNothing } from "../api/api";
import useTheme from "../hooks/useTheme";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchUser } from "../store/userSlice";
import ChatProvider from "../context/ChatsIdProvider";
import { useEffect } from "react";
import { ChatSideBar } from "../components/chat/ChatSidebar";

function PlayGround() {
  /*   const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUser()); // Load user data on mount
  }, [dispatch]); */
  const { darkMode, setDarkMode } = useTheme();
  useEffect(() => {
    GetNothing();
  });
  return (
    <div className="h-full dark:bg-charcoalBlack">
      <h1>Welcome Home</h1>
      <TheNothingButton />
      <button
        className="bg-darkBurgundy cursor-pointer"
        onClick={() => {
          setDarkMode(!darkMode);
        }}
      >
        ThemeModeToggler
      </button>
      <div>
        <h1>
          {/* wlecome <div className=" text-3xl inline">{user.name}</div>{" "} */}
        </h1>
      </div>
      <ChatProvider>
        <ChatSideBar />
      </ChatProvider>
    </div>
  );
}

export default PlayGround;
