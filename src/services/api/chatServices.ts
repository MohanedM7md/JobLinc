import axios from "axios";

const axiosApi = axios.create({
  baseURL: "http://localhost:4000/api",
});

export const fetchChats = async (userId: string) => {
  const response = await axiosApi.get(`/chats/${userId}`);

  return response.data;
};

export const fetchNetWorks = async (Id: string) => {
  const response = await axiosApi.get(`/Networks/${Id}`);
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
  const response = await axiosApi.get(`/messages/${chatId}`);
  return response.data;
};

export const createChat = async ({
  usersId,
  myId,
}: {
  usersId: string[];
  myId: string;
}) => {
  const response = await axiosApi.post(`/messages`, { usersId, myId });
  return response.data;
};
