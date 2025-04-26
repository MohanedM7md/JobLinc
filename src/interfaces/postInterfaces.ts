export interface CommentInterface {
  commentId: string;
  postId: string;
  userId: string;
  firstname: string;
  lastname: string;
  profilePicture: string;
  headline: string;
  text: string;
  time: Date;
  likes: number;
  comments: number
}

export interface RepliesInterface {
  replyId: string;
  commentId: string;
  postId: string;
  userId: string;
  companyId: string | null;
  companyName: string | null;
  companyLogo: string | null;
  firstname: string;
  lastname: string;
  headline: string;
  profilePicture: string;
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
  userReaction: PostReactions;
  text: string;
  mediaURL: string[];
  time: Date;
  likes: number;
  comments: number;
  reposts: number;
  repost: PostInterface | null;
}

enum PostReactions {
  NoReaction = "NoReaction",
  Like = "Like",
  Celebrate = "Celebrate",
  Support = "Support",
  Funny = "Funny",
  Love = "Love",
  Insightful = "Insightful",
}
