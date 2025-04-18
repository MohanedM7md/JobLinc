import PostDetails from "./PostDetails";
import ProfileDetails from "./ProfileDetails";
import PostUtilityButton from "./PostUtilityButton";
import { useState } from "react";
import "material-icons/iconfont/material-icons.css";
import { PostInterface } from "@interfaces/postInterfaces";
import PostReact from "./PostReact";
import {
  ThumbsUp,
  MessageSquareText,
  Repeat,
  SendHorizontal,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import CommentsContainer from "./Comments/CommentsContainer";

interface PostProps {
  post: PostInterface;
  isRepost: boolean;
}

export default function Post(props: PostProps) {
  const [hide, setHide] = useState<boolean>(false);
  const [showComment, setShowComment] = useState<boolean>(false);

  const posterId: string = props.post.userId ?? props.post.companyId ?? "0";
  const name: string =
    props.post.firstname !== ""
      ? props.post.firstname + " " + props.post.lastname
      : (props.post.companyName ?? "Not Found");
  const posterPic: string =
    props.post.profilePicture ?? props.post.companyLogo ?? "NotFound";

  function reactionSuccess() {
    props.post.likes += 1;
  }

  function incrementCommentsCount() {
    props.post.comments += 1; //this counter isn't counting for some reason, look into it later
  }

  return !hide ? (
    <div className="flex flex-wrap relative">
      <div className="flex flex-row w-1/1">
        <ProfileDetails
          key={`Details of poster ${posterId}`}
          id={posterId}
          name={name}
          headline={props.post.headline}
          profilePicture={posterPic}
          isFollowing={false}
        />
        <div className="relative">
          <AnimatePresence>
            <PostUtilityButton
              postId={props.post.postId}
              posterId={posterId}
              postText={props.post.text}
            />
          </AnimatePresence>
        </div>
        {!props.isRepost ? (
          <button
            onClick={() => setHide(true)}
            className="material-icons-round cursor-pointer ml-1 text-mutedSilver hover:bg-gray-200 h-fit"
          >
            clear
          </button>
        ) : null}
      </div>
      <PostDetails
        key={`Details of post ${props.post.postId}`}
        text={props.post.text}
        mediaURL={props.post.mediaURL}
      />
      {props.post.repost ? (
        <div className="w-12/12 m-auto my-2 border-1 rounded-lg border-mutedSilver transform scale-90">
          <Post post={props.post.repost} isRepost={true} />
        </div>
      ) : null}
      <div className="flex flex-row text-mutedSilver m-auto py-2 w-11/12 border-b-1 border-gray-300">
        <ThumbsUp className="text-blue-500" />
        <span className="ml-2">{props.post.likes}</span>
        <div className="flex flex-row justify-end w-1/1">
          <span className="ml-2">{props.post.comments}</span>
          <MessageSquareText className="ml-2" />
          <span className="ml-2">•</span>
          <span className="ml-2">{props.post.reposts}</span>
          <Repeat className="ml-2" />
        </div>
      </div>
      {!props.isRepost ? (
        <div className="flex flex-grow relative m-auto justify-between">
          <PostReact
            postId={props.post.postId}
            userReaction="React"
            successHandler={reactionSuccess}
          />
          <button
            onClick={() => {
              setShowComment(!showComment);
            }}
            className="w-3/12 h-10 cursor-pointer font-medium text-gray-500 hover:bg-gray-200 flex items-center justify-center"
          >
            <MessageSquareText className="mr-2" />
            <span className="hidden md:inline-block">Comment</span>
          </button>
          <button className="w-3/12 h-10 cursor-pointer font-medium text-gray-500 hover:bg-gray-200 flex items-center justify-center">
            <Repeat className="mr-2" />
            <span className="hidden md:inline-block">Repost</span>
          </button>
          <button className="w-3/12 h-10 cursor-pointer font-medium text-gray-500 hover:bg-gray-200 flex items-center justify-center">
            <SendHorizontal className="mr-2" />
            <span className="hidden md:inline-block">Send</span>
          </button>
        </div>
      ) : null}
      {showComment ? (
        <CommentsContainer
          postId={props.post.postId}
          incrementCommentsCount={incrementCommentsCount}
        />
      ) : null}
    </div>
  ) : (
    <div className="flex flex-col flex-wrap items-center">
      <h1 className="font-medium text-2xl m-2">Post Hidden</h1>
      <h2 className="font-medium text-mutedSilver">
        We'll try to show you less like this
      </h2>
      <button
        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-red-700 transition m-2"
        onClick={() => setHide(false)}
      >
        Undo
      </button>
    </div>
  );
}
