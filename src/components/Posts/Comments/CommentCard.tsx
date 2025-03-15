import CommentContent from "./CommentContent";
import CommenterDetails from "./CommenterDetails";
import { CommentInterface } from "../../../interfaces/postInterfaces";
import { useState } from "react";
import ReplyCard from "./ReplyCard";

interface CommentCardProps {
  comment: CommentInterface;
}

export default function CommentCard(props: CommentCardProps) {
  const [showReplies, setShowReplies] = useState(false);

  function fetchReplies() {
    const replies = [
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
    ];
    return replies;
  }

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
      <div className="ml-14.5">
        <button className="cursor-pointer text-sm font-medium px-2 text-mutedSilver hover:bg-gray-200 rounded-lg">
          Like
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
        {showReplies ? (
          <>
            <div className="flex flex-row w-11/12 py-3">
              <img
                className="rounded-full h-10 w-10 mx-2"
                src={
                  "https://i.pinimg.com/550x/04/bb/21/04bb2164bbfa3684118a442c17d086bf.jpg"
                }
                alt={"User"}
              />
              <input
                type="text"
                placeholder="Write a reply..."
                className="outline-[0.7px] outline-gray-300 text-[14px] text-charcoalBlack h-8 w-12/12 px-2 mt-1 rounded-3xl hover:cursor-text hover:outline-[1px] hover:bg-gray-100 focus:outline-black focus:outline-[1.5px]"
              ></input>
              <button className="material-icons-round cursor-pointer rounded-full p-1 mt-1 mx-2 text-gray-500 hover:bg-gray-200 h-fit">
                send
              </button>
            </div>
            {fetchReplies().map((reply) => (
              <ReplyCard key={reply.replyID} reply={reply} />
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
}
