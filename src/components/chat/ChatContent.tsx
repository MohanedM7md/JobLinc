import React, { useState, useEffect, useCallback, useRef } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { fetchChatData } from "../../services/api/api";
import {
  connectChatSocket,
  onReceiveMessage,
  emitSendMessage,
} from "../../services/api/socket";
import {
  RecievedMessage,
  MessageStatus,
} from "./interfaces/Message.interfaces";
import { User } from "./interfaces/User.interfaces";
import { useUser } from "./mockUse";

function ChatContent({ chatId }: { chatId: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<RecievedMessage[]>([]);
  const chatSocket = connectChatSocket();
  const { user } = useUser();

  console.log("______________ChatContent_______________");
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchChatData(chatId);
      const users: User[] = response.data.participants.map(
        (participant: any) => ({
          id: participant.userId,
          name: `${participant.firstname} ${participant.lastname}`,
          profilePicture: participant.profilePicture,
        }),
      );

      const messages: RecievedMessage[] = response.data.messages.map(
        (msg: any) => ({
          id: msg.messageId,
          senderId: msg.senderId,
          status: msg.status,
          time: new Date(msg.sentDate * 1000),
          content: {
            text: msg.content.text || undefined,
            image: msg.content.image || undefined,
            video: msg.content.video || undefined,
            document: msg.content.document || undefined,
          },
        }),
      );
      setUsers(users);
      setMessages(messages);
    };
    fetchData();
    chatSocket.emit("openChat", chatId, user);
    chatSocket.on("receiveMessage", (message: RecievedMessage) => {
      console.log("recieved Message: ", message);
      setMessages((prev) => [...prev, message]);
      chatSocket.emit("messageRecieved", chatId, message.id);
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
      id: `${user}-${new Date().getTime()}`,
      chatId,
      senderId: user,
      time: new Date(),
      status: MessageStatus.Sent,
      content: { text: message },
    };
    setMessages((prev) => [...prev, newMessage]);
    if (chatId) {
      chatSocket?.emit("sendMessage", newMessage, (status: MessageStatus) => {
        console.log("call back called: ", status);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status } : msg,
          ),
        );
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

      {chatId && (
        <ChatInput chatId={chatId} onSendMessage={handleSendMessage} />
      )}
    </div>
  );
}

export default ChatContent;
