import { useEffect } from "react";
import PageChatSystem from "../components/chat/PageChat/PageChatSystem";
import { useUser } from "../components/chat/mockUse";
export function MessagingPage() {
  const { setUser } = useUser();
  useEffect(() => {
    const chatId = window.prompt("Enter Chat ID:") || "1";
    setUser(chatId);
  }, []);

  return (
    <>
      <PageChatSystem />
      <iframe src="https://www.example.com" width="600" height="400"></iframe>
    </>
  );
}

export default MessagingPage;
