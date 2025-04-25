import { api } from "./api";

// Fetch a a number of posts to populate a user's feed
export async function getFeed(count: number, signal: AbortSignal) {
  try {
    const response = await api.get(`post/feed/`, {
      params: { count },
      signal,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching feed:", error);
    throw error;
  }
}

// Fetch a post by ID
export async function getPost(postId: string) {
  try {
    const response = await api.get(`post/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}

// Fetch comments for a post (NOT in documentation)
export async function getComments(postId: string) {
  try {
    const response = await api.get(`post/${postId}/comment`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}

// Fetch replies for a comment (NOT in documentation)
export async function getReplies(postId: string, commentId: string) {
  try {
    const response = await api.get(
      `post/${postId}/comment/${commentId}/replies`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching replies:", error);
    throw error;
  }
}

// Create a post
export async function createPost({ repost, text } : { repost?: string,text: string }) {
  try {
    const response = repost
      ? await api.post(`post/add`, { repost, text })
      : await api.post(`post/add`, { text });
    return response.status;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

// React to post
export async function reactPost({
  postId,
  type,
}: {
  postId: string;
  type: string;
}) {
  try {
    const response = await api.post(`post/${postId}/react`, { type });
    return response.status;
  } catch (error) {
    console.error("Error reacting to post:", error);
    throw error;
  }
}

// Create a comment
export async function createComment({
  postId,
  comment,
}: {
  postId: string;
  comment: string;
}) {
  try {
    const response = await api.post(`post/${postId}/comment`, {
      text: comment,
    });
    return response.status;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
}

// Create a reply (NOT in documentation)
export async function createReply(
  postId: string,
  commentId: string,
  replyText: string,
) {
  try {
    const response = await api.post(
      `post/${postId}/comment/${commentId}/reply`,
      { replyText },
    );
    return response.status;
  } catch (error) {
    console.error("Error creating reply:", error);
    throw error;
  }
}

export async function editPost({
  postId,
  text,
}: {
  postId: string;
  text: string;
}) {
  try {
    const response = await api.post(`post/${postId}/edit`, { text });
    return response.status;
  } catch (error) {
    console.error("Error editing post:", error);
    throw error;
  }
}

export async function deletePost(postId: string) {
  try {
    const response = await api.post(`post/${postId}/delete`);
    return response.status;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}

// Like a post (NOT in documentation)
export async function likePost(postId: string) {
  try {
    const response = await api.post(`post/${postId}/react`, { type: "like" });
    return response.status;
  } catch (error) {
    console.error("Error liking post:", error);
    throw error;
  }
}

// Check if a post is liked (NOT in documentation)
export async function checkPostLike(postId: string, userId: string) {
  try {
    const response = await api.get(`post/${postId}/react`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error checking post like:", error);
    throw error;
  }
}

// Like a comment (NOT in documentation)
export async function likeComment(postId: string, commentId: string) {
  try {
    const response = await api.post(
      `post/${postId}/comment/${commentId}/react`,
      { type: "like" },
    );
    return response.status;
  } catch (error) {
    console.error("Error liking comment:", error);
    throw error;
  }
}

// Check if a comment is liked (NOT in documentation)
export async function checkCommentLike(
  postId: string,
  commentId: string,
  userId: string,
) {
  try {
    const response = await api.get(
      `post/${postId}/comment/${commentId}/react`,
      { params: { userId } },
    );
    return response.data;
  } catch (error) {
    console.error("Error checking comment like:", error);
    throw error;
  }
}

// Like a reply (NOT in documentation)
export async function likeReply(replyId: string) {
  try {
    const response = await api.post(`reply/${replyId}/react`, { type: "like" });
    return response.status;
  } catch (error) {
    console.error("Error liking reply:", error);
    throw error;
  }
}

// Check if a reply is liked (NOT in documentation)
export async function checkReplyLike(replyId: string, userId: string) {
  try {
    const response = await api.get(`reply/${replyId}/react`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error checking reply like:", error);
    throw error;
  }
}

// Testing Fetching user data after sign in
export async function retrieveUser(email: string, password: string) {
  try {
    const response = await api.post(`auth/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Error retrieving user:", error);
    throw error;
  }
}
