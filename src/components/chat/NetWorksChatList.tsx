import { useEffect, useState, memo, useRef } from "react";
import NetworkCard from "./NetworkCard";
import { fetchNetWorks } from "@services/api/chatServices";
import { NetWorkCard } from "./interfaces/Chat.interfaces";

const NetWorksChatList = ({
  onCardClick,
  className,
  filter,
}: {
  onCardClick: (id: string, chatName: string, chatPicture: string) => void;
  className?: string;
  filter: string;
}) => {
  const [allUsers, setAllUsers] = useState<NetWorkCard[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<NetWorkCard[]>([]);
  const user = localStorage.getItem("userId");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) return;
        console.log("Fetching ConnectionList");
        const data = await fetchNetWorks(user);
        setAllUsers(data);
        setFilteredUsers(data); // Initialize filtered users with all users
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching chat data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    if (filter.trim() === "") {
      setFilteredUsers(allUsers);
    } else {
      const lowerCaseFilter = filter.toLowerCase();
      const filtered = allUsers.filter((user) =>
        user.chatName.toLowerCase().includes(lowerCaseFilter),
      );
      setFilteredUsers(filtered);
    }
  }, [filter, allUsers]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} overflow-auto`}>
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <NetworkCard
            key={user.userId}
            userId={user.userId}
            chatPicture={user.chatPicture}
            chatName={user.chatName}
            className="md:bg-charcoalWhite md:hover:bg-gray-200 bg-gray-100"
            onClick={() =>
              onCardClick(user.userId, user.chatName, user.chatPicture)
            }
          />
        ))
      ) : (
        <div className="text-gray-500 text-center mt-4 p-4">
          {filter && allUsers.length > 0 ? (
            <>
              <p className="font-medium">No matches found</p>
              <p className="text-sm mt-1">
                No connections match "{filter}" in your network
              </p>
            </>
          ) : (
            <>
              <p className="font-medium">No Connections Found</p>
              <p className="text-sm mt-1">
                You don't have any connections in your network yet
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(NetWorksChatList);
