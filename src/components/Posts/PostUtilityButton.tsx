import { PostInterface } from "../../interfaces/postInterfaces";

interface UtilityProps {
    delete: () => void;
    post: PostInterface
}

export default function PostUtilityButton(props:UtilityProps) {
    return (
      <div className="flex flex-col border border-gray-200 rounded-xl bg-white">
          <button className="h-8 w-22 font-medium hover:bg-gray-100">
            Edit
          </button>
        <button
          data-testid={`Delete ${props.post.postID}`}
          onClick={() => props.delete()}
          className="h-8 w-22 bg-crimsonRed text-white font-medium hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    );
}