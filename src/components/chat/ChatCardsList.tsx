import { useEffect, useState, memo } from "react";
import ChatCard from "./ChatCard";

import { fetchChats } from "../../services/api/chatServices";
import { ChatCardInterface } from "./interfaces/Chat.interfaces";
import { subscribeToChats } from "@services/api/ChatSocket";

function LoadingChatCard() {
  return (
    <div
      className="flex items-center p-3 relative rounded-lg shadow-sm 
                animate-pulse bg-charcoalWhite w-full"
    >
      {/* Avatar Skeleton */}
      <div className="relative w-12 h-12 shrink-0 rounded-full bg-gray-300" />

      {/* Right side content */}
      <div className="flex flex-1 justify-between items-center ml-3 overflow-hidden">
        <div className="flex flex-col gap-2 w-full overflow-hidden">
          {/* Chat Name */}
          <div className="h-4 bg-gray-300 rounded w-1/2" />
          {/* Last Message */}
          <div className="h-3 bg-gray-200 rounded w-3/4" />
        </div>

        <div className="flex items-center gap-2 min-w-[60px] justify-end ml-2">
          {/* Date */}
          <div className="h-3 bg-gray-200 rounded w-12" />
          {/* Ellipsis Button */}
          <div className="w-5 h-5 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}

const ChatCardsList = ({
  onCardClick,
  className = "",
}: {
  onCardClick: (id: string, chatName: string, chatPicture: string[]) => void;
  className?: string;
}) => {
  const [chats, setChats] = useState<ChatCardInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchChats();
        setChats(data.chats);
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
          prev = prev.filter((chat) => chat.chatId !== UpdatedChatCard.chatId);
          prev.unshift(UpdatedChatCard);
          return [...prev];
        }),
      (newChatCard) => setChats((prev) => [...prev, newChatCard]),
    );
  }, []);

  return (
    <div className={`${className} overflow-y-auto`}>
      {isLoading ? (
        // 👇 Render 5 loading skeletons
        [...Array(5)].map((_, i) => <LoadingChatCard key={i} />)
      ) : chats.length > 0 ? (
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
