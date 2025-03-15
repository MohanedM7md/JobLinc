import React, { useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";
import { User } from "./interfaces/User.interfaces";
import { ChatMessagesProbs } from "./interfaces/Message.interfaces";

function ChatMessages({ users, messages, className }: ChatMessagesProbs) {
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
