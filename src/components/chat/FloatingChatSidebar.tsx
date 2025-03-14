import React, { useState, useMemo, useEffect } from "react";
import { Img } from "react-image";
import ChatCardsList from "./ChatCardsList";
import { useAppSelector } from "../../store/hooks";
import useChats from "../../hooks/useChats";
import SearchBar from "./UI/SearchBar";

type ConversationItemType = {
  id: string;
  imageUrl: string;
  userName: string;
  lastMessage: string;
  sentDate: string;
};
const mockConversations = [
  {
    chatId: "chat-1",
    imageUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    chatName: "John Doe",
    lastMessage: "Hey! How's it going?",
    sentDate: "Mar 6",
  },
  {
    chatId: "chat-2",
    imageUrl: "https://randomuser.me/api/portraits/men/68.jpg",
    chatName: "Jane Smith",
    lastMessage: "I'll call you later.",
    sentDate: "Mar 5",
  },
  {
    chatId: "chat-3",
    imageUrl: "https://randomuser.me/api/portraits/men/23.jpg",
    chatName: "Michael Johnson",
    lastMessage: "Did you finish the project?",
    sentDate: "Mar 4",
  },
];

export default function FloatingChatSidebar() {
  const { profilePicture } = useAppSelector((state) => state.user);
  const [isActive, setActive] = useState<boolean>(() => {
    return localStorage.getItem("chatSidebarActive") === "true" || false;
  });
  const { setOpnedChatsId } = useChats();

  const handleConversationClick = (chatId: string) => {
    setOpnedChatsId((prevChats) => {
      if (prevChats.includes(chatId)) return prevChats;

      return [...prevChats, chatId];
    });
  };
  const activeToggler = () => {
    setActive((prevIsActive) => {
      const newState = !prevIsActive;
      localStorage.setItem("chatSidebarActive", newState.toString());
      return newState;
    });
  };
  return (
    <>
      <div
        className={`w-72 shadow-[0px_0px_10px_rgba(0,0,0,0.25)] 
                rounded-t-lg md:block hidden
                dark:bg-darkGray fixed bottom-0 right-0 mr-8
                cursor-pointer transition-transform duration-300
                ${isActive ? "translate-y-0" : "translate-y-[calc(100%-56px)]"}`}
      >
        <header
          className="flex w-full h-14 bg-charcoalWhite dark:bg-darkGray 
                   items-center gap-x-4 px-4 border-b-2 border-gray-200 
                   rounded-t-2xl "
          onClick={activeToggler}
        >
          <div className="flex items-center gap-x-4 w-full">
            <Img
              src={[
                profilePicture,
                "https://randomuser.me/api/portraits/men/2.jpg",
              ]}
              alt="User Avatar"
              loader={<div>Loading...</div>}
              className="rounded-full w-10 h-10 border border-mutedSilver"
            />
            <div className="text-charcoalBlack dark:text-charcoalWhite font-semibold">
              Messaging
            </div>
          </div>
        </header>
        <SearchBar />
        <ChatCardsList
          CardsList={mockConversations}
          onCardClick={handleConversationClick}
        />
      </div>
    </>
  );
}
