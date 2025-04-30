import { useEffect, useState, memo } from "react";
import ChatCard from "./ChatCard";
import LoadingChatCard from "./LoadingChatCard";
import {
  fetchChats,
  fetchRequestChatData,
  chatRequestStatus,
} from "@services/api/chatServices";
import { ChatCardInterface } from "./interfaces/Chat.interfaces";
import { subscribeToChats } from "@services/api/ChatSocket";
import ReqChatCard from "./ReqChatCard";

const ChatCardsList = ({
  onCardClick,
  className = "",
}: {
  onCardClick: (id: string, chatName: string, chatPicture: string[]) => void;
  className?: string;
}) => {
  const [chats, setChats] = useState<ChatCardInterface[]>([]);
  const [reqChats, setReqChats] = useState<ChatCardInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"chats" | "requests">("chats");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchChats();
        setChats(data.chats);
        const ReqChats = await fetchRequestChatData();

        setReqChats(ReqChats.chats);
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

  const handleTabChange = (tab: "chats" | "requests") => {
    setActiveTab(tab);
  };

  const handleAcceptRequest = async (chatId: string, status: string) => {
    try {
      const data: ChatCardInterface = await chatRequestStatus(chatId, status);
      setChats((prev) => [...prev, data]);
      setReqChats((prev) => prev.filter((chat) => chat.chatId !== chatId));
      onCardClick(data.chatId, data.chatName, data.chatPicture);
      setActiveTab("chats");
    } catch (error) {
      console.error("error happend while changing status", error);
    }
  };

  const handleRejectRequest = async (chatId: string, status: string) => {
    try {
      chatRequestStatus(chatId, status);
      setReqChats((prev) => prev.filter((chat) => chat.chatId !== chatId));
    } catch (error) {
      console.error("error happend while changing status", error);
    }
  };

  return (
    <div className={`${className}`}>
      <div className="flex mb-4 border-b bg-charcoalWhite">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "chats"
              ? "text-crimsonRed border-b-2 border-crimsonRed"
              : "text-gray-500 hover:text-crimsonRed/90"
          }`}
          onClick={() => handleTabChange("chats")}
        >
          Chats
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "requests"
              ? "text-crimsonRed border-b-2 border-crimsonRed"
              : "text-gray-500 hover:text-crimsonRed/90"
          }`}
          onClick={() => handleTabChange("requests")}
        >
          Requests
          {reqChats.length > 0 && (
            <span className="ml-2 bg-crimsonRed/90 text-white text-xs px-2 py-1 rounded-full">
              {reqChats.length}
            </span>
          )}
        </button>
      </div>
      <div className="overflow-y-auto">
        {isLoading ? (
          [...Array(5)].map((_, i) => <LoadingChatCard key={i} />)
        ) : (
          <>
            {activeTab === "chats" ? (
              chats && chats.length > 0 ? (
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
                <div className="text-gray-500 text-center mt-4">
                  No chats found
                </div>
              )
            ) : reqChats && reqChats.length > 0 ? (
              reqChats.map((reqChatCard) => (
                <ReqChatCard
                  key={reqChatCard.chatId}
                  {...reqChatCard}
                  onClick={() =>
                    onCardClick(
                      reqChatCard.chatId,
                      reqChatCard.chatName,
                      reqChatCard.chatPicture,
                    )
                  }
                  handleAcceptRequest={handleAcceptRequest}
                  handleRejectRequest={handleRejectRequest}
                />
              ))
            ) : (
              <div className="text-gray-500 text-center mt-4">
                No requests found
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default memo(ChatCardsList);