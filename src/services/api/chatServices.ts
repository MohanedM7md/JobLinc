import { api } from "./api";
import store from "@store/store";
export const fetchChats = async () => {
  const response = await api.get(
    `/chat/all
`,
    {
      params: { userId: store.getState().user.userId },
    },
  );
  return response.data;
};

export const fetchNetWorks = async (Id: string) => {
  const response = await api.get(`/Networks/${Id}`);
  const users = response.data.map(
    ({
      userId,
      firstname: chatName,
      profilePicture: chatPicture,
    }: {
      userId: string;
      firstname: string;
      profilePicture: string;
    }) => ({ userId, chatName, chatPicture }),
  );
  return users;
};
export const fetchChatData = async (chatId: string) => {
  const response = await api.get(`/chat/c/${chatId}`);
  return response.data;
};

export const createChat = async (recievers: string[]) => {
  const response = await api.post(`/chat/openChat`, { recievers });
  return response.data;
};

export const ReadToggler = async (chatId: string) => {
  const response = await api.put(`/chat/openChat`, { chatId });
  return response.data;
};
