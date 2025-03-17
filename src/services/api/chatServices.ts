import api from "./api";

export const fetchChats = async (userId: string) => {
  const response = await api.get(`/chats/${userId}`);
  return response.data;
};

export const fetchChatData = async (chatId: string) => {
  const response = await api.get(`/chat/u/${chatId}`);
  return response.data;
};

export const sendMessage = async (chatId: string, message: any) => {
  await api.post(`/messages/${chatId}`, message);
};
