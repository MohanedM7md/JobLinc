import { useEffect } from "react";
import PostContainer from "../components/Posts/PostContainer";
import { useDispatch } from "react-redux";
import { getUserDetails } from "@store/user/userThunks";
import { AppDispatch } from "@store/store";

export default function Home() {
  //const dispatch = useDispatch<AppDispatch>();
  // useEffect(() => {
  //   dispatch(getUserDetails());
  // }, []);
  return (
    <div className="bg-lightGray">
      <div className="flex flex-wrap lg:w-5/12 md:w-8/12 sm:1/1 m-auto bg-white">
        <PostContainer />
      </div>
    </div>
  );
}
