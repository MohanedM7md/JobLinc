import ConnectCard from "../components/MyNetwork/ConnectCard";
import ManageNetworkCard from "../components/MyNetwork/ManageNetworkCard";
import MyNetworkOptionsCard from "../components/MyNetwork/MyNetworkOptionsCard";
import NavBar from "../components/NavigationBar/NavBar";

function MyNetwork(){
    return(
        <div className="">
            <div className="">
            <NavBar></NavBar>
            <MyNetworkOptionsCard></MyNetworkOptionsCard>
            </div>
            <div className="flex flex-row">
                <ManageNetworkCard></ManageNetworkCard> 
                <ConnectCard
                lincbuttonid="LincButton"
                profilePicture="src\assets\Tyrone.jpg" 
                userName="Tyrone" 
                userBio="Junior plumbing student @ waterloo university" 
                Mutuals="Abdelrahman Fathy and 3 others are mutual connections"></ConnectCard>
            </div>
        </div>
    );
}
export default MyNetwork