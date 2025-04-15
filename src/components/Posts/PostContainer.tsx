import PostCard from "./PostCard";
import { useEffect, useState } from "react";
import { getFeed } from "../../services/api/postServices";
import { PostInterface } from "interfaces/postInterfaces";
import PostContainerHeader from "./PostContainerHeader";

export default function PostContainer() {
  const [posts, setPosts] = useState<PostInterface[]>([]);

  function getPosts() {
    const controller = new AbortController();
    const response = getFeed(20, controller.signal);
    response.then((data) => {
      setPosts(data);
    });

    return () => {
      controller.abort();
    };
  }

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="bg-lightGray">
      <PostContainerHeader refreshPosts={getPosts} />
      {posts
        ? posts.map((post, i) => {
            return (
              <div
                key={`post ${i}`}
                className={
                  i >= 1
                    ? "bg-white w-1/1 mt-2"
                    : "bg-white w-1/1"
                }
              >
                <PostCard post={post} />
              </div>
            );
          })
        : null}
    </div>
  );
}
