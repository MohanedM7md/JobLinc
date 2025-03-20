import React, { useEffect, useState, memo } from "react";
import ChatCard from "./ChatCard";
import { fetchChats } from "../../services/api/chatServices";
import { connectChatSocket } from "../../services/api/socket";
import { useUser } from "./mockUse";
import { ChatCardInterface } from "./interfaces/Chat.interfaces";
import classNames from "classnames";

const NetWorksChatList = ({
  onCardClick,
  className,
}: {
  onCardClick: (id: string) => void;
  className?: string;
}) => {
  const [users, setUsers] = useState<ChatCardInterface[]>([]);
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
        setUsers(data);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className={`mt-4 ${className}`}>
      {users.length > 0 ? (
        users.map((chatCard) => (
          <ChatCard
            key={chatCard.chatId}
            chatId={""}
            chatPicture={chatCard.chatPicture}
            chatName={chatCard.chatName}
            lastMessage={chatCard.lastMessage}
            sentDate={chatCard.sentDate}
            onClick={() => onCardClick(chatCard.chatId)}
          />
        ))
      ) : (
        <div className="text-gray-500 text-center mt-4">No NetWorks found</div>
      )}
    </div>
  );
};

export default memo(NetWorksChatList);
