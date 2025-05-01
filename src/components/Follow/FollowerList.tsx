import FollowerCard from "./FollowerCard";
import { FollowInterface } from "@interfaces/networkInterfaces";
import { getMyFollowers } from "@services/api/networkServices";
import { useEffect, useState } from "react";

function FollowerList() {
  const [followers, setFollowers] = useState<FollowInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await getMyFollowers();
        const parsedFollowers = Array.isArray(response)
          ? response.map((follower) => ({
              companyId: follower.companyId || null,
              companyName: follower.companyName || null,
              companyLogo: follower.companyLogo || null,
              userId: follower.userId || null,
              profilePicture: follower.profilePicture || null,
              firstname: follower.firstname || null,
              lastname: follower.lastname || null,
              headline: follower.headline || "",
              time: new Date(follower.time)
            }))
          : [];
        setFollowers(parsedFollowers);
      } catch (error) {
        console.error("Error fetching My Followers", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  const handleRemoveFollower = (id: string) => {
    setFollowers(followers.filter(follower => 
      follower.userId !== id && follower.companyId !== id
    ));
  };

  return (
    <div className="w-full">
      {loading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center p-4 border-b border-gray-200 animate-pulse">
            <div className="w-12 h-12 rounded-full bg-gray-200"></div>
            <div className="ml-4 flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="flex gap-2 ml-4">
              <div className="w-20 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        ))
      ) : followers.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          You don't have any followers yet
        </div>
      ) : (
        followers.map((follower, index) => (
          <FollowerCard 
            key={index} 
            {...follower} 
            onRemove={handleRemoveFollower}
          />
        ))
      )}
    </div>
  );
}

export default FollowerList;