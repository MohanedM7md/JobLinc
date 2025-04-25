import { useState, useEffect } from "react";
import ConnectionsHeader from "./ConnectionsHeader";
import ConnectionCard from "./ConnectionCard";
import { ConnectionInterface } from "../../interfaces/networkInterfaces";
import { getConnections } from "@services/api/networkServices";

function ConnectionsListCard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recentlyadded");
  const [userConnections, setUserConnections] = useState<ConnectionInterface[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await getConnections();
        console.log("hena");
        console.log(response);
          
          const parsedConnections = Array.isArray(response)
          ? response.map((connection) => ({
            userId: connection.userId,
            profileImage: connection.profilePicture,
            firstName: connection.firstname,
            lastName: connection.lastname,
            headline: connection.headline || "",
            connectedDate: new Date(connection.time),
          }))
          : [];
          setUserConnections(parsedConnections);
          // const parsedConnections = Array.isArray(response)
          // ? response.map((connection) => ({
          //     ...connection,
          //     connectedDate: connection.connectedDate 
          //       ? new Date(connection.connectedDate)
          //       : null, 
          //   }))
          // : [];
          // setUserConnections(parsedConnections);
          console.log(userConnections);
        } catch (error) {
          console.error("Error fetching network feed:", error);
      }
    };
  
    fetchData();
  
    return () => {
      controller.abort();
    };
  }, []);

  // useEffect(() => {
  //   console.log("Updated userConnections:", userConnections);
  // }, [userConnections]);

  const removeConnection = (connectionId: string) => {
    setUserConnections((prevConnections) =>
      prevConnections.filter((connection) => connection.userId !== connectionId)
    );
  };

const filteredConnections = userConnections.filter((connection) => {
  const firstName = connection.firstName || "";
  const lastName = connection.lastName || "";
  return `${firstName.toLowerCase()} ${lastName.toLowerCase()}`.includes(
    searchTerm.toLowerCase()
  );
});

  const sortedConnections = [...filteredConnections].sort((a, b) => {
    if (sortBy === "firstname") {
      return a.firstName.localeCompare(b.firstName);
    } else if (sortBy === "lastname") {
      return b.lastName.localeCompare(a.lastName);
    } else if (sortBy === "recentlyadded") {
      return b.connectedDate.getTime() - a.connectedDate.getTime();
    }
    return 0;
  });

  return (
    <div className=" lg:w-6/10 border border-gray-200 rounded-md m-10 bg-white">
      <div className="w-full">
        <ConnectionsHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setSortBy={setSortBy}
        />
      </div>
      <div className="w-full">
        {sortedConnections.map((connection, index) => (
          <ConnectionCard key={index} {...connection} onRemove={removeConnection} />
        ))}
      </div>
    </div>
  );
}

export default ConnectionsListCard;