//import ConnectCard from "../components/MyNetwork/ConnectCard";
import ManageNetworkCard from "../components/MyNetwork/ManageNetworkCard";
import MyNetworkOptionsCard from "../components/MyNetwork/MyNetworkOptionsCard";
import NavBar from "../components/NavigationBar/NavBar";
import PendingInvitationsCard from "../components/MyNetwork/PendingInvitationsCard";
import ConnectionsGrid from "../components/MyNetwork/ConnectionsGrid";
import MeCard from "../components/NavigationBar/MeCard";
import Nav from "../components/NavigationBar/Nav";
function MyNetwork(){  
    return(
      <>
        <div className="grid sm:grid-cols-20 gap-5">
            <div className="sm:col-span-6 justify-items-end">
            <ManageNetworkCard></ManageNetworkCard>
            </div>
            <div className="sm:col-span-13">
                <div className="">  
                <MyNetworkOptionsCard></MyNetworkOptionsCard>
                </div>  
                <div className="mt-5">
                <PendingInvitationsCard/>
                </div>
                <div className="mt-5">
                  <ConnectionsGrid></ConnectionsGrid>
                </div>
            </div>
        </div>
        </>
    );
}
export default MyNetwork