import { useState } from "react";
import { RepliesInterface } from "../../../interfaces/postInterfaces";
import CommentContent from "./CommentContent";
import CommenterDetails from "./CommenterDetails";

interface ReplyCardProps {
  reply: RepliesInterface;
}

export default function ReplyCard(props: ReplyCardProps) {
  const [isLike, setIsLike] = useState<boolean>(false);
  const like = !isLike ? "Like" : "Liked";
  
  return (
    <div className="flex flex-wrap w-11/12 relative">
      <div className="flex flex-row w-1/1 pr-2">
        <CommenterDetails
          key={`Details of Commenter ${props.reply.userId}`}
          userId={props.reply.userId}
          name={props.reply.firstname + " " + props.reply.lastname}
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
        key={`Comment ${props.reply.replyId} details`}
        commentText={props.reply.replyText}
      />
      <div className="ml-14.5">
        <button
          onClick={() => setIsLike(!isLike)}
          className={
            isLike
              ? "transition cursor-pointer text-sm font-medium px-2 text-blue-500 hover:bg-blue-100 rounded-lg h-fit"
              : "transition cursor-pointer text-sm font-medium px-2 text-mutedSilver hover:bg-gray-200 rounded-lg h-fit"
          }
        >
          {like}
        </button>
      </div>
    </div>
  );
}
