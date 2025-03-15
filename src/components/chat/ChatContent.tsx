import React, { useState, useEffect, useCallback, useRef } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { fetchMessages, fetchChatUsers } from "../../api/api";
import {
  connectChatSocket,
  onReceiveMessage,
  emitSendMessage,
} from "../../api/socket";
import { Message, MessageStatus } from "./interfaces/Message.interfaces";
import { User } from "./interfaces/User.interfaces";
import { useUser } from "./mockUse";

function ChatContent({ chatId }: { chatId: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const chatSocket = connectChatSocket();
  const { user } = useUser();

  console.log("______________ChatContent_______________");
  useEffect(() => {
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
      senderId: user,
      time: new Date(),
      status: MessageStatus.Sent,
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

      {chatId && (
        <ChatInput chatId={chatId} onSendMessage={handleSendMessage} />
      )}
    </div>
  );
}

export default ChatContent;
