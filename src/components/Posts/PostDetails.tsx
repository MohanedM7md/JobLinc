import { useEffect, useState} from "react";
import PostMedia from "./PostMedia";
import { fetchPost } from "../../store/postSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";


export default function PostDetails() {
  const [showMore, setShowMore] = useState<boolean>(false);
  const show = !showMore ? "Show more" : "Show less";
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) => state.post);
  useEffect(() => {
    dispatch(fetchPost("0")); 
    }, [dispatch]);


  return (
    <div>
      <div className="min-w-0 mr-3 ml-3">
        <p className={!showMore ? "truncate text-wrap line-clamp-3" : ""}>
          {post.text}
        </p>
        <button
          onClick={() => setShowMore(!showMore)}
          className="font-bold text-sm text-gray-600 cursor-pointer hover:underline"
        >
          {show}
        </button>
      </div>
      {post.pics.length > 0 ? <PostMedia key="mediaRendering" pics={post.pics} /> : null}
    </div>
  );
}
