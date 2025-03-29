import { useEffect, useState, memo } from "react";
import NetworkCard from "./NetworkCard";
import { fetchNetWorks } from "@services/api/chatServices";
import { useUser } from "./mockUse";
import { NetWorkCard } from "./interfaces/Chat.interfaces";

const NetWorksChatList = ({
  onCardClick,
  className,
}: {
  onCardClick: (id: string, chatName: string, chatPicture: string) => void;
  className?: string;
}) => {
  const [users, setUsers] = useState<NetWorkCard[]>([]);
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  console.log(
    "----------------NetWorksChatList---------------- for userID: ",
    user,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) return;
        const data = await fetchNetWorks(user);
        setUsers(data);
        setIsLoading(false);
        console.log(users);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };
    fetchData();
  }, [user]);
  if (isLoading) return null;
  return (
    <div className={`${className} overflow-auto`}>
      {users.length != 0 ? (
        users.map((user) => (
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
        <div className="text-gray-500 text-center mt-4">No chats found</div>
      )}
    </div>
  );
};

export default memo(NetWorksChatList);
