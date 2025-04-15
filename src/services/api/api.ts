import axios from "axios";
import store from "@store/store";
import { API_URL } from "./config";
import { logOut, updateAccessToken } from "@store/user/userSlice";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().user.accessToken;
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

      const dispatch = store.dispatch;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const userId = store.getState().user.userId;
        if (!refreshToken) {
          console.log("No refresh token found, logging out...");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("userState");
          dispatch(logOut());

          return Promise.reject(error);
        }
        const { data } = await api.post("auth/refresh-token", {
          userId: userId,
          refreshToken: refreshToken,
        });
        dispatch(updateAccessToken(data.accessToken));
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.log("Refresh token expired, logging out...");
        dispatch(logOut());
        window.location.href = "/signin";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
