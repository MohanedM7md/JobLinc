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

export interface UserPostInterface {
  postId: string;
  userId: string;
  firstname: string;
  lastname: string;
  profilePicture: string;
  headline: string;
  text: string;
  time: Date;
  likes: number;
  comments: number;
  reposts: number;
  media: string[];
}

export interface CompanyPostInterface {
  postId: string;
  companyId: string;
  companyName: string;
  profilePicture: string;
  headline: string;
  text: string;
  time: Date;
  likes: number;
  comments: number;
  reposts: number;
  media: string[];
}

export interface PostInterface {
  postId: string;
  posterId: string;
  name: string;
  profilePicture: string;
  headline: string;
  text: string;
  time: Date;
  likes: number;
  comments: number;
  reposts: number;
  media: string[];
}

export type Post = 
| {
  userPost: UserPostInterface;
  companyPost?: never;
}
| {
  userPost?: never;
  companyPost: CompanyPostInterface;
}
