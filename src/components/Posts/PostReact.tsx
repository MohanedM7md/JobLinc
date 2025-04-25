import {
  HandHelping,
  Heart,
  Laugh,
  Lightbulb,
  PartyPopper,
  ThumbsUp,
} from "lucide-react";

interface PostReactProps {
  postReaction: (reaction: string) => void;
}

export default function PostReact({ postReaction }: PostReactProps) {
  return (
    <div className="bg-white shadow-md rounded-md p-2 flex flex-grow m-auto justify-between">
      <button
        className="text-blue-500 cursor-pointer hover:bg-blue-200 font-medium flex flex-row px-2 py-1"
        onClick={() => postReaction("Like")}
      >
        <ThumbsUp />
        <span className="hidden md:inline-block mx-2">Like</span>
      </button>
      <button
        className="text-pink-500 cursor-pointer hover:bg-pink-200 font-medium flex flex-row px-2 py-1"
        onClick={() => postReaction("Celebrate")}
      >
        <PartyPopper />
        <span className="hidden md:inline-block mx-2">Celebrate</span>
      </button>
      <button
        className="text-green-600 cursor-pointer hover:bg-green-200 font-medium flex flex-row px-2 py-1"
        onClick={() => postReaction("Support")}
      >
        <HandHelping />
        <span className="hidden md:inline-block mx-2">Support</span>
      </button>
      <button
        className="text-violet-600 cursor-pointer hover:bg-violet-200 font-medium flex flex-row px-2 py-1"
        onClick={() => postReaction("Funny")}
      >
        <Laugh />
        <span className="hidden md:inline-block mx-2">Funny</span>
      </button>
      <button
        className="text-red-600 cursor-pointer hover:bg-red-200 font-medium flex flex-row px-2 py-1"
        onClick={() => postReaction("Love")}
      >
        <Heart />
        <span className="hidden md:inline-block mx-2">Love</span>
      </button>
      <button
        className="text-yellow-600 cursor-pointer hover:bg-yellow-200 font-medium flex flex-row px-2 py-1"
        onClick={() => postReaction("Insightful")}
      >
        <Lightbulb />
        <span className="hidden md:inline-block mx-2">Insightful</span>
      </button>
    </div>
  );
}
