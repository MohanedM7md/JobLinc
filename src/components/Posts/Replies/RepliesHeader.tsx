import { createReply } from "@services/api/postServices";
import store from "@store/store";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

interface RepliesHeaderProps {
  commentId: string;
  incrementRepliesCount: () => void;
  onReply: () => void;
}

export default function RepliesHeader(props: RepliesHeaderProps) {
  const [newReply, setNewReply] = useState<string>("");
  const addReplyMutation = useMutation({
    mutationFn: createReply,
    onSuccess: () => {
      setNewReply("");
      props.incrementRepliesCount();
      props.onReply();
    },
  });

  function addReplyHandler() {
    if (newReply.trim() !== "") {
      toast.promise(
        addReplyMutation.mutateAsync({
          commentId: props.commentId,
          text: newReply,
        }),
        {
          loading: "Replying...",
          success: "Replied!",
          error: (error) => error.message,
        },
      );
    }
  }
  return (
    <div className="flex flex-row w-11/12 py-3">
      <img
        className="rounded-full h-10 w-10 mx-2"
        src={store.getState().user.profilePicture!}
        alt={"User"}
      />
      <input
        type="text"
        value={newReply}
        onChange={(e) => setNewReply(e.target.value)}
        placeholder="Write a reply..."
        className="outline-[0.7px] outline-gray-300 text-[14px] text-charcoalBlack h-8 w-12/12 px-2 mt-1 rounded-3xl hover:cursor-text hover:outline-[1px] hover:bg-gray-100 focus:outline-black focus:outline-[1.5px]"
      ></input>
      <button
        onClick={addReplyHandler}
        className="material-icons-round cursor-pointer rounded-full p-1 mt-1 mx-2 text-gray-500 hover:bg-gray-200 h-fit"
      >
        send
      </button>
    </div>
  );
}
