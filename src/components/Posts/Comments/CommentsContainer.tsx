import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { CommentInterface } from "@interfaces/postInterfaces";
import { getComments } from "@services/api/postServices";
import { useQuery } from "@tanstack/react-query";
import CommentsHeader from "./CommentsHeader";

interface CommentsContainerProps {
  postId: string;
  incrementCommentsCount: () => void;
}

export default function CommentsContainer({
  postId,
  incrementCommentsCount,
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

  return (
    <>
      <CommentsHeader postId={postId} onCommentAdded={onCommentAdded} />
      {isCommentsFetching ? (
        <div className="m-auto p-2">
          <span className="text-mutedSilver font-medium">
            Loading comments...
          </span>
        </div>
      ) : isCommentsError ? (
        <div className="m-auto p-2">
          <span className="text-mutedSilver font-medium">
            Can't fetch Comments, Please try again later
          </span>
        </div>
      ) : comments && comments.length > 0 ? (
        comments.map((comment) => (
          <CommentCard key={comment.commentId} comment={comment} />
        ))
      ) : (
        <div className="m-auto p-2">
          <span className="text-mutedSilver font-medium">No Comments Yet</span>
        </div>
      )}
    </>
  );
}
