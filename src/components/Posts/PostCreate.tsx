import { useState } from "react";
import { postsResponse } from "../../__mocks__/PostsMock/postsDB";
import { PostInterface } from "../../interfaces/postInterfaces";

export default function PostCreate() {
    const [newText, setNewText] = useState<string>("");

    const submitNewPost = () => {
        const newPost:PostInterface = {
            postID: postsResponse.length.toString(),
            userID: "1",
            firstName: "Anime",//Assuming this is the logged in user
            lastName: "Protagonist",
            profilePicture: "https://i.pin//img.com/550x/04/bb/21/04bb2164bbfa3684118a442c17d086bf.jpg",
            headline: "I am the main character",
            text: newText,
            likes: 0,
            commentsNum: 0,
            reposts: 0,
            pics: [],
        }
        postsResponse.push(newPost);
    }

    return (
      <div className="flex flex-col h-screen bg-charcoalWhite m-0 justify-center items-center">
        <form className="flex flex-col bg-lightGray p-5 rounded-xl w-7/12">
          <h1 className="font-bold text-[18px] text-warmBlack sm:text-[25px] mb-6">
            Create a new Post
          </h1>
          <label htmlFor="postText" className="font-medium text-lg">
            Enter your text here:
          </label>
          <br />
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="bg-white  w-11/12 outline-[0.7px] text-[14px] text-charcoalBlack h-25 px-2 rounded-sm hover:cursor-text hover:outline-[1px] hover:bg-gray-100 focus:outline-[1.5px] m-auto"
          ></textarea>
          <button onClick={submitNewPost}>Submit</button>
        </form>
      </div>
    );
}