import { reactPost } from "@services/api/postServices";
import {
  HandHelping,
  Heart,
  Laugh,
  Lightbulb,
  PartyPopper,
  ThumbsUp,
} from "lucide-react";

interface ReactInterface {
  postId: string;
  closeComponent: () => void;
}

export default function PostReact(props: ReactInterface) {
  return (
    <div className="bg-white shadow-md rounded-md flex flex-grow m-auto justify-between">
      <button
        onClick={() => {
          reactPost(props.postId, "Like");
          props.closeComponent();
        }}
        className="text-blue-500 cursor-pointer hover:bg-blue-200 px-5 py-1.5"
      >
        <ThumbsUp />
      </button>
      <button
        onClick={() => {
          reactPost(props.postId, "Celebrate");
          props.closeComponent();
        }}
        className="text-pink-500 cursor-pointer hover:bg-pink-200 px-5 py-1.5"
      >
        <PartyPopper />
      </button>
      <button
        onClick={() => {
          reactPost(props.postId, "Support");
          props.closeComponent();
        }}
        className="text-green-600 cursor-pointer hover:bg-green-200 px-5 py-1.5"
      >
        <HandHelping />
      </button>
      <button
        onClick={() => {
          reactPost(props.postId, "Funny");
          props.closeComponent();
        }}
        className="text-violet-600 cursor-pointer hover:bg-violet-200 px-5 py-1.5"
      >
        <Laugh />
      </button>
      <button
        onClick={() => {
          reactPost(props.postId, "Love");
          props.closeComponent();
        }}
        className="text-red-600 cursor-pointer hover:bg-red-200 px-5 py-1.5"
      >
        <Heart />
      </button>
      <button
        onClick={() => {
          reactPost(props.postId, "Insightful");
          props.closeComponent;
        }}
        className="text-yellow-600 cursor-pointer hover:bg-yellow-200 px-5 py-1.5"
      >
        <Lightbulb />
      </button>
    </div>
  );
}
