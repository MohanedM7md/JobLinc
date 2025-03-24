import { useCallback, useEffect, useState } from "react";
import ChatCardsList from "../ChatCardsList";
import NetWorksChatList from "@chatComponent/NetWorksChatList";
import SearchBar from "@chatComponent/UI/SearchBar";
import { EllipsisVertical } from "lucide-react";
import connectToChat, { disconnectChatSocket } from "@services/api/ChatSocket";
import useChats from "@hooks/useChats";
import ConnectionsDropdown from "@chatComponent/ConnectionsDropdown";
function FloatingChatSidebar() {
  const [isActive, setActive] = useState<boolean>(() => {
    return localStorage.getItem("chatSidebarActive") === "true" || false;
  });
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { setOpnedChats } = useChats();

  const onFocusedToggler = () => {
    setTimeout(() => setIsFocused(!isFocused), 200);
  };

  const handleSearchChange = useCallback((value: string) => {
    console.log(value);
  }, []);

  const handleConversationClick = (chatId: string) => {
    setOpnedChats((prevChats) => {
      if (prevChats.some((chat) => chat.chatId === chatId)) return prevChats;
      return [...prevChats, { chatId, usersId: [] }];
    });
  };

  const handleNetWorkUserClick = (userId: string) => {
    setOpnedChats((prevChats) => {
      if (prevChats.some((chat) => chat.usersId[0] === userId))
        return prevChats;
      return [...prevChats, { chatId: "", usersId: [userId] }];
    });
  };

  const activeToggler = () => {
    setActive((prevIsActive) => {
      const newState = !prevIsActive;
      localStorage.setItem("chatSidebarActive", newState.toString());
      return newState;
    });
  };

  useEffect(() => {
    connectToChat();
    return () => disconnectChatSocket();
  }, []);

  return (
    <div
      className={`w-72 shadow-lg rounded-t-lg md:block hidden fixed bottom-0 right-0 mr-8 transition-transform duration-300
        dark:bg-darkGray bg-white cursor-pointer ${isActive ? "translate-y-0" : "translate-y-[calc(100%-56px)]"}`}
    >
      <header
        className="flex w-full h-14 bg-charcoalWhite dark:bg-darkGray items-center px-4 gap-4 border-b border-gray-300 rounded-t-lg"
        onClick={activeToggler}
      >
        <img
          src="https://randomuser.me/api/portraits/men/2.jpg"
          alt="User Avatar"
          className="rounded-full w-10 h-10 border border-gray-300"
        />
        <h2 className="font-semibold text-gray-800 dark:text-white flex-grow">
          Messaging
        </h2>

        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <EllipsisVertical className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
      </header>

      <div className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-300">
        <ConnectionsDropdown className="  right-14 -top-20 w-30 md:w-sm" />
        <SearchBar
          FocusToggler={onFocusedToggler}
          onChange={handleSearchChange}
        />
      </div>

      {isFocused ? (
        <NetWorksChatList
          onCardClick={handleNetWorkUserClick}
          className="max-h-[60vh]"
        />
      ) : (
        <ChatCardsList
          onCardClick={handleConversationClick}
          className="max-h-[60vh]"
        />
      )}
    </div>
  );
}

export default FloatingChatSidebar;
