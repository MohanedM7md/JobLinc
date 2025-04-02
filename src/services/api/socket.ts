import SERVER_URL from "./config";
import io from "socket.io-client";
import store from "@store/store";
export const connectSocket = (namespace: string) => {
  const token = store.getState().user.accessToken;
  const socket = io(`${SERVER_URL}/${namespace}`, {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
    auth: {
      authorization: token,
    },
  });

  socket.on("connect", () => {
    socket.emit("userId", store.getState().user.userId);
    console.log(`Connected to ${namespace}`);
  });

  socket.on("disconnect", () => {
    console.log(`Disconnected from ${namespace}`);
  });
  return socket;
};
