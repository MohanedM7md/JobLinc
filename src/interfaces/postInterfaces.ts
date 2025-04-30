export interface CommentInterface {
  commentId: string;
  postId: string;
  userId: string;
  firstname: string;
  lastname: string;
  profilePicture: string;
  companyId: string | null;
  companyName: string | null;
  companyLogo: string | null;
  headline: string;
  userReaction: PostReactions;
  text: string;
  time: Date;
  likes: number;
  comments: number;
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
  userReaction: PostReactions;
  profilePicture: string;
  text: string;
  time: Date;
  likes: number;
}

export interface PostInterface {
  postId: string;
  userId: string;
  firstname: string;
  lastname: string;
  companyId: string | null;
  companyName: string | null;
  companyLogo: string | null;
  profilePicture: string | null;
  headline: string;
  userReaction: PostReactions;
  text: string;
  media: Media[];
  time: Date;
  likes: number;
  comments: number;
  reposts: number;
  repost: PostInterface | null;
}

export interface ReactionInterface {
  reactId: string;
  userId: string;
  firstname: string;
  lastname: string;
  headline: string;
  profilePicture: string;
  companyId: string | null;
  companyName: string | null;
  companyLogo: string | null;
  type: PostReactions;
  time: Date;
}

export interface Media {
  type: MediaTypes;
  url: string
}

export interface MediaUpload {
  type: string;
  file: File;
}

export enum MediaTypes {
  Image = "Image",
  Video = "Video",
  Audio = "Audio",
  Document = "Document",
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
