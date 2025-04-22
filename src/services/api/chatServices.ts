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
  console.log("getting connection");
  const response = await api.get(`/connection/${Id}/mutual`);
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
  const response = await api.post(`/chat/create`, { receiverIds: recievers });
  return response.data;
};

export const ReadToggler = async (chatId: string) => {
  const response = await api.put(`/chat/readOrUnread`, { chatId });
  return response.data;
};

export const uploadingMedia = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(`/chat/upload-media`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
