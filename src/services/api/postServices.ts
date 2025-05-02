import { Media } from "@interfaces/postInterfaces";
import { api } from "./api";

// Fetch a a number of posts to populate a user's feed
export async function getFeed(start: number, end: number, signal: AbortSignal) {
  try {
    const response = await api.get(`post/feed/`, {
      params: { start: start, end: end },
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

// Fetch comments for a post
export async function getComments(postId: string) {
  try {
    const response = await api.get(`post/${postId}/comments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}

// Fetch replies for a comment (NOT in documentation)
export async function getReplies(commentId: string) {
  try {
    const response = await api.get(`comment/${commentId}/replies`);
    return response.data;
  } catch (error) {
    console.error("Error fetching replies:", error);
    throw error;
  }
}

// Create a post
export async function createPost(postContent: {
  repost?: string;
  text: string;
  media?: Media[];
  isPublic: boolean
}) {
  try {
    const response = await api.post(`post/add`, postContent);
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

export async function getPostReactions(postId: string) {
  try {
    const response = await api.get(`post/${postId}/reactions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reactions:", error);
    throw error;
  }
}

export async function reactComment({
  commentId,
  type,
}: {
  commentId: string;
  type: string;
}) {
  try {
    const response = await api.post(`comment/${commentId}/react`, { type });
    return response.status;
  } catch (error) {
    console.error("Error reacting to post:", error);
    throw error;
  }
}

export async function getCommentReactions(commentId: string) {
  try {
    const response = await api.get(`comment/${commentId}/reactions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reactions:", error);
    throw error;
  }
}

export async function reactReply({
  replyId,
  type,
}: {
  replyId: string;
  type: string;
}) {
  try {
    const response = await api.post(`reply/${replyId}/react`, { type });
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

// Create a reply
export async function createReply({
  commentId,
  text,
}: {
  commentId: string;
  text: string;
}) {
  try {
    const response = await api.post(`comment/${commentId}/reply`, {
      text,
    });
    return response.status;
  } catch (error) {
    console.error("Error creating reply:", error);
    throw error;
  }
}

export async function editPost({
  postId,
  text,
  media,
}: {
  postId: string;
  text: string;
  media: Media[]
}) {
  try {
    const response = await api.post(`post/${postId}/edit`, { text, media });
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

export async function editComment({
  commentId,
  text,
}: {
  commentId: string;
  text: string;
}) {
  try {
    const response = await api.post(`comment/${commentId}/edit`, { text });
    return response.status;
  } catch (error) {
    console.error("Error editing post:", error);
    throw error;
  }
}

export async function deleteComment(commentId: string) {
  try {
    const response = await api.post(`comment/${commentId}/delete`);
    return response.status;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}

export async function savePost(postId: string) {
  try {
    const response = await api.post(`post/${postId}/save`);
    return response.status;
  } catch (error) {
    console.error("Error saving post:", error);
    throw error;
  }
}

export async function getSavedPosts() {
  try {
    const response = await api.get(`post/saved-posts`);
    return response.data;
  } catch (error) {
    console.log("Error retrieving posts:", error)
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

export async function reportPost(reportedId: string) {
  try {
    const response = await api.post(`reports/reportPost`, { reportedId });
    return response.status;
  } catch (error) {
    console.error("Error reporting post:", error);
    throw error;
  }
}

export async function reportComment(reportedId: string) {
  try {
    const response = await api.post(`reports/reportComment`, { reportedId });
    return response.status;
  } catch (error) {
    console.error("Error reporting post:", error);
    throw error;
  }
}

export async function uploadMedia(formData: FormData) {
  try {
    const response = await api.post(`post/upload-media`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading media:", error);
    throw error;
  }
}
