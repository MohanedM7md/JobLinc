import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { editPost } from "../../services/api/postServices";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function PostEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const [newText, setNewText] = useState<string>(location.state.postText);

  const postEdit = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      navigate("/home");
    },
  });

  function submitEdit() {
    if (newText === "" || newText === location.state.postText) {
      toast.error("Please enter a new text for the post.");
      return;
    } else {
      toast.promise(
        postEdit.mutateAsync({ postId: location.state.postId, text: newText }),
        {
          loading: "Saving post...",
          success: "Post edited successfully!",
          error: (error) => error.message,
        },
      );
    }
  }

  const isEditing = postEdit.isPending;

  return (
    <div className="flex flex-col h-screen bg-charcoalWhite m-0 justify-center items-center">
      <div className="flex flex-col bg-lightGray p-5 rounded-xl w-7/12">
        <h1 className="font-bold text-[18px] text-warmBlack sm:text-[25px] mb-6">
          Edit Post
        </h1>
        <label htmlFor="postText" className="font-medium text-lg">
          Enter your text here:
        </label>
        <br />
        <textarea
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="bg-white w-11/12 outline-[0.7px] text-[14px] text-charcoalBlack h-25 px-2 rounded-sm hover:cursor-text hover:outline-[1px] hover:bg-gray-100 focus:outline-[1.5px] m-auto"
        ></textarea>
        <div className="flex flex-row w-11/12 m-auto pt-2">
          <button
            onClick={submitEdit}
            className="bg-crimsonRed text-warmWhite px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-red-700 transition duration-400 ease-in-out"
            disabled={isEditing}
          >
            {isEditing ? "Editing..." : "Edit"}
          </button>
          <div className="flex flex-row w-1/1 justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-warmWhite px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-gray-700 transition duration-400 ease-in-out"
              disabled={isEditing}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
