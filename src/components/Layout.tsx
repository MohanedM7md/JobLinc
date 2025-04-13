import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import FloatingChatSystem from "@chatComponent/FloatingChat/FloatingChatSystem";
import ChatProvider from "@context/ChatsIdProvider";

function Layout() {
  return (
    <>
      <Navbar />
      <main className="">
        <ChatProvider>
          <FloatingChatSystem />
        </ChatProvider>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
