export interface CommentInterface {
  commentText: string;
  commentID: string;
}

export interface PostInterface {
  id: string;
  text: string;
  pics: string[];
  comments: CommentInterface[];
}
