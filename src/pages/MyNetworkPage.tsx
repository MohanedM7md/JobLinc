import ConnectCard from "../components/ConnectCard";
import ManageNetworkCard from "../components/ManageNetworkCard";
import NavBar from "../components/NavBar";

function MyNetwork(){
    return(
        <div className="w-full h-full">
            <div>
            <NavBar></NavBar>
            </div>
            <div></div>
                <ManageNetworkCard></ManageNetworkCard> 
                <ConnectCard
                lincbuttonid="LincButton"
                profilePicture="src\assets\Tyrone.jpg" 
                userName="Tyrone" 
                userBio="Junior plumbing student @ waterloo university" 
                Mutuals="Abdelrahman Fathy and 3 others are mutual connections"></ConnectCard>
        </div>
    );
}
export default MyNetwork