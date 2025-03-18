import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { editPost } from "../../services/api/postServices";

export default function PostEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const [newText, setNewText] = useState<string>(location.state.postText);

  function submitEdit() {
    editPost(location.state.postID, newText).then(() => {
      navigate("/post");
    });
  }

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
            className="cursor-pointer hover:bg-gray-200 rounded-xl h-fit"
            onClick={() => submitEdit()}
          >
            Submit
          </button>
          <div className="flex flex-row w-1/1 justify-end">
            <Link to="/post">
              <button className="cursor-pointer hover:bg-gray-200 rounded-xl h-fit">
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
