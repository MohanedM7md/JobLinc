import { api } from "./api";

// Fetch a a number of posts to populate a user's feed
export const getFeed = async (count: number, signal: AbortSignal) => {
  try {
    const response = await api.get(`post/feed/`, {
      params: {
        count: count,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching feed:", error);
  }
};

// Fetch a post by ID
export const getPost = async (postId: string) => {
  try {
    const response = await api.get(`post/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
  }
};

// Fetch comments for a post (NOT in documentation)
export const getComments = async (postId: string) => {
  try {
    const response = await api.get(`post/${postId}/comment`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};

// Fetch replies for a comment (NOT in documentation)
export const getReplies = async (postId: string, commentId: string) => {
  try {
    const response = await api.get(
      `post/${postId}/comment/${commentId}/replies`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching replies:", error);
  }
};

// Create a post
export const createPost = async (text: string) => {
  try {
    await api.post(`post/add`, { text });
  } catch (error) {
    console.error("Error creating post:", error);
  }
};

// React to post
export async function reactPost(postId: string, type: string) {
  try {
    const response = await api.post(`post/${postId}/react`, {type});
    console.log(response.data)
  } catch (error) {
    console.error("Error reacting to post:", error);
  }
}

// Create a comment 
export const createComment = async (postId: string, text: string) => {
  try {
    await api.post(`post/${postId}/comment`,  {text} );
  } catch (error) {
    console.error("Error creating comment:", error);
  }
};

// Create a reply (NOT in documentation)
export const createReply = async (
  postId: string,
  commentId: string,
  replyText: string,
) => {
  try {
    await api.post(`post/${postId}/comment/${commentId}/reply`, { replyText });
  } catch (error) {
    console.error("Error creating reply:", error);
  }
};

export const editPost = async (postId: string, text: string) => {
  try {
    await api.post(`post/${postId}/edit`, { text });
  } catch (error) {
    console.error("Error editing post:", error);
  }
};

export const deletePost = async (postId: string) => {
  try {
    await api.delete(`post/${postId}/delete`);
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};

// Like a post (NOT in documentation)
export const likePost = async (postId: string) => {
  try {
    await api.post(`post/${postId}/react`, {
      body: JSON.stringify({ type: "like" }),
    });
  } catch (error) {
    console.error("Error liking post:", error);
  }
};

// Check if a post is liked (NOT in documentation)
export const checkPostLike = async (postId: string, userId: string) => {
  try {
    const response = await api.get(`post/${postId}/react`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error checking post like:", error);
  }
};

// Like a comment (NOT in documentation)
export const likeComment = async (postId: string, commentId: string) => {
  try {
    await api.post(`post/${postId}/comment/${commentId}/react`, {
      body: JSON.stringify({ type: "like" }),
    });
  } catch (error) {
    console.error("Error liking comment:", error);
  }
};

// Check if a comment is liked (NOT in documentation)
export const checkCommentLike = async (
  postId: string,
  commentId: string,
  userId: string,
) => {
  try {
    const response = await api.get(
      `post/${postId}/comment/${commentId}/react`,
      {
        params: { userId },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error checking comment like:", error);
  }
};

// Like a reply (NOT in documentation)
export const likeReply = async (replyId: string) => {
  try {
    await api.post(`reply/${replyId}/react`, {
      body: JSON.stringify({ type: "like" }),
    });
  } catch (error) {
    console.error("Error liking reply:", error);
  }
};

// Check if a reply is liked (NOT in documentation)
export const checkReplyLike = async (replyId: string, userId: string) => {
  try {
    const response = await api.get(`reply/${replyId}/react`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error checking reply like:", error);
  }
};

// Testing Fetching user data after sign in
export const retrieveUser = async (email: string, password: string) => {
  const response = await api.post(`auth/login`, { email, password });
  return response.data;
};
