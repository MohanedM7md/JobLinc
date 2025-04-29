import MiniProfileHeader from "../ProfileHeader/MiniProfileHeader";
import { PostInterface } from "@interfaces/postInterfaces";
import { ProfileInterface } from "@interfaces/userInterfaces";
import { getMe, getMyPosts, getUserById, getUserPosts } from "@services/api/userProfileServices";
import store from "@store/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function FullActivity() {
    const { userId } = useParams();
    const [isUser, setIsUser] = useState<boolean>();
    const [userData, setUserData] = useState<ProfileInterface>();
    const [userPosts, setUserPosts] = useState<PostInterface[]>([]);

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

    return (
        <div>
        {userData && (
            <div>
                <MiniProfileHeader
                    userId={userData.userId}
                    firstname={userData.firstname}
                    lastname={userData.lastname}
                    headline={userData.headline}
                    profilePicture={userData.profilePicture}
                />
            </div>
        )}
        </div>
    )
}

