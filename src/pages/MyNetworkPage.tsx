//import ConnectCard from "../components/MyNetwork/ConnectCard";
import ManageNetworkCard from "../components/MyNetwork/ManageNetworkCard";
import MyNetworkOptionsCard from "../components/MyNetwork/MyNetworkOptionsCard";
import NavBar from "../components/NavigationBar/NavBar";
import PendingInvitationsCard from "../components/MyNetwork/PendingInvitationsCard";
import ConnectionsGrid from "../components/MyNetwork/ConnectionsGrid";

function MyNetwork(){
    const mockInvitations = [
        {
          profilePicture: "src/assets/Tyrone.jpg",
          userName: "Ben allen",
          userBio: "Frontend Developer at Tech Inc.",
          Mutuals: "5 mutual connections",
          ignoreButtonid: "ignore-1",
          acceptButtonid: "accept-1",
        },
        {
          profilePicture: "src/assets/Tyrone.jpg",
          userName: "Abdelrahman Sakr",
          userBio: "UI/UX Designer at Design Studio",
          Mutuals: "2 mutual connections",
          ignoreButtonid: "ignore-2",
          acceptButtonid: "accept-2",
        },
        {
            profilePicture: "src/assets/Tyrone.jpg",
            userName: "Abdelrahman Fathy",
            userBio: "Mobile Developer at Monster Inc.",
            Mutuals: "2 mutual connections",
            ignoreButtonid: "ignore-3",
            acceptButtonid: "accept-3",
          },
      ];
    return(
      <>
            <NavBar></NavBar>
      <div className="grid sm:grid-cols-20 gap-5">
            <div className="sm:col-span-6 justify-items-end">
            <ManageNetworkCard></ManageNetworkCard> 
            </div>
            <div className="sm:col-span-13">
                <div className="">  
                <MyNetworkOptionsCard></MyNetworkOptionsCard>
                </div>  
                <div className="mt-5">
                <PendingInvitationsCard
                manageButtonid="manage-1"
                invitations={mockInvitations}
                />
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