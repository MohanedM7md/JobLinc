import { useState } from "react";
import { createComment } from "@services/api/postServices";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface CommentsHeaderProps {
  postId: string;
  onCommentAdded: () => void;
}

export default function CommentsHeader({
  postId,
  onCommentAdded,
}: CommentsHeaderProps) {
  const [newComment, setNewComment] = useState<string>("");

  const addCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      setNewComment("");
      onCommentAdded();
    },
  });

  function addCommentHandler() {
    if (newComment.trim() !== "") {
      toast.promise(
        addCommentMutation.mutateAsync({ postId, comment: newComment }),
        {
          loading: "Adding comment...",
          success: "Comment added successfully!",
          error: (error) => error.message,
        },
      );
    }
  }

  return (
    <div className="flex flex-row w-1/1 py-3">
      <img
        className="rounded-full h-10 w-10 mx-2"
        src={localStorage.getItem("profilePicture")!}
        alt={"User"}
      />
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write a comment..."
        className="outline-[0.7px] outline-gray-300 text-[14px] text-charcoalBlack h-8 w-12/12 px-2 mt-1 rounded-3xl hover:cursor-text hover:outline-[1px] hover:bg-gray-100 focus:outline-black focus:outline-[1.5px]"
      ></input>
      <button
        onClick={addCommentHandler}
        className="material-icons-round cursor-pointer rounded-full p-1 mt-1 mx-2 text-gray-500 hover:bg-gray-200 h-fit"
      >
        send
      </button>
    </div>
  );
}
