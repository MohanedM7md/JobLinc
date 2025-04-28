import { api } from "./api";
export const getNetworkFeed = async (count: number, signal: AbortSignal) => {
    try {
      const response = await api.get(`connection/feed`, {
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

  // export const getNetworkFeedTest = async () => {
  //   try {
  //     const response = await api.get(`connection/connected`);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching feed:", error);
  //   }
  // };
export const getPendingInvitations = async (
) => {
  try {
    const response = await api.get('connection/received');
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
export const getMutualConnections = async (
  userId: string,
) => {
  try {
    const response = await api.get(`connection/${userId}/mutual`);
    return response.data;
  } catch (error) {
    console.error('Error fetching mutual connections:', error);
    return [];
  }
};

export const getConnections = async (
) => {
  try {
    const response = await api.get(`connection/connected`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user connections:', error);
    return [];
  }
};

export const getBlockedUsers = async (
) => {
  try {
    const response = await api.get('connection/blocked');
    return response.data;
  } catch (error) {
    console.error('Error fetching blocked users:', error);
    return [];
  }
};


export const sendConnectionRequest = async (userId: string) => {
  try {
    const response = await api.post(`connections/${userId}`);
    return response;
  } catch (error) {
    console.error("Error sending connection request:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
export const changeConnectionStatus = async (
  userId: string,
  status: string,
) => {
  try {
    const response = await api.post(`connection/${userId}/change`,{status});
    return response;
  } catch (error) {
    console.error("Error changing connection status:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export const AcceptConnectionRequest = async (
  userId: string,
) => {
  try {
    const payload = {
      status: "Accepted",
    };
    const response = await api.post(`connection/${userId}/respond`, payload);
    return response;
  } catch (error) {
    console.error("Error Accepting connection request:", error);
    throw error; // Rethrow the error to be handled by the caller 
  }
};

export const RejectConnectionRequest = async (
  userId: string,
) => {
  try {
    const payload = {
      status: "Rejected",
    };
    const response = await api.post(`connection/${userId}/respond`, payload);
    return response;
  } catch (error) {
    console.error("Error Rejecting connection request:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};