import React, { useState } from "react";
import FloatingChatHeader from "./FloatingChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import useChats from "../../hooks/useChats";

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
    profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "2",
    name: "Mario",
    profilePicture: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: "3",
    name: "Ahmed",
    profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

const mockInfo: ChatInfo = {
  title: "string",
  profilePicture: "https://randomuser.me/api/portraits/men/2.jpg",
  status: "online",
};

interface User {
  id: string;
  name: string;
  profilePicture: string;
}
interface ChatInfo {
  title: string;
  profilePicture: string;
  status: "online" | "offline";
}
interface Message {
  senderId: string;
  time: Date;
  content: { text: string; image?: string; document?: string };
}

function FloatingChatWindow({
  style,
  className,
  id,
}: {
  style?: React.CSSProperties;
  className?: string;
  id: string;
}) {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  console.log(className);
  const [isActive, setActive] = useState<boolean>(false);
  const activeToggler = () => {
    setActive((prevIsActive) => !prevIsActive);
  };
  const { setOpnedChatsId } = useChats();
  const CloseChat = (id: string) => {
    setOpnedChatsId((prevsChatsId) => {
      return prevsChatsId.filter((Chat) => Chat != id);
    });
  };
  return (
    <div
      className={`fixed ${className} bottom-0 sm:bottom-0 w-full
                 sm:w-[400px] max-h-[70vh] shadow-xl border border-gray-200
                rounded-t-lg transition-transform duration-300
                 ${isActive ? "" : "translate-y-[calc(100%-60px)]"}`}
      style={style}
    >
      <FloatingChatHeader
        onClick={activeToggler}
        chatInfo={mockInfo}
        onClose={() => CloseChat(id)}
      />

      <ChatMessages users={users} messages={messages} />

      <ChatInput
        id={id}
        onSendMessage={() => {
          console.log("SendMessage");
        }}
      />
    </div>
  );
}

export default React.memo(FloatingChatWindow);
