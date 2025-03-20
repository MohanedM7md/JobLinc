import { useCallback, useEffect, useState } from "react";
import ChatCardsList from "../ChatCardsList";
import PageMessageWindow from "./PageChatWindow";
import useChatId from "@context/ChatIdProvider";
import connectToChat, { disconnectChatSocket } from "@services/api/ChatSocket";
import { EllipsisVertical } from "lucide-react";
import SearchBar from "@chatComponent/UI/SearchBar";
import NetWorksChatList from "@chatComponent/NetWorksChatList";
import useNetworkUserId from "@context/NetworkUserIdProvider";

function PageChatSystem() {
  const { setChatId } = useChatId();
  const { setUserId } = useNetworkUserId();
  console.log("Page System");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const onFocusedToggler = () => {
    setTimeout(() => {
      setIsFocused(!isFocused);
    }, 100);
  };
  const handleSearchChange = useCallback((value: string) => {
    console.log(value);
  }, []);
  const handleConversationClick = useCallback((chatId: string) => {
    setUserId("");
    setChatId(chatId);
  }, []);
  const handleNetWorkUserClick = useCallback((userId: string) => {
    setUserId(userId);
    setChatId("");
  }, []);

  useEffect(() => {
    connectToChat();
    return () => disconnectChatSocket();
  }, []);
  return (
    <>
      <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-md">
        <h2 className="font-semibold text-lg text-gray-800">Messaging</h2>

        <div className="flex items-center gap-3">
          <SearchBar
            FocusToggler={onFocusedToggler}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
          />
          <button className="p-2 rounded-full hover:bg-gray-200">
            <EllipsisVertical className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
      <div className="flex h-screen w-full">
        <div className="w-1/3 border-r bg-charcoalWhite border-gray-300 p-4 overflow-y-auto">
          {isFocused ? (
            <ChatCardsList className="" onCardClick={handleConversationClick} />
          ) : (
            <NetWorksChatList
              className=""
              onCardClick={handleNetWorkUserClick}
            />
          )}
        </div>
        <PageMessageWindow className="flex-grow flex flex-col justify-end" />
      </div>
    </>
  );
}

export default PageChatSystem;
