import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4000";

let chatSocket: SocketIOClient.Socket | null = null;

// Connects to the Chat Namespace
export const connectChatSocket = (): SocketIOClient.Socket => {
  if (!chatSocket) {
    chatSocket = io(`${SOCKET_SERVER_URL}/chat`, {
      transports: ["websocket"],
    });

    chatSocket.on("connect", () => console.log("Connected to Chat Socket"));

    chatSocket.on("disconnect", () => {
      console.log("Chat Socket Disconnected");
      chatSocket = null;
    });
  }

  return chatSocket;
};

// Disconnects chat socket properly
export const disconnectChatSocket = () => {
  if (chatSocket) {
    chatSocket.disconnect();
    chatSocket = null;
  }
};

export const onReceiveMessage = (callback: (message: any) => void) => {
  chatSocket?.on("receiveMessage", callback);
};

export const emitSendMessage = (message: any) => {
  chatSocket?.emit("sendMessage", message);
};
