import axios from "axios";
import store from "../../store/store";
import io from "socket.io-client";
const SERVER_URL = "http://localhost:3000/api/";
axios.defaults.baseURL;
export const api = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    console.log("token: ", token);
    console.log("store: ", store.getState());

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          console.log("No refresh token found, logging out...");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/";
          return Promise.reject(error);
        }
        const { data } = await axios.post(
          "https://joblinc.me:3000/api/auth/refresh",
          {
            refreshToken,
          },
        );
        localStorage.setItem("accessToken", data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.log("Refresh token expired, logging out...");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export const connectSocket = (namespace: string) => {
  const socket = io(`${SERVER_URL}/${namespace}`, {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
    auth: {
      token: localStorage.getItem("accessToken"),
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
