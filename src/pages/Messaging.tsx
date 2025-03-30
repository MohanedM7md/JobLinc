import { useEffect, useState } from "react";
import PageChatSystem from "@chatComponent/PageChat/PageChatSystem";
import { UserProvider } from "@chatComponent/mockUse"; // Adjust the import path as necessary
import { ChatIdProvider } from "@context/ChatIdProvider";
import { NetworkUserIdProvider } from "@context/NetworkUserIdProvider";
import { useAppSelector } from "@store/hooks";

export function MessagingPage() {
  const [userId, setUserId] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };
  const user = useAppSelector((state) => state.user);
  console.log("Redux store in messaginh", user);
  return (
    <>
      <div className="h-[100vh] overflow-hidden">
        <UserProvider userId={userId}>
          <ChatIdProvider>
            <NetworkUserIdProvider>
              <PageChatSystem />
            </NetworkUserIdProvider>
          </ChatIdProvider>
        </UserProvider>
      </div>
    </>
  );
}

export default MessagingPage;
