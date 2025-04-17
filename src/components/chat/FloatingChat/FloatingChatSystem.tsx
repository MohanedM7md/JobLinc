import FloatingChatSidebar from "./FloatingChatSidebar";
import FloatingChatWindow from "./FloatingChatWindow";
import useChats from "@hooks/useChats";
import { ChatIdProvider } from "@context/ChatIdProvider";
import { NetworkUserIdProvider } from "@context/NetworkUserIdProvider";
import connectToChat, { disconnectChatSocket } from "@services/api/ChatSocket";
import { useEffect, useState } from "react";
function FloatingChatSystem() {
  const { opnedChats = [] } = useChats();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  useEffect(() => {
    const initializeChat = async () => {
      await connectToChat();
      setIsConnected(true);
    };

    initializeChat();
    return () => {
      disconnectChatSocket();
      setIsConnected(false);
    };
  }, []);
  return (
    <div className="flex flex-row-reverse items-end fixed bottom-0 right-0 z-10">
      {isConnected && <FloatingChatSidebar />}
      {opnedChats.map((opnedChat, index) => {
        const { chatId, usersId, chatName, chatImage } = opnedChat;

        return (
          <ChatIdProvider key={chatId} id={chatId}>
            <NetworkUserIdProvider key={usersId[0]} ids={usersId}>
              <FloatingChatWindow
                key={chatId}
                chatName={chatName}
                chatPicture={chatImage}
              />
            </NetworkUserIdProvider>
          </ChatIdProvider>
        );
      })}
    </div>
  );
}

export default FloatingChatSystem;
