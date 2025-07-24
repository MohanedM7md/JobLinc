import { useState } from "react";
import { editComment } from "../../../services/api/postServices";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import "material-icons";

interface CommentEditProps {
  commentId: string;
  text: string;
  onUpdate: (newText:string) => void;
  onClose: () => void;
}

export default function CommentEdit(props: CommentEditProps) {
  const [newText, setNewText] = useState<string>(props.text);

  const commentEdit = useMutation({
    mutationFn: editComment,
    onSuccess: () => {
      props.onUpdate(newText);
      props.onClose();
    },
  });

  async function handleEditComment() {
    toast.promise(
      commentEdit.mutateAsync({ commentId: props.commentId, text: newText }),
      {
        loading: "Editing comment...",
        success: "Edited!",
        error: (error) => error.message,
      },
    );
  }

  const isPosting = commentEdit.isPending;

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-[18px] text-warmBlack sm:text-[25px] mb-6">
        Edit Comment
      </h1>
      <textarea
        id="commentText"
        value={newText}
        disabled={isPosting}
        placeholder="Speak your mind..."
        onChange={(e) => setNewText(e.target.value)}
        className="bg-white outline-[0.7px] text-[14px] text-charcoalBlack h-50 px-2 rounded-sm hover:cursor-text hover:outline-[1px] hover:bg-gray-100 focus:outline-[1.5px]"
      ></textarea>
      <div className="flex flex-row w-1/1 m-auto pt-2">
        <button
          onClick={handleEditComment}
          className={`bg-crimsonRed text-warmWhite px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-red-700 transition duration-400 ease-in-out ${isPosting ? "opacity-50" : ""}`}
          disabled={isPosting || newText === props.text}
        >
          {isPosting ? "Editing..." : "Edit"}
        </button>
      </div>
    </div>
  );
}
