import React, { useEffect, useState, memo } from "react";
import ChatCard from "./ChatCard";
import { fetchChats } from "../../api/api";
import { connectChatSocket } from "../../api/socket";

interface ChatCardType {
  chatId: string;
  chatName: string;
  imageUrl: string;
  lastMessage: string;
  sentDate: string;
  unreadCount: number;
}

interface ChatCardsListType {
  onCardClick: (id: string) => void;
}

const ChatCardsList = ({ onCardClick }: ChatCardsListType) => {
  const [chats, setChats] = useState<ChatCardType[]>([]);
  const chatSocket = connectChatSocket();
  console.log("----------------ChatCardsList----------------");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchChats("1");
        setChats(data);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };
    fetchData();

    chatSocket.on("ChatsUpdate", (newChat: ChatCardType) => {
      setChats((prev) => [...prev, newChat]);
    });

    return () => {
      chatSocket.off("ChatsUpdate");
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
};

export default memo(ChatCardsList);
