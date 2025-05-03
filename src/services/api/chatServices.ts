import { api } from "./api";
import axios from "axios";
import toast from "react-hot-toast";
export const fetchChats = async () => {
  const response = await api.get("/chat/all");
  return response.data;
};

export const fetchNetWorks = async (Id: string) => {
  const response = await api.get(`/connection/connected`);
  const users = response.data.map(
    ({
      userId,
      firstname,
      lastname,
      profilePicture: chatPicture,
    }: {
      userId: string;
      firstname: string;
      lastname: string;
      profilePicture: string;
    }) => ({ userId, chatName: `${firstname} ${lastname}`, chatPicture }),
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
  try {
    const response = await api.post(`/chat/create`, {
      receiverIds: recievers,
      title,
    });
    toast.success("Chat succefully created!");
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        toast.error("Too many requests! Please upgrade your plan.");
        throw "429";
      } else {
        const errorMessage =
          error.response?.data?.message || error.message || "Unknown error";
        toast.error(`Error: ${errorMessage}`);
        throw new Error(errorMessage);
      }
    } else {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${errorMessage}`);
      throw error;
    }
  }
};

export const ReadToggler = async (chatId: string) => {
  const response = await api.put(`/chat/readOrUnread`, { chatId });
  return response.data;
};

export const uploadingMedia = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post(`/chat/upload-media`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      toast.error("File not supported");
      throw new Error("File not supported");
    } else {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error: ${errorMessage}`);
      throw error;
    }
  }
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

export const getConnections = async (chatId: string) => {
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
  const response = await api.post("/chat/add-or-remove-participants", {
    userIds: participants,
    chatId,
    action: "add",
  });
  if (response.status != 200) {
    toast.error(`sdasdasda${response.statusText}`);
    throw new Error(
      `Response error: ${response.status} - Failed to remove participants`,
    );
  }
  toast.success("paricipant successfuly added!");
  return response.data;
};

export const removeParticipants = async (
  participants: string[],
  chatId: string,
) => {
  const response = await api.post("/chat/add-or-remove-participants", {
    userIds: participants,
    chatId,
    action: "remove",
  });
  if (response.status != 200) {
    toast.error(`${response.statusText}`);
    throw new Error(
      `Response error: ${response.status} - Failed to remove participants`,
    );
  }
  toast.success("paricipant successfuly added!");
  return response.data;
};
