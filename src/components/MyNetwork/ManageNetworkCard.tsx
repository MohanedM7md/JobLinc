import { ConnectionInterface } from "interfaces/networkInterfaces";
import ManageNetworkIcons from "./ManageNetworkIcons";
import { useEffect, useState } from "react";
import { getUserConnections } from "@services/api/networkServices";
import store from "@store/store";



const ManageNetworkCard: React.FC = () => {
  const [userConnections, setUserConnections] = useState<ConnectionInterface[]>([]);
  const user = store.getState().user;
  const userId = user?.userId || null;
  
    useEffect(() => {
      const controller = new AbortController();
      const fetchData = async () => {
        try {
          if (userId) {
            const response = await getUserConnections(userId);
            console.log(response);
            const parsedConnections = Array.isArray(response)
              ? response.map((connection) => ({
                  ...connection,
                  connectedDate: new Date(connection.connectedDate),
                }))
              : [];
            setUserConnections(parsedConnections);
          } else {
            console.warn("User ID is null. Cannot fetch connections.");
          }
        } catch (error) {
          console.error("Error fetching network feed:", error);
        }
      };
      fetchData();
  
      return () => {
        controller.abort();
      };
    }, []);
  return (
    <div className="flex-col items-center bg-white lg:w-70 w-full ml-0 lg:ml-[5%] border rounded-md border-gray-200 shadow-sm mt-5">
      <p className="text-black p-4 w-full border-b-2 border-gray-200 font-semibold">
        Manage my network
      </p>
      <ManageNetworkIcons id="ConnectionsButton"Icon="fa-solid fa-user-group" IconName="Connections" Number={userConnections.length.toString()} />
      <ManageNetworkIcons id="FollowingandFollowersButton" Icon="fa-solid fa-user" IconName="Following & Followers" Number="" />
      <ManageNetworkIcons id="GroupsButton" Icon="fa-solid fa-people-group" IconName="Groups" Number="" />
      <ManageNetworkIcons id="EventsButton"Icon="fa-solid fa-calendar-days" IconName="Events" Number="" />
      <ManageNetworkIcons id="PagesButton"Icon="fa-solid fa-building" IconName="Pages" Number="" />
      <ManageNetworkIcons id="NewsletterButton"Icon="fa-solid fa-newspaper" IconName="Newsletters" Number="" />
    </div>
  );
};
export default ManageNetworkCard