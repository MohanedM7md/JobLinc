import React, { useEffect, useState, memo } from "react";
import MessageBubble from "./MessageBubble";
import { User } from "./interfaces/User.interfaces";
import { ChatMessagesProbs } from "./interfaces/Message.interfaces";

function ChatMessages({ users, messages, className }: ChatMessagesProbs) {
  return (
    <div className={`bg-gray-100 flex flex-col pt-2`}>
      <div className="flex-1 space-y-2 h-80">
        {messages.length > 0 ? (
          messages.map((message) => {
            const sender = {
              ...(users.find(
                (user: User) => user.userId == message.senderId,
              ) || {
                userId: "",
                firstName: "Unknown",
                lastName: "Unknown",
                profilePicture: "",
              }),
            };
            return (
              <MessageBubble
                key={message.messageId}
                message={{ sender, ...message }}
              />
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

export default memo(ChatMessages);
