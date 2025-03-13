import React, { useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";

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

const mockMessages: {
  [key: string]: {
    senderId: string;
    time: Date;
    content: { text: string; image?: string; document?: string };
  }[];
} = {
  "chat-1": [
    {
      senderId: "1",
      time: new Date(),
      content: {
        text: "Hey! How's it going?",
        image: "https://source.unsplash.com/random",
      },
    },
    { senderId: "2", time: new Date(), content: { text: "It's me Mario" } },
  ],
  "chat-2": [
    {
      senderId: "3",
      time: new Date(),
      content: {
        text: "الله اكبر عليك ي فنان",
        document:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    },
  ],
};

interface User {
  name: string;
  profilePicture: string;
}

function ChatMessages({ id }: { id: string }) {
  const [users, setUsers] = useState<Map<string, User>>(new Map());
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    // Mock fetching users
    const userMap = new Map(
      mockUsers.map((user) => [
        user.id,
        { name: user.name, profilePicture: user.profilePicture },
      ]),
    );
    setUsers(userMap);

    // Mock fetching messages based on chat ID
    setTimeout(() => {
      setMessages(mockMessages[id] || []);
    }, 500); // Simulate async delay
  }, [id]);

  return (
    <div className="bg-gray-100 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.length > 0 ? (
          messages.map((message, index) => {
            const sender = {
              id: message.senderId,
              ...(users.get(message.senderId) || {
                name: "Unknown",
                profilePicture: "",
              }),
            };
            return (
              <MessageBubble key={index} message={{ sender, ...message }} />
            );
          })
        ) : (
          <div className="text-gray-500 text-center mt-4">
            No messages found
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatMessages;
