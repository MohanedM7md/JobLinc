import React, { useEffect, useState, memo } from "react";
import ChatCard from "./ChatCard";
import { fetchChats } from "../../services/api/chatServices";
import { connectChatSocket } from "../../services/api/socket";
import { useUser } from "./mockUse";
import { ChatCardInterface } from "./interfaces/Chat.interfaces";

const ChatCardsList = ({
  onCardClick,
}: {
  onCardClick: (id: string) => void;
}) => {
  const [chats, setChats] = useState<ChatCardInterface[]>([]);
  const { user } = useUser();

  console.log(
    "----------------ChatCardsList---------------- for userID: ",
    user,
  );
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
  }, [user]);
  return (
    <div className="mt-4">
      {chats.length > 0 ? (
        chats.map((chatCard) => (
          <ChatCard
            key={chatCard.chatId}
            chatId={chatCard.chatId}
            chatPicture={chatCard.chatPicture}
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
