import { useEffect } from "react";
import {
  subscribeToMessages,
  unsubscribeFromMessages,
} from "@services/api/ChatSocket";
import { RecievedMessage } from "../interfaces/Message.interfaces";

type SetMessages = React.Dispatch<React.SetStateAction<RecievedMessage[]>>;
type SetTypingUsers = React.Dispatch<React.SetStateAction<string[]>>;

export default function useChatSocket(
  chatId: string | null,
  setMessages: SetMessages,
  setTypingUsers: SetTypingUsers,
) {
  useEffect(() => {
    if (!chatId) return;

    subscribeToMessages(
      chatId,
      (message) => setMessages((prev) => [...prev, message]),
      (userId) =>
        setMessages((prev) =>
          prev.map((msg) => ({
            ...msg,
            seenBy: [...new Set([...msg.seenBy, userId])],
          })),
        ),
      (userId) =>
        setTypingUsers((prevTypingUsers) =>
          prevTypingUsers.includes(userId)
            ? prevTypingUsers
            : [...prevTypingUsers, userId],
        ),
      (userId) => setTypingUsers((prev) => prev.filter((id) => id !== userId)),
    );

    return () => {
      unsubscribeFromMessages(chatId);
    };
  }, [chatId]);
}
