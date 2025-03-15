import PostDetails from "./PostDetails";
import ProfileDetails from "./ProfileDetails";
import PostUtilityButton from "./PostUtilityButton";
import { useState } from "react";
import "material-icons/iconfont/material-icons.css";
import CommentCard from "./Comments/CommentCard";
import { PostInterface } from "../../interfaces/postInterfaces";

interface PostProps {
  post: PostInterface;
}



export default function Post(props: PostProps) {
  const [hide, setHide] = useState<boolean>(false);
  const [showUtility, setShowUtility] = useState<boolean>(false);
  const [showComment, setShowComment] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>(false);
  const like = !isLike ? "Like" : "Liked";

  return !hide ? 
    <div className="flex flex-wrap w-1/1 bg-lightGray rounded-xl relative">
      <div className="flex flex-row w-1/1">
        <ProfileDetails
          key={`Details of user ${props.post.userID}`}
          id={props.post.userID}
          name={props.post.firstName + " " + props.post.lastName}
          headline={props.post.headline}
          profilePicture={props.post.profilePicture}
          isFollowing={false}
        />
        <div className="" onBlur={() => setShowUtility(false)}>
          {showUtility ? (
            <PostUtilityButton
              delete={() => console.log("will delete soon trust")}
            />
          ) : null}
        </div>
        <button
          onClick={() => setShowUtility(!showUtility)}
          className="material-icons-round cursor-pointer mr-1 text-mutedSilver hover:bg-gray-200 h-fit"
        >
          more_horiz
        </button>
        <button
          onClick={() => setHide(true)}
          className="material-icons-round cursor-pointer mr-1 text-mutedSilver hover:bg-gray-200 h-fit"
        >
          clear
        </button>
      </div>
      <PostDetails
        key={`Details of post ${props.post.postID}`}
        text={props.post.text}
        media={props.post.pics}
      />
      <div className="flex flex-row m-auto py-2 w-11/12 border-b-1 border-gray-300">
        <span className="text-blue-500 material-icons">thumb_up</span>
        <span className="text-mutedSilver ml-2">{props.post.likes}</span>
        <div className="flex flex-row justify-end w-1/1">
          <span className="text-mutedSilver ml-2">{props.post.comments.length}</span>
          <span className="text-mutedSilver ml-2">Comments</span>
          <span className="text-mutedSilver ml-2">•</span>
          <span className="text-mutedSilver ml-2">{props.post.reposts}</span>
          <span className="text-mutedSilver ml-2">Reposts</span>
        </div>
      </div>
      <button
        className={
          isLike
            ? "transition w-3/12 h-10 cursor-pointer font-medium text-blue-500 hover:bg-blue-100"
            : "transition w-3/12 h-10 cursor-pointer font-medium text-gray-500 hover:bg-gray-200"
        }
        onClick={() => setIsLike(!isLike)}
      >
        <p className="material-icons mr-3 md:align-text-bottom">thumb_up</p>
        <span className="hidden md:inline-block">{like}</span>
      </button>

      <button className="w-3/12 h-10 cursor-pointer font-medium text-gray-500 hover:bg-gray-200">
        <p className="material-icons mr-2 md:align-text-top lg:mr-3">
          insert_comment
        </p>
        <span
          className="hidden md:inline-block"
          onClick={() => {
            setShowComment(!showComment);
          }}
        >
          Comment
        </span>
      </button>

      <button className="w-3/12 h-10 cursor-pointer font-medium text-gray-500 hover:bg-gray-200">
        <p className="material-icons mr-3 md:align-text-top">repeat</p>
        <span className="hidden md:inline-block">Repost</span>
      </button>

      <button className="w-3/12 h-10 cursor-pointer font-medium text-gray-500 hover:bg-gray-200">
        <p className="material-icons mr-3 md:align-text-top">send</p>
        <span className="hidden md:inline-block">Send</span>
      </button>
      {showComment ? (
        <>
          {props.post.comments.map((comment) => (
            <CommentCard
              key={`comment ${comment.commentID}`}
              comment={comment}
            />
          ))}
        </>
      ) : null}
    </div>
   : (
    <button onClick={() => setHide(false)}>undo</button>
  );
}
