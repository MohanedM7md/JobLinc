import { ConnectionInterface } from "interfaces/networkInterfaces";
import ManageNetworkIcons from "./ManageNetworkIcons";
import { useEffect, useState } from "react";
import { getConnections } from "@services/api/networkServices";

const ManageNetworkCard: React.FC = () => {
  const [userConnections, setUserConnections] = useState<ConnectionInterface[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await getConnections();
        const parsedConnections = Array.isArray(response)
          ? response.map((connection) => ({
              ...connection,
              connectedDate: new Date(connection.connectedDate),
            }))
          : [];
        setUserConnections(parsedConnections);
      } catch (error) {
        console.error("Error fetching network feed:", error);
      } finally {
        setLoading(false);
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
      <ManageNetworkIcons 
        id="ConnectionsButton"
        Icon="fa-solid fa-user-group" 
        IconName="Connections" 
        Number={loading ? "" : userConnections.length.toString()} 
        link="/my-connections"
      />
      <ManageNetworkIcons 
        id="FollowingandFollowersButton" 
        Icon="fa-solid fa-user" 
        IconName="Following & Followers" 
        Number="" 
        link="/followers-following"
      />
      <ManageNetworkIcons 
        id="GroupsButton" 
        Icon="fa-solid fa-people-group" 
        IconName="Groups" 
        Number="" 
      />
      <ManageNetworkIcons 
        id="EventsButton"
        Icon="fa-solid fa-calendar-days" 
        IconName="Events" 
        Number="" 
      />
      <ManageNetworkIcons 
        id="PagesButton"
        Icon="fa-solid fa-building" 
        IconName="Pages" 
        Number="" 
      />
      <ManageNetworkIcons 
        id="NewsletterButton"
        Icon="fa-solid fa-newspaper" 
        IconName="Newsletters" 
        Number="" 
      />
    </div>
  );
};

export default ManageNetworkCard;