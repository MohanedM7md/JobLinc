import ConnectCard from "../components/MyNetwork/ConnectCard";
import ManageNetworkCard from "../components/MyNetwork/ManageNetworkCard";
import NavBar from "../components/NavBar";
import Nav from "../components/NavigationBar/Nav";

function MyNetwork() {
  return (
    <>
      <NavBar></NavBar>
      <ConnectCard
        profilePicture="src\assets\Tyrone.jpg"
        userName="Tyrone"
        headline="Barber"
      ></ConnectCard>
      <ManageNetworkCard></ManageNetworkCard>
    </>
  );
}
export default MyNetwork;
