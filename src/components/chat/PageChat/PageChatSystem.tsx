import { useCallback, useEffect } from "react";
import ChatCardsList from "../ChatCardsList";
import PageMessageWindow from "./PageChatWindow";
import useChatId from "@context/ChatIdProvider";
import connectToChat, { disconnectChatSocket } from "@services/api/ChatSocket";

const PageChatSystem = () => {
  useEffect(() => {
    connectToChat();
    return () => disconnectChatSocket();
  }, []);
  const { setChatId } = useChatId();
  console.log("Page System");
  const handleConversationClick = useCallback((chatId: string) => {
    setChatId(chatId);
  }, []);
  return (
    <div className="flex h-screen w-full">
      <div className="w-1/3 border-r bg-charcoalWhite border-gray-300 p-4 overflow-y-auto">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-semibold text-lg">Messaging</h2>
        </div>
        <ChatCardsList className="" onCardClick={handleConversationClick} />
      </div>
      <PageMessageWindow className="flex-grow flex flex-col justify-end" />
    </div>
  );
};

export default PageChatSystem;
