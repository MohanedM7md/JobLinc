import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import FloatingChatSystem from "@chatComponent/FloatingChat/FloatingChatSystem";
import ChatProvider from "@context/ChatsIdProvider";
import { useNotificationStore } from "../store/Notification/notificationStore";
import { NotificationService } from "../__mocks__/NotificationsMock/mockNotifications";
function Layout() {
  const fetchNotifications = useNotificationStore((s) => s.fetchNotifications);
  const addNotification = useNotificationStore((s) => s.addNotification);

  useEffect(() => {
    //?  Fetch on ON Start
    fetchNotifications();

    //?  Fetch every 15 seconds
    const interval = setInterval(fetchNotifications, 15000);

    // ? Real-time listener (live notifications)
    NotificationService.onNewNotification((newNotif) => {
      addNotification(newNotif);
    });

    // ? Simulate new notifications every 20s (dev only)
    const fakePush = setInterval(() => {
      NotificationService.pushNewRandom();
    }, 20000);

    return () => {
      clearInterval(interval);
      clearInterval(fakePush);
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="">
        {/* Future Chat System */}
        {/* <ChatProvider>
          <FloatingChatSystem />
        </ChatProvider> */}

        {/* Main content routes */}
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
