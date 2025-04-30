import { useEffect, useState} from "react";
import { ConnectionInterface } from "../../interfaces/networkInterfaces";
import { getMutualConnections } from "@services/api/networkServices";
import { useParams } from "react-router-dom";
import MutualConnectionCard from "./MutualConnectionCard";

function MutualConnectionListCard() {
    const [mutualConnections, setMutualConnections] = useState<ConnectionInterface[]>([]);
    const { userId } = useParams();

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        if (!userId) {
          console.error("User ID is undefined");
          return;
        }
        const response = await getMutualConnections(userId);
        console.log("Mutual Connections:",response,"we are seeing the Mutual connections of:", userId);
          const parsedConnections = Array.isArray(response)
          ? response.map((connection) => ({
            userId: connection.userId,
            profilePicture: connection.profilePicture,
            firstname: connection.firstname,
            lastname: connection.lastname,
            headline: connection.headline || "",
            city: connection.city || "",
            country: connection.country || "",
            mutualConnections: connection.mutualConnections,
            connectionStatus: connection.connectionStatus,
          }))
          : [];
          setMutualConnections(parsedConnections);
          console.log("Mutual Connections:",response,"we are seeing the Mutual connections of:", userId);
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
        <div className=" lg:w-6/10 border border-gray-200 rounded-md m-10 bg-white">
          <div className="w-full">
            {mutualConnections.map((connection, index) => (
              <MutualConnectionCard key={index} {...connection} />
            ))}
          </div>
        </div>
    );
}
export default MutualConnectionListCard;