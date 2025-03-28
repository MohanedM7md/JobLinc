import { useEffect, useState } from "react";
import PageChatSystem from "../components/chat/PageChat/PageChatSystem";
import { UserProvider } from "../components/chat/mockUse"; // Adjust the import path as necessary

export function MessagingPage() {
  const [userId, _] = useState(window.prompt("Enter Chat ID:") || "1");

  return (
    <>
      <UserProvider userId={userId}>
        <PageChatSystem />
      </UserProvider>
    </>
  );
}

export default MessagingPage;
