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
import { createComment, deletePost, getComments } from "../../api/api";
import { useNavigate } from "react-router-dom";

interface PostProps {
  post: PostInterface;
}

export default function Post(props: PostProps) {
  const [hide, setHide] = useState<boolean>(false);
  const [showUtility, setShowUtility] = useState<boolean>(false);
  const [showComment, setShowComment] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [isLike, setIsLike] = useState<boolean>(false);
  const like = !isLike ? "Like" : "Liked";
  const [newComment, setNewComment] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (showComment) {
      const response = getComments(props.post.postID);
      response.then((data) => setComments(data));
    }
  }, [showComment]);

  function addComment() {
    createComment(props.post.postID, newComment).then(() =>
      getComments(props.post.postID).then((data) => setComments(data)),
    );
  }

  function postDelete(){
    deletePost(props.post.postID).then(() => navigate("/"))
  }

  return !hide ? (
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
              post={props.post}
              delete={() => postDelete()}
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
          <span className="text-mutedSilver ml-2">
            {props.post.commentsNum}
          </span>
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

      <button
        onClick={() => {
          setShowComment(!showComment);
        }}
        className="w-3/12 h-10 cursor-pointer font-medium text-gray-500 hover:bg-gray-200"
      >
        <p className="material-icons mr-2 md:align-text-top lg:mr-3">
          insert_comment
        </p>
        <span className="hidden md:inline-block">Comment</span>
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
          <div className="flex flex-row w-1/1 py-3">
            <img
              className="rounded-full h-10 w-10 mx-2"
              src={
                "https://i.pinimg.com/550x/04/bb/21/04bb2164bbfa3684118a442c17d086bf.jpg"
              }
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
          {comments.map((comment) => (
            <CommentCard key={comment.commentID} comment={comment} />
          ))}
        </>
      ) : null}
    </div>
  ) : (
    <button onClick={() => setHide(false)}>undo</button>
  );
}
