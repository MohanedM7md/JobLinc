import React from "react";
import { Img } from "react-image";
import { ConversationItem } from "./ConversationItem";
import { useAppSelector } from "../../store/hooks";
import SearchBar from "./SearchBar";

type ConversationItemType = {
  imageUrl: string;
  userName: string;
  lastMessage: string;
  sentDate: string;
};
const mockConversations: ConversationItemType[] = [
  {
    imageUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    userName: "John Doe",
    lastMessage: "Hey! How's it going?",
    sentDate: "Mar 6",
  },
  {
    imageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    userName: "Jane Smith",
    lastMessage: "I'll call you later.",
    sentDate: "Mar 5",
  },
  {
    imageUrl: "https://randomuser.me/api/portraits/men/23.jpg",
    userName: "Michael Johnson",
    lastMessage: "Did you finish the project?",
    sentDate: "Mar 4",
  },
  {
    imageUrl: "https://randomuser.me/api/portraits/women/12.jpg",
    userName: "Emily Davis",
    lastMessage: "Thanks for your help!",
    sentDate: "Mar 3",
  },
  {
    imageUrl: "https://randomuser.me/api/portraits/men/56.jpg",
    userName: "David Brown",
    lastMessage: "See you tomorrow!",
    sentDate: "Mar 2",
  },
  {
    imageUrl: "https://randomuser.me/api/portraits/women/34.jpg",
    userName: "Olivia Wilson",
    lastMessage: "Let's meet up next week.",
    sentDate: "Feb 28",
  },
];

export function ChatSideBar() {
  const { profilePicture } = useAppSelector((state) => state.user);
  return (
    <div
      className="w-72 shadow-[0px_0px_10px_rgba(0,0,0,0.5)] 
                rounded-t-lg md:block hidden
                dark:bg-darkGray fixed bottom-0 right-0 mr-8"
    >
      <header className="flex w-full h-14 items-center gap-x-4 cursor-pointer border-">
        <div className="flex p-2  h-full w-full items-center rounded shadow-2xl gap-x-4">
          <Img
            src={[profilePicture]}
            alt="User Avatar"
            loader={<div>Loading</div>}
            className="rounded-full h-full"
          />
          <div className="text-charcoalBlack dark:text-charcoalWhite">
            Messaging
          </div>
        </div>
      </header>
      <SearchBar />
      <div className="flex flex-col">
        {mockConversations.map((conversation, index) => (
          <ConversationItem
            key={index}
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
