import FollowerCard from "./FollowerCard";
import { FollowInterface } from "@interfaces/networkInterfaces";
import { getMyFollowers } from "@services/api/networkServices";
import { useEffect, useState } from "react";

function FollowerList(){

    const [Followers, setFollowers] = useState<FollowInterface[]>([]);
    
      useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
          try {
            const response = await getMyFollowers();
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
            setFollowers(parsedConnections);
            console.log("My Folllowers",parsedConnections);
            } catch (error) {
              console.error("Error fetching My Followers", error);
          }
        };
      
        fetchData();
      
        return () => {
          controller.abort();
        };
      }, []);
      const handleRemoveFollower = (id: string) => {
        setFollowers(Followers.filter(follower => follower.userId !== id && follower.companyId !== id));
      };    
    return(
          <div className="w-full">
            {Followers.map((follower, index) => (
              <FollowerCard key={index} {...follower} onRemove={handleRemoveFollower}/>
            ))}
          </div>
    )
}
export default FollowerList