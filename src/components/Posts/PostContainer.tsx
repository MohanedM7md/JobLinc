import Post from "./PostCard";
import { postsResponse } from "../../__mocks__/PostsMock/postsDB";
import axios from "axios";
import { useEffect } from "react";


export default function PostContainer() {
  const posts = postsResponse;
  const fetchData = async () => {
    const response = await axios.get("http://localhost:5173/api/post/feed/");
    console.log(response.data);
  };
  useEffect(() => {fetchData()}, []);
  return (
    <div className="flex flex-wrap lg:w-5/12 md:w-8/12 sm:1/1 m-auto">
      {posts.map((post, i) => {
        return (
          <Post key={`post ${i}`} post={post}/>
        );
      })}
    </div>
  );
}
