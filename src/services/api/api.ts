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
      (error.response.data.errorCode === 401100 ||
        error.response.data.errorCode === 401101) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const dispatch = store.dispatch;
      try {
        console.log("refreshing refresh token");
        const refreshToken = localStorage.getItem("refreshToken");
        const userId = localStorage.getItem("userId");
        const companyId = localStorage.getItem("companyId");

        if (!refreshToken && !userId) {
          console.log("No refresh token found, logging out...");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("userId");
          dispatch(logOut());

          return Promise.reject(error);
        }
        let data;
        try {
          let response;
          if (companyId)
            response = await api.post("auth/refresh-token", {
              userId,
              refreshToken,
              companyId,
            });
          else
            response = await api.post("auth/refresh-token", {
              userId,
              refreshToken,
            });
          data = response.data;
        } catch (refreshError) {
          console.log("Failed to refresh token, logging out...");
          dispatch(logOut());
          window.location.href = "/signin";
          return Promise.reject(refreshError);
        }
        dispatch(updateAccessToken(data.accessToken));
        localStorage.setItem("refreshToken", data.refreshToken);
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
