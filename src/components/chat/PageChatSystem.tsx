import React, { useState } from "react";
import ChatCardsList from "./ChatCardsList";
import PageMessageWindow from "./PageChatWindow";

export default function PageChatSystem() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  console.log("--------------PageChatSystem rendered--------------");
  const handleConversationClick = (chatId: string) => {
    setSelectedChatId(chatId);
  };
  return (
    <div className="flex h-screen w-full">
      <div className="w-1/3 border-r bg-charcoalWhite border-gray-300 p-4 overflow-y-auto">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-semibold text-lg">Messaging</h2>
        </div>
        <ChatCardsList onCardClick={handleConversationClick} />
      </div>
      <PageMessageWindow
        className="flex-grow flex flex-col justify-end"
        chatId={selectedChatId}
      />
    </div>
  );
}
