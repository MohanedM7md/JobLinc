import React, { useEffect, useState, memo } from "react";
import ChatCard from "./ChatCard";
import { fetchChats } from "../../api/api";
import { connectChatSocket } from "../../api/socket";
import { useUser } from "./mockUse";
import { ChatCardInterface } from "./interfaces/Chat.interfaces";

const ChatCardsList = ({
  onCardClick,
}: {
  onCardClick: (id: string) => void;
}) => {
  const [chats, setChats] = useState<ChatCardInterface[]>([]);
  const chatSocket = connectChatSocket();
  const { user } = useUser();
  console.log("User See me:");
  console.log("----------------ChatCardsList----------------");
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) return;
        const data = await fetchChats(user);
        setChats(data);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };
    fetchData();

    chatSocket.on("ChatsUpdate", (newChat: ChatCardInterface) => {
      setChats((prev) => [...prev, newChat]);
    });

    return () => {
      chatSocket.off("ChatsUpdate");
    };
  }, [user]);

  return (
    <div className="mt-4">
      {chats.length > 0 ? (
        chats.map((chatCard) => (
          <ChatCard
            key={chatCard.chatId}
            chatId={chatCard.chatId}
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
