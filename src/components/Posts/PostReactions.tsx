import ReactionCard from "./ReactionCard";
import { ReactionInterface } from "@interfaces/postInterfaces";
import { getPostReactions } from "@services/api/postServices";
import { useQuery } from "@tanstack/react-query";

interface PostReactionInterface {
  postId: string;
}

export default function PostReactions(props: PostReactionInterface) {
  const {
    data: reactionsData,
    isFetching: isReactionsFetching,
    isError: isReactionsError,
    refetch: refetchReactions,
  } = useQuery({
    queryKey: ["Get all post reactions", props.postId],
    queryFn: () => getPostReactions(props.postId),
    enabled: true,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="w-full h-64 max-h-64">
      <div className="w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {isReactionsFetching ? (
          <div className="w-full flex flex-col">
            {[1, 2, 3].map((item) => (
              <div
                key={`loading-reaction-${item}`}
                className="flex items-start animate-pulse mb-3"
              >
                <div className="rounded-full h-16 w-16 m-4 bg-gray-300"></div>
                <div className="mt-5 w-full">
                  <div className="h-5 w-40 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 w-64 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 w-20 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : isReactionsError ? (
          <div className="flex flex-col items-center justify-center py-8 w-full">
            <div className="text-red-500 mb-2">
              <span className="material-icons text-3xl">mood_bad</span>
            </div>
            <p className="text-mutedSilver font-medium mb-2">
              Failed to load reactions
            </p>
            <button
              onClick={() => refetchReactions()}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md text-sm transition duration-300"
            >
              Try Again
            </button>
          </div>
        ) : reactionsData && reactionsData.length > 0 ? (
          <div className="w-full">
            {reactionsData.map((reaction: ReactionInterface) => (
              <div
                key={reaction.reactId}
                className="flex items-start border-b border-gray-700 last:border-0"
              >
                <ReactionCard reaction={reaction} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center py-8 w-full">
            <p className="text-mutedSilver font-medium">No reactions yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
