import Metrics from "../components/Company/Metrics";
import useTheme from "../hooks/useTheme";


function PlayGround() {
  /*   const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUser()); // Load user data on mount
  }, [dispatch]); */

  const { darkMode, setDarkMode } = useTheme();
  //const [userId, _] = useState(window.prompt("Enter Chat ID:") || "1");
  return (
    <div className="h-full dark:bg-charcoalBlack">
      <h1>Welcome Home</h1>
      <button
        className="bg-darkBurgundy cursor-pointer"
        onClick={() => {
          setDarkMode(!darkMode);
        }}
      >
        ThemeModeToggler
      </button>
      <div>
        <h1>
          {/* wlecome <div className=" text-3xl inline">{user.name}</div>{" "} */}
        </h1>
      </div>
      {/* <UserProvider userId={userId}>
        <ChatProvider>
          <FloatingChatSystem />
        </ChatProvider>
      </UserProvider> */}
      <Metrics />

    </div>
  );
}

export default PlayGround;
