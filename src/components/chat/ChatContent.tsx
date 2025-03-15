import React, { useState, useEffect } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import io from "socket.io-client";
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
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:4000/chat");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      newSocket.emit("OpenChat", chatId);

      newSocket.on("RevieveMessages", (messages: Message[]) => {
        setMessages(messages);
      });
      newSocket.on("RevieveUsers", (Users: User[]) => {
        setUsers(Users);
      });
    });

    return () => {
      newSocket.disconnect();
    };
  }, [chatId]);

  const handleSendMessage = (chatId: string, message: string) => {
    console.log("message", message);
    const newMessage: Message = {
      senderId: "1",
      time: new Date(),
      content: { text: message },
    };
    setMessages((prevMessages) => {
      return [...prevMessages, newMessage];
    });

    if (socket) {
      socket.emit("SendMessage", newMessage);
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
