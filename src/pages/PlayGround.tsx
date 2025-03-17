import { TheNothingButton } from "../components/TheNothingButton";
import useTheme from "../hooks/useTheme";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchUser } from "../store/userSlice";
import { useUser } from "../components/chat/mockUse";
import ChatProvider from "../context/ChatsIdProvider";
import { useEffect } from "react";
import FloatingChatSystem from "../components/chat/FloatingChat/FloatingChatSystem";
import { UserProvider } from "../components/chat/mockUse";

function PlayGround() {
  /*   const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUser()); // Load user data on mount
  }, [dispatch]); */

  const { darkMode, setDarkMode } = useTheme();
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
      <UserProvider>
        <ChatProvider>
          <FloatingChatSystem />
        </ChatProvider>
      </UserProvider>
    </div>
  );
}

export default PlayGround;
