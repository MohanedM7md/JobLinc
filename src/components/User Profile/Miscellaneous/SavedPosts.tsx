import PostCard from "../../Posts/PostCard";
import MiniProfileHeader from "../ProfileHeader/MiniProfileHeader";
import { getMe } from "@services/api/userProfileServices";
import { useQuery } from "@tanstack/react-query";
import FullActivityLoading from "./FullActivityLoading";
import { useEffect, useState } from "react";
import { ProfileInterface } from "@interfaces/userInterfaces";
import { PostInterface } from "@interfaces/postInterfaces";
import { getSavedPosts } from "@services/api/postServices";

export default function SavedPosts() {
  const [userData, setUserData] = useState<ProfileInterface>();
  const [userPosts, setUserPosts] = useState<PostInterface[]>();
  const {
    data: myData,
    isFetching: isMeFetching,
    isError: isMeError,
    refetch: refetchMe,
  } = useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
    refetchOnWindowFocus: false,
  });

  const {
    data: postsData,
    isFetching: isMyPostsFetching,
    isError: isMyPostsError,
    refetch: refetchMyPosts,
  } = useQuery({
    queryKey: ["getSavedPosts"],
    queryFn: getSavedPosts,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (myData) {
      setUserData(myData);
    }
    if (postsData) {
      setUserPosts(postsData);
    }
  }, [myData, postsData]);

  const hasProfileError = isMeError;
  const hasPostsError = isMyPostsError;

  const showErrorUI = hasProfileError || hasPostsError;

  const handleRetry = () => {
    if (isMeError) refetchMe();
    if (isMyPostsError) refetchMyPosts();
  };

  if (isMeFetching || isMyPostsFetching) {
    return <FullActivityLoading />;
  }

  if (showErrorUI) {
    return (
      <div className="bg-warmWhite text-charcoalBlack min-h-dvh h-full">
        <div className="bg-charcoalWhite my-2 p-8 rounded-lg shadow-md w-12/12 m-auto flex flex-col items-center justify-center lg:w-5/12 md:w-8/12 sm:w-full">
          <div className="text-red-500 mb-4">
            <span className="material-icons text-6xl">error_outline</span>
          </div>
          <h2 className="text-xl font-medium mb-2">Something went wrong</h2>

          {hasProfileError && (
            <p className="text-mutedSilver mb-4 text-center">
              We couldn't load the user profile. Please try again.
            </p>
          )}

          {hasPostsError && !hasProfileError && (
            <p className="text-mutedSilver mb-4 text-center">
              We couldn't load the user's posts. Please try again.
            </p>
          )}

          {hasProfileError && hasPostsError && (
            <p className="text-mutedSilver mb-4 text-center">
              We couldn't load the user profile and posts. Please try again.
            </p>
          )}

          <button
            onClick={handleRetry}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-md font-medium transition duration-300 flex items-center"
          >
            <span className="material-icons mr-2">refresh</span>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-warmWhite text-charcoalBlack min-h-dvh h-full">
      {userData && (
        <div className="w-full bg-charcoalWhite">
          <MiniProfileHeader
            userId={userData.userId}
            firstname={userData.firstname}
            lastname={userData.lastname}
            headline={userData.headline}
            profilePicture={userData.profilePicture}
          />
        </div>
      )}
      <div className="bg-charcoalWhite my-2 p-4 rounded-lg shadow-md relative w-12/12 m-auto flex flex-col flex-wrap lg:w-5/12 md:w-8/12 sm:1/1">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-medium text-xl mb-4">Saved Posts</h1>
        </div>
        {userPosts && userPosts.length > 0 ? ( //Add unsave
          userPosts.map((post, index) => (
            <div key={post.postId} className="relative w-1/1 mt-2">
              <PostCard post={post} isRepost={false} />
              {index < userPosts.length - 1 && (
                <div className="border-b border-gray-500 w-11/12 mx-auto mt-2 mb-3"></div>
              )}
            </div>
          ))
        ) : (
          <div className="text-mutedSilver font-medium flex justify-center">
            You have no saved posts
          </div>
        )}
      </div>
    </div>
  );
}
