import { connectSocket } from "./api";
import { RecievedMessage } from "@chatComponent/interfaces/Message.interfaces";
let ChatSocket: SocketIOClient.Socket | null = null;

export const connectToChat = () => {
  ChatSocket = connectSocket("chat");
};

export const subscribeToMessages = (
  chatId: string,
  userId: string,
  onMessageReceived: (message: RecievedMessage) => void,
  onMessageRead: () => void,
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
};

export const sendMessage = (
  chatId: string,
  message: RecievedMessage,
  callback?: () => void,
) => {
  if (!ChatSocket) return;
  ChatSocket.emit("sendMessage", { ...message, chatId }, callback);
};

export const unsubscribeFromMessages = () => {
  if (!ChatSocket) return;
  ChatSocket.off("receiveMessage");
  ChatSocket.off("messageRead");
};

export const disconnectChatSocket = () => {
  if (ChatSocket) {
    ChatSocket.disconnect();
  }
};
export default connectToChat;
