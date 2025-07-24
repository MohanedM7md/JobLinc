import PostContainer from "../components/Posts/PostContainer";
export default function Home() {
  return (
    <div className="bg-warmWhite h-full min-h-dvh">
      <div className="flex flex-wrap lg:w-5/12 md:w-8/12 sm:1/1 m-auto bg-white">
        <PostContainer />
      </div>
    </div>
  );
}
