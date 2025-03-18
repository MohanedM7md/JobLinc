export interface CommentInterface {
  commentID: string;
  postID: string;
  userID: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  headline: string;
  commentText: string;
}

export interface RepliesInterface {
  replyID: string;
  commentID: string;
  postID: string;
  userID: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  headline: string;
  replyText: string;
}

export interface PostInterface {
  postID: string;
  userID: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  headline: string;
  text: string;
  likes: number;
  commentsNum: number;
  reposts: number;
  pics: string[];
}
