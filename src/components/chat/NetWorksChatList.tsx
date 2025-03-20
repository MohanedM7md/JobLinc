import React, { useEffect, useState, memo } from "react";
import NetworkCard from "./NetworkCard";
import { fetchChats } from "../../services/api/chatServices";
import { useUser } from "./mockUse";
import { NetWorkCard } from "./interfaces/Chat.interfaces";

const NetWorksChatList = ({
  onCardClick,
  className,
}: {
  onCardClick: (id: string) => void;
  className?: string;
}) => {
  const [users, setUsers] = useState<NetWorkCard[]>([]);
  const { user } = useUser();

  console.log(
    "----------------NetWorksChatList---------------- for userID: ",
    user,
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) return;
        const data = await fetchChats(user);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };
    fetchData();
  }, [user]);
  return (
    <div className={`mt-4 ${className}`}>
      {users.length > 0 ? (
        users.map((user) => (
          <NetworkCard
            key={user.userId}
            userId={user.userId}
            chatPicture={user.chatPicture}
            chatName={user.chatName}
            onClick={() => onCardClick(user.userId)}
          />
        ))
      ) : (
        <div className="text-gray-500 text-center mt-4">No NetWorks found</div>
      )}
    </div>
  );
};

export default memo(NetWorksChatList);
