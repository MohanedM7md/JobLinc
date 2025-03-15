import CommentContent from "./CommentContent";
import CommenterDetails from "./CommenterDetails";
import { CommentInterface } from "../../../interfaces/postInterfaces";

interface CommentCardProps {
    comment: CommentInterface;
}

export default function CommentCard(props: CommentCardProps) {
    return (
      <div className="flex flex-wrap w-1/1 bg-lightGray rounded-xl relative py-2">
        <div className="flex flex-row w-1/1 px-2">
          <CommenterDetails
            key={`Details of Commenter ${props.comment.userID}`}
            userID={props.comment.userID}
            name={props.comment.firstName + " " + props.comment.lastName}
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
          key={`comment ${props.comment.commentID} details`}
          commentText={props.comment.commentText}
        />
        <div className="ml-15">
          <button className="cursor-pointer font-medium px-2 text-mutedSilver hover:bg-gray-200 rounded-lg h-fit">
            Like
          </button>
          <span className="text-mutedSilver font-medium">|</span>
          <button className="cursor-pointer font-medium px-2 text-mutedSilver hover:bg-gray-200 rounded-xl h-fit">
            Reply
          </button>
        </div>
      </div>
    );
}