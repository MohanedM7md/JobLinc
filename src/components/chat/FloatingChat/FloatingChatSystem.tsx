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
        const { chatId, usersId, chatName, chatImage } = opnedChat;

        return (
          <ChatIdProvider key={chatId} id={chatId}>
            <NetworkUserIdProvider key={usersId[0]} ids={usersId}>
              <FloatingChatWindow
                key={chatId}
                style={{ right: `${index * 410 + 330}px` }}
                chatName={chatName}
                chatPicture={chatImage}
              />
            </NetworkUserIdProvider>
          </ChatIdProvider>
        );
      })}
    </>
  );
}

export default FloatingChatSystem;
