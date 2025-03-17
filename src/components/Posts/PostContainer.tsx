import Post from "./PostCard";
import { postsResponse } from "../../__mocks__/PostsMock/postsDB";
import { useEffect } from "react";
import { getFeed } from "../../services/api/api";

export default function PostContainer() {
  const posts = postsResponse;
  useEffect(() => {
    getFeed();
  }, []);
  return (
    <div className="flex flex-wrap lg:w-5/12 md:w-8/12 sm:1/1 m-auto">
      {posts.map((post, i) => {
        return <Post key={`post ${i}`} post={post} />;
      })}
    </div>
  );
}
