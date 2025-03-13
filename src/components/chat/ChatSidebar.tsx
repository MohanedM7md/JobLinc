import React, { useState, useMemo } from "react";
import { Img } from "react-image";
import { ConversationItem } from "./ConversationItem";
import { useAppSelector } from "../../store/hooks";
import SearchBar from "./UI/SearchBar";

type ConversationItemType = {
  id: string;
  imageUrl: string;
  userName: string;
  lastMessage: string;
  sentDate: string;
};

const mockConversations: ConversationItemType[] = [
  {
    id: "1",
    imageUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    userName: "John Doe",
    lastMessage: "Hey! How's it going?",
    sentDate: "Mar 6",
  },
  {
    id: "2",
    imageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    userName: "Jane Smith",
    lastMessage: "I'll call you later.",
    sentDate: "Mar 5",
  },
  {
    id: "3",
    imageUrl: "https://randomuser.me/api/portraits/men/23.jpg",
    userName: "Michael Johnson",
    lastMessage: "Did you finish the project?",
    sentDate: "Mar 4",
  },
  {
    id: "4",
    imageUrl: "https://randomuser.me/api/portraits/women/12.jpg",
    userName: "Emily Davis",
    lastMessage: "Thanks for your help!",
    sentDate: "Mar 3",
  },
  {
    id: "5",
    imageUrl: "https://randomuser.me/api/portraits/men/56.jpg",
    userName: "David Brown",
    lastMessage: "See you tomorrow!",
    sentDate: "Mar 2",
  },
  {
    id: "6",
    imageUrl: "https://randomuser.me/api/portraits/women/34.jpg",
    userName: "Olivia Wilson",
    lastMessage: "Let's meet up next week.",
    sentDate: "Feb 28",
  },
];

export function ChatSideBar() {
  const { profilePicture } = useAppSelector((state) => state.user);
  const [isActive, setActive] = useState<boolean>(() => {
    return localStorage.getItem("chatSidebarActive") === "true" || false;
  });

  const activeToggler = () => {
    setActive((prevIsActive) => {
      const newState = !prevIsActive;
      localStorage.setItem("chatSidebarActive", newState.toString());
      return newState;
    });
  };
  return (
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
            src={[profilePicture]}
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
      <div className="flex flex-col overflow-y-auto max-h-[400px]">
        {mockConversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            id={conversation.id} // Pass ID here
            imageUrl={conversation.imageUrl}
            userName={conversation.userName}
            lastMessage={conversation.lastMessage}
            sentDate={conversation.sentDate}
          />
        ))}
      </div>
    </div>
  );
}
