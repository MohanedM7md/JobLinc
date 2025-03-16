import { useState } from "react";
import { PostInterface } from "../../interfaces/postInterfaces";
import { postsResponse } from "../../__mocks__/PostsMock/postsDB";
import { Link } from "react-router-dom";

export default function PostEdit(props: PostInterface) {
    const [newText, setNewText] = useState<string>(props.text);

    const submitEdit = () => {
        const postIndex = postsResponse.findIndex(post => post.postID === props.postID);
        postsResponse[postIndex].text = newText;
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
          <div className="flex flex-row w-11/12 m-auto pt-2">
            <button onClick={submitEdit}>Submit</button>
            <div className="flex flex-row w-1/1 justify-end">
              <Link to="/post">
                <button>Cancel</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
}
