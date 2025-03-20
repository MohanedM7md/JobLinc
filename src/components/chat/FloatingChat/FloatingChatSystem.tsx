import FloatingChatSidebar from "./FloatingChatSidebar";
import FloatingChatWindow from "./FloatingChatWindow";
import useChats from "@hooks/useChats";
import { ChatIdProvider } from "@context/ChatIdProvider";
import { NetworkUserIdProvider } from "@context/NetworkUserIdProvider";
import connectToChat, { disconnectChatSocket } from "@services/api/ChatSocket";
import { useEffect } from "react";
function FloatingChatSystem() {
  const { opnedChats = [] } = useChats();
  useEffect(() => {
    connectToChat();
    return () => disconnectChatSocket();
  }, []);
  return (
    <>
      <FloatingChatSidebar />
      {opnedChats.map((opnedChat, index) => {
        const { chatId, userId } = opnedChat; // Extract values properly

        return (
          <ChatIdProvider key={chatId} id={chatId}>
            <NetworkUserIdProvider key={userId} id={userId}>
              <FloatingChatWindow
                key={chatId} // Ensure each FloatingChatWindow has a unique key
                style={{ right: `${index * 410 + 330}px` }}
              />
            </NetworkUserIdProvider>
          </ChatIdProvider>
        );
      })}
    </>
  );
}

export default FloatingChatSystem;
