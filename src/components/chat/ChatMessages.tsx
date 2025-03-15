import React, { useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";

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

interface ChatMessages {
  users: User[];
  messages: Message[];
  className?: string;
}

function ChatMessages({ users, messages, className }: ChatMessages) {
  return (
    <div className={`bg-gray-100 flex flex-col overflow-hidden`}>
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.length > 0 ? (
          messages.map((message, index) => {
            const sender = {
              ...(users.find((user: User) => user.id == message.senderId) || {
                id: "",
                name: "Unknown",
                profilePicture: "",
              }),
            };
            console.log("_________ChatMessages_____________");
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

export default React.memo(ChatMessages);
