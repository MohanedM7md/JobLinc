import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch chats for a user
export const fetchChats = async (userId: string) => {
  const response = await api.get(`/chats/${userId}`);
  return response.data;
};

// Fetch messages for a chat
export const fetchMessages = async (chatId: string) => {
  const response = await api.get(`/messages/${chatId}`);
  return response.data;
};

// Fetch users in a chat
export const fetchChatUsers = async (chatId: string) => {
  const response = await api.get(`/chats/${chatId}/users`);
  return response.data;
};

// Send a message
export const sendMessage = async (chatId: string, message: any) => {
  await api.post(`/messages/${chatId}`, message);
};
