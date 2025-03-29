import { useNavigate } from "react-router-dom";

interface UtilityProps {
    delete: () => void;
    postID: string;
    postText: string;
}

export default function PostUtilityButton(props:UtilityProps) {
  const navigate = useNavigate();

    return (
      <div className="flex flex-col border border-gray-200 rounded-xl bg-white">
          <button 
          onClick={() => {navigate(`${props.postID}/edit`, {state:{postID: props.postID, postText: props.postText}})}}
          className="h-8 w-22 font-medium hover:bg-gray-100">
            Edit
          </button>
        <button
          data-testid={`Delete ${props.postID}`}
          onClick={() => props.delete()}
          className="h-8 w-22 bg-crimsonRed text-white font-medium hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    );
}