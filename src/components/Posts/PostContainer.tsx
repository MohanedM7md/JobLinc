import PostCard from "./PostCard";
import { useEffect, useState } from "react";
import { getFeed } from "../../services/api/postServices";
import { PostInterface } from "interfaces/postInterfaces";
import PostContainerHeader from "./PostContainerHeader";
import { useQuery } from "@tanstack/react-query";

export default function PostContainer() {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(10);
  const [hasReachedBottom, setHasReachedBottom] = useState<boolean>(false);

  const {
    data: postsData,
    isFetching: isPostsFetching,
    isError: isPostsError,
    refetch: refetchFeed,
  } = useQuery({
    queryKey: ["getFeed", start, end],
    queryFn: ({ signal }) => getFeed(start, end, signal),
    enabled: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (postsData) {
      setPosts((prevPosts) => [...prevPosts, ...postsData]);
    }
  }, [postsData]);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY + 10 >=
        document.documentElement.scrollHeight
      ) {
        if (!hasReachedBottom && postsData && postsData.length > 0) {
          setHasReachedBottom(true);
          setStart((prevStart) => prevStart + 10);
          setEnd((prevEnd) => prevEnd + 10);
        }
      } else {
        setHasReachedBottom(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasReachedBottom, postsData]);

  function updateFeed() {
    refetchFeed().then(({ data }) => {
      setPosts(data as PostInterface[]);
    });
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

      {isPostsFetching && (
        <div className="m-auto bg-white">
          <div className="flex flex-col p-4 items-center rounded-md shadow-md bg-gray-100 animate-pulse">
            <div className="w-3/4 h-6 bg-gray-300 rounded mb-4"></div>
            <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      )}

      {isPostsError && (
        <div className="m-auto p-6 bg-red-100 text-red-700 rounded-md shadow-md flex flex-col items-center">
          <span className="material-icons-round text-6xl mb-4">error</span>
          <h1 className="text-xl font-bold">Error</h1>
          <p className="text-center mb-4">
            Unable to fetch the feed. Please try refreshing the page.
          </p>
          <button
            onClick={updateFeed}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration:400"
          >
            Retry
          </button>
        </div>
      )}

      {!isPostsFetching && postsData && postsData.length === 0 && (
        <div className="m-auto p-6 bg-white text-red-700 rounded-md shadow-md flex flex-col items-center">
          <h1 className="text-xl font-bold">End of Posts</h1>
          <p className="text-center mb-4">
            You have reached the end of the posts.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-crimsonRed text-white rounded-md hover:bg-red-700 transition duration:400"
          >
            Refresh Page
          </button>
        </div>
      )}
    </div>
  );
}
