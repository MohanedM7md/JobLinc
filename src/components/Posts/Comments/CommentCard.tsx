import CommentContent from "./CommentContent";
import CommenterDetails from "./CommenterDetails";
import { CommentInterface } from "../../../interfaces/postInterfaces";

interface CommentCardProps {
    comment: CommentInterface;
}

export default function CommentCard(props: CommentCardProps) {
    return (
      <div className="flex flex-wrap w-1/1 bg-lightGray rounded-xl relative py-2">
        <div className="flex flex-row">
          <CommenterDetails 
            key={`Details of Commenter ${props.comment.userID}`}
            userID={props.comment.userID}
            name={props.comment.firstName + " " + props.comment.lastName}
            headline={props.comment.headline}
            profilePicture={props.comment.profilePicture}   
          />
          <button
            className="material-icons-round cursor-pointer mr-1 text-mutedSilver hover:bg-lightGray h-fit"
          >
            more_horiz
          </button>
        </div>
        <CommentContent key={`comment ${props.comment.commentID} details`} commentText={props.comment.commentText}/>
      </div>
    );
}