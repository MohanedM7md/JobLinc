import PostCard from "../components/Posts/PostCard";
import { getPost } from "@services/api/postServices";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";

export default function Post() {
  const { postId } = useParams();
  const {
    data: postData,
    isFetching: isPostFetching,
    isError: isPostError,
    error: postError,
  } = useQuery({
    queryKey: ["getPostById", postId],
    queryFn: () => {
      if (postId) {
        return getPost(postId);
      }
      return null;
    },
    enabled: !!postId,
  });

  if (isPostFetching) {
    return (
      <div className="bg-warmWhite w-full h-dvh">
        <div className="m-auto lg:w-5/12 md:w-8/12 sm:1/1 bg-white">
          <div className="flex flex-col p-4 items-center rounded-md shadow-md bg-gray-100 animate-pulse">
            <div className="w-3/4 h-6 bg-gray-300 rounded mb-4"></div>
            <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isPostError) {
    const statusCode = (postError as AxiosError)?.response?.status;

    if (statusCode === 404) {
      return (
        <div className="flex flex-col items-center p-6 rounded-md shadow-md bg-warmWhite text-yellow-700 w-full h-dvh lg:w-5/12 md:w-8/12 sm:1/1 m-auto">
          <span className="material-icons-round text-6xl mb-4">warning</span>
          <h1 className="text-xl font-bold">Post Not Found</h1>
          <p className="text-center">
            The post you are looking for does not exist or has been removed.
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center p-6 rounded-md shadow-md bg-red-100 text-red-700 w-full lg:w-5/12 md:w-8/12 sm:1/12 m-auto">
        <span className="material-icons-round text-6xl mb-4">error</span>
        <h1 className="text-xl font-bold">Error</h1>
        <p className="text-center">
          There was an issue loading the post. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-warmWhite h-full min-h-dvh">
      <div className="bg-charcoalWhite w-full lg:w-5/12 md:w-8/12 sm:1/1 m-auto">
        {postData && <PostCard post={postData} isRepost={false} />}
      </div>
    </div>
  );
}
