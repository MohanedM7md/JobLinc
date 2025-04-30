import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { fetchNetWorks } from "@services/api/chatServices";
import { NetWorkCard } from "./interfaces/Chat.interfaces";
import NetworkCard from "./NetworkCard";
import SelectedUserBox from "./UI/SelctedUserBox";
import useNetworkUserId from "@context/NetworkUserIdProvider";
import useChatId from "@context/ChatIdProvider";
import store from "@store/store";
import { Users, Search, X, MessageCircle } from "lucide-react";

interface ConnectionsListProps {
  onClose?: () => void;
  onCreate?: (usersId: string[], groupName?: string) => void;
  containerClass?: string;
  buttonClass?: string;
  buttonContent: string;
}

function ConnectionsList({
  onClose,
  onCreate,
  containerClass,
  buttonClass,
  buttonContent,
}: ConnectionsListProps) {
  const [users, setUsers] = useState<NetWorkCard[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<NetWorkCard[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [groupName, setGroupName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const groupNameInputRef = useRef<HTMLInputElement>(null);
  const user = store.getState().user.userId;
  const { setUsersId, setTitle } = useNetworkUserId();
  const { setChatId } = useChatId();

  useEffect(() => {
    if (groupNameInputRef.current) {
      setTimeout(() => groupNameInputRef.current?.focus(), 100);
    }
  }, []);

  // Fetch connections
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const data = await fetchNetWorks(user);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching connections:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const filteredUsers = users.filter((user) =>
    user.chatName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddUser = (user: NetWorkCard) => {
    if (!selectedUsers.some((selUser) => selUser.userId === user.userId)) {
      setUsers((prev) => prev.filter((u) => u.userId !== user.userId));
      setSelectedUsers((prev) => [...prev, user]);
    }
  };

  const handleRemoveUser = (userId: string) => {
    const removedUser = selectedUsers.find((user) => user.userId === userId);
    if (removedUser) {
      setSelectedUsers((prev) => prev.filter((u) => u.userId !== userId));
      setUsers((prev) => [...prev, removedUser]);
    }
  };

  const handleCreateChat = () => {
    if (selectedUsers.length === 0) return;

    // Set the chat ID to empty (new chat)
    setChatId("");

    // Set the user IDs to the selected users
    setUsersId(selectedUsers.map((user) => user.userId));

    // Set the title using the provided context function
    const finalGroupName = groupName.trim();
    if (finalGroupName) {
      setTitle(finalGroupName);
    } else {
      // If no group name, create a title from participant names
      const participantNames = selectedUsers
        .map((user) => user.chatName)
        .join(", ");
      setTitle(participantNames);
    }

    // Call the onCreate callback if provided
    onCreate?.(
      selectedUsers.map((user) => user.userId),
      finalGroupName || undefined,
    );

    // Close the dialog
    onClose?.();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={`p-4 ${containerClass}`}>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="text-crimsonRed" size={20} />
          <h3 className="text-lg font-medium text-charcoalBlack">
            Create Group Chat
          </h3>
        </div>
      </div>

      {/* Group Name Input */}
      <div className="mb-4">
        <div className="bg-lightGray dark:bg-darkGray p-3 rounded-lg">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Group Name
          </label>
          <input
            ref={groupNameInputRef}
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter a name for your group"
            className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-crimsonRed focus:border-transparent"
          />
        </div>
      </div>

      {/* Selected Users Section */}
      <AnimatePresence>
        {selectedUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4"
          >
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Selected Participants ({selectedUsers.length})
              </span>
              <button
                onClick={() => {
                  setUsers((prev) => [...prev, ...selectedUsers]);
                  setSelectedUsers([]);
                }}
                className="ml-2 text-xs text-crimsonRed hover:text-darkBurgundy"
              >
                Clear all
              </button>
            </div>
            <LayoutGroup>
              <motion.div layout className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {selectedUsers.map((user) => (
                    <motion.div
                      key={user.userId}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <SelectedUserBox
                        chatName={user.chatName}
                        onClick={() => handleRemoveUser(user.userId)}
                        className="bg-SoftRed text-crimsonRed px-3 py-1.5 rounded-full"
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </LayoutGroup>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} className="text-gray-400" />
        </div>
        <input
          ref={searchInputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search people to add..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-crimsonRed focus:border-transparent"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X size={16} className="text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Users List */}
      <div className="mb-4">
        <div className="text-sm font-medium text-gray-700 mb-2">Add People</div>
        <div className="max-h-[40vh] overflow-y-auto rounded-lg border border-gray-200">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="divide-y divide-gray-100"
          >
            {isLoading ? (
              <div className="p-4 text-center">
                <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-crimsonRed border-r-transparent"></div>
                <p className="mt-2 text-sm text-gray-500">
                  Loading contacts...
                </p>
              </div>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <motion.div
                  key={user.userId}
                  variants={itemVariants}
                  layout
                  transition={{ duration: 0.2 }}
                >
                  <NetworkCard
                    userId={user.userId}
                    chatPicture={user.chatPicture}
                    chatName={user.chatName}
                    onClick={() => handleAddUser(user)}
                  />
                </motion.div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                {searchTerm
                  ? "No matching contacts found"
                  : "No contacts available"}
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-md text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          className={`px-5 py-2 rounded-md font-medium transition duration-200 flex items-center gap-2 ${
            selectedUsers.length > 0
              ? "bg-crimsonRed text-white hover:bg-darkBurgundy"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          } ${buttonClass}`}
          onClick={handleCreateChat}
          disabled={selectedUsers.length === 0}
        >
          <MessageCircle size={18} />
          {buttonContent}
        </button>
      </div>
    </div>
  );
}

export default ConnectionsList;
