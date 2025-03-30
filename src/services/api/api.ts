import axios from "axios";
import store from "../../store/store";
import SERVER_URL from "./config";
interface user {
  userId: string;
  role: string;
  refreshToken: string;
}
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
    console.log("accessToken : ", token);
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
        const user: user = JSON.parse(localStorage.getItem("user") || "{}");

        if (!user.refreshToken) {
          console.log("No refresh token found, logging out...");
          localStorage.removeItem("user");

          window.location.href = "/";
          return Promise.reject(error);
        }
        const { data } = await api.post("auth/refresh-token", {
          userId: user.userId,
          refreshToken: user.refreshToken,
        });
        localStorage.setItem("accessToken", data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.log("Refresh token expired, logging out...");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        window.location.href = "/signin";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
