import { useEffect, useState, memo } from "react";
import ChatCard from "./ChatCard";
import { fetchChats } from "../../services/api/chatServices";
import { ChatCardInterface } from "./interfaces/Chat.interfaces";
import { subscribeToChats } from "@services/api/ChatSocket";

const ChatCardsList = ({
  onCardClick,
  className = "",
}: {
  onCardClick: (id: string, chatName: string, chatPicture: string[]) => void;
  className?: string;
}) => {
  const [chats, setChats] = useState<ChatCardInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log("----------------ChatCardsList---------------- for userID: ");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchChats();
        setChats(data);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    subscribeToChats(
      (UpdatedChatCard) =>
        setChats((prev) => {
          prev = prev.filter((chat) => chat.chatId != UpdatedChatCard.chatId);
          prev.unshift(UpdatedChatCard);
          return prev;
        }),
      (newChatCard) => setChats((prev) => [...prev, newChatCard]),
    );
  }, []);
  if (isLoading) return null;
  return (
    <div className={`${className}  overflow-y-auto`}>
      {chats.length > 0 ? (
        chats.map((chatCard) => (
          <ChatCard
            key={chatCard.chatId}
            {...chatCard}
            onClick={() =>
              onCardClick(
                chatCard.chatId,
                chatCard.chatName,
                chatCard.chatPicture,
              )
            }
          />
        ))
      ) : (
        <div className="text-gray-500 text-center mt-4">No chats found</div>
      )}
    </div>
  );
};

export default memo(ChatCardsList);
