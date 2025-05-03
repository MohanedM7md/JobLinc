import { memo, useState, useEffect, useRef } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import {
  subscribeToMessages,
  unsubscribeFromMessages,
  sendMessage,
  typing,
  stopTyping,
  listenToOpenChatErrors,
} from "@services/api/ChatSocket";
import { RecievedMessage } from "./interfaces/Message.interfaces";
import { User } from "./interfaces/User.interfaces";
import useChats from "@hooks/useChats";
import { fetchChatData, createChat } from "@services/api/chatServices";
import useChatid from "@context/ChatIdProvider";
import useNetworkUserId from "@context/NetworkUserIdProvider";
import UserTypingIndicator from "./UserTyping";
import GroupChatSetting from "./GroupSetting/GroupChatSetting";
import { toast } from "react-toastify"; // Ensure you're importing toast
import ChatError from "./ChatError";
function ChatContent({
  className,
  onClose,
}: {
  className?: string;
  onClose?: () => void;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<RecievedMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { chatId, setChatId } = useChatid();
  const { usersId } = useNetworkUserId();
  const { title } = useNetworkUserId();

  const userIdRef = useRef<string | null>(localStorage.getItem("userId"));
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const chatType = useRef<string>("");
  let messageDelivered = useRef<boolean>(false);

  const handleMessageStatus = () => {
    setTimeout(() => {
      if (!messageDelivered.current) {
        messageDelivered.current = true;
        setMessages((prevMsgs) =>
          prevMsgs.map((msg) =>
            msg.messageId === messageId ? { ...msg, status: "failed" } : msg,
          ),
        );
      }
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (usersId.length && !chatId) {
          console.log("Create new chat with: ", usersId);
          try {
            const { data } = await createChat(usersId, title);
            setUsers(data.participants);
            console.log(data.participants);
            setMessages(data.messages);
            setChatId(data.chatId);

            chatType.current = data.chatType;
          } catch (err) {
            console.error("Failed to create chat:", err);
            if (err == "429")
              setError(" انت الان على باقة الفقراء مسموحلك 5 شاتس فاليوم بس");
            else setError("Failed to create chat");
            onClose?.();
            return;
          }
        } else if (chatId) {
          try {
            const data = await fetchChatData(chatId);
            setUsers(data.participants);
            setMessages(data.messages);
            chatType.current = data.chatType;
          } catch (err) {
            console.error("Failed to fetch chat data:", err);
            toast.error("Failed to load chat data. Please try again later.");
            setError("Failed to load chat data");
            onClose?.();
            return;
          }
        } else {
          setError("No users or chat ID provided");
          if (onClose) onClose();
          return;
        }
      } catch (err) {
        console.error("Error in chat initialization:", err);
        toast.error("An unexpected error occurred. Please try again later.");
        setError("Unexpected error");

        if (onClose) {
          onClose();
        }
        return;
      } finally {
        setLoading(false);
      }
      if (!error && chatId) {
        subscribeToMessages(
          chatId,
          (message) => setMessages((prev) => [...prev, message]),
          (userId) =>
            setMessages((prev) =>
              prev.map((msg) => ({ ...msg, seenBy: [...msg.seenBy, userId] })),
            ),
          (userId) =>
            setTypingUsers((prevTypingUsers) => {
              if (!prevTypingUsers.includes(userId)) {
                return [...prevTypingUsers, userId];
              }
              return prevTypingUsers;
            }),
          (userId) =>
            setTypingUsers((prev) =>
              prev.filter((preUser) => preUser != userId),
            ),
        );
        listenToOpenChatErrors();
      }
    };

    fetchData();

    return () => {
      if (chatId) {
        unsubscribeFromMessages(chatId);
      }
    };
  }, [chatId, usersId, title]);

  const messageId = Date.now().toString();

  const handleSendMessage = async (
    message: string | File | string,
    type: string,
  ) => {
    if (error || !chatId) {
      toast.error("Can't send message: chat not properly initialized");
      return;
    }

    const newMessage: any = {
      messageId,
      senderId: userIdRef.current,
      time: new Date(),
      seenBy: [],
      status: "sent",
      content: {},
    };

    switch (type) {
      case "text":
        newMessage.content.text = message;
        break;
      case "image":
        newMessage.content.image = message;
        break;
      case "video":
        newMessage.content.video = message;
        break;
      case "document":
        newMessage.content.document = message;
        break;
      default:
        console.warn("Unknown message type:", type);
        newMessage.content.text = typeof message === "string" ? message : "";
        break;
    }

    setMessages((prevMsgs) => [...prevMsgs, newMessage]);

    handleMessageStatus();
    sendMessage(chatId, newMessage, () => {
      messageDelivered.current = true;
      setMessages((prevMsgs) =>
        prevMsgs.map((msg) =>
          msg.messageId === messageId ? { ...msg, status: "delivered" } : msg,
        ),
      );
    });
  };

  const handleTypingMessage = (isTyping: boolean) => {
    if (!chatId || error) return;
    switch (isTyping) {
      case true:
        typing(chatId);
        break;
      case false:
        stopTyping(chatId);
        break;
    }
  };
  if (error) return <ChatError error={error} />;

  return (
    <>
      {chatType.current === "group" && (
        <GroupChatSetting users={users} setUsers={setUsers} chatId={chatId} />
      )}
      <div className={`${className} flex flex-col flex-1 overflow-y-hidden`}>
        <div className="h-full overflow-y-auto bg-gray-100">
          <ChatMessages users={users} messages={messages} loading={loading} />
          {typingUsers.map((typingUserId) => (
            <UserTypingIndicator
              key={typingUserId}
              userImage={
                users.find((user) => user.userId == typingUserId)
                  ?.profilePicture
              }
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput
          chatId={chatId}
          onSendMessage={handleSendMessage}
          onTypingMessage={handleTypingMessage}
          className=""
        />
      </div>
    </>
  );
}

export default memo(ChatContent);
