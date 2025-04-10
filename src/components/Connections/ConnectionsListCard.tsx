import { useState } from "react";
import ConnectionsHeader from "./ConnectionsHeader";
import ConnectionCard from "./ConnectionCard";
import { ConnectionCardProps } from "../../interfaces/networkInterfaces";

function ConnectionsListCard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recentlyadded");

  const connections: ConnectionCardProps[] = [
    {
      profileImage: "src/assets/Tyrone.jpg",
      firstName: "Ahmed",
      lastName: "Hassan",
      userBio: "Plumber",
      connectedDate: "Connected today",
    },
    {
      profileImage: "src/assets/Tyrone.jpg",
      firstName: "Sarah",
      lastName: "Smith",
      userBio: "Graphic Designer",
      connectedDate: "Connected 2 days ago",
    },
    {
      profileImage: "src/assets/Tyrone.jpg",
      firstName: "John",
      lastName: "Doe",
      userBio: "Software Engineer",
      connectedDate: "Connected last week",
    },
    {
      profileImage: "src/assets/Tyrone.jpg",
      firstName: "Sarah",
      lastName: "Smith",
      userBio: "Graphic Designer",
      connectedDate: "Connected 2 days ago",
    },
    {
      profileImage: "src/assets/Tyrone.jpg",
      firstName: "John",
      lastName: "Doe",
      userBio: "Software Engineer",
      connectedDate: "Connected last week",
    },
    {
      profileImage: "src/assets/Tyrone.jpg",
      firstName: "Sarah",
      lastName: "Smith",
      userBio: "Graphic Designer",
      connectedDate: "Connected 2 days ago",
    },
    {
      profileImage: "src/assets/Tyrone.jpg",
      firstName: "John",
      lastName: "Doe",
      userBio: "Software Engineer",
      connectedDate: "Connected last week",
    },
  ];

  
  const filteredConnections = connections.filter((connection) =>
    `${connection.firstName.toLowerCase()} ${connection.lastName.toLowerCase()}`.includes(searchTerm.toLowerCase())
  );
  
  const sortedConnections = [...filteredConnections].sort((a, b) => {
    if (sortBy === "firstname") {
      return a.firstName.localeCompare(b.firstName);
    } else if (sortBy === "lastname") {
      return a.lastName.localeCompare(b.lastName);
    }
    return 0;
  });

  return (
    <div className="w-1/2 border border-gray-200 rounded-md m-10">
      <div className="grid grid-rows-auto">
        
        <ConnectionsHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setSortBy={setSortBy}
        />
        
        {sortedConnections.map((connection, index) => (
          <ConnectionCard key={index} {...connection} />
        ))}
      </div>
    </div>
  );
}

export default ConnectionsListCard;