import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchPost } from "../../store/postSlice";
import Post from "./PostCard";
import { useEffect } from "react";


export default function PostContainer() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.post);
    useEffect(() => {
      dispatch(fetchPost(0)); 
      }, [dispatch]);
  return (
    <div className="flex flex-wrap lg:w-5/12 md:w-8/12 sm:1/1 m-auto">
      {posts.posts.map((post, i) => {
        return (
          <Post key={`post ${i}`} post={post}/>
        );
      })}
    </div>
  );
}
