import { useState} from "react";
import PostMedia from "./PostMedia";

interface PostDetailsProps {
  text: string;
  pics: string[];
}

export default function PostDetails({ text, pics }: PostDetailsProps) {
  const [showMore, setShowMore] = useState<boolean>(false);
  const show = !showMore ? "Show more" : "Show less";



  return (
    <div>
      <div className="min-w-0 mr-3 ml-3">
        <p className={!showMore ? "truncate text-wrap line-clamp-3" : ""}>
          {text}
        </p>
        <button
          onClick={() => setShowMore(!showMore)}
          className="font-bold text-sm text-gray-600 cursor-pointer hover:underline"
        >
          {show}
        </button>
      </div>
      {pics.length > 0 ? <PostMedia key="mediaRendering" pics={pics} /> : null}
    </div>
  );
}
