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
import { useUser } from "./mockUse";
import { fetchChatData, createChat } from "@services/api/chatServices";
import useChatid from "@context/ChatIdProvider";
import useNetworkUserId from "@context/NetworkUserIdProvider";
import UserTypingIndicator from "./UserTyping";

function ChatContent({ className }: { className?: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<RecievedMessage[]>([]);
  const { chatId, setChatId } = useChatid();
  const { usersId } = useNetworkUserId();
  const { user } = useUser();
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
        setUsers(data.users);
        setMessages(data.messages);
        setChatId(data.chatId);
      } else {
        const data = await fetchChatData(chatId);
        setUsers(data.users);
        setMessages(data.messages);
      }
    };

    fetchData();
    subscribeToMessages(
      chatId,
      user,
      (message) => setMessages((prev) => [...prev, message]),
      () =>
        setMessages((prev) =>
          prev.map((msg) => ({ ...msg, status: MessageStatus.Read })),
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

  const handleSendMessage = (message: string) => {
    const newMessage: any = {
      messageId: `${user}-${new Date().getTime()}`,
      senderId: user,
      time: new Date(),
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
    if (!chatId || !user) return;
    switch (isTyping) {
      case true:
        typing(chatId, user);
        break;
      case false:
        stopTyping(chatId, user);
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
