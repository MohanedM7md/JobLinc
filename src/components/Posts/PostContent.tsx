import { useState, useEffect, useRef } from "react";
import PostMedia from "./PostMedia";
import { Media } from "@interfaces/postInterfaces";

interface PostDetailsProps {
  text: string;
  media: Media[];
}

export default function PostContent(props: PostDetailsProps) {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const show = !showMore ? "Show more" : "Show less";

  useEffect(() => {
    if (textRef.current) {
      const { scrollHeight, clientHeight } = textRef.current;
      setIsOverflowing(scrollHeight > clientHeight);
    }
  }, [props.text]);

  return (
    <div>
      <div className="min-w-0 mr-3 ml-3">
        <p
          ref={textRef}
          className={`text-wrap ${!showMore ? "truncate line-clamp-3" : ""}`}
        >
          {props.text}
        </p>
        {isOverflowing && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="font-bold text-sm text-gray-600 cursor-pointer hover:underline"
          >
            {show}
          </button>
        )}
      </div>
      {props.media?.length > 0 ? (
        <PostMedia key="mediaRendering" media={props.media} />
      ) : null}
    </div>
  );
}
