import { createPost } from "@services/api/postServices";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Repost({
  repost,
  onSuccess,
}: {
  repost: string;
  onSuccess: () => void;
}) {
  const [repostText, setRepostText] = useState<string>("");
  const addRepost = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      onSuccess();
    },
  });
  const isPending = addRepost.status === "pending";

  function handleRepost() {
    toast.promise(addRepost.mutateAsync({ text: repostText, repost }), {
      loading: "Reposting...",
      success: "Post reposted successfully!",
      error: (error) => error.message,
    });
  }

  return (
    <div className="p-2 bg-lightGray rounded-lg text-charcoalBlack">
      <h2 className="text-lg font-bold mb-2">Repost</h2>
      <p className="text-sm text-gray-600 mb-2">
        Share this post with your network.
      </p>
      <textarea
        className="bg-white w-11/12 outline-[0.7px] text-[14px] text-charcoalBlack h-25 px-2 rounded-sm hover:cursor-text hover:outline-[1px] hover:bg-gray-100 focus:outline-[1.5px] m-auto"
        placeholder="Enter your text here..."
        value={repostText}
        onChange={(e) => setRepostText(e.target.value)}
        disabled={isPending}
        rows={4}
      ></textarea>
      <button
        className="bg-crimsonRed text-warmWhite px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-red-700 transition duration-400 ease-in-out"
        onClick={handleRepost}
      >
        {isPending ? "Reposting..." : "Repost"}
      </button>
    </div>
  );
}
