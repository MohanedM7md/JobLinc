import { useState, useEffect } from "react";
import ConnectionsHeader from "./ConnectionsHeader";
import ConnectionCard from "./ConnectionCard";
import { ConnectionInterface } from "../../interfaces/networkInterfaces";
import { getUserConnections } from "@services/api/networkServices";
import { useAppDispatch } from "@store/hooks";
import store from "@store/store";

function ConnectionsListCard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recentlyadded");
  const [userConnections, setUserConnections] = useState<ConnectionInterface[]>([]);
  const dispatch = useAppDispatch();
  const user = store.getState().user;
  const userId = user?.userId || null;

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try { 
        if (userId) {
          const response = await (getUserConnections(userId));
        console.log("hena")
        console.log(response);
        
        const parsedConnections = Array.isArray(response)
          ? response.map((connection) => ({ 
              ...connection,
              connectedDate: new Date(connection.connectedDate),
            }))
          : [];
        setUserConnections(parsedConnections);
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

  const removeConnection = (connectionId: string) => {
    setUserConnections((prevConnections) =>
      prevConnections.filter((connection) => connection.id !== connectionId)
    );
  };

  const filteredConnections = userConnections.filter((connection) =>
    `${connection.firstName.toLowerCase()} ${connection.lastName.toLowerCase()}`.includes(
      searchTerm.toLowerCase()
    )
  );

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
    <div className="w-1/2 border border-gray-200 rounded-md m-10">
      <div className="grid grid-rows-auto w-full">
        <ConnectionsHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setSortBy={setSortBy}
        />
        {sortedConnections.map((connection, index) => (
          <ConnectionCard key={index} {...connection} onRemove={removeConnection} />
        ))}
      </div>
    </div>
  );
}

export default ConnectionsListCard;