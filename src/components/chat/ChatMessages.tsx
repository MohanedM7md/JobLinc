import React, { useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";
import UserProfile from "../UserProfile";

const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    profilePicture: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: "2",
    name: "Jane Smith",
    profilePicture: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: "3",
    name: "Michael Johnson",
    profilePicture: "https://randomuser.me/api/portraits/men/23.jpg",
  },
];

const mockMessages = [
  {
    senderId: "1",
    time: new Date(),
    content: {
      text: "Hey! How's it going?",
      image: "https://source.unsplash.com/random",
    },
  },
  { senderId: "2", time: new Date(), content: { text: "It's me Mario" } },
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

interface User {
  name: string;
  profilePicture: string;
}

function ChatMessages() {
  const [users, setUsers] = useState<Map<string, User>>(new Map());
  const [messages, setMessages] = useState(mockMessages);

  useEffect(() => {
    const userMap = new Map(
      mockUsers.map((user) => [
        user.id,
        { name: user.name, profilePicture: user.profilePicture },
      ]),
    );
    setUsers(userMap);
  }, []);

  return (
    <div className="h-[500px] w-[400px] bg-gray-100 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((message) => {
          const sender = {
            id: message.senderId,
            ...(users.get(message.senderId) || {
              name: "Unknown",
              profilePicture: "",
            }),
          };
          return (
            <MessageBubble
              key={message.senderId + message.time.toISOString()}
              message={{ sender, ...message }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ChatMessages;
