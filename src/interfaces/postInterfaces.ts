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
  userId: string | null;
  firstname: string;
  lastname: string;
  companyId: string | null;
  companyName: string | null;
  companyLogo: string | null;
  profilePicture: string | null;
  headline: string;
  text: string;
  mediaURL: string[];
  time: Date;
  likes: number;
  comments: number;
  reposts: number;
  repost: PostInterface | null;
}
