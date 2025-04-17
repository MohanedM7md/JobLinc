import PostCard from "./PostCard";
import { useEffect, useState } from "react";
import { getFeed } from "../../services/api/postServices";
import { PostInterface } from "interfaces/postInterfaces";
import PostContainerHeader from "./PostContainerHeader";
import { useQuery } from "@tanstack/react-query";

export default function PostContainer() {
  const [posts, setPosts] = useState<PostInterface[]>([]);

  const {
    data: postsData,
    isFetching: isPostsFetching,
    isError: isPostsError,
    refetch: refetchFeed,
  } = useQuery({
    queryKey: ["getFeed"],
    queryFn: ({ signal }) => getFeed(0, signal),
    enabled: true,
  });

  useEffect(() => {
    if (postsData) {
      setPosts(postsData);
    }
  }, [postsData]);

  function updateFeed() {
    refetchFeed().then(({ data }) => {
      setPosts(data as PostInterface[]);
    });
  }

  if (isPostsFetching) {
    return (
      <div className="bg-lightGray w-1/1">
        <PostContainerHeader refreshPosts={updateFeed} />
        <div className="m-auto p-2 bg-white">
          <span className="text-mutedSilver font-medium">Loading posts...</span>
        </div>
      </div>
    );
  }

  if (isPostsError) {
    return (
      <div className="bg-lightGray w-1/1">
        <PostContainerHeader refreshPosts={updateFeed} />
        <div className="m-auto p-2 bg-white">
          <span className="text-mutedSilver font-medium">Error fetching feed</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-lightGray w-1/1">
      <PostContainerHeader refreshPosts={updateFeed} />
      {posts
        ? posts.map((post, i) => {
            return (
              <div
                key={`post ${i}`}
                className={i >= 1 ? "bg-white mt-2" : "bg-white"}
              >
                <PostCard post={post} isRepost={false} />
              </div>
            );
          })
        : null}
    </div>
  );
}
