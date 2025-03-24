import { connectSocket } from "./api";
import { RecievedMessage } from "@chatComponent/interfaces/Message.interfaces";
import { ChatCardInterface } from "@chatComponent/interfaces/Chat.interfaces";

let ChatSocket: SocketIOClient.Socket | null = null;

export const connectToChat = () => {
  ChatSocket = connectSocket("chat");
};

export const subscribeToMessages = (
  chatId: string,
  userId: string,
  onMessageReceived: (message: RecievedMessage) => void,
  onMessageRead: () => void,
  onUserTyping: (userId: string) => void,
  onStopUserTyping: (userId: string) => void,
) => {
  if (!ChatSocket) return;

  ChatSocket.emit("openChat", chatId, userId);
  ChatSocket.on("receiveMessage", (message: RecievedMessage) => {
    console.log("📩 Received Message:", message);
    onMessageReceived(message);
    ChatSocket?.emit("messageRecieved", chatId, message.messageId);
  });

  ChatSocket.on("messageRead", () => {
    console.log("📖 Message Read");
    onMessageRead();
  });
  ChatSocket.on("messageTyping", (userId: string) => {
    console.log("📖 Other User is typing :", userId);
    onUserTyping(userId);
  });
  ChatSocket.on("stopTyping", (userId: string) => {
    console.log("📖 Other User is stopped typing : ", userId);
    onStopUserTyping(userId);
  });
};

export const sendMessage = (
  chatId: string,
  message: RecievedMessage,
  callback?: () => void,
) => {
  if (!ChatSocket) return;
  ChatSocket.emit("sendMessage", { ...message, chatId }, callback);
};
export const typing = (chatId: string, user: string) => {
  if (!ChatSocket) return;
  ChatSocket.emit("messageTyping", chatId, user);
};
export const stopTyping = (chatId: string, user: string) => {
  if (!ChatSocket) return;
  ChatSocket.emit("stopTyping", chatId, user);
};
export const unsubscribeFromMessages = (chatId: string) => {
  if (!ChatSocket) return;
  ChatSocket.off("receiveMessage");
  ChatSocket.off("messageRead");
  ChatSocket.emit("leaveChat", chatId);
};

export const disconnectChatSocket = () => {
  if (ChatSocket) {
    ChatSocket.disconnect();
  }
};
export const subscribeToChats = (
  onChatUpdate: (chatCard: ChatCardInterface) => void,
  onNewChat: (chatCard: ChatCardInterface) => void,
) => {
  ChatSocket?.on("cardUpdate", (chatCard: ChatCardInterface) => {
    console.log("📩 Received modified chatCard:", chatCard);
    onChatUpdate(chatCard);
  });
  ChatSocket?.on("newChat", (chatCard: ChatCardInterface) => {
    console.log("📩 Received new chatCard:", chatCard);
    onNewChat(chatCard);
  });
};

export default connectToChat;
