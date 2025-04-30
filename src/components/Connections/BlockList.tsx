import BlockedUserCard from "../../components/Connections/BlockedUserCard";
import { BlockedUserInterface } from "@interfaces/networkInterfaces";
import { getBlockedUsers } from "@services/api/networkServices";
import { motion } from "framer-motion";
import { ChevronLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BlockList(){
    const [blockedUsers, setBlockedUsers] = useState<BlockedUserInterface[]>([]);
    const navigate = useNavigate();

    
      useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
          try {
            const response = await getBlockedUsers();
            console.log("Blocked list of logged in user",response);
              const parsedConnections = Array.isArray(response)
              ? response.map((connection) => ({
                userId: connection.userId,
                profilePicture: connection.profilePicture || "",
                firstname: connection.firstname,
                lastname: connection.lastname,
                connectionStatus: connection.connectionStatus || "Blocked",
                mutualConnections: connection.mutualConnections,
              }))
              : [];
            setBlockedUsers(parsedConnections);
            console.log("Parsed Blocked list of logged in user",parsedConnections);
            } catch (error) {
              console.error("Error fetching Blocked list:", error);
          }
        };
      
        fetchData();
      
        return () => {
          controller.abort();
        };
      }, []);
      const handleUnblockUser = (blockedUserId : string) =>
      {
        setBlockedUsers((prevBlocked) =>
          prevBlocked.filter((User) => User.userId !== blockedUserId)
        );
      }
    
    return(
      <div className="lg:w-6/10 border border-gray-200 rounded-md m-10 bg-white">
        <div className="w-full">
          {blockedUsers.length === 0 ? (
        <div className="bg-white rounded-xl flex flex-col gap-4 p-6">
            <motion.div 
                className="flex items-center w-[60px] hover:underline hover:cursor-pointer" 
                onClick={() => { navigate("/settings/visibility") }}
                whileHover={{ x: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <ChevronLeftIcon />
                <p>Back</p>
            </motion.div>
          <h3 className="text-lg font-semibold px-4 pt-4">Blocking</h3>
          <p className="text-gray-600 px-4 pb-4">You’re currently not blocking anyone.</p>
        </div>
        ) : (
        blockedUsers.map((user, index) => (
        <BlockedUserCard key={index} {...user} onRemove={handleUnblockUser}/>
        ))
        )}
      </div>
</div>
    )
}
export default BlockList;