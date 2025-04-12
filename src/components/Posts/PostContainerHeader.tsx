import { createPost } from "@services/api/postServices";
import { useState } from "react";

interface HeaderProps {
    refreshPosts: () => (void);
}

export default function PostContainerHeader(props: HeaderProps) {
    const [postText, setPostText] = useState<string>("")

    async function addPost() {
      await createPost(postText);
      props.refreshPosts();
    }

    return (
      <div className="flex flex-row w-1/1 py-3 border-b-1 border-gray-300">
        <img
          className="rounded-full h-10 w-10 mx-2"
          src={
            "https://i.pinimg.com/550x/04/bb/21/04bb2164bbfa3684118a442c17d086bf.jpg"
          }
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
              addPost();
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