import PostDetails from "./PostDetails";
import ProfileDetails from "./ProfileDetails";
import PostUtilityButton from "./PostUtilityButton";
import { useState } from "react";
import "material-icons/iconfont/material-icons.css";

interface ProfileContent {
  isLincing: boolean;
}

interface PostContent {
  isLiked: boolean;
}

interface PostProps {
  profile: ProfileContent;
  post: PostContent;
  id: number;
  onDelete: (id: number) => void;
}

export default function Post(props: PostProps) {
  const [hide, setHide] = useState<boolean>(false);
  const [showUtility, setShowUtility] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>(props.post.isLiked);
  const like = !isLike ? "Like" : "Liked";

  return !hide ? (
    <div className="flex flex-wrap w-1/1 bg-lightGray rounded-xl relative">
      <div className="flex flex-row w-1/1">
        <ProfileDetails
          key="user"
          isLincing={props.profile.isLincing}
        />
        <div className="" onBlur={() => setShowUtility(false)}>
          {showUtility ? (
            <PostUtilityButton delete={() => props.onDelete(props.id)} />
          ) : null}
        </div>
        <button
          onClick={() => setShowUtility(!showUtility)}
          className="material-icons-round cursor-pointer mr-1 text-mutedSilver hover:bg-lightGray h-fit"
        >
          more_horiz
        </button>
        <button
          onClick={() => setHide(true)}
          className="material-icons-round cursor-pointer mr-1 text-mutedSilver hover:bg-lightGray h-fit"
        >
          clear
        </button>
      </div>
      <PostDetails />
      <button
        className={
          isLike
            ? "transition w-3/12 h-10 cursor-pointer font-medium text-blue-500 hover:bg-blue-100"
            : "transition w-3/12 h-10 cursor-pointer font-medium text-gray-500 hover:bg-lightGray"
        }
        onClick={() => setIsLike(!isLike)}
      >
        <p className="material-icons mr-3 md:align-text-bottom">thumb_up</p>
        <span className="hidden md:inline-block">{like}</span>
      </button>

      <button className="w-3/12 h-10 cursor-pointer font-medium text-gray-500 hover:bg-lightGray">
        <p className="material-icons mr-2 md:align-text-top lg:mr-3">
          insert_comment
        </p>
        <span className="hidden md:inline-block">Comment</span>
      </button>

      <button className="w-3/12 h-10 cursor-pointer font-medium text-gray-500 hover:bg-lightGray">
        <p className="material-icons mr-3 md:align-text-top">repeat</p>
        <span className="hidden md:inline-block">Repost</span>
      </button>

      <button className="w-3/12 h-10 cursor-pointer font-medium text-gray-500 hover:bg-lightGray">
        <p className="material-icons mr-3 md:align-text-top">send</p>
        <span className="hidden md:inline-block">Send</span>
      </button>
    </div>
  ) : (
    <button onClick={() => setHide(false)}>undo</button>
  );
}
