import { http, HttpResponse } from "msw";
import {
  CommentInterface,
  RepliesInterface,
  PostInterface,
} from "../../../interfaces/postInterfaces";
import { postsResponse } from "./postsDB";
import { commentsResponse } from "./commentsDB";
import { repliesResponse } from "./repliesDB";

interface AddPostParams {}

interface PostRequestBody {
  text: string;
}

interface PostParams {
  postId: string;
}

interface AddCommentParams {
  postId: string;
}

interface AddCommentRequestBody {
  commentText: string;
}

interface AddReplyParams {
  postId: string;
  commentId: string;
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
  http.get(`${baseURL}post/:postId/comment`, async ({ params }) => {
    const { postId } = params;
    const comments = commentsResponse.filter(
      (comment) => comment.postId === postId,
    );
    return HttpResponse.json<CommentInterface[]>(comments, {
      status: 200,
      statusText: "OK",
    });
  }),

  //get comment replies handler
  http.get(
    `${baseURL}post/:postId/comment/:commentId/replies`,
    async ({ params }) => {
      const { postId } = params;
      const { commentId } = params;
      const replies = repliesResponse.filter(
        (reply) => reply.postId === postId && reply.commentId === commentId,
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
        postId: postsResponse.length.toString(),
        userId: "0",
        firstname: "Anime",
        lastname: "Protagonist",
        companyId: null,
        companyName: null,
        companyLogo: null,
        profilePicture:
          "https://i.pinimg.com/550x/04/bb/21/04bb2164bbfa3684118a442c17d086bf.jpg",
        headline: "I am the main character",
        text: text,
        time: new Date(),
        likes: 0,
        comments: 0,
        reposts: 0,
        media: [],
      };
      postsResponse.push(post);
      return HttpResponse.json({ status: 200, statusText: "OK" });
    },
  ),

  //edit post handler
  http.post<PostParams, PostRequestBody>(
    `${baseURL}post/:postId/edit`,
    async ({ params, request }) => {
      const { postId } = params;
      const { text } = await request.json();
      const editedPost = postsResponse.find((post) => post.postId === postId);
      if (editedPost) {
        editedPost.text = text;
        return HttpResponse.json({ status: 200, statusText: "OK" });
      }
      return HttpResponse.json({ status: 400, statusText: "Not Found" });
    },
  ),

  http.delete<PostParams>(
    `${baseURL}post/:postId/delete`,
    async ({ params }) => {
      const { postId } = params;
      const deletedPost = postsResponse.findIndex(
        (post) => post.postId === postId,
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
    `${baseURL}post/:postId/comment`,
    async ({ params, request }) => {
      const { postId } = params;
      const { commentText } = await request.json();
      const comment: CommentInterface = {
        commentId: commentsResponse.length.toString(),
        postId: postId,
        userId: "0",
        firstname: "Anime",
        lastname: "Protagonist",
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
    `${baseURL}post/:postId/comment/:commentId/reply`,
    async ({ params, request }) => {
      const { postId } = params;
      const { commentId } = params;
      const { replyText } = await request.json();
      const reply: RepliesInterface = {
        replyId: repliesResponse.length.toString(),
        userId: "0",
        postId: postId,
        commentId: commentId,
        firstname: "Anime",
        lastname: "Protagonist",
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
