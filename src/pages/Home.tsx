import {TheNothingButton} from "../components/TheNothingButton"
import {GetNothing} from "../api/NothingFetch"
function Home() {
    GetNothing();
  return (
    <>
      <h1>Welcome Home</h1>
      <TheNothingButton/>
    </>
  );
}

export default Home;
