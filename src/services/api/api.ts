import axios from "axios";
import store from "../../store/store";
import io from "socket.io-client";
const SERVER_URL = "http://localhost:4000";
axios.defaults.baseURL;
export const api = axios.create({
  baseURL: "https://joblinc.me:3000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().user.accessToken;
    console.log("token: ", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const connectSocket = (namespace: string) => {
  const socket = io(`${SERVER_URL}/${namespace}`, {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
    auth: {
      token: localStorage.getItem("token"),
    },
  });

  socket.on("connect", () => {
    console.log(`Connected to ${namespace}`);
  });

  socket.on("disconnect", () => {
    console.log(`Disconnected from ${namespace}`);
  });
  return socket;
};
