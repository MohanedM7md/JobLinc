export interface CommentInterface {
  commentId: string;
  postId: string;
  userId: string;
  firstname: string;
  lastname: string;
  profilePicture: string;
  headline: string;
  commentText: string;
}

export interface RepliesInterface {
  replyId: string;
  commentId: string;
  postId: string;
  userId: string;
  firstname: string;
  lastname: string;
  profilePicture: string;
  headline: string;
  replyText: string;
}

export interface PostInterface {
  postId: string;
  userId: string;
  firstname: string;
  lastname: string;
  profilePicture: string;
  headline: string;
  text: string;
  likes: number;
  comments: number;
  reposts: number;
  pics: string[];
}
