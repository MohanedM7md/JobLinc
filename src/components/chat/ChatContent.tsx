import { memo, useState, useEffect } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import {
  disconnectChatSocket,
  subscribeToMessages,
  unsubscribeFromMessages,
  sendMessage,
} from "@services/api/ChatSocket";
import {
  RecievedMessage,
  MessageStatus,
} from "./interfaces/Message.interfaces";
import { User } from "./interfaces/User.interfaces";
import { useUser } from "./mockUse";
import { fetchChatData, createChat } from "../../services/api/chatServices";
import useChatid from "../../context/ChatIdProvider";
import classNames from "classnames";

function ChatContent({
  userId,
  className,
}: {
  userId: string;
  className?: string;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<RecievedMessage[]>([]);
  const { chatId, setChatId } = useChatid();
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      let data;
      if (userId && !chatId) {
        data = await createChat({ userId, myId: user });
        setChatId(data.chatId);
      } else {
        data = await fetchChatData(chatId);
      }
      setUsers(data.users);
      setMessages(data.messages);
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
    );

    return () => {
      unsubscribeFromMessages();
      disconnectChatSocket();
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

  return (
    <div className={`${className} flex flex-col flex-1 overflow-hidden`}>
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

export default memo(ChatContent);
