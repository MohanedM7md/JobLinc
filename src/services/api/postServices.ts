import { api } from "./api";

// Fetch a a number of posts to populate a user's feed
export const getFeed = async (count: number) => {
  const response = await api.get(`post/feed/`, {
    params: {
      count: count,
    },
  });
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
export const getReplies = async (postID: string, commentId: string) => {
  const response = await api.get(`post/${postID}/comment/${commentId}/replies`);
  return response.data;
};

// Create a post
export const createPost = async (text: string) => {
  await api.post(`post/add`, { text });
};

// Create a comment (NOT in documentation)
export const createComment = async (postID: string, commentText: string) => {
  await api.post(`post/${postID}/comment`, { commentText });
};

// Create a reply (NOT in documentation)
export const createReply = async (
  postID: string,
  commentID: string,
  reply: string,
) => {
  await api.post(`post/${postID}/comment/${commentID}/reply`, {
    body: JSON.stringify({ reply }),
  });
};

export const editPost = async (postID: string, text: string) => {
  await api.post(`post/${postID}/edit`, { text });
};

export const deletePost = async (postID: string) => {
  await api.delete(`post/${postID}/delete`);
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
    params: { userID },
  });
  return response.data;
};

// Like a comment (NOT in documentation)
export const likeComment = async (postID: string, commentId: string) => {
  await api.post(`post/${postID}/comment/${commentId}/react`, {
    body: JSON.stringify({ type: "like" }),
  });
};

// Check if a comment is liked (NOT in documentation)
export const checkCommentLike = async (
  postID: string,
  commentId: string,
  userID: string,
) => {
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
};

// Check if a reply is liked (NOT in documentation)
export const checkReplyLike = async (replyId: string, userID: string) => {
  const response = await api.get(`reply/${replyId}/react`, {
    params: { userID },
  });
  return response.data;
};

// Testing Fetching user data after sign in
export const retrieveUser = async (email: string, password: string) => {
  const response = await api.post(`auth/login`, { email, password });
  return response.data;
};
