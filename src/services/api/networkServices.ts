import { api } from "./api";
export const searchUsers = async (keyword: string, page = 1, limit = 7) =>
{
  try {
    const response = await api.get(`user/search`, {
      params: { keyword, page, limit },
    });
    return response.data
  } catch (error) {
    console.log("Error fetching searched users", error)
    return[];
  }
}
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

export const getMyFollowing = async () => {
  try {
    const response = await api.get('follow/following');
    return response.data;
  } catch (error) {
    console.log('Error fetching followed users:', error);
    return[];
  }
}

export const getUserFollowing = async (userId : string) => {
  try {
    const response = await api.get(`follow/${userId}/following`);
    return response.data;
  } catch (error) {
    console.log('Error fetching User following', error);
    return[];
  }
}
export const getUserFollowers = async (userId : string) => {
  try {
    const response = await api.get(`follow/${userId}/followers`);
    return response.data;
  } catch (error) {
    console.log('Error fetching User followers', error);
    return[];
  }
}
export const getMyFollowers = async () => {
  try{
    const response = await api.get('follow/followers');
    return response.data;
  } catch(error){
    console.log('error fetching my followers', error)
    return[];
  }
}
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
export const sendFollowRequest = async (followedId : string)=>{
  try {
    const repsonse = await api.post(`follow/${followedId}`);
    return repsonse;
  } catch (error) {
    console.log("error sending follow request",error);
    throw error;
  }
};
export const sendUnfollowRequest = async (followedId : string) => {
  try {
    const response = await api.post(`follow/${followedId}/unfollow`);
    return response;
  } catch (error) {
    console.log("error sending unfollow request", error);
    throw error;
  }
};
export const removeFollowerRequest = async (userId:string) => {
    try {
      const response = await api.post(`follow/${userId}/remove`);
      return response
    } catch (error) {
      console.log("error sending remove a follower request", error)
      throw error;
    }
}
export const sendConnectionRequest = async (userId: string) => {
  try {
    const response = await api.post(`connection/${userId}`);
    return response;
  } catch (error) {
    console.error("Error sending connection request:", error);
    throw error;
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
    throw error;
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
    throw error;
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
    throw error;
  }
};