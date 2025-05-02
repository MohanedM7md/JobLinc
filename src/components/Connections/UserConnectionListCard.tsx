import { useEffect, useState } from "react";
import UserConnectionCard from "./UserConnectionCard";
import { ConnectionInterface } from "../../interfaces/networkInterfaces";
import { getUserConnections } from "@services/api/networkServices";
import { useParams } from "react-router-dom";
import UserConnectionsHeader from "./UserConnectionsHeader";

const SkeletonUserConnectionCard = () => (
  <div className="animate-pulse flex items-center p-4 border-b border-gray-200">
    <div className="w-12 h-12 rounded-full bg-gray-200" />
    <div className="ml-4 flex-grow space-y-2">
      <div className="h-4 w-32 bg-gray-200 rounded" />
      <div className="h-4 w-48 bg-gray-200 rounded" />
      <div className="h-3 w-24 bg-gray-200 rounded" />
    </div>
    <div className="h-8 w-24 bg-gray-200 rounded-full" />
  </div>
);

function UserConnectionListCard() {
  const [userConnections, setUserConnections] = useState<ConnectionInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (!userId) {
          console.error("User ID is undefined");
          return;
        }
        const response = await getUserConnections(userId);
        
        if (isMounted) {
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
          setUserConnections(parsedConnections);
        }
      } catch (error) {
        console.error("Error fetching User Connections", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [userId]); // Added userId to dependency array

  const filteredConnections = userConnections.filter((connection) => {
    const firstName = connection.firstname || "";
    const lastName = connection.lastname || "";
    return `${firstName.toLowerCase()} ${lastName.toLowerCase()}`.includes(
      searchTerm.toLowerCase()
    );
  });

  return (
    <div className="lg:w-6/10 border border-gray-200 rounded-md m-10 bg-white">
      <div className="w-full">
        <UserConnectionsHeader 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
      </div>
      <div className="w-full">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <SkeletonUserConnectionCard key={index} />
          ))
        ) : userConnections.length === 0 ? (
          <div className="p-6 text-gray-600 text-center">
            No connections found.
          </div>
        ) : filteredConnections.length === 0 ? (
          <div className="p-6 text-gray-600 text-center">
            No connections match your search criteria.
          </div>
        ) : (
          filteredConnections.map((connection, index) => (
            <UserConnectionCard key={index} {...connection} />
          ))
        )}
      </div>
    </div>
  );
}

export default UserConnectionListCard;