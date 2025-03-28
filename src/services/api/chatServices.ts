import axios from "axios";

const axiosApi = axios.create({
  baseURL: "/api",
});

export const fetchChats = async (userId: string) => {
  const response = await axiosApi.get(`/chats/${userId}`);

  return response.data;
};

export const fetchChatData = async (chatId: string) => {
  const response = await axiosApi.get(`/messages/${chatId}`);
  return response.data;
};
