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

  function fetchComments() { //Placeholder till comments API is up
    const comments = [
      {
        commentID: "0",
        userID: "1",
        firstName: "Anime",
        lastName: "Protagonist",
        profilePicture: "",
        headline: "I am the main character",
        commentText:
          "A very good comment, yes indeed, It is called Lothric, where the transitory lands of the Lords of Cinder converge.",
        replies: [
          {
            replyID: "1",
            userID: "0",
            firstName: "Tyrone",
            lastName: "Biggums",
            profilePicture:
              "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
            headline: "I smoke rocks",
            replyText:
              "I am the storm that is approaching, provoking black clouds in isolation.",
          },
        ],
      },
    ];
    return comments;
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
              placeholder="Write a comment..."
              className="outline-[0.7px] outline-gray-300 text-[14px] text-charcoalBlack h-8 w-12/12 px-2 mt-1 rounded-3xl hover:cursor-text hover:outline-[1px] hover:bg-gray-100 focus:outline-black focus:outline-[1.5px]"
            ></input>
            <button className="material-icons-round cursor-pointer rounded-full p-1 mt-1 mx-2 text-gray-500 hover:bg-gray-200 h-fit">
              send
            </button>
          </div>
          {fetchComments().map((comment) => (
            <CommentCard key={comment.commentID} comment={comment} />
          ))}
        </>
      ) : null}
    </div>
  ) : (
    <button onClick={() => setHide(false)}>undo</button>
  );
}
