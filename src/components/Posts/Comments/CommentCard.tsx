import CommentContent from "./CommentContent";
import CommenterDetails from "./CommenterDetails";
import {
  CommentInterface,
  RepliesInterface,
} from "../../../interfaces/postInterfaces";
import { useEffect, useState } from "react";
import ReplyCard from "./ReplyCard";
import { createReply, getReplies } from "../../../services/api/postServices";
import store from "@store/store";

interface CommentCardProps {
  comment: CommentInterface;
}

export default function CommentCard(props: CommentCardProps) {
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState<RepliesInterface[]>([]);
  const [newReply, setNewReply] = useState<string>("");
  const [isLike, setIsLike] = useState<boolean>(false);
  const like = !isLike ? "Like" : "Liked";

  useEffect(() => {
    if (showReplies) {
      const response = getReplies(
        props.comment.postId,
        props.comment.commentId,
      );
      response.then((data) => setReplies(data));
    }
  }, [showReplies]);

  function addReply() {
    createReply(props.comment.postId, props.comment.commentId, newReply).then(
      () =>
        getReplies(props.comment.postId, props.comment.commentId).then((data) =>
          setReplies(data),
        ),
    );
  }

  return (
    <div className="flex flex-wrap w-1/1 bg-lightGray rounded-xl relative py-2">
      <div className="flex flex-row w-1/1 px-2">
        <CommenterDetails
          key={`Details of Commenter ${props.comment.userId}`}
          userId={props.comment.userId}
          name={props.comment.firstname + " " + props.comment.lastname}
          headline={props.comment.headline}
          profilePicture={props.comment.profilePicture}
        />
        <div className="flex flex-row w-1/1 justify-end">
          <button className="material-icons-round cursor-pointer mr-1 text-mutedSilver hover:bg-gray-200 rounded-full h-fit">
            more_horiz
          </button>
        </div>
      </div>
      <CommentContent
        key={`comment ${props.comment.commentId} details`}
        commentText={props.comment.commentText}
      />
      <div className="ml-14.5">
        <button
          onClick={() => setIsLike(!isLike)}
          className={
            isLike
              ? "transition cursor-pointer text-sm font-medium px-2 text-blue-500 hover:bg-blue-100 rounded-lg"
              : "transition cursor-pointer text-sm font-medium px-2 text-mutedSilver hover:bg-gray-200 rounded-lg"
          }
        >
          {like}
        </button>
        <span className="text-mutedSilver font-medium text-sm">|</span>
        <button
          onClick={() => setShowReplies(true)}
          className="cursor-pointer text-sm font-medium px-2 text-mutedSilver hover:bg-gray-200 rounded-xl"
        >
          Reply
        </button>
      </div>
      <div className="flex flex-wrap flex-row-reverse w-1/1 bg-lightGray rounded-xl relative pt-2">
      {/* This code should be refactored, seperate responsibilities */}
        {showReplies ? (
          <>
            <div className="flex flex-row w-11/12 py-3">
              <img
                className="rounded-full h-10 w-10 mx-2"
                src={store.getState().user.profilePicture!}
                alt={"User"}
              />
              <input
                type="text"
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Write a reply..."
                className="outline-[0.7px] outline-gray-300 text-[14px] text-charcoalBlack h-8 w-12/12 px-2 mt-1 rounded-3xl hover:cursor-text hover:outline-[1px] hover:bg-gray-100 focus:outline-black focus:outline-[1.5px]"
              ></input>
              <button
                onClick={() => {
                  if (newReply != "") {
                    addReply();
                    setNewReply("");
                  }
                }}
                className="material-icons-round cursor-pointer rounded-full p-1 mt-1 mx-2 text-gray-500 hover:bg-gray-200 h-fit"
              >
                send
              </button>
            </div>
            {replies ? (
              replies.length > 0 ? (
                replies.map((reply) => (
                  <ReplyCard key={reply.replyId} reply={reply} />
                ))
              ) : (
                <div className="m-auto p-2">
                  <span className="text-mutedSilver font-medium">
                    No Replies Yet
                  </span>
                </div>
              )
            ) : (
              <div className="m-auto p-2">
                <span className="text-mutedSilver font-medium">
                  Can't fetch Replies, Please try again later
                </span>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}
