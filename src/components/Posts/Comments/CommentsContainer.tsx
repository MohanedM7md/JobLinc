import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { CommentInterface } from "@interfaces/postInterfaces";
import { getComments } from "@services/api/postServices";
import { useQuery } from "@tanstack/react-query";
import CommentsHeader from "./CommentsHeader";

interface CommentsContainerProps {
  postId: string;
  incrementCommentsCount: () => void;
  decrementCommentsCount: () => void;
}

export default function CommentsContainer({
  postId,
  incrementCommentsCount,
  decrementCommentsCount
}: CommentsContainerProps) {
  const [comments, setComments] = useState<CommentInterface[]>([]);

  const {
    data: commentsData,
    isFetching: isCommentsFetching,
    isError: isCommentsError,
    refetch: refetchComments,
  } = useQuery({
    queryKey: ["getComments", postId],
    queryFn: () => getComments(postId),
    enabled: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (commentsData) {
      setComments(commentsData);
    }
  }, [commentsData]);

  function onCommentAdded() {
    incrementCommentsCount();
    refetchComments();
  };

  function onCommentDelete() {
    decrementCommentsCount();
    refetchComments()
  }

  return (
    <>
      <CommentsHeader postId={postId} onCommentAdded={onCommentAdded} />
      {isCommentsFetching ? (
        <div className="flex flex-col w-full m-4">
          {[1, 2].map((item) => (
            <div
              key={`loading-${item}`}
              className="flex items-start space-x-2 mb-3 animate-pulse"
            >
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 w-4/12 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 w-11/12 bg-gray-300 rounded mb-1"></div>
                <div className="h-3 w-3/4 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : isCommentsError ? (
        <div className="flex flex-col items-center p-4 w-full">
          <div className="text-red-500 mb-2">
            <span className="material-icons text-2xl">error_outline</span>
          </div>
          <span className="text-mutedSilver font-medium text-center">
            Could not load replies
          </span>
          <button
            onClick={() => refetchComments()}
            className="mt-2 px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded-md text-sm transition duration-300"
          >
            Try Again
          </button>
        </div>
      ) : comments && comments.length > 0 ? (
        comments.map((comment) => (
          <CommentCard key={comment.commentId} comment={comment} delete={onCommentDelete} />
        ))
      ) : (
        <div className="m-auto p-2">
          <span className="text-mutedSilver font-medium">No Comments Yet</span>
        </div>
      )}
    </>
  );
}
