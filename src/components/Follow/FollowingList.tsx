import FollowingCard from "./FollowingCard";
import { FollowInterface } from "@interfaces/networkInterfaces";
import { getMyFollowing } from "@services/api/networkServices";
import { useEffect, useState } from "react";

function FollowingList() {
  const [following, setFollowing] = useState<FollowInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await getMyFollowing();
        const parsedFollowing = Array.isArray(response)
          ? response.map((item) => ({
              companyId: item.companyId || null,
              companyName: item.companyName || null,
              companyLogo: item.companyLogo || null,
              userId: item.userId || null,
              profilePicture: item.profilePicture || null,
              firstname: item.firstname || null,
              lastname: item.lastname || null,
              headline: item.headline || "",
              time: new Date(item.time)
            }))
          : [];
        setFollowing(parsedFollowing);
      } catch (error) {
        console.error("Error fetching My Following", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="w-full">
      {loading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <div 
            key={index} 
            className="flex items-center p-4 border-b border-gray-200 animate-pulse"
          >
            <div className="w-12 h-12 rounded-full bg-gray-200"></div>
            <div className="ml-4 flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="flex gap-2 ml-4">
              <div className="w-20 h-8 bg-gray-200 rounded-full"></div>
              <div className="w-20 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        ))
      ) : following.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          You're not following any people or companies yet.
        </div>
      ) : (
      
        following.map((follower, index) => (
          <FollowingCard key={index} {...follower} />
        ))
      )}
    </div>
  );
}

export default FollowingList;