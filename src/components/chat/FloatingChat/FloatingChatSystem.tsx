import FloatingChatSidebar from "./FloatingChatSidebar";
import FloatingChatWindow from "./FloatingChatWindow";
import useChats from "@hooks/useChats";
import { ChatIdProvider } from "@context/ChatIdProvider";
import connectToChat, { disconnectChatSocket } from "@services/api/ChatSocket";
import { useEffect } from "react";
function FloatingChatSystem() {
  const { opnedChatsId = [] } = useChats();
  useEffect(() => {
    connectToChat();
    return () => disconnectChatSocket();
  }, []);
  return (
    <>
      <FloatingChatSidebar />
      {opnedChatsId.map((opnedChatId, index) => {
        return (
          <ChatIdProvider key={opnedChatId} id={opnedChatId}>
            <FloatingChatWindow
              key={opnedChatId}
              style={{ right: `${index * 410 + 330}px` }}
            />
          </ChatIdProvider>
        );
      })}
    </>
  );
}

export default FloatingChatSystem;
