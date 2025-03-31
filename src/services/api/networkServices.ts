import api from "./api";
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