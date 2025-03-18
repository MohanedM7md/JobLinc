import Post from "./PostCard";
import { useEffect, useState } from "react";
import { getFeed } from "../../services/api/postServices";

export default function PostContainer() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const response = getFeed(10);
    response.then((data) => {
      setPosts(data);
    });
  }, []);
  return (
    <div className="flex flex-wrap lg:w-5/12 md:w-8/12 sm:1/1 m-auto">
      {posts.map((post, i) => {
        return <Post key={`post ${i}`} post={post} />;
      })}
    </div>
  );
}
