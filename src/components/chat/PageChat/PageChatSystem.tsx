import { useCallback, useEffect, useState } from "react";
import ChatCardsList from "../ChatCardsList";
import PageMessageWindow from "./PageChatWindow";
import useChatId from "@context/ChatIdProvider";
import connectToChat, { disconnectChatSocket } from "@services/api/ChatSocket";
import { EllipsisVertical } from "lucide-react";
import SearchBar from "@chatComponent/UI/SearchBar";
import NetWorksChatList from "@chatComponent/NetWorksChatList";
import useNetworkUserId from "@context/NetworkUserIdProvider";
import ConnectionsSidebar from "@chatComponent/PageChat/ConnectionsSidebar";
import { Users2 } from "lucide-react";

function PageChatSystem() {
  const { setChatId } = useChatId();
  const { setUsersId } = useNetworkUserId();
  console.log("Page System");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isChatSidebarOpen, setIsChatSidebarOpen] = useState<boolean>(false);
  const [opnedChatName, setOpnedChatName] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const onFocusedToggler = () => {
    setTimeout(() => {
      setIsFocused(!isFocused);
    }, 100);
  };
  const handleSearchChange = useCallback((value: string) => {
    console.log(value);
  }, []);
  const handleConversationClick = useCallback(
    (chatId: string, chatName: string) => {
      setUsersId([]);
      setChatId(chatId);
      setOpnedChatName(chatName);
    },
    [],
  );
  const handleNetWorkUserClick = useCallback(
    (userId: string, chatName: string) => {
      setUsersId([userId]);
      setOpnedChatName(chatName);
      setChatId("");
    },
    [],
  );

  useEffect(() => {
    const initializeChat = async () => {
      await connectToChat();
      setIsConnected(true);
    };

    initializeChat();
    return () => disconnectChatSocket();
  }, []);
  return (
    <div className="h-full">
      <header className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-md">
        <h2 className=" hidden md:block font-semibold text-lg text-gray-800">
          Messaging
        </h2>

        <div className="flex items-center gap-3 w-full justify-between md:justify-end">
          <SearchBar
            FocusToggler={onFocusedToggler}
            onChange={handleSearchChange}
            className="sm:w-lg md:w-xl "
          />
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <Users2 />
          </button>
          {isSidebarOpen && (
            <ConnectionsSidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />
          )}
          <button className="p-2 rounded-full hover:bg-gray-200">
            <EllipsisVertical className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </header>
      {isConnected && (
        <div className="flex h-screen w-full">
          {isFocused ? (
            <NetWorksChatList
              className="w-2/5  pb-20 md:w-1/3 border-r  bg-charcoalWhite border-gray-300 p-4"
              onCardClick={handleNetWorkUserClick}
            />
          ) : (
            <ChatCardsList
              className="w-2/5  pb-20 md:w-1/3 border-r bg-charcoalWhite border-gray-300 p-4"
              onCardClick={handleConversationClick}
            />
          )}

          <PageMessageWindow chatName={opnedChatName} />
        </div>
      )}
    </div>
  );
}

export default PageChatSystem;
