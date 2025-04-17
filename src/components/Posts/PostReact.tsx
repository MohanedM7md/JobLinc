import {
  HandHelping,
  Heart,
  Laugh,
  Lightbulb,
  PartyPopper,
  ThumbsUp,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { reactPost } from "@services/api/postServices";
import toast from "react-hot-toast";

interface PostReactProps {
  postId: string;
  successHandler: (newReaction: string) => void;
  userReaction: string;
}

export default function PostReact({
  postId,
  successHandler,
  userReaction,
}: PostReactProps) {
  const [reaction, setReaction] = useState<string>(userReaction);

  const addReactionMutation = useMutation({
    mutationFn: reactPost,
  });

  function postReaction(type: string) {
    toast.promise(addReactionMutation.mutateAsync({ postId, type }), {
      loading: "Adding reaction...",
      success: () => {
        setReaction(type);
        successHandler(type);
        return "Reaction added successfully!";
      },
      error: (error) => error.message,
    });
  }

  return (
    <motion.div
      className="bg-white shadow-md rounded-md p-2 flex flex-grow m-auto justify-between overflow-hidden"
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      exit={{ width: "0%" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {reaction === "Like" ? (
        <button
          className="text-gray-500 cursor-pointer hover:bg-gray-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
          onClick={() => postReaction("")}
        >
          <X />
          <span className="hidden md:inline-block mx-2">Remove</span>
        </button>
      ) : (
        <button
          className="text-blue-500 cursor-pointer hover:bg-blue-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
          onClick={() => postReaction("Like")}
        >
          <ThumbsUp />
          <span className="hidden md:inline-block mx-2">Like</span>
        </button>
      )}
      {reaction === "Celebrate" ? (
        <button
          className="text-gray-500 cursor-pointer hover:bg-gray-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
          onClick={() => postReaction("")}
        >
          <X />
          <span className="hidden md:inline-block mx-2">Remove</span>
        </button>
      ) : (
        <button
          className="text-pink-500 cursor-pointer hover:bg-pink-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
          onClick={() => postReaction("Celebrate")}
        >
          <PartyPopper />
          <span className="hidden md:inline-block mx-2">Celebrate</span>
        </button>
      )}
      {reaction === "Support" ? (
        <button
          className="text-gray-500 cursor-pointer hover:bg-gray-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
          onClick={() => postReaction("")}
        >
          <X />
          <span className="hidden md:inline-block mx-2">Remove</span>
        </button>
      ) : (
        <button
          className="text-green-600 cursor-pointer hover:bg-green-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
          onClick={() => postReaction("Support")}
        >
          <HandHelping />
          <span className="hidden md:inline-block mx-2">Support</span>
        </button>
      )}
      {reaction === "Funny" ? (
        <button
          className="text-gray-500 cursor-pointer hover:bg-gray-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
          onClick={() => postReaction("")}
        >
          <X />
          <span className="hidden md:inline-block mx-2">Remove</span>
        </button>
      ) : (
        <button
          className="text-violet-600 cursor-pointer hover:bg-violet-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
          onClick={() => postReaction("Funny")}
        >
          <Laugh />
          <span className="hidden md:inline-block mx-2">Funny</span>
        </button>
      )}
      {reaction === "Love" ? (
        <button
          className="text-gray-500 cursor-pointer hover:bg-gray-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
          onClick={() => postReaction("")}
        >
          <X />
          <span className="hidden md:inline-block mx-2">Remove</span>
        </button>
      ) : (
        <button
          className="text-red-600 cursor-pointer hover:bg-red-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
          onClick={() => postReaction("Love")}
        >
          <Heart />
          <span className="hidden md:inline-block mx-2">Love</span>
        </button>
      )}
      {reaction === "Insightful" ? (
        <button
          className="text-gray-500 cursor-pointer hover:bg-gray-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
          onClick={() => postReaction("")}
        >
          <X />
          <span className="hidden md:inline-block mx-2">Remove</span>
        </button>
      ) : (
        <button
          className="text-yellow-600 cursor-pointer hover:bg-yellow-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
          onClick={() => postReaction("Insightful")}
        >
          <Lightbulb />
          <span className="hidden md:inline-block mx-2">Insightful</span>
        </button>
      )}
    </motion.div>
  );
}
