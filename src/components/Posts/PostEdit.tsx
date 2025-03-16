import { useState } from "react";
import { PostInterface } from "../../interfaces/postInterfaces";
import { postsResponse } from "../../__mocks__/PostsMock/postsDB";

export default function PostEdit(props: PostInterface) {
    const [newText, setNewText] = useState<string>(props.text);

    const submitEdit = () => {
        const postIndex = postsResponse.findIndex(post => post.postID === props.postID);
        postsResponse[postIndex].text = newText;
    }

    return (
      <div className="flex m-auto">
        <form>
          <input 
            type="text" 
            value={newText} 
            onChange={(e) => setNewText(e.target.value)}
            className=""
            ></input>
            <button onClick={() => submitEdit()}>Submit</button>          
        </form>
      </div>
    );
}
