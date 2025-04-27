import { useEffect, useState} from "react";
import UserConnectionCard from "./UserConnectionCard";
import { ConnectionInterface } from "../../interfaces/networkInterfaces";
import { getUserConnections } from "@services/api/networkServices";
import { useParams } from "react-router-dom";
import UserConnectionsHeader from "./UserConnectionsHeader";

function UserConnectionListCard() {
    const [userConnections, setUserConnections] = useState<ConnectionInterface[]>([]);
    const { userId } = useParams();
    const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        if (!userId) {
          console.error("User ID is undefined");
          return;
        }
        const response = await getUserConnections(userId);
        console.log("User Connections:",response,"we are seeing the connections of:", userId);
          // const parsedConnections = Array.isArray(response)
          // ? response.map((connection) => ({
          //   userId: connection.userId,
          //   profilePicture: connection.profilePicture,
          //   firstName: connection.firstname,
          //   lastName: connection.lastname,
          //   headline: connection.headline || "",
          //   city: connection.city || "",
          //   country: connection.country || "",
          //   mutualConnections: connection.mutualConnections,
          //   connectionStatus: connection.connectionStatus,
          // }))
          // : [];
          // setUserConnections(parsedConnections);
          const parsedConnections = Array.isArray(response) ? response : [];
          setUserConnections(parsedConnections);
          console.log("User Connections:",response,"we are seeing the connections of:", userId);
        } catch (error) {
          console.error("Error fetching network feed:", error);
      }
    };
  
    fetchData();
  
    return () => {
      controller.abort();
    };
  }, []);

    const filteredConnections = userConnections.filter((connection) => {
    const firstName = connection.firstName || "";
    const lastName = connection.lastName || "";
    return `${firstName.toLowerCase()} ${lastName.toLowerCase()}`.includes(
      searchTerm.toLowerCase()
    );
  });
    return (
        <div className=" lg:w-6/10 border border-gray-200 rounded-md m-10 bg-white">
            <div className="w-full">
            <UserConnectionsHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} ></UserConnectionsHeader>
            </div>
          <div className="w-full">
            {filteredConnections.map((connection, index) => (
              <UserConnectionCard key={index} {...connection} />
            ))}
          </div>
        </div>
    );
}
export default UserConnectionListCard;