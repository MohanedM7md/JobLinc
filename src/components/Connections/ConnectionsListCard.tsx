import { useState, useEffect } from "react";
import ConnectionsHeader from "./ConnectionsHeader";
import ConnectionCard from "./ConnectionCard";
import { ConnectionInterface } from "../../interfaces/networkInterfaces";
import { getConnections } from "@services/api/networkServices";

function ConnectionsListCard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recentlyadded");
  const [userConnections, setUserConnections] = useState<ConnectionInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getConnections();
        const parsedConnections = Array.isArray(response)
          ? response.map((connection) => ({
              userId: connection.userId,
              profilePicture: connection.profilePicture,
              firstname: connection.firstname,
              lastname: connection.lastname,
              headline: connection.headline || "",
              time: new Date(connection.time),
            }))
          : [];
        setUserConnections(parsedConnections);
      } catch (error) {
        console.error("Error fetching network feed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  const removeConnection = (connectionId: string) => {
    setUserConnections((prevConnections) =>
      prevConnections.filter((connection) => connection.userId !== connectionId)
    );
  };

  const filteredConnections = userConnections.filter((connection) => {
    const firstName = connection.firstname || "";
    const lastName = connection.lastname || "";
    return `${firstName.toLowerCase()} ${lastName.toLowerCase()}`.includes(
      searchTerm.toLowerCase()
    );
  });

  const sortedConnections = [...filteredConnections].sort((a, b) => {
    if (sortBy === "firstname") {
      return a.firstname.localeCompare(b.firstname);
    } else if (sortBy === "lastname") {
      return b.lastname.localeCompare(a.lastname);
    } else if (sortBy === "recentlyadded") {
      return (b.time?.getTime() || 0) - (a.time?.getTime() || 0);
    }
    return 0;
  });

  return (
    <div className="lg:w-6/10 border border-gray-200 rounded-md m-10 bg-white">
      <div className="w-full">
        <ConnectionsHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setSortBy={setSortBy}
        />
      </div>
      <div className="w-full">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center p-4 border-b border-gray-200">
              <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
              <div className="ml-4 flex-grow space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-8 w-10 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))
        ) : (
          sortedConnections.map((connection, index) => (
            <ConnectionCard key={index} {...connection} onRemove={removeConnection} />
          ))
        )}
      </div>
    </div>
  );
}

export default ConnectionsListCard;