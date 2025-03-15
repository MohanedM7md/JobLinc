import React, { useEffect, useState } from "react";
import ChatCard from "./ChatCard";
import io from "socket.io-client";

interface ChatCardType {
  chatId: string;
  chatName: string;
  imageUrl: string;
  lastMessage: string;
  sentDate: string;
}

interface ChatCardsListType {
  onCardClick: (id: string) => void;
}

export default function ChatCardsList({ onCardClick }: ChatCardsListType) {
  const [chats, setChats] = useState<ChatCardType[]>([]);

  useEffect(() => {
    const socket = io("http://localhost:4000");
    socket.on("connect", () => {
      socket.emit("UserID", "1");
      socket.on("RecieveChats", (chats: ChatCardType[]) => {
        setChats((prevChats) =>
          JSON.stringify(prevChats) === JSON.stringify(chats)
            ? prevChats
            : chats,
        );
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="mt-4">
      {chats.length > 0 ? (
        chats.map((chatCard) => (
          <ChatCard
            key={chatCard.chatId}
            id={chatCard.chatId}
            imageUrl={chatCard.imageUrl}
            chatName={chatCard.chatName}
            lastMessage={chatCard.lastMessage}
            sentDate={chatCard.sentDate}
            onClick={() => onCardClick(chatCard.chatId)}
          />
        ))
      ) : (
        <div className="text-gray-500 text-center mt-4">No chats found</div>
      )}
    </div>
  );
}
