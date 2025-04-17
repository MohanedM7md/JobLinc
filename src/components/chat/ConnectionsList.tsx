import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchNetWorks } from "@services/api/chatServices";
import { NetWorkCard } from "./interfaces/Chat.interfaces";
import NetworkCard from "./NetworkCard";
import SelectedUserBox from "./UI/SelctedUserBox";
import useNetworkUserId from "@context/NetworkUserIdProvider";
import useChatId from "@context/ChatIdProvider";
import store from "@store/store";

interface ConnectionsListProps {
  onClose?: () => void;
  onCreate?: (usersId: string[]) => void;
  containerClass?: string;
  buttonClass?: string;
}

function ConnectionsList({
  onClose,
  onCreate,
  containerClass,
  buttonClass,
}: ConnectionsListProps) {
  const [users, setUsers] = useState<NetWorkCard[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<NetWorkCard[]>([]);
  const user = store.getState().user.userId;
  const { setUsersId } = useNetworkUserId();
  const { setChatId } = useChatId();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const data = await fetchNetWorks(user);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching connections:", error);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div className={`p-3 ${containerClass}`}>
      <div className="max-h-[60vh] overflow-y-auto space-y-2 mt-4">
        <AnimatePresence>
          {users.length > 0 ? (
            users.map((user) => (
              <motion.div
                key={user.userId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <NetworkCard
                  key={user.userId}
                  userId={user.userId}
                  chatPicture={user.chatPicture}
                  chatName={user.chatName}
                  onClick={() => {
                    if (
                      !selectedUsers.some(
                        (selUser) => selUser.userId === user.userId,
                      )
                    ) {
                      setUsers((prev) =>
                        prev.filter((u) => u.userId !== user.userId),
                      );
                      setSelectedUsers((prev) => [...prev, user]);
                    }
                  }}
                />
              </motion.div>
            ))
          ) : (
            <div>No connections found</div>
          )}
        </AnimatePresence>
      </div>
      {selectedUsers.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {selectedUsers.map((user) => (
              <motion.div
                key={user.userId}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SelectedUserBox
                  chatName={user.chatName}
                  onClick={() => {
                    setSelectedUsers((prev) =>
                      prev.filter((u) => u.userId !== user.userId),
                    );
                    setUsers((prev) => [...prev, user]);
                  }}
                  className="bg-gray-200 p-2 rounded-md"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      <div className="mt-4 flex justify-end">
        <button
          className={`px-4 py-2 rounded-md font-medium transition duration-200 ${buttonClass} ${
            selectedUsers.length > 0
              ? "bg-crimsonRed text-white hover:bg-darkBurgundy"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
          onClick={() => {
            if (selectedUsers.length === 0) return;
            setChatId("");
            setUsersId(selectedUsers.map((user) => user.userId));
            onCreate?.(selectedUsers.map((user) => user.userId));
            onClose?.();
          }}
          disabled={selectedUsers.length === 0}
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default ConnectionsList;
