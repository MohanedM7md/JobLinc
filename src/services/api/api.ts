import axios from "axios";
import store from "../../store/store";
import { getNewRefreshToken } from "../../store/userSlice";

axios.defaults.baseURL;
const api = axios.create({
  baseURL: "http://localhost:3000/api/",
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



api.interceptors.response.use(
  (response) => response,
  async (error) => {
      if (error.response?.status === 401) {
          try {
              // Refresh token before retrying the request
              console.log("tryin to refresh");
              console.log("the whole store: " + JSON.stringify(store.getState().user));
              console.log("user id before sending: " + localStorage.getItem("userId"));
              const resetRefresh = {
                //userId: store.getState().user.userId,
                userId: localStorage.getItem("userId"),
                refreshToken: localStorage.getItem("refreshToken"),
              };
              console.log("data sent to resetRefreshToken: " +  resetRefresh);
              await store.dispatch(getNewRefreshToken(resetRefresh)).unwrap()
            
              
              // Retry the failed request
              return api(error.config);
          } catch (refreshError) {
              console.error("Token refresh failed:", refreshError);
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              //window.location.href = "/Signin"; // Redirect to login page
          }
      }
      return Promise.reject(error);
  }
);
export default api;
