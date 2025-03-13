import { TheNothingButton } from "../components/TheNothingButton";
import { GetNothing } from "../api/NothingFetch";
import useTheme from "../hooks/useTheme";
import PostContainer from "../components/Posts/PostContainer";
import PostCreate from "../components/Posts/PostCreate";
function Home() {
  const { darkMode, setDarkMode } = useTheme();
  GetNothing();
  return (
    <div className="h-full dark:bg-charcoalBlack">
      <h1>Welcome Home</h1>
      <TheNothingButton />
      <button
        className="bg-darkBurgundy cursor-pointer"
        onClick={() => {
          setDarkMode(!darkMode);
          console.log("themeSwitched");
        }}
      >
        ThemeModeToggler
      </button>
      <PostContainer></PostContainer>
    </div>
  );
  //return (
  //  <PostCreate />
  //)
}

export default Home;
