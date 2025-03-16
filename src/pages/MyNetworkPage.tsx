import ConnectCard from "../components/MyNetwork/ConnectCard";
import ManageNetworkCard from "../components/MyNetwork/ManageNetworkCard";
import MyNetworkOptionsCard from "../components/MyNetwork/MyNetworkOptionsCard";
import NavBar from "../components/NavigationBar/NavBar";
import PendingInvitationsCard from "../components/MyNetwork/PendingInvitationsCard";

function MyNetwork(){
    const mockInvitations = [
        {
          profilePicture: "src/assets/Tyrone.jpg",
          userName: "Ben Dover",
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
        <div className="">
            <div className="">
            <NavBar></NavBar>
            <MyNetworkOptionsCard></MyNetworkOptionsCard>
            <PendingInvitationsCard
            manageButtonid="manage-1"
            invitations={mockInvitations}
            />
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