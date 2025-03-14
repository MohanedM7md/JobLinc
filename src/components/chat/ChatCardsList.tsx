import React from "react";
import ChatCard from "./ChatCard";

interface ChatCard {
  chatId: string;
  chatName: string;
  imageUrl: string;
  lastMessage: string;
  sentDate: string;
}
interface ChatCardsListType {
  CardsList: ChatCard[];
  onCardClick: (id: string) => void;
}

export default function ChatCardsList({
  CardsList,
  onCardClick,
}: ChatCardsListType) {
  return (
    <div className="mt-4">
      {CardsList.map((chatCard) => (
        <ChatCard
          key={chatCard.chatId}
          id={chatCard.chatId}
          imageUrl={chatCard.imageUrl}
          chatName={chatCard.chatName}
          lastMessage={chatCard.lastMessage}
          sentDate={chatCard.sentDate}
          onClick={() => onCardClick(chatCard.chatId)}
        />
      ))}
    </div>
  );
}
