import axios from "axios";

const axiosApi = axios.create({
  baseURL: "http://localhost:4000/api",
});

export const fetchChats = async (userId: string) => {
  const response = await axiosApi.get(`/chats/${userId}`);

  return response.data;
};

export const fetchNetWorks = async (userId: string) => {
  const response = await axiosApi.get(`/Networks/${userId}`);

  return response.data;
};
export const fetchChatData = async (chatId: string) => {
  const response = await axiosApi.get(`/messages/${chatId}`);
  return response.data;
};

export const createChat = async ({
  userId,
  myId,
}: {
  userId: string;
  myId: string;
}) => {
  const response = await axiosApi.post(`/messages`, { userId, myId });
  return response.data;
};
