import { Link } from "react-router-dom";
import { PostInterface } from "../../interfaces/postInterfaces";

interface UtilityProps {
    delete: () => void;
    post: PostInterface
}

export default function PostUtilityButton(props:UtilityProps) {
    return (
      <div className="flex flex-col border border-gray-200 rounded-xl bg-white">
        <Link to="">
          <button className="h-8 w-22 font-medium hover:bg-gray-100">
            Edit
          </button>
        </Link>
        <button
          onClick={() => props.delete()}
          className="h-8 w-22 bg-crimsonRed text-white font-medium hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    );
}