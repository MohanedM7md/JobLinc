import { Outlet } from "react-router-dom";
import { lazy } from "react";
const FloatingChatSystem = lazy(
  () => import("@chatComponent/FloatingChat/FloatingChatSystem"),
);
import Navbar from "./NavigationBar/NavBar";
import ChatProvider from "@context/ChatsIdProvider";

function Layout() {
  return (
    <>
      <Navbar />
      <main className="bg-warmWhite h-full">
        <ChatProvider>
          <FloatingChatSystem />
          <Outlet />
        </ChatProvider>
      </main>
    </>
  );
}

export default Layout;
