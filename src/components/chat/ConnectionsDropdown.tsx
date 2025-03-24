import { useEffect, useState, useRef } from "react";
import { Users2 } from "lucide-react";
import { fetchNetWorks } from "@services/api/chatServices";
import { useUser } from "./mockUse";
import { NetWorkCard } from "./interfaces/Chat.interfaces";
import NetworkCard from "./NetworkCard";
import { motion, AnimatePresence } from "framer-motion";
import SelectedUserBox from "./UI/SelctedUserBox";
import useNetworkUserId from "@context/NetworkUserIdProvider";
import useChatId from "@context/ChatIdProvider";

function ConnectionsDropdown({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<NetWorkCard[]>([]);
  const [selectedUsers, setselectedUsers] = useState<NetWorkCard[]>([]);
  const { user } = useUser();
  const dropdownRef = useRef<HTMLDivElement>(null);
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

    if (isOpen) fetchData();
    else {
      setUsers([]);
      setselectedUsers([]);
    }
  }, [isOpen, user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 rounded-full hover:bg-gray-200 transition"
        aria-label="Connections"
      >
        <Users2 className="w-6 h-6 text-gray-600" />
      </button>
      {isOpen && (
        <div
          className={`absolute
          bg-white shadow-lg rounded-lg p-3 border border-gray-200 overflow-hidden ${className}`}
        >
          <div className=" overflow-y-auto overflow-x-clip">
            <h3 className="md:text-lg text-sm font-semibold text-gray-800 mb-2">
              Create group
            </h3>

            <AnimatePresence>
              {selectedUsers.length > 0 &&
                selectedUsers.map((selectedUser) => (
                  <motion.div
                    key={selectedUser.userId}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <NetworkCard
                      key={selectedUser.userId}
                      userId={selectedUser.userId}
                      chatPicture={selectedUser.chatPicture}
                      className="bg-SoftRed"
                      chatName={selectedUser.chatName}
                      onClick={() => {
                        setselectedUsers((prev) =>
                          prev.filter(
                            (selUser) => selUser.userId !== selectedUser.userId,
                          ),
                        );
                        setUsers((prev) => [...prev, selectedUser]);
                      }}
                    />
                  </motion.div>
                ))}
            </AnimatePresence>
            <AnimatePresence>
              {users.length > 0 ? (
                users.map((user) => (
                  <motion.div
                    key={user.userId}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <NetworkCard
                      key={user.userId}
                      userId={user.userId}
                      chatPicture={user.chatPicture}
                      chatName={user.chatName}
                      onClick={() => {
                        setUsers((prev) =>
                          prev.filter(
                            (selUser) => selUser.userId !== user.userId,
                          ),
                        );
                        setselectedUsers((prev) => [...prev, user]);
                      }}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-gray-500 text-center"
                >
                  No connections found
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="w-full pt-2 flex h-19 ">
            <button
              className="rounded-md bg-crimsonRed text-warmWhite font-medium  w-18
                     hover:bg-darkBurgundy h-10 shrink-0
                     cursor-pointer"
              onClick={() => {
                setChatId("");
                setUsersId(selectedUsers.map((user) => user.userId));
              }}
            >
              Create
            </button>
            <div className="flex flex-wrap overflow-hidden overflow-ellipsis">
              {selectedUsers.slice(0, 7).map((user) => (
                <SelectedUserBox
                  chatName={user.chatName}
                  onClick={() => {}}
                  className="h-6 m-1"
                />
              ))}
              {selectedUsers.length > 7 && (
                <div className=" font-bold text-2xl">...</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConnectionsDropdown;
