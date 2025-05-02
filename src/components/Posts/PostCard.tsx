import PostContent from "./PostContent";
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
import PostHeader from "./PostHeader";
import Repost from "./Repost";
import Modal from "../utils/Modal";
import PostReactions from "./PostReactions";

interface PostProps {
  post: PostInterface;
  isRepost: boolean;
  compact?: boolean;
}

export default function PostCard(props: PostProps) {
  const [hide, setHide] = useState<boolean>(false);
  const [showComment, setShowComment] = useState<boolean>(false);
  const [showRepostModal, setShowRepostModal] = useState<boolean>(false);
  const [showReactionsModal, setShowReactionsModal] = useState<boolean>(false);

  const isCompany: boolean = props.post.companyId ? true : false;
  const posterId: string = props.post.companyId
    ? props.post.companyId
    : props.post.userId;
  const name: string = props.post.companyName
    ? props.post.companyName
    : props.post.firstname + " " + props.post.lastname;
  const posterPic: string =
    props.post.profilePicture ?? props.post.companyLogo ?? "NotFound";

  function reactionSuccess(newReaction: string, oldReaction: string) {
    if (oldReaction === "NoReaction" && newReaction !== "NoReaction") {
      props.post.likes++;
    } else if (oldReaction !== "NoReaction" && newReaction === "NoReaction") {
      props.post.likes--;
    }
  }

  function incrementCommentsCount() {
    props.post.comments += 1;
  }

  function decrementCommentsCount() {
    props.post.comments -= 1;
  }

  return !hide ? (
    <div className="flex flex-col relative h-full">
      <div className="flex flex-row w-1/1">
        <PostHeader
          key={`Details of poster ${posterId}`}
          isCompany={isCompany}
          id={posterId}
          name={name}
          headline={props.post.headline}
          profilePicture={posterPic}
          isFollowing={false}
          time={props.post.time}
        />
        <div className="relative">
          <AnimatePresence>
            <PostUtilityButton
              postId={props.post.postId}
              posterId={posterId}
              postText={props.post.text}
              postMedia={props.post.media}
            />
          </AnimatePresence>
        </div>
        {!props.isRepost && !props.compact ? (
          <button
            onClick={() => setHide(true)}
            className="material-icons-round cursor-pointer ml-1 text-mutedSilver hover:bg-gray-200 h-fit transition duration-400 ease-in-out"
          >
            clear
          </button>
        ) : null}
      </div>
      <div className="flex-grow">
        <PostContent
          key={`Details of post ${props.post.postId}`}
          text={props.post.text}
          media={props.post.media}
          taggedUsers={props.post.taggedUsers}
          taggedCompanies={props.post.taggedCompanies}
        />
        {props.post.repost ? (
          <div className="w-12/12 m-auto my-2 border-1 rounded-lg border-gray-300 transform scale-90">
            <PostCard
              post={props.post.repost}
              isRepost={true}
              compact={props.compact}
            />
          </div>
        ) : null}
      </div>
      <div className="flex flex-row text-mutedSilver m-auto py-2 w-11/12 border-b-1 border-gray-300">
        <div onClick={() => setShowReactionsModal(true)} className="hover:underline flex flex-row cursor-pointer">
          <ThumbsUp className="text-blue-500" />
          <span className="ml-2">{props.post.likes}</span>
        </div>
        <div className="flex flex-row justify-end w-1/1">
          <span className="ml-2">{props.post.comments}</span>
          <MessageSquareText className="ml-2" />
          <span className="ml-2">•</span>
          <span className="ml-2">{props.post.reposts}</span>
          <Repeat className="ml-2" />
        </div>
      </div>
      {!props.isRepost ? (
        <div className="flex flex-grow-0 relative justify-between">
          <PostReact
            postId={props.post.postId}
            userReaction={props.post.userReaction}
            successHandler={reactionSuccess}
            compact={props.compact}
          />
          <button
            onClick={() => {
              setShowComment(!showComment);
            }}
            className="transition duration-400 ease-in-out w-3/12 h-10 cursor-pointer font-medium text-gray-500 hover:bg-gray-200 flex items-center justify-center"
          >
            <MessageSquareText className="mr-2" />
            {!props.compact && (
              <span className="hidden md:inline-block">Comment</span>
            )}
          </button>
          <button
            onClick={() => setShowRepostModal(true)}
            className="transition duration-400 ease-in-out w-3/12 h-10 cursor-pointer font-medium text-gray-500 hover:bg-gray-200 flex items-center justify-center"
          >
            <Repeat className="mr-2" />
            {!props.compact && (
              <span className="hidden md:inline-block">Repost</span>
            )}
          </button>
          <button className="transition duration-400 ease-in-out w-3/12 h-10 cursor-pointer font-medium text-gray-500 hover:bg-gray-200 flex items-center justify-center">
            <SendHorizontal className="mr-2" />
            {!props.compact && (
              <span className="hidden md:inline-block">Send</span>
            )}
          </button>
        </div>
      ) : null}
      {showRepostModal && (
        <Modal
          isOpen={showRepostModal}
          onClose={() => setShowRepostModal(false)}
        >
          <Repost
            repost={
              props.isRepost
                ? (props.post.repost?.postId ?? "")
                : props.post.postId
            }
            onSuccess={() => setShowRepostModal(false)}
          />
        </Modal>
      )}
      {showReactionsModal && (
        <Modal
          isOpen={showReactionsModal}
          onClose={() => setShowReactionsModal(false)}
        >
          <PostReactions postId={props.post.postId} />
        </Modal>
      )}
      {showComment ? (
        <CommentsContainer
          postId={props.post.postId}
          incrementCommentsCount={incrementCommentsCount}
          decrementCommentsCount={decrementCommentsCount}
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
