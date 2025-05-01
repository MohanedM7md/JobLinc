import { api } from "./api";
import store from "@store/store";
export const fetchChats = async () => {
  const response = await api.get("/chat/all");
  return response.data;
};

export const fetchNetWorks = async (Id: string) => {
  const response = await api.get(`/connection/connected`);
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

export const createChat = async (
  recievers: string[],
  title: string | undefined,
) => {
  const response = await api.post(`/chat/create`, {
    receiverIds: recievers,
    title,
  });
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

export const fetchRequestChatData = async () => {
  const response = await api.get("/chat/message-requests");
  if (response.status != 200)
    throw new Error("Failed to fetch message request chat data");
  return response.data;
};

export const chatRequestStatus = async (chatId: string, status: string) => {
  const response = await api.put("/chat/change-request-status", {
    chatId,
    status,
  });
  if (response.status != 200)
    throw new Error("Failed to change message status");
  return response.data;
};

export const BlockMessaging = async (status: boolean) => {
  const response = await api.put("/user/edit/personal-info", {
    allowMessages: status,
  });
  if (response.status != 200)
    throw new Error(`Response error:${response.status} failed to block use`);
};

export const getConnections = async (chatId: id) => {
  const response = await api.get(`/chat/available-connections/${chatId}`);
  if (!(response.status == 200))
    throw new Error(
      `error status:${response.status} Error while fetching connections`,
    );
  return response.data;
};

export const addParticipants = async (
  participants: string[],
  chatId: string,
) => {
  const response = await api.patch("/chat/addParticipants", {
    userIds: participants,
    chatId,
    action: "add",
  });
  if (response.status != 200)
    throw new Error(
      `Response error: ${response.status} - Failed to remove participants`,
    );
  return response.data;
};

export const removeParticipants = async (
  participants: string[],
  chatId: string,
) => {
  const response = await api.patch("/chat/removeParticipants", {
    userIds: participants,
    chatId,
    action: "remove",
  });
  if (response.status != 200)
    throw new Error(
      `Response error: ${response.status} - Failed to remove participants`,
    );
  return response.data;
};
