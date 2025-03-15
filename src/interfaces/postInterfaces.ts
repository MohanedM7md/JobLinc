export interface CommentInterface {
  commentID: string;
  userID: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  headline: string;
  commentText: string;
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
  reposts: number;
  pics: string[];
  comments: CommentInterface[];
}
