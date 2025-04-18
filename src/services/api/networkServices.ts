import { api } from "./api";
export const getNetworkFeed = async (count: number, signal: AbortSignal) => {
    try {
      const response = await api.get(`MyNetwork`, {
        params: {
          count: count,
          signal,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

export const getPendingInvitations = async (
  count: number,
  signal: AbortSignal
) => {
  try {
    const response = await api.get('pendinginvitations', {
      params: { count },
      signal,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pending invitations:', error);
    return [];
  }
};

export const getUserConnections = async (
  userId: string,
) => {
  try {
    const response = await api.get(`connection/${userId}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user connections:', error);
    return [];
  }
};

export const sendConnectionRequest = async (targetId: string, userId: string) => {
  try {
    const payload = {
      targetId,
      userId,
      requestedAt: new Date().toISOString(),
      status: "pending",
    };
    const response = await api.post(`connections/add`, payload);
    return response;
  } catch (error) {
    console.error("Error sending connection request:", error);
  }
};