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
import { useState, useEffect, useRef } from "react";
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
  const [showReact, setShowReact] = useState<boolean>(false); //
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const reactButton = document.getElementById(`react-button-${postId}`);
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        reactButton &&
        !reactButton.contains(event.target as Node)
      ) {
        setShowReact(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [postId]);

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
        className={`transition w-full h-10 cursor-pointer font-medium flex items-center justify-center ${getReactionStyles(
          reaction,
        )}`}
        onClick={(e) => {
          e.stopPropagation();
          setShowReact((prev) => !prev);
        }}
      >
        {getReactionIcon(reaction)}
        <span className="hidden md:inline-block">{reaction}</span>
      </button>
      <AnimatePresence>
        {showReact && (
          <motion.div
            ref={ref}
            className="absolute bottom-12 left-0 transform translate-x-0 bg-white rounded-lg p-2 flex flex-row justify-between overflow-hidden z-10 w-max"
            initial={{ width: "0%" }}
            animate={{ width: "max-content" }}
            exit={{ width: "0%" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
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
        )}
      </AnimatePresence>
    </div>
  );
}
