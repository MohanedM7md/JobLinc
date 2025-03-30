import api from "./api";
export const getNetworkFeed = async (count: number, signal: AbortSignal) => {
    try {
      const response = await api.get(`MyNetwork`, {
        params: {
          count: count,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };