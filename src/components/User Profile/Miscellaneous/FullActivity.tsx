import PostCreate from "../../Posts/PostCreate";
import PostCard from "../../Posts/PostCard";
import MiniProfileHeader from "../ProfileHeader/MiniProfileHeader";
import { PostInterface } from "@interfaces/postInterfaces";
import { ProfileInterface } from "@interfaces/userInterfaces";
import { getMe, getMyPosts, getUserById, getUserPosts } from "@services/api/userProfileServices";
import store from "@store/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "../../utils/Modal";
import FullActivityLoading from "./FullActivityLoading";

export default function FullActivity() {
    const { userId } = useParams();
    const [isUser, setIsUser] = useState<boolean>();
    const [userData, setUserData] = useState<ProfileInterface>();
    const [userPosts, setUserPosts] = useState<PostInterface[]>([]);
    const [addPostModal, setAddPostModal] = useState<boolean>(false);

    useEffect(() => {
        const loggedInUserId = store.getState().user.userId;
        if (userId === loggedInUserId) {
            setIsUser(true)
            refetchMe().then(({data}) => {
                setUserData(data)
            })
            refetchMyPosts().then(({data}) => {
                setUserPosts(data);
            })
        }
        else {
            setIsUser(false);
            refetchUser().then(({ data }) => {
              setUserData(data);
            });
            refetchUserPosts().then(({ data }) => {
              setUserPosts(data);
            });
        }
    },[])

    const {
      isFetching: isMeFetching,
      isError: isMeError,
      refetch: refetchMe,
    } = useQuery({ queryKey: ["getMe"], queryFn: getMe, enabled: false });

    const {
      isFetching: isUserFetching,
      isError: isUserError,
      refetch: refetchUser,
    } = useQuery({
      queryKey: ["getUserById", userId],
      queryFn: () => getUserById(userId!),
      enabled: false,
    });

    const {
        isFetching: isMyPostsFetching,
        isError: isMyPostsError,
        refetch: refetchMyPosts,
      } = useQuery({
        queryKey: ["getMyPosts"],
        queryFn: getMyPosts,
        enabled: false,
      });
    
    const {
      isFetching: isUserPostsFetching,
      isError: isUserPostsError,
      refetch: refetchUserPosts,
    } = useQuery({
      queryKey: ["getUserPosts", userId],
      queryFn: () => getUserPosts(userId!),
      enabled: false,
    });

    const hasProfileError = (isUser && isMeError) || (!isUser && isUserError);
    const hasPostsError =
      (isUser && isMyPostsError) || (!isUser && isUserPostsError);
      
    const showErrorUI = hasProfileError || hasPostsError;

    async function updatePosts() {
      refetchMyPosts().then(({ data }) => {
        setUserPosts(data);
      });
    }

    const handleRetry = () => {
      if (isUser) {
        if (isMeError) refetchMe();
        if (isMyPostsError) refetchMyPosts();
      } else {
        if (isUserError) refetchUser();
        if (isUserPostsError) refetchUserPosts();
      }
    };

    if (isMeFetching || isUserFetching || isMyPostsFetching || isUserPostsFetching) {
      return (
        <FullActivityLoading />
      )
    }

    if (showErrorUI) {
      return (
        <div className="bg-darkGray my-2 p-8 rounded-lg shadow-md text-white w-12/12 m-auto flex flex-col items-center justify-center lg:w-5/12 md:w-8/12 sm:w-full">
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
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-md text-white font-medium transition duration-300 flex items-center"
          >
            <span className="material-icons mr-2">refresh</span>
            Try Again
          </button>
        </div>
      );
    }


    return (
      <>
        {userData && (
          <div className="w-full bg-darkGray text-white">
            <MiniProfileHeader
              userId={userData.userId}
              firstname={userData.firstname}
              lastname={userData.lastname}
              headline={userData.headline}
              profilePicture={userData.profilePicture}
            />
          </div>
        )}
        <div className="bg-darkGray my-2 p-4 rounded-lg shadow-md relative text-white w-12/12 m-auto flex flex-wrap lg:w-5/12 md:w-8/12 sm:1/1">
          <div className="flex flex-row justify-between items-center">
            <h1 className="font-medium text-xl mb-4">Activity</h1>
            {isUser && (
              <button
                onClick={() => setAddPostModal(true)}
                className="material-icons font-medium text-2xl p-2 rounded-full hover:bg-gray-600 -mt-5 transition duration-400 ease-in-out"
              >
                add
              </button>
            )}
          </div>
          {userPosts && userPosts.length > 0 ? (
            userPosts.map((post, index) => (
              <div key={post.postId} className="relative w-1/1 mt-2">
                <PostCard post={post} isRepost={false} />
                {index < userPosts.length - 1 && (
                  <div className="border-b border-gray-500 w-12/12 mx-auto py"></div>
                )}
              </div>
            ))
          ) : (
            <div className="text-mutedSilver font-medium flex justify-center">
              User has no posts
            </div>
          )}
          <Modal isOpen={addPostModal} onClose={() => setAddPostModal(false)}>
            <PostCreate onUpdate={updatePosts} onClose={() => setAddPostModal(false)}/>
          </Modal>
        </div>
      </>
    );
}

