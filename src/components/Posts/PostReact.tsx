import {
  HandHelping,
  Heart,
  Laugh,
  Lightbulb,
  PartyPopper,
  ThumbsUp,
} from "lucide-react";
import { motion } from "framer-motion";

interface PostReactProps {
  postReaction: (reaction: string) => void;
}

export default function PostReact({ postReaction }: PostReactProps) {
  return (
    <motion.div
      className="bg-white shadow-md rounded-md p-2 flex flex-grow m-auto justify-between overflow-hidden"
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      exit={{ width: "0%" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <button
        className="text-blue-500 cursor-pointer hover:bg-blue-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
        onClick={() => postReaction("Like")}
      >
        <ThumbsUp />
        <span className="hidden md:inline-block mx-2">Like</span>
      </button>
      <button
        className="text-pink-500 cursor-pointer hover:bg-pink-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
        onClick={() => postReaction("Celebrate")}
      >
        <PartyPopper />
        <span className="hidden md:inline-block mx-2">Celebrate</span>
      </button>
      <button
        className="text-green-600 cursor-pointer hover:bg-green-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
        onClick={() => postReaction("Support")}
      >
        <HandHelping />
        <span className="hidden md:inline-block mx-2">Support</span>
      </button>
      <button
        className="text-violet-600 cursor-pointer hover:bg-violet-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
        onClick={() => postReaction("Funny")}
      >
        <Laugh />
        <span className="hidden md:inline-block mx-2">Funny</span>
      </button>
      <button
        className="text-red-600 cursor-pointer hover:bg-red-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
        onClick={() => postReaction("Love")}
      >
        <Heart />
        <span className="hidden md:inline-block mx-2">Love</span>
      </button>
      <button
        className="text-yellow-600 cursor-pointer hover:bg-yellow-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
        onClick={() => postReaction("Insightful")}
      >
        <Lightbulb />
        <span className="hidden md:inline-block mx-2">Insightful</span>
      </button>
    </motion.div>
  );
}
