import { RepliesInterface } from "../../../interfaces/postInterfaces";
import CommentContent from "../Comments/CommentContent";
import CommentHeader from "../Comments/CommentHeader";
import ReplyReact from "./ReplyReact";

interface ReplyCardProps {
  reply: RepliesInterface;
}

export default function ReplyCard(props: ReplyCardProps) {
  function reactionSuccess(newReaction: string, oldReaction: string) {
    if (oldReaction === "NoReaction" && newReaction !== "NoReaction") {
      props.reply.likes++;
    } else if (oldReaction !== "NoReaction" && newReaction === "NoReaction") {
      props.reply.likes--;
    }
  }
  return (
    <div className="flex flex-wrap w-11/12 relative">
      <div className="flex flex-row w-1/1 pr-2">
        <CommentHeader
          key={`Details of Commenter ${props.reply.userId}`}
          userId={props.reply.userId}
          name={props.reply.firstname + " " + props.reply.lastname}
          headline={props.reply.headline}
          profilePicture={props.reply.profilePicture}
          time={props.reply.time}
        />
        <div className="flex flex-row w-1/1 justify-end">
          <button className="material-icons-round cursor-pointer mr-1 text-mutedSilver hover:bg-gray-200 rounded-full h-fit">
            more_horiz
          </button>
        </div>
      </div>
      <CommentContent
        key={`Comment ${props.reply.replyId} details`}
        commentText={props.reply.text}
      />
      <div className="ml-14.5">
        <div className="flex items-center font-medium text-mutedSilver">
          <div className="flex items-center">
            <ReplyReact
              replyId={props.reply.replyId}
              userReaction={props.reply.userReaction}
              successHandler={reactionSuccess}
            />
            <span>• {props.reply.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
