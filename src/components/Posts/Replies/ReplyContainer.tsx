import { getReplies } from "@services/api/postServices";
import ReplyCard from "./ReplyCard";
import { useQuery } from "@tanstack/react-query";
import RepliesHeader from "./RepliesHeader";
import { RepliesInterface } from "@interfaces/postInterfaces";

interface ReplyContainerProps {
  commentId: string;
  incrementRepliesCount: () => void;
}

export default function ReplyContainer(props: ReplyContainerProps) {
  const {
    data: repliesData,
    isFetching: isRepliesFetching,
    isError: isRepliesError,
    refetch: refetchReplies,
  } = useQuery({
    queryKey: ["getReplies", props.commentId],
    queryFn: () => getReplies(props.commentId),
    enabled: true,
    refetchOnWindowFocus: false,
  });

  async function updateReplies() {
    await refetchReplies()
  }

  return (
    <div className="flex flex-col w-11/12 py-3">
      <RepliesHeader
        commentId={props.commentId}
        incrementRepliesCount={props.incrementRepliesCount}
        onReply={updateReplies}
      />
      {isRepliesFetching ? (
        <div className="flex flex-col w-full">
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
      ) : isRepliesError ? (
        <div className="flex flex-col items-center p-4 w-full">
          <div className="text-red-500 mb-2">
            <span className="material-icons text-2xl">error_outline</span>
          </div>
          <span className="text-mutedSilver font-medium text-center">
            Could not load replies
          </span>
          <button
            onClick={() => refetchReplies()}
            className="mt-2 px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded-md text-sm transition duration-300"
          >
            Try Again
          </button>
        </div>
      ) : repliesData && repliesData.length > 0 ? (
        <div className="flex flex-col w-full">
          {repliesData.map((reply: RepliesInterface) => (
            <ReplyCard key={reply.replyId} reply={reply} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center p-2">
          <span className="text-mutedSilver font-medium">No Replies Yet</span>
        </div>
      )}
    </div>
  );
}
