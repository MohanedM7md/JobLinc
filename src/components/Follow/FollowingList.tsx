import FollowerCard from "./FollowerCard";
import { FollowInterface } from "@interfaces/networkInterfaces";
import { getMyFollowing } from "@services/api/networkServices";
import { useEffect, useState } from "react";

function FollowingList(){
    const [Following, setFollowing] = useState<FollowInterface[]>([]);
      useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
          try {
            const response = await getMyFollowing();
            // console.log("Connections of logged in user",response);
            //   const parsedConnections = Array.isArray(response)
            //   ? response.map((connection) => ({
            //     userId: connection.userId,
            //     profilePicture: connection.profilePicture,
            //     firstName: connection.firstname,
            //     lastName: connection.lastname,
            //     headline: connection.headline || "",
            //     connectedDate: new Date(connection.time),
            //   }))
            //   : [];
            //   setUserConnections(parsedConnections);
            const parsedConnections = Array.isArray(response) ? response : [];
            setFollowing(parsedConnections);
            console.log("My Folllowing",parsedConnections);
            } catch (error) {
              console.error("Error fetching My Following", error);
          }
        };
      
        fetchData();
      
        return () => {
          controller.abort();
        };
      }, []);
    return(
            <div className="w-full">
            {Following.map((follower, index) => (
              <FollowerCard key={index} {...follower} />
            ))}
          </div>
    )
}
export default FollowingList