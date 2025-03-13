import Post from "./PostCard";
import { useState } from "react";

interface PostContent {
  text: string;
  isLiked: boolean;
  pics: string[];
}

interface ProfileContent {
  img: string;
  name: string;
  title: string;
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
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin efficitur odio, vitae mollis libero dignissim nec. Maecenas lacinia velit ac lobortis finibus. Vestibulum facilisis fermentum dui in suscipit. Etiam mollis sapien sapien, ac efficitur mauris rutrum a. Duis vel vehicula est. Nullam imperdiet at ante a fringilla. Nunc sed nunc semper, mattis lectus nec, aliquam magna. Maecenas quis molestie mi. Praesent tempor turpis sit amet ipsum molestie maximus et vel lacus. Donec nec quam et turpis dapibus viverra. Nulla vehicula aliquet dictum. Aenean tristique tortor et est rutrum faucibus. Quisque eu erat a nunc pellentesque ultrices non non est. Pellentesque vulputate sit amet dui bibendum vehicula. Sed ut risus id ante facilisis faucibus.",
        isLiked: false,
        pics: ["https://d.newsweek.com/en/full/940601/05-23-galaxy.jpg"],
      },
      profileContent: {
        img: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
        name: "Tyrone",
        title:
          "Professional Goodman with a Phd in macrotasking interactive bullshittery",
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
    const newPosts = [...posts];
    newPosts[index].postContent.text = newText;
    setPosts(newPosts);
  }

  function deletePost(index: number) {
    //const response = await axios.delete(`/post/${index}/delete`);
    //A warning should be added before deletion, if accepted then delete
    setPosts(posts.filter((removedPost) => removedPost !== posts[index]));
  }
}
