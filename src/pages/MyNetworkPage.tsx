import ConnectCard from "../components/MyNetwork/ConnectCard";
import ManageNetworkCard from "../components/MyNetwork/ManageNetworkCard";
import NavBar from "../components/NavBar";

function MyNetwork() {
  return (
    <>
      <NavBar></NavBar>
      <ConnectCard
        profilePicture="src\assets\Tyrone.jpg"
        userName="Tyrone"
        userBio="Barber"
      ></ConnectCard>
      <ManageNetworkCard></ManageNetworkCard>
    </>
  );
}
export default MyNetwork;
