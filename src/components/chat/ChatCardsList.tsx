import { useEffect, useState, memo } from "react";
import ChatCard from "./ChatCard";
import { fetchChats } from "../../services/api/chatServices";
import { useUser } from "./mockUse";
import { ChatCardInterface } from "./interfaces/Chat.interfaces";

const ChatCardsList = ({
  onCardClick,
  className = "",
}: {
  onCardClick: (id: string) => void;
  className?: string;
}) => {
  const [chats, setChats] = useState<ChatCardInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  if (isLoading) return null;
  return (
    <div className={`${className} overflow-auto`}>
      {chats.length > 0 ? (
        chats.map((chatCard) => (
          <ChatCard
            key={chatCard.chatId}
            chatId={chatCard.chatId}
            chatPicture={chatCard.chatPicture}
            chatName={chatCard.chatName}
            lastMessage={chatCard.lastMessage}
            sentDate={chatCard.sentDate}
            unseenCount={chatCard.unseenCount}
            isRead={chatCard.isRead}
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
