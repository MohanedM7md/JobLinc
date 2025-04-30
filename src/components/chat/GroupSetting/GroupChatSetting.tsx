// GroupChatSetting.tsx
import {
  IoSettingsSharp,
  IoPersonRemove,
  IoTrash,
  IoPersonAdd,
  IoPeople,
  IoClose,
  IoInformationCircle,
} from "react-icons/io5";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { User } from "../interfaces/User.interfaces";
import { fetchNetWorks } from "@services/api/chatServices";
import { motion, AnimatePresence } from "framer-motion";
import GroupSettingsDropdown from "./GroupSettingsDropdown";
import AddParticipantsModal from "./modals/AddParticipantsModal";
import RemoveParticipantsModal from "./modals/RemoveParticipantsModal";
import DeleteChatModal from "./modals/DeleteChatModal";

function GroupChatSetting({
  users,
  setUsers,
  chatId,
}: {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  chatId: string;
}) {
  const [showGroupOptions, setShowGroupOptions] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [showAddParticipants, setShowAddParticipants] = useState(false);
  const [showRemoveParticipants, setShowRemoveParticipants] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const gearRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        gearRef.current &&
        !gearRef.current.contains(event.target as Node)
      ) {
        setShowAddParticipants(false);
        setShowRemoveParticipants(false);
        setShowDeleteConfirmation(false);
        setShowGroupOptions(false);
        setShowPanel(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddParticipant = async () => {
    try {
      setShowAddParticipants(true);
      setShowGroupOptions(false);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  };

  const handleRemoveParticipant = () => {
    setShowRemoveParticipants(true);
    setShowGroupOptions(false);
  };

  const handleDeleteChat = () => {
    setShowDeleteConfirmation(true);
    setShowGroupOptions(false);
  };

  const toggleGroupOptions = () => {
    setShowGroupOptions(!showGroupOptions);
  };

  const togglePanel = () => {
    setShowPanel(!showPanel);
    if (showGroupOptions) setShowGroupOptions(false);
  };

  const handleAddParticipantsConfirm = (selectedUserIds: string[]) => {};

  const handleRemoveParticipantsConfirm = (selectedUserIds: string[]) => {
    const updatedUsers = users.filter(
      (user) => !selectedUserIds.includes(user.userId),
    );
    setUsers(updatedUsers);
    setShowRemoveParticipants(false);
  };

  const handleDeleteChatConfirm = () => {
    console.log("Deleting group chat with ID:", chatId);
    setShowDeleteConfirmation(false);
  };

  return (
    <>
      <div className="relative">
        <motion.button
          ref={gearRef}
          onClick={togglePanel}
          className={`absolute right-6 top-3 p-2 rounded-full ${
            showPanel
              ? "bg-[var(--color-crimsonRed)] text-white"
              : "bg-[var(--color-SoftRed)] text-[var(--color-softRosewood)]"
          } hover:bg-[var(--color-crimsonRed)] hover:text-white transition-colors shadow-md z-10`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Group settings"
        >
          <IoSettingsSharp className="h-5 w-5" />
        </motion.button>

        {/* Expandable Panel */}
        <AnimatePresence>
          {showPanel && (
            <motion.div
              ref={modalRef}
              className="absolute right-16 top-3 bg-white rounded-lg shadow-lg w-72 z-10 overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="p-3 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center">
                  <IoPeople className="text-[var(--color-crimsonRed)] mr-2" />
                  <h3 className="font-medium text-sm">Group Information</h3>
                </div>
                <button
                  onClick={togglePanel}
                  className="text-gray-400 hover:text-[var(--color-crimsonRed)]"
                >
                  <IoClose className="h-5 w-5" />
                </button>
              </div>

              <div className="p-3">
                <div className="mb-3">
                  <p className="text-xs text-[var(--color-mutedSilver)] mb-1">
                    Participants ({users.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
                    {users.map((user) => (
                      <div
                        key={user.userId}
                        className="flex items-center bg-[var(--color-SoftRed)] bg-opacity-10 rounded-full pl-1 pr-2 py-0.5"
                      >
                        {user.profilePicture ? (
                          <img
                            src={user.profilePicture}
                            alt={user.firstName || "User"}
                            className="h-5 w-5 rounded-full object-cover mr-1"
                          />
                        ) : (
                          <div className="h-5 w-5 rounded-full bg-[var(--color-crimsonRed)] bg-opacity-15 flex items-center justify-center mr-1">
                            <span className="text-xs text-[var(--color-crimsonRed)]">
                              {(user.firstName || "?").charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <span className="text-xs font-medium text-[var(--color-charcoalBlack)]">
                          {user.firstName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <button
                    onClick={handleAddParticipant}
                    className="w-full text-left px-3 py-2 text-sm rounded-md flex items-center hover:bg-[var(--color-SoftRed)] hover:bg-opacity-15 transition-colors"
                  >
                    <IoPersonAdd className="mr-2 text-[var(--color-softRosewood)]" />
                    Add Participants
                  </button>
                  <button
                    onClick={handleRemoveParticipant}
                    className="w-full text-left px-3 py-2 text-sm rounded-md flex items-center hover:bg-[var(--color-SoftRed)] hover:bg-opacity-15 transition-colors"
                  >
                    <IoPersonRemove className="mr-2 text-[var(--color-softRosewood)]" />
                    Remove Participants
                  </button>
                  <div className="border-t border-gray-100 my-1.5"></div>
                  <button
                    onClick={handleDeleteChat}
                    className="w-full text-left px-3 py-2 text-sm rounded-md flex items-center text-[var(--color-crimsonRed)] hover:bg-[var(--color-SoftRed)] hover:bg-opacity-15 transition-colors"
                  >
                    <IoTrash className="mr-2" />
                    Delete Group Chat
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modals */}
      {showAddParticipants && (
        <AddParticipantsModal
          onCancel={() => setShowAddParticipants(false)}
          onConfirm={handleAddParticipantsConfirm}
          modalRef={modalRef}
        />
      )}

      {showRemoveParticipants && (
        <RemoveParticipantsModal
          participants={users}
          onCancel={() => setShowRemoveParticipants(false)}
          onConfirm={handleRemoveParticipantsConfirm}
          modalRef={modalRef}
        />
      )}

      {showDeleteConfirmation && (
        <DeleteChatModal
          onCancel={() => setShowDeleteConfirmation(false)}
          onConfirm={handleDeleteChatConfirm}
          modalRef={modalRef}
        />
      )}
    </>
  );
}

export default GroupChatSetting;
