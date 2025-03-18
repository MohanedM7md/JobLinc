import React, { useState, useEffect } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

import { connectChatSocket } from "../../services/api/socket";
import {
  RecievedMessage,
  MessageStatus,
} from "./interfaces/Message.interfaces";
import { User } from "./interfaces/User.interfaces";
import { useUser } from "./mockUse";
import { fetchChatData } from "../../services/api/chatServices";

function ChatContent({ chatId }: { chatId: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<RecievedMessage[]>([]);
  const chatSocket = connectChatSocket();
  const { user } = useUser();

  console.log("______________ChatContent_______________");
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchChatData(chatId);

      setUsers(data.users);
      setMessages(data.messages);
    };
    fetchData();

    chatSocket.emit("openChat", chatId, user);
    chatSocket.on("receiveMessage", (message: RecievedMessage) => {
      console.log("recieved Message: ", message);
      setMessages((prev) => [...prev, message]);
      chatSocket.emit("messageRecieved", chatId, message.messageId);
    });
    chatSocket.on("messageRead", () => {
      console.log("Message Read: ");
      setMessages((prev) =>
        prev.map((msg) => ({
          ...msg,
          status: MessageStatus.Read,
        })),
      );
    });

    return () => {
      chatSocket.off("receiveMessage");
      chatSocket.off("messageRead");
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
      chatSocket?.emit("sendMessage", { ...newMessage, chatId }, () => {
        console.log("call back called: msg delivered");
        setMessages((prevMsgs) => {
          prevMsgs.pop;
          newMessage.status = MessageStatus.Delivered;
          return [...prevMsgs, newMessage];
        });
      });
    }
  };
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <ChatMessages users={users} messages={messages} />
        {messages.length > 0 && (
          <div>{JSON.stringify(messages[messages.length - 1].status)}</div>
        )}
      </div>
      <ChatInput chatId={chatId} onSendMessage={handleSendMessage} />
    </div>
  );
}

export default ChatContent;
