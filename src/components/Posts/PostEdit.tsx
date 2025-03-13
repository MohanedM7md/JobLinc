import { useRef, useState } from "react";

interface PostDetailsProps {
  text: string;
  pics: string[];
}

export default function PostEdit(props: PostDetailsProps) {
    const [newText, setNewText] = useState<string>(props.text);
    const [newPics, setNewPics] = useState<string[]>(props.pics);

    const imageUploadRef = useRef(null);

    return (
      <div className="flex m-auto">
        <form>
          <input 
            type="text" 
            value={newText} 
            onChange={(e) => setNewText(e.target.value)}
            className=""
            ></input>
          <input type="file" className="hidden" ref={imageUploadRef}></input>
          <div className="flex bg-gray-100">
            {newPics.map((picURL, index) => {
                return ( 
                    <img key={index} src={picURL} alt={`pic-${index}`} />
                );
            })}
          </div>
        </form>
      </div>
    );
}
