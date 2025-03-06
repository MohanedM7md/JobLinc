import { TheNothingButton } from "../components/TheNothingButton";
import { GetNothing } from "../api/NothingFetch";
import useTheme from "../hooks/useTheme";
function Home() {
  const { darkMode, setDarkMode } = useTheme();
  GetNothing();
  return (
    <div className="h-full dark:bg-charcoalBlack">
      <h1>Welcome Home</h1>
      <TheNothingButton />
      <button
        className="  bg-darkBurgund cursor-pointery"
        onClick={() => {
          setDarkMode(!darkMode);
          console.log("themeSwitched");
        }}
      >
        ThemeModeToggler
      </button>
    </div>
  );
}

export default Home;
