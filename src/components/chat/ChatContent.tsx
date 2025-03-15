import React, { useState, useEffect, useRef } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { fetchMessages, fetchChatUsers } from "../../api/api";
import {
  connectChatSocket,
  onReceiveMessage,
  emitSendMessage,
} from "../../api/socket";

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

interface ChatContentProps {
  chatId: string | null;
}

export default function ChatContent({ chatId }: ChatContentProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const chatSocket = connectChatSocket();
  console.log("______________ChatContent_______________");
  useEffect(() => {
    if (!chatId) return;

    const fetchData = async () => {
      const messagesData = await fetchMessages(chatId);
      setMessages(messagesData);
      const usersData = await fetchChatUsers(chatId);
      setUsers(usersData);
    };
    fetchData();
    chatSocket.emit("openChat", chatId);
    onReceiveMessage((message: Message) => {
      console.log("recieved Message: ", message);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      chatSocket.off("receiveMessage");
    };
  }, [chatId]);

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      senderId: "1",
      time: new Date(),
      content: { text: message },
    };
    console.log("message: :::: ", message);
    setMessages((prev) => [...prev, newMessage]);
    if (chatId) {
      emitSendMessage({ chatId, ...newMessage });
      chatSocket.off("receiveMessage");
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <ChatMessages users={users} messages={messages} />
      </div>

      {chatId && <ChatInput id={chatId} onSendMessage={handleSendMessage} />}
    </div>
  );
}
