import PostDetails from "./PostDetails";
import ProfileDetails from "./ProfileDetails";
import PostUtilityButton from "./PostUtilityButton";
import { useEffect, useState } from "react";
import "material-icons/iconfont/material-icons.css";
import CommentCard from "./Comments/CommentCard";
import {
  CommentInterface,
  PostInterface,
} from "../../interfaces/postInterfaces";
import {
  createComment,
  deletePost,
  getComments,
  reactPost,
} from "../../services/api/postServices";
import { useNavigate } from "react-router-dom";
import PostReact from "./PostReact";
import {
  ThumbsUp,
  PartyPopper,
  HandHelping,
  Laugh,
  Heart,
  Lightbulb,
  MessageSquareText,
  Repeat,
  SendHorizontal,
  SmilePlus,
} from "lucide-react";
import { AnimatePresence } from "framer-motion"; // Import AnimatePresence

interface PostProps {
  post: PostInterface;
}

export default function Post(props: PostProps) {
  const [hide, setHide] = useState<boolean>(false);
  const [showUtility, setShowUtility] = useState<boolean>(false);
  const [showComment, setShowComment] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [reaction, setReaction] = useState<string>("React");
  const [newComment, setNewComment] = useState<string>("");
  const navigate = useNavigate();
  const [showReact, setShowReact] = useState<boolean>(false);

  const posterId: string = props.post.userId ?? props.post.companyId ?? "0";
  const name: string =
    props.post.firstname !== ""
      ? props.post.firstname + " " + props.post.lastname
      : (props.post.companyName ?? "Company Name");
  const posterPic: string =
    props.post.profilePicture ?? props.post.companyLogo ?? "NotFound";

  useEffect(() => {
    if (showComment) {
      const response = getComments(props.post.postId);
      response.then((data) => setComments(data));
    }
  }, [showComment]);

  function addComment() {
    createComment(props.post.postId, newComment).then(() => {
      props.post.comments += 1;
      getComments(props.post.postId).then((data) => setComments(data));
    });
  }

  function postDelete() {
    deletePost(props.post.postId).then(() => navigate("/home"));
  }

  function postReaction(reaction: string) {
    reactPost(props.post.postId, reaction).then(() => {
      setReaction(reaction);
      props.post.likes += 1;
    });
  }

  function getReactionIcon(reaction: string) {
    switch (reaction) {
      case "React":
        return <SmilePlus className="mr-2 md:align-text-bottom" />;
      case "Like":
        return <ThumbsUp className="mr-2 md:align-text-bottom" />;
      case "Celebrate":
        return <PartyPopper className="mr-2 md:align-text-bottom" />;
      case "Support":
        return <HandHelping className="mr-2 md:align-text-bottom" />;
      case "Funny":
        return <Laugh className="mr-2 md:align-text-bottom" />;
      case "Love":
        return <Heart className="mr-2 md:align-text-bottom" />;
      case "Insightful":
        return <Lightbulb className="mr-2 md:align-text-bottom" />;
      default:
        return <SmilePlus className="mr-2 md:align-text-bottom" />;
    }
  }

  function getReactionStyles(reaction: string) {
    switch (reaction) {
      case "React":
        return "text-gray-500 hover:bg-gray-200";
      case "Like":
        return "text-blue-500 hover:bg-blue-100";
      case "Celebrate":
        return "text-pink-500 hover:bg-pink-100";
      case "Support":
        return "text-green-600 hover:bg-green-100";
      case "Funny":
        return "text-violet-600 hover:bg-violet-100";
      case "Love":
        return "text-red-600 hover:bg-red-100";
      case "Insightful":
        return "text-yellow-600 hover:bg-yellow-100";
      default:
        return "text-gray-500 hover:bg-gray-200";
    }
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
          {showUtility ? (
            <div className="absolute top-5 -left-9">
              <PostUtilityButton
                postId={props.post.postId}
                postText={props.post.text}
                delete={() => postDelete()}
              />
            </div>
          ) : null}
        </div>
        <button
          data-testid={`Options ${props.post.postId}`}
          onClick={() => setShowUtility(!showUtility)}
          className="material-icons-round cursor-pointer mr-1 text-mutedSilver hover:bg-gray-200 h-fit"
        >
          more_horiz
        </button>
        <button
          onClick={() => setHide(true)}
          className="material-icons-round cursor-pointer ml-1 text-mutedSilver hover:bg-gray-200 h-fit"
        >
          clear
        </button>
      </div>
      <PostDetails
        key={`Details of post ${props.post.postId}`}
        text={props.post.text}
        mediaURL={props.post.mediaURL}
      />
      <div className="flex flex-row m-auto py-2 w-11/12 border-b-1 border-gray-300">
        <ThumbsUp className="text-blue-500" />
        <span className="text-mutedSilver ml-2">{props.post.likes}</span>
        <div className="flex flex-row justify-end w-1/1">
          <span className="text-mutedSilver ml-2">{props.post.comments}</span>
          <span className="text-mutedSilver ml-2">Comments</span>
          <span className="text-mutedSilver ml-2">•</span>
          <span className="text-mutedSilver ml-2">{props.post.reposts}</span>
          <span className="text-mutedSilver ml-2">Reposts</span>
        </div>
      </div>
      <div className="flex flex-grow relative m-auto justify-between">
        <AnimatePresence>
          {showReact && (
            <div className="absolute bottom-12 left-0">
              <PostReact postReaction={postReaction} />
            </div>
          )}
        </AnimatePresence>
        <button
          className={`transition w-3/12 h-10 cursor-pointer font-medium flex items-center justify-center ${getReactionStyles(reaction)}`}
          onClick={() => {
            setShowReact(!showReact);
          }}
        >
          {getReactionIcon(reaction)}
          <span className="hidden md:inline-block">{reaction}</span>
        </button>

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
      {showComment ? (
        <>
          <div className="flex flex-row w-1/1 py-3">
            <img
              className="rounded-full h-10 w-10 mx-2"
              src={localStorage.getItem("profilePicture")!}
              alt={"User"}
            />
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="outline-[0.7px] outline-gray-300 text-[14px] text-charcoalBlack h-8 w-12/12 px-2 mt-1 rounded-3xl hover:cursor-text hover:outline-[1px] hover:bg-gray-100 focus:outline-black focus:outline-[1.5px]"
            ></input>
            <button
              onClick={() => {
                if (newComment != "") {
                  addComment();
                  setNewComment("");
                }
              }}
              className="material-icons-round cursor-pointer rounded-full p-1 mt-1 mx-2 text-gray-500 hover:bg-gray-200 h-fit"
            >
              send
            </button>
          </div>
          {comments ? (
            comments.length > 0 ? (
              comments.map((comment) => (
                <CommentCard key={comment.commentId} comment={comment} />
              ))
            ) : (
              <div className="m-auto p-2">
                <span className="text-mutedSilver font-medium">
                  No Comments Yet
                </span>
              </div>
            )
          ) : (
            <div className="m-auto p-2">
              <span className="text-mutedSilver font-medium">
                Can't fetch Comments, Please try again later
              </span>
            </div>
          )}
        </>
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
