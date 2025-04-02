import { memo } from "react";
import MessageBubble from "./MessageBubble";

import { ChatMessagesProbs } from "./interfaces/Message.interfaces";
import { RecievedMessage } from "./interfaces/Message.interfaces";
import { User } from "./interfaces/User.interfaces";
import store from "@store/store";
function ChatMessages({ users, messages, className }: ChatMessagesProbs) {
  const lastSeenMessage: Record<string, RecievedMessage | null> = {};
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i];
    message.seenBy.forEach((userId) => {
      if (!lastSeenMessage[userId]) {
        lastSeenMessage[userId] = message;
      }
    });
  }

  return (
    <div className="flex-1 space-y-2 bg-gray-100 flex flex-col pt-2 h-auto">
      {messages.length > 0 ? (
        messages.map((message) => {
          const sender = {
            ...(users.find((user: User) => user.userId == message.senderId) || {
              userId: "",
              firstName: "Unknown",
              lastName: "Unknown",
              profilePicture: "",
            }),
          };
          const seenByUsers = users.filter((user) => {
            return (
              lastSeenMessage[user.userId]?.messageId === message.messageId &&
              user.userId !== store.getState().user.userId
            );
          });

          return (
            <>
              <MessageBubble
                key={message.messageId}
                message={{ sender, ...message }}
              />
              {seenByUsers.length > 0 && (
                <div className="text-xs text-blue-500 mt-1">
                  👀 Seen by:{" "}
                  {seenByUsers.map((user) => user.firstName).join(", ")}
                </div>
              )}
            </>
          );
        })
      ) : (
        <div className="text-gray-500 text-center mt-4">No messages found</div>
      )}
    </div>
  );
}

export default memo(ChatMessages);
