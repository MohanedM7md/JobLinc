import { memo, useState, useEffect, useRef } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import {
  subscribeToMessages,
  unsubscribeFromMessages,
  sendMessage,
  typing,
  stopTyping,
} from "@services/api/ChatSocket";
import {
  RecievedMessage,
  MessageStatus,
} from "./interfaces/Message.interfaces";
import { User } from "./interfaces/User.interfaces";

import { fetchChatData, createChat } from "@services/api/chatServices";
import useChatid from "@context/ChatIdProvider";
import useNetworkUserId from "@context/NetworkUserIdProvider";
import UserTypingIndicator from "./UserTyping";
import { useAppSelector } from "@store/hooks";

function ChatContent({ className }: { className?: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const myData = useRef<User | undefined>(undefined);
  const [messages, setMessages] = useState<RecievedMessage[]>([]);
  const { chatId, setChatId } = useChatid();
  const { usersId } = useNetworkUserId();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  console.log("typing triggers update");
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    const fetchData = async () => {
      if (usersId.length && !chatId) {
        const data = await createChat(usersId);
        setUsers(data.participants);
        myData.current = data.participants.find(
          (part: User) =>
            part.userId == useAppSelector((state) => state.user.userId),
        );
        setMessages(data.messages);
        setChatId(data.chatId);
      } else {
        const data = await fetchChatData(chatId);
        setUsers(data.participants);
        setMessages(data.messages);
      }
    };

    fetchData();

    subscribeToMessages(
      chatId,
      (message) => setMessages((prev) => [...prev, message]),
      (userId) =>
        setMessages((prev) =>
          prev.map((msg) => ({ ...msg, seenBy: [...msg.seenBy, userId] })),
        ),
      (userId) =>
        setTypingUsers((prevTypingUsers) => {
          console.log("Before update:", prevTypingUsers);
          if (!prevTypingUsers.includes(userId)) {
            console.log("Adding user:", userId);
            return [...prevTypingUsers, userId];
          }
          return prevTypingUsers;
        }),
      (userId) =>
        setTypingUsers((prev) => prev.filter((preUser) => preUser != userId)),
    );

    return () => {
      unsubscribeFromMessages(chatId);
    };
  }, [chatId]);

  const handleSendMessage = (message: string | File, type: string) => {
    console.log("Sender Id", myData.current?.userId);
    const newMessage: any = {
      messageId: `${10}-${new Date().getTime()}`,
      time: new Date(),
      type: type,
      sendId: myData.current?.userId,
      status: MessageStatus.Sent,
      content: { text: message },
    };

    setMessages((prevMsgs) => [...prevMsgs, newMessage]);

    if (chatId) {
      sendMessage(chatId, newMessage, () => {
        console.log("✅ Message delivered");
        setMessages((prevMsgs) => {
          prevMsgs.pop();
          newMessage.status = MessageStatus.Delivered;
          return [...prevMsgs, newMessage];
        });
      });
    }
  };
  const handleTypingMessage = (isTyping: boolean) => {
    if (!chatId) return;
    switch (isTyping) {
      case true:
        typing(chatId);
        break;
      case false:
        stopTyping(chatId);
        break;
    }
  };
  return (
    <div className={`${className} flex flex-col flex-1 overflow-y-hidden`}>
      <div className="h-8/12 overflow-y-auto">
        <ChatMessages users={users} messages={messages} />
        {typingUsers.map((typingUserId) => (
          <UserTypingIndicator
            key={typingUserId}
            userImage={
              users.find((user) => user.userId == typingUserId)?.profilePicture
            }
          />
        ))}
      </div>
      <ChatInput
        chatId={chatId}
        onSendMessage={handleSendMessage}
        onTypingMessage={handleTypingMessage}
        className=""
      />
    </div>
  );
}

export default memo(ChatContent);
