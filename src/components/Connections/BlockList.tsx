import BlockedUserCard from "../../components/Connections/BlockedUserCard";
import { BlockedUserInterface } from "@interfaces/networkInterfaces";
import { getBlockedUsers } from "@services/api/networkServices";
import { useEffect, useState } from "react";

function Blocklist(){
    const [blockedUsers, setBlockedUsers] = useState<BlockedUserInterface[]>([]);
    
      useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
          try {
            const response = await getBlockedUsers();
            console.log("Blocked list of logged in user",response);
              // const parsedConnections = Array.isArray(response)
              // ? response.map((connection) => ({
              //   userId: connection.userId,
              //   profilePicture: connection.profilePicture || "",
              //   firstName: connection.firstname,
              //   lastName: connection.lastname,
              //   connectionStatus: connection.connectionStatus || "blocked",
              //   mutualConnections: connection.mutualConnections,
              // }))
              // : [];
              // setBlockedUsers(parsedConnections);
            const parsedConnections = Array.isArray(response) ? response : [];
            setBlockedUsers(parsedConnections);
              console.log("parsed connections of logged in user",blockedUsers);
            } catch (error) {
              console.error("Error fetching network feed:", error);
          }
        };
      
        fetchData();
      
        return () => {
          controller.abort();
        };
      }, []);
    
    return(
    <div className=" lg:w-6/10 border border-gray-200 rounded-md m-10 bg-white">
      <div className="w-full">
        {blockedUsers.map((user, index) => (
          <BlockedUserCard key={index} {...user}/>
        ))}
      </div>
    </div>
    )
}
export default Blocklist;