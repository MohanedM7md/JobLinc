import {
  HandHelping,
  Heart,
  Laugh,
  Lightbulb,
  PartyPopper,
  SmilePlus,
  ThumbsUp,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { reactPost } from "@services/api/postServices";
import toast from "react-hot-toast";

interface PostReactProps {
  postId: string;
  successHandler: (newReaction: string, oldReaction: string) => void;
  userReaction: string;
}

export default function PostReact({
  postId,
  successHandler,
  userReaction,
}: PostReactProps) {
  const [reaction, setReaction] = useState<string>(userReaction || "React");
  const [showReact, setShowReact] = useState<boolean>(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const addReactionMutation = useMutation({
    mutationFn: reactPost,
  });

  function postReaction(type: string) {
    const oldReaction = reaction;
    toast.promise(addReactionMutation.mutateAsync({ postId, type }), {
      loading: "Adding reaction...",
      success: () => {
        setReaction(type);
        successHandler(type, oldReaction);
        return "Reaction added successfully!";
      },
      error: (error) => error.message,
    });
  }

  function handleMouseEnter() {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    hoverTimeout.current = setTimeout(() => {
      setShowReact(true);
    }, 200);
  }

  function handleMouseLeave() {
    hoverTimeout.current = setTimeout(() => {
      setShowReact(false);
    }, 200);
  }

  function handleMouseDown() {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    hoverTimeout.current = setTimeout(() => {
      setShowReact(true);
    }, 500);
  }

  function handleMouseUp() {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
  }

  function getReactionIcon(reaction: string) {
    switch (reaction) {
      case "React":
        return <SmilePlus className="mr-2 md:align-text-bottom" />;
      case "Like":
        return <ThumbsUp className="mr-2 md:align-text-bottom" />;
      case "Celebrate":
        return <PartyPopper className="mr-2 md:align-text-bottom" />;
      case "Support":
        return <HandHelping className="mr-2 md:align-text-bottom" />;
      case "Funny":
        return <Laugh className="mr-2 md:align-text-bottom" />;
      case "Love":
        return <Heart className="mr-2 md:align-text-bottom" />;
      case "Insightful":
        return <Lightbulb className="mr-2 md:align-text-bottom" />;
      default:
        return <SmilePlus className="mr-2 md:align-text-bottom" />;
    }
  }

  function getReactionStyles(reaction: string) {
    switch (reaction) {
      case "React":
        return "text-gray-500 hover:bg-gray-200";
      case "Like":
        return "text-blue-500 hover:bg-blue-100";
      case "Celebrate":
        return "text-pink-500 hover:bg-pink-100";
      case "Support":
        return "text-green-600 hover:bg-green-100";
      case "Funny":
        return "text-violet-600 hover:bg-violet-100";
      case "Love":
        return "text-red-600 hover:bg-red-100";
      case "Insightful":
        return "text-yellow-600 hover:bg-yellow-100";
      default:
        return "text-gray-500 hover:bg-gray-200";
    }
  }

  return (
    <div className="relative w-3/12">
      <button
        id={`react-button-${postId}`}
        className={`transition duration-400 ease-in-out w-full h-10 cursor-pointer font-medium flex items-center justify-center ${getReactionStyles(
          reaction,
        )}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={(e) => {
          e.stopPropagation();
          postReaction("Like");
        }}
      >
        {getReactionIcon(reaction)}
        <span className="hidden md:inline-block">{reaction}</span>
      </button>
      <AnimatePresence>
        {showReact && (
          <motion.div
            className="absolute bottom-12 left-0 transform translate-x-0 bg-white rounded-lg p-2 flex flex-row justify-between overflow-hidden z-10 w-max"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ width: "0%" }}
            animate={{ width: "max-content" }}
            exit={{ width: "0%" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {reaction === "Like" ? (
              <motion.div
                className="text-gray-500 cursor-pointer hover:bg-gray-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
                onClick={() => postReaction("")}
              >
                <X />
                <span className="hidden md:inline-block mx-2">Remove</span>
              </motion.div>
            ) : (
              <motion.div
                className="text-blue-500 cursor-pointer hover:bg-blue-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
                onClick={() => postReaction("Like")}
              >
                <ThumbsUp />
                <span className="hidden md:inline-block mx-2">Like</span>
              </motion.div>
            )}
            {reaction === "Celebrate" ? (
              <motion.div
                className="text-gray-500 cursor-pointer hover:bg-gray-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
                onClick={() => postReaction("")}
              >
                <X />
                <span className="hidden md:inline-block mx-2">Remove</span>
              </motion.div>
            ) : (
              <motion.div
                className="text-pink-500 cursor-pointer hover:bg-pink-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
                onClick={() => postReaction("Celebrate")}
              >
                <PartyPopper />
                <span className="hidden md:inline-block mx-2">Celebrate</span>
              </motion.div>
            )}
            {reaction === "Support" ? (
              <motion.div
                className="text-gray-500 cursor-pointer hover:bg-gray-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
                onClick={() => postReaction("")}
              >
                <X />
                <span className="hidden md:inline-block mx-2">Remove</span>
              </motion.div>
            ) : (
              <motion.div
                className="text-green-600 cursor-pointer hover:bg-green-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
                onClick={() => postReaction("Support")}
              >
                <HandHelping />
                <span className="hidden md:inline-block mx-2">Support</span>
              </motion.div>
            )}
            {reaction === "Funny" ? (
              <motion.div
                className="text-gray-500 cursor-pointer hover:bg-gray-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
                onClick={() => postReaction("")}
              >
                <X />
                <span className="hidden md:inline-block mx-2">Remove</span>
              </motion.div>
            ) : (
              <motion.div
                className="text-violet-600 cursor-pointer hover:bg-violet-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
                onClick={() => postReaction("Funny")}
              >
                <Laugh />
                <span className="hidden md:inline-block mx-2">Funny</span>
              </motion.div>
            )}
            {reaction === "Love" ? (
              <motion.div
                className="text-gray-500 cursor-pointer hover:bg-gray-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
                onClick={() => postReaction("")}
              >
                <X />
                <span className="hidden md:inline-block mx-2">Remove</span>
              </motion.div>
            ) : (
              <motion.div
                className="text-red-600 cursor-pointer hover:bg-red-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
                onClick={() => postReaction("Love")}
              >
                <Heart />
                <span className="hidden md:inline-block mx-2">Love</span>
              </motion.div>
            )}
            {reaction === "Insightful" ? (
              <motion.div
                className="text-gray-500 cursor-pointer hover:bg-gray-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
                onClick={() => postReaction("")}
              >
                <X />
                <span className="hidden md:inline-block mx-2">Remove</span>
              </motion.div>
            ) : (
              <motion.div
                className="text-yellow-600 cursor-pointer hover:bg-yellow-100 hover:scale-105 transition-transform font-medium flex flex-row px-2 py-1 rounded-3xl"
                onClick={() => postReaction("Insightful")}
              >
                <Lightbulb />
                <span className="hidden md:inline-block mx-2">Insightful</span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
