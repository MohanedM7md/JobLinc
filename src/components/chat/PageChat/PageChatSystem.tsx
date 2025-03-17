import React, { useState, useCallback, memo } from "react";
import ChatCardsList from "../ChatCardsList";
import PageMessageWindow from "./PageChatWindow";
import { ChatIdProvider } from "../../../context/ChatIdProvider";

const PageChatSystem = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  console.log("--------------PageChatSystem rendered--------------");
  const handleConversationClick = useCallback((chatId: string) => {
    setSelectedChatId(chatId);
  }, []);
  return (
    <div className="flex h-screen w-full">
      <div className="w-1/3 border-r bg-charcoalWhite border-gray-300 p-4 overflow-y-auto">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-semibold text-lg">Messaging</h2>
        </div>
        <ChatCardsList onCardClick={handleConversationClick} />
      </div>
      {selectedChatId ? (
        <PageMessageWindow
          className="flex-grow flex flex-col justify-end"
          chatId={selectedChatId}
        />
      ) : (
        <div className="flex-grow flex items-center justify-center">
          <h2 className="text-gray-500">Choose a chat to start messaging</h2>
        </div>
      )}
    </div>
  );
};

export default memo(PageChatSystem);
