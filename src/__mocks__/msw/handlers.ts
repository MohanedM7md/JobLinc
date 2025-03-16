import { http, HttpResponse } from "msw";
import {
  CommentInterface,
  PostInterface,
  RepliesInterface,
} from "../../interfaces/postInterfaces";
import { postsResponse } from "../PostsMock/postsDB";
import { commentsResponse } from "../PostsMock/commentsDB";
import { repliesResponse } from "../PostsMock/repliesDB";

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

interface AddPostParams {}

interface AddPostRequestBody {
  text: string;
  userID: string;
}

const baseURL = "https://joblinc.me/api/";
export const handler = [
  //handlers to your api calls will be here, will provide examples, if no understand, ask
  http.get(`${baseURL}post/feed`, async ({ params }) => {
    return HttpResponse.json<PostInterface[]>(postsResponse, {
      status: 200,
      statusText: "OK",
    });
  }),

  http.get(`${baseURL}post/:postID/comment`, async ({ params }) => {
    const { postID } = params;
    return HttpResponse.json<CommentInterface[]>(commentsResponse, {
      status: 200,
      statusText: "OK",
    });
  }),

  http.get(
    `${baseURL}post/:postID/comment/:commentID/replies`,
    async ({ params }) => {
      const { postID } = params;
      const { commentID } = params;
      return HttpResponse.json<RepliesInterface[]>(repliesResponse, {
        status: 200,
        statusText: "OK",
      });
    },
  ),

  http.post<AddPostParams, AddPostRequestBody>(
    `${baseURL}post/add`,
    async ({ request }) => {
      const { text, userID } = await request.json();
      const post: PostInterface = {
        postID: postsResponse.length.toString(),
        userID: userID,
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

  http.post<AddReplyParams, AddReplyRequestBody>(
    `${baseURL}post/:postID/comment/:commentID/reply`,
    async ({ params, request }) => {
      const { postID } = params;
      const { commentID } = params;
      const { replyText } = await request.json();
      const reply: RepliesInterface = {
        replyID: repliesResponse.length.toString(),
        userID: "0",
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
