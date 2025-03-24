import { useEffect, useState, memo } from "react";
import ChatCard from "./ChatCard";
import { fetchChats } from "../../services/api/chatServices";
import { useUser } from "./mockUse";
import { ChatCardInterface } from "./interfaces/Chat.interfaces";
import { subscribeToChats } from "@services/api/ChatSocket";
import useChatId from "@context/ChatIdProvider";

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
    subscribeToChats(
      (UpdatedChatCard) =>
        setChats((prev) =>
          prev.map((chat) =>
            chat.chatId == UpdatedChatCard.chatId ? UpdatedChatCard : chat,
          ),
        ),
      (newChatCard) => setChats((prev) => [...prev, newChatCard]),
    );
  }, []);
  if (isLoading) return null;
  return (
    <div className={`${className} overflow-auto`}>
      {chats.length > 0 ? (
        chats.map((chatCard) => (
          <ChatCard
            key={chatCard.chatId}
            {...chatCard}
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
