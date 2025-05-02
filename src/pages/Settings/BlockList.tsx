import BlockedUserCard from "../../components/Connections/BlockedUserCard";
import { BlockedUserInterface } from "@interfaces/networkInterfaces";
import { getBlockedUsers } from "@services/api/networkServices";
import { motion } from "framer-motion";
import { ChevronLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SkeletonUserCard = () => (
  <div className="animate-pulse flex items-center justify-between p-4 bg-white">
    <div className="flex items-center space-x-4 flex-1">
      <div className="w-12 h-12 rounded-full bg-gray-200" />
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
    <div className="h-10 w-24 bg-gray-200 rounded-md" />
  </div>
);

function BlockList() {
  const [blockedUsers, setBlockedUsers] = useState<BlockedUserInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await getBlockedUsers();
        if (isMounted) {
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
        }
      } catch (error) {
        console.error("Error fetching Blocked list:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handleUnblockUser = (blockedUserId: string) => {
    setBlockedUsers((prevBlocked) =>
      prevBlocked.filter((User) => User.userId !== blockedUserId)
    );
  };

  return (
    <div className="lg:w-6/10 border border-gray-200 rounded-md m-10 bg-white">
      <div className="w-full">
        <div className="bg-white rounded-xl flex flex-col gap-4 p-6">
          <motion.div
            className="flex items-center w-[60px] hover:underline hover:cursor-pointer"
            onClick={() => navigate("/settings/visibility")}
            whileHover={{ x: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ChevronLeftIcon />
            <p>Back</p>
          </motion.div>
          <h3 className="text-lg font-semibold px-4 pt-4">Blocking</h3>
          
          {isLoading ? (
            [...Array(3)].map((_, index) => <SkeletonUserCard key={index} />)
          ) : blockedUsers.length === 0 ? (
            <p className="text-gray-600 px-4 pb-4">
              You’re currently not blocking anyone.
            </p>
          ) : (
            blockedUsers.map((user, index) => (
              <BlockedUserCard
                key={index}
                {...user}
                onRemove={handleUnblockUser}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default BlockList;