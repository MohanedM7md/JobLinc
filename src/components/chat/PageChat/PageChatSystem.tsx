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
  const onFocusedToggler = () => {
    setTimeout(() => {
      setIsFocused(!isFocused);
    }, 100);
  };
  const handleSearchChange = useCallback((value: string) => {
    console.log(value);
  }, []);
  const handleConversationClick = useCallback((chatId: string) => {
    setUsersId([]);
    setChatId(chatId);
  }, []);
  const handleNetWorkUserClick = useCallback((userId: string) => {
    setUsersId([userId]);
    setChatId("");
  }, []);

  useEffect(() => {
    connectToChat();
    return () => disconnectChatSocket();
  }, []);
  return (
    <>
      <header className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-md">
        <h2 className=" hidden md:block font-semibold text-lg text-gray-800">
          Messaging
        </h2>

        <div className="flex items-center gap-3">
          <SearchBar
            FocusToggler={onFocusedToggler}
            onChange={handleSearchChange}
            className="md:w-xl "
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
      <div className="flex h-screen w-full">
        <div className="w-1/3 border-r bg-charcoalWhite border-gray-300 p-4 overflow-y-auto">
          {isFocused ? (
            <NetWorksChatList
              className=""
              onCardClick={handleNetWorkUserClick}
            />
          ) : (
            <ChatCardsList className="" onCardClick={handleConversationClick} />
          )}
        </div>
        <PageMessageWindow className="flex-grow flex flex-col justify-end" />
      </div>
    </>
  );
}

export default PageChatSystem;
