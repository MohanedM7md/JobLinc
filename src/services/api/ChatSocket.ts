import { connectSocket } from "./socket";
import { RecievedMessage } from "@chatComponent/interfaces/Message.interfaces";
import { ChatCardInterface } from "@chatComponent/interfaces/Chat.interfaces";

let ChatSocket: SocketIOClient.Socket | null = null;

export const connectToChat = () => {
  ChatSocket = connectSocket("chat");
  return ChatSocket;
};

export const subscribeToMessages = (
  chatId: string,
  onMessageReceived: (message: RecievedMessage) => void,
  onMessageRead: (senderId: string) => void,
  onUserTyping: (userId: string) => void,
  onStopUserTyping: (userId: string) => void,
) => {
  if (!ChatSocket) return;

  ChatSocket.emit("openChat", chatId);
  ChatSocket.on("receiveMessage", (message: RecievedMessage) => {
    console.log("📩 Received Message:", message);
    ChatSocket!.emit("messageRecieved", chatId, message.messageId);
    onMessageReceived(message);
  });

  ChatSocket.on("messageRead", (senderId: string) => {
    console.log("📖 Message Read by", senderId);
    onMessageRead(senderId);
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
export const typing = (chatId: string) => {
  if (!ChatSocket) return;
  ChatSocket.emit("messageTyping", chatId);
};
export const stopTyping = (chatId: string) => {
  if (!ChatSocket) return;
  ChatSocket.emit("stopTyping", chatId);
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
  ChatSocket!.on("cardUpdate", (chatCard: ChatCardInterface) => {
    console.log("📩 Received modified chatCard:", chatCard);
    onChatUpdate(chatCard);
  });
  ChatSocket!.on("newChat", (chatCard: ChatCardInterface) => {
    console.log("📩 Received new chatCard:", chatCard);
    onNewChat(chatCard);
  });
};

export default connectToChat;
