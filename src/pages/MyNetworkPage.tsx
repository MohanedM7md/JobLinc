import ConnectCard from "../components/ConnectCard";
import ManageNetworkCard from "../components/ManageNetworkCard";
import MyNetworkOptionsCard from "../components/MyNetworkOptionsCard";
import NavBar from "../components/NavBar";

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