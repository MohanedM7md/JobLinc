import { createPost } from "@services/api/postServices";
import store from "@store/store";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

interface HeaderProps {
  refreshPosts: () => void;
}

export default function PostContainerHeader(props: HeaderProps) {
  const [postText, setPostText] = useState<string>("");

  const addPost = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      props.refreshPosts();
    },
  });

  function handleAddPost() {
    toast.promise(addPost.mutateAsync({ text: postText }), {
      loading: "Creating post...",
      success: "Post created successfully!",
      error: "Error creating post.",
    });
  }

  return (
    <div className="bg-white flex flex-row w-1/1 py-3 border-b-1 border-gray-300">
      <img
        className="rounded-full h-10 w-10 mx-2"
        src={store.getState().user.profilePicture!}
        alt={"User"}
      />
      <input
        type="text"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        placeholder="Write a new post..."
        className="outline-[0.7px] outline-gray-300 text-[14px] text-charcoalBlack h-8 w-12/12 px-2 mt-1 rounded-3xl hover:cursor-text hover:outline-[1px] hover:bg-gray-100 focus:outline-black focus:outline-[1.5px]"
      ></input>
      <button
        onClick={() => {
          if (postText != "") {
            handleAddPost();
            setPostText("");
          }
        }}
        className="material-icons-round cursor-pointer rounded-full p-1 mt-1 mx-2 text-gray-500 hover:bg-gray-200 h-fit"
      >
        send
      </button>
    </div>
  );
}
