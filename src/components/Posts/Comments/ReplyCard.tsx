import { RepliesInterface } from "../../../interfaces/postInterfaces";
import CommentContent from "./CommentContent";
import CommenterDetails from "./CommenterDetails";

interface ReplyCardProps {
  reply: RepliesInterface;
}

export default function ReplyCard(props: ReplyCardProps) {
    return (
  <div className="flex flex-wrap w-11/12 relative">
    <div className="flex flex-row w-1/1 px-2">
      <CommenterDetails
        key={`Details of Commenter ${props.reply.userID}`}
        userID={props.reply.userID}
        name={props.reply.firstName + " " + props.reply.lastName}
        headline={props.reply.headline}
        profilePicture={props.reply.profilePicture}
      />
      <div className="flex flex-row w-1/1 justify-end">
        <button className="material-icons-round cursor-pointer mr-1 text-mutedSilver hover:bg-gray-200 rounded-full h-fit">
          more_horiz
        </button>
      </div>
    </div>
    <CommentContent
      key={`Comment ${props.reply.replyID} details`}
      commentText={props.reply.replyText}
    />
    <div className="ml-14.5">
      <button className="cursor-pointer text-sm font-medium px-2 text-mutedSilver hover:bg-gray-200 rounded-lg h-fit">
        Like
      </button>
    </div>
  </div>
    );
}
