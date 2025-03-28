import ManageNetworkIcons from "./ManageNetworkIcons";


const ManageNetworkCard: React.FC = () => {
  return (
    <div className="flex-col items-center bg-white lg:w-70 w-full ml-0 lg:ml-[5%] border rounded-md border-gray-200 shadow-sm mt-5">
      <p className="text-black p-4 w-full border-b-2 border-gray-200 font-semibold">
        Manage my network
      </p>
      <ManageNetworkIcons id="ConnectionsButton"Icon="fa-solid fa-user-group" IconName="Connections" Number="69" />
      <ManageNetworkIcons id="FollowingandFollowersButton" Icon="fa-solid fa-user" IconName="Following & Followers" Number="" />
      <ManageNetworkIcons id="GroupsButton" Icon="fa-solid fa-people-group" IconName="Groups" Number="" />
      <ManageNetworkIcons id="EventsButton"Icon="fa-solid fa-calendar-days" IconName="Events" Number="" />
      <ManageNetworkIcons id="PagesButton"Icon="fa-solid fa-building" IconName="Pages" Number="69" />
      <ManageNetworkIcons id="NewsletterButton"Icon="fa-solid fa-newspaper" IconName="Newsletters" Number="" />
    </div>
  );
};
export default ManageNetworkCard