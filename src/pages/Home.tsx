import { useEffect } from "react";
import PostContainer from "../components/Posts/PostContainer";

export default function Home() {
  useEffect(() => {
    const profilePicture = JSON.parse(localStorage.getItem("profilePicture") || "null");
    if (profilePicture) {
      console.log(profilePicture);
    }
    else {
      console.log("doesn't exist");
    }
  }, [])
  return (
    <div className="bg-lightGray">
      <div className="flex flex-wrap lg:w-5/12 md:w-8/12 sm:1/1 m-auto bg-white">
        <PostContainer />
      </div>
    </div>
  );  
}

