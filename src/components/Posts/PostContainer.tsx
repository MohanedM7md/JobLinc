import Post from "./PostCard";
import { useState } from "react";

interface PostContent {
  isLiked: boolean;
}

interface ProfileContent {
  isLincing: boolean;
}

interface PostProps {
  postContent: PostContent;
  profileContent: ProfileContent;
}

export default function PostContainer() {
  const [posts, setPosts] = useState<PostProps[]>([
    {
      postContent: {
        isLiked: false,
      },
      profileContent: {
        isLincing: false,
      },
    },
  ]);

  return (
    <div className="flex flex-wrap lg:w-5/12 md:w-8/12 sm:1/1 m-auto">
      {posts.map((post, i) => {
        return (
          <Post
            key={i}
            id={i}
            post={post.postContent}
            profile={post.profileContent}
            onDelete={() => deletePost(i)}
          />
        );
      })}
    </div>
  );

  function editPost(index: number, newText: string) {
  }

  function deletePost(index: number) {
    //const response = await axios.delete(`/post/${index}/delete`);
    //A warning should be added before deletion, if accepted then delete
  }
}
