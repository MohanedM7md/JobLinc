import { http, HttpResponse } from "msw";
import {
  CommentInterface,
  PostInterface,
  RepliesInterface,
} from "../../../interfaces/postInterfaces";
import { postsResponse } from "../../PostsMock/postsDB";
import { commentsResponse } from "../../PostsMock/commentsDB";
import { repliesResponse } from "../../PostsMock/repliesDB";

interface AddPostParams {}

interface PostRequestBody {
  text: string;
}

interface PostParams {
  postID: string;
}

interface AddCommentParams {
  postID: string;
}

interface AddCommentRequestBody {
  commentText: string;
}

interface AddReplyParams {
  postID: string;
  commentID: string;
}

interface AddReplyRequestBody {
  replyText: string;
}

const baseURL = "/api/";

export const postHandler = [
  //handlers to your api calls will be here, will provide examples, if no understand, ask
  //get feed handler
  http.get(`${baseURL}post/feed`, async ({ params }) => {
    return HttpResponse.json<PostInterface[]>(postsResponse, {
      status: 200,
      statusText: "OK",
    });
  }),

  //get post comments handler
  http.get(`${baseURL}post/:postID/comment`, async ({ params }) => {
    const { postID } = params;
    const comments = commentsResponse.filter(
      (comment) => comment.postID === postID,
    );
    return HttpResponse.json<CommentInterface[]>(comments, {
      status: 200,
      statusText: "OK",
    });
  }),

  //get comment replies handler
  http.get(
    `${baseURL}post/:postID/comment/:commentID/replies`,
    async ({ params }) => {
      const { postID } = params;
      const { commentID } = params;
      const replies = repliesResponse.filter(
        (reply) => reply.postID === postID && reply.commentID === commentID,
      );
      return HttpResponse.json<RepliesInterface[]>(replies, {
        status: 200,
        statusText: "OK",
      });
    },
  ),

  //add post handler
  http.post<AddPostParams, PostRequestBody>(
    `${baseURL}post/add`,
    async ({ request }) => {
      const { text } = await request.json();
      console.log(text);
      const post: PostInterface = {
        //user data are hard coded for now
        postID: postsResponse.length.toString(),
        userID: "0",
        firstName: "Anime",
        lastName: "Protagonist",
        profilePicture:
          "https://i.pinimg.com/550x/04/bb/21/04bb2164bbfa3684118a442c17d086bf.jpg",
        headline: "I am the main character",
        text: text,
        likes: 0,
        commentsNum: 0,
        reposts: 0,
        pics: [],
      };
      postsResponse.push(post);
      return HttpResponse.json({ status: 200, statusText: "OK" });
    },
  ),

  //edit post handler
  http.post<PostParams, PostRequestBody>(
    `${baseURL}post/:postID/edit`,
    async ({ params, request }) => {
      const { postID } = params;
      const { text } = await request.json();
      let editedPost = postsResponse.find((post) => post.postID === postID);
      if (editedPost) {
        editedPost.text = text;
        return HttpResponse.json({ status: 200, statusText: "OK" });
      }
      return HttpResponse.json({ status: 400, statusText: "Not Found" });
    },
  ),

  http.delete<PostParams>(
    `${baseURL}post/:postID/delete`,
    async ({ params }) => {
      const { postID } = params;
      const deletedPost = postsResponse.findIndex(
        (post) => (post.postID = postID),
      );
      if (deletedPost != -1) {
        console.log(postsResponse);
        postsResponse.splice(deletedPost, 1);
        console.log(postsResponse);
        return HttpResponse.json({ status: 200, statusText: "OK" });
      }
      return HttpResponse.json({ status: 400, statusText: "Not Found" });
    },
  ),

  //add comment handler
  http.post<AddCommentParams, AddCommentRequestBody>(
    `${baseURL}post/:postID/comment`,
    async ({ params, request }) => {
      const { postID } = params;
      const { commentText } = await request.json();
      const comment: CommentInterface = {
        commentID: commentsResponse.length.toString(),
        postID: postID,
        userID: "0",
        firstName: "Anime",
        lastName: "Protagonist",
        profilePicture:
          "https://i.pinimg.com/550x/04/bb/21/04bb2164bbfa3684118a442c17d086bf.jpg",
        headline: "I am the main character",
        commentText: commentText,
      };
      commentsResponse.push(comment);
      return HttpResponse.json({ status: 200, statusText: "OK" });
    },
  ),

  //add reply handler
  http.post<AddReplyParams, AddReplyRequestBody>(
    `${baseURL}post/:postID/comment/:commentID/reply`,
    async ({ params, request }) => {
      const { postID } = params;
      const { commentID } = params;
      const { replyText } = await request.json();
      const reply: RepliesInterface = {
        replyID: repliesResponse.length.toString(),
        userID: "0",
        postID: postID,
        commentID: commentID,
        firstName: "Anime",
        lastName: "Protagonist",
        profilePicture:
          "https://i.pinimg.com/550x/04/bb/21/04bb2164bbfa3684118a442c17d086bf.jpg",
        headline: "I am the main character",
        replyText: replyText,
      };
      repliesResponse.push(reply);
      return HttpResponse.json({ status: 200, statusText: "OK" });
    },
  ),
];
