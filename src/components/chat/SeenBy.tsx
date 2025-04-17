import React from "react";
import { User } from "./interfaces/User.interfaces";
import { RecievedMessage } from "./interfaces/Message.interfaces";

interface MessageSeenByProps {
  message: RecievedMessage;
  users: User[];
  currentUserId: string;
}

function SeenBy({ message, users, currentUserId }: MessageSeenByProps) {
  // Determine users who have seen this message
  const seenByUsers = React.useMemo(() => {
    return users.filter((user) => {
      // Exclude current user and message sender
      if (user.userId === currentUserId || user.userId === message.senderId) {
        return false;
      }

      // Check if user has seen this specific message
      return message.seenBy.includes(user.userId);
    });
  }, [message, users, currentUserId]);

  // If no users have seen the message, return null
  if (seenByUsers.length === 0) {
    return null;
  }

  return (
    <div className="text-xs text-blue-500 mt-1">
      👀 Seen by: {seenByUsers.map((user) => user.firstName).join(", ")}
    </div>
  );
}

export default React.memo(SeenBy);
