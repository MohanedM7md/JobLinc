import React, { useState } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import PageChatHeader from "./PageChatHeader";

interface PageChatWindowInterface {
  className?: string;
  chatId: string | null;
}

const chatTitle = {
  name: "Mohaned",
  status: "Naime",
};

const mockMessages: Message[] = [
  {
    senderId: "1",
    time: new Date(),
    content: {
      text: "Hey! How's it going?",
      image: "https://source.unsplash.com/random",
    },
  },
  {
    senderId: "2",
    time: new Date(),
    content: { text: "It's me Mario" },
  },
  {
    senderId: "3",
    time: new Date(),
    content: {
      text: "الله اكبر عليك ي فنان",
      document:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  },
];
const mockUsers: User[] = [
  {
    id: "1",
    name: "Mohaned",
    profilePicture: "https://randomuser.me/api/portraits/men/1",
  },
  {
    id: "2",
    name: "Mario",
    profilePicture: "https://randomuser.me/api/portraits/men/2",
  },
  {
    id: "3",
    name: "Ahmed",
    profilePicture: "https://randomuser.me/api/portraits/men/3",
  },
];
interface User {
  id: string;
  name: string;
  profilePicture: string;
}

interface Message {
  senderId: string;
  time: Date;
  content: { text: string; image?: string; document?: string };
}
export default function PageChatWindow({
  className,
  chatId,
}: PageChatWindowInterface) {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  return (
    <div className={`${className} w-2/3 flex flex-col`}>
      {chatId ? (
        <div>
          <PageChatHeader name={chatTitle.name} status={chatTitle.status} />
          <ChatMessages users={users} messages={messages} />
          <ChatInput
            id={chatId}
            onSendMessage={() => {
              console.log("SendMessage");
            }}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          Select a conversation to start chatting
        </div>
      )}
    </div>
  );
}
