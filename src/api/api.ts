import axios from "axios";

export const api = axios.create({
  baseURL: "/api", //to be edited when the actual API is up
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch chats for a user
export const fetchChats = async (userId: string) => {
  const response = await api.get(`/chats/${userId}`);
  return response.data;
};

// Fetch messages for a chat
export const fetchMessages = async (chatId: string) => {
  const response = await api.get(`/messages/${chatId}`);
  return response.data;
};

// Fetch users in a chat
export const fetchChatUsers = async (chatId: string) => {
  const response = await api.get(`/chats/${chatId}/users`);
  return response.data;
};

// Send a message
export const sendMessage = async (chatId: string, message: any) => {
  await api.post(`/messages/${chatId}`, message);
};

// Fetch a a number of posts to populate a user's feed
export const getFeed = async () => {
  const response = await api.get(`post/feed/`);
  return response.data;
};

// Fetch a post by ID
export const getPost = async (postID: string) => {
  const response = await api.get(`post/${postID}`);
  return response.data;
};

// Fetch comments for a post (NOT in documentation)
export const getComments = async (postID: string) => {
  const response = await api.get(`post/${postID}/comment`);
  return response.data;
};

// Fetch replies for a comment (NOT in documentation)
export const getReplies = async (postID: string,commentId: string) => {
  const response = await api.get(`post/${postID}/comment/${commentId}/replies`);
  return response.data;
};

// Create a post
export const createPost = async (text: string, userID: string) => {
  await api.post(`post/add`, {
    body: JSON.stringify({ text, userID }),
  });
};

// Create a comment (NOT in documentation)
export const createComment = async (postID: string, comment: string) => {
  await api.post(`post/${postID}/comment`, {
    body: JSON.stringify({ comment }),
  });
};

// Create a reply (NOT in documentation)
export const createReply = async (postID: string,commentID: string, reply: string) => {
  await api.post(`post/${postID}/comment/${commentID}/reply`, {
    body: JSON.stringify({ reply }),
  });
};

// Like a post (NOT in documentation)
export const likePost = async (postId: string) => {
  await api.post(`post/${postId}/react`, {
    body: JSON.stringify({ type: "like" }),
  });
};

// Check if a post is liked (NOT in documentation)
export const checkPostLike = async (postId: string, userID: string) => {
  const response = await api.get(`post/${postId}/react`, {
    params: { userID }});
  return response.data;
};

// Like a comment (NOT in documentation)
export const likeComment = async (postID: string, commentId: string) => {
  await api.post(`post/${postID}/comment/${commentId}/react`, {
    body: JSON.stringify({ type: "like" }),
  });
};

// Check if a comment is liked (NOT in documentation)
export const checkCommentLike = async (postID:string, commentId: string, userID: string) => {
  const response = await api.get(`post/${postID}/comment/${commentId}/react`, {
    params: { userID },
  });
  return response.data;
};

// Like a reply (NOT in documentation)
export const likeReply = async (replyID: string) => {
  await api.post(`reply/${replyID}/react`, {
    body: JSON.stringify({ type: "like" }),
  });
}

// Check if a reply is liked (NOT in documentation)
export const checkReplyLike = async (replyId: string, userID: string) => {
  const response = await api.get(`reply/${replyId}/react`, {
    params: { userID }});
  return response.data;
};







