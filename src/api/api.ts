import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});


export const fetchChats = async (userId: string) => {
  const response = await api.get(`/chats/${userId}`);
  return response.data;
};

export const fetchChatData  = async (chatId: string) => {
  const response = await api.get(`/chat/u/${chatId}`);
  return response.data;
};



export const sendMessage = async (chatId: string, message: any) => {
  await api.post(`/messages/${chatId}`, message);
};
