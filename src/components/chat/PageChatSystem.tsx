import React, { useState, useEffect } from "react";
import { Img } from "react-image";
import ConversationList from "./ConversationList ";
import PageMessageWindow from "./PageChatWindow";
const mockConversations = [
  {
    id: "chat-1",
    imageUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    userName: "John Doe",
    lastMessage: "Hey! How's it going?",
    sentDate: "Mar 6",
  },
  {
    id: "chat-2",
    imageUrl: "https://randomuser.me/api/portraits/men/68.jpg",
    userName: "Jane Smith",
    lastMessage: "I'll call you later.",
    sentDate: "Mar 5",
  },
  {
    id: "chat-3",
    imageUrl: "https://randomuser.me/api/portraits/men/23.jpg",
    userName: "Michael Johnson",
    lastMessage: "Did you finish the project?",
    sentDate: "Mar 4",
  },
];

export default function PageChatSystem() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const handleConversationClick = (chatId: string) => {
    setSelectedChatId(chatId);
  };
  return (
    <div className="flex h-screen w-full">
      <div className="w-1/3 border-r bg-charcoalWhite border-gray-300 p-4 overflow-y-auto">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-semibold text-lg">Messaging</h2>
        </div>
        <ConversationList
          conversations={mockConversations}
          onConversationClick={handleConversationClick}
        />
      </div>
      <PageMessageWindow
        className="flex-grow flex flex-col justify-end"
        chatId={selectedChatId}
      />
    </div>
  );
}
