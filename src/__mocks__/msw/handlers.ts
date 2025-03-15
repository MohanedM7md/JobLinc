import { http, HttpResponse } from "msw";
import { CommentInterface, PostInterface, RepliesInterface } from "../../interfaces/postInterfaces";
import { postsResponse } from "../PostsMock/postsDB";
import { commentsResponse } from "../PostsMock/commentsDB";
import { repliesResponse } from "../PostsMock/repliesDB";
export const handler = [
  //handlers to your api calls will be here, will provide examples, if no understand, ask
  http.get("https://joblinc.me/api/post/feed", async ({ params }) => {
    return HttpResponse.json<PostInterface[]>(postsResponse,{ status: 200, statusText: "OK" },);}),

  http.get("https://joblinc.me/api/post/0/comment", async () => {
    return HttpResponse.json<CommentInterface[]>(commentsResponse, {status:200, statusText:"OK"})}),

  http.get("https://joblinc.me/api/post/0/comment/0/replies", async ()=> {
    return HttpResponse.json<RepliesInterface[]>(repliesResponse, {status:200, statusText:"OK"})}),
];
