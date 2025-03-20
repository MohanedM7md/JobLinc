import PostCard from "./PostCard";
import { useEffect, useState } from "react";
import { getFeed } from "../../services/api/postServices";
import { Post } from "interfaces/postInterfaces";

export default function PostContainer() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    const response = getFeed(10, controller.signal);
    response.then((data) => {
      setPosts(data);
    });

    return () => {
      controller.abort();
    };
  }, []);
  return (
    <div className="flex flex-wrap lg:w-5/12 md:w-8/12 sm:1/1 m-auto">
      {posts
        ? posts.map((post, i) => {
            const fixedPost = {
              postId: post.companyPost
                ? post.companyPost.postId
                : post.userPost.postId,
              posterId: post.companyPost
                ? post.companyPost.companyId
                : post.userPost.userId,
              name: post.companyPost
                ? post.companyPost.companyName
                : post.userPost.firstname + " " + post.userPost.lastname,
              profilePicture: post.companyPost
                ? post.companyPost.profilePicture
                : post.userPost.profilePicture,
              headline: post.companyPost
                ? post.companyPost.headline
                : post.userPost.headline,
              text: post.companyPost
                ? post.companyPost.text
                : post.userPost.text,
              time: post.companyPost
                ? post.companyPost.time
                : post.userPost.time,
              likes: post.companyPost
                ? post.companyPost.likes
                : post.userPost.likes,
              comments: post.companyPost
                ? post.companyPost.comments
                : post.userPost.comments,
              reposts: post.companyPost
                ? post.companyPost.reposts
                : post.userPost.reposts,
              media: post.companyPost
                ? post.companyPost.media
                : post.userPost.media,
            };
            return <PostCard key={`post ${i}`} post={fixedPost} />;
          })
        : null}
    </div>
  );
}
