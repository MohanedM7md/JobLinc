import CommentContent from "./CommentContent";
import CommentHeader from "./CommentHeader";
import { CommentInterface } from "../../../interfaces/postInterfaces";
import { useState } from "react";
import CommentReact from "./CommentReact";
import ReplyContainer from "../Replies/ReplyContainer";
import { AnimatePresence } from "framer-motion";
import CommentUtilityButton from "./CommentUtilityButton";
import CommentReactions from "./CommentReactions";
import Modal from "../../utils/Modal";
interface CommentCardProps {
  comment: CommentInterface;
  delete: () => void;
}

export default function CommentCard(props: CommentCardProps) {
  const [showReplies, setShowReplies] = useState(false);
  const [showReactionsModal, setShowReactionsModal] = useState<boolean>(false);

  const posterId = props.comment.companyId
    ? props.comment.companyId
    : props.comment.userId;
  const posterName = props.comment.companyName
    ? props.comment.companyName
    : props.comment.firstname + " " + props.comment.lastname;
  const posterPicture = props.comment.companyLogo
    ? props.comment.companyLogo
    : props.comment.profilePicture;

  function incrementRepliesCount() {
    props.comment.comments++;
  }

  function updateText(newText: string) {
    props.comment.text = newText;
  }

  function reactionSuccess(newReaction: string, oldReaction: string) {
    if (oldReaction === "NoReaction" && newReaction !== "NoReaction") {
      props.comment.likes++;
    } else if (oldReaction !== "NoReaction" && newReaction === "NoReaction") {
      props.comment.likes--;
    }
  }

  return (
    <div className="flex flex-wrap w-1/1 rounded-xl relative py-2">
      <div className="flex flex-row w-1/1 px-2">
        <CommentHeader
          key={`Details of Commenter ${posterId}`}
          userId={posterId}
          name={posterName}
          headline={props.comment.headline}
          profilePicture={posterPicture}
          time={props.comment.time}
        />
        <div className="flex flex-row w-1/1 justify-end">
          <div className="relative">
            <AnimatePresence>
              <CommentUtilityButton
                commentId={props.comment.commentId}
                posterId={posterId}
                commentText={props.comment.text}
                updateText={updateText}
                delete={props.delete}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
      <CommentContent
        key={`comment ${props.comment.commentId} details`}
        commentText={props.comment.text}
      />
      <div className="ml-14.5">
        <div className="flex items-center font-medium text-mutedSilver">
          <div className="flex items-center hover:underline cursor-pointer">
            <CommentReact
              commentId={props.comment.commentId}
              userReaction={props.comment.userReaction}
              successHandler={reactionSuccess}
            />
            <span onClick={() => setShowReactionsModal(true)}>
              • {props.comment.likes}
            </span>
          </div>
          <span className="ml-2">|</span>
          <button
            onClick={() => setShowReplies(true)}
            className="cursor-pointer hover:bg-gray-200 px-2 py-1 rounded-lg"
          >
            Reply • {props.comment.comments}
          </button>
        </div>
      </div>
      <div className="flex flex-wrap flex-row-reverse w-1/1 rounded-xl relative pt-2">
        {showReplies ? (
          <ReplyContainer
            commentId={props.comment.commentId}
            incrementRepliesCount={incrementRepliesCount}
          />
        ) : null}
      </div>
      {showReactionsModal && (
        <Modal
          isOpen={showReactionsModal}
          onClose={() => setShowReactionsModal(false)}
        >
          <CommentReactions commentId={props.comment.commentId} />
        </Modal>
      )}
    </div>
  );
}
