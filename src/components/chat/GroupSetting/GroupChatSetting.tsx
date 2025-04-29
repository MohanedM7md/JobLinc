// GroupChatSetting.tsx
import {
  IoSettingsSharp,
  IoPersonRemove,
  IoTrash,
  IoPersonAdd,
  IoPeople,
  IoEllipsisHorizontal,
} from "react-icons/io5";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { User } from "../interfaces/User.interfaces";
import { fetchNetWorks } from "@services/api/chatServices";
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
  const [showAddParticipants, setShowAddParticipants] = useState(false);
  const [showRemoveParticipants, setShowRemoveParticipants] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [availableContacts, setAvailableContacts] = useState<User[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const [showAllParticipants, setShowAllParticipants] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowAddParticipants(false);
        setShowRemoveParticipants(false);
        setShowDeleteConfirmation(false);
        setShowGroupOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch available contacts for adding participants
  const handleAddParticipant = async () => {
    try {
      const contacts = await fetchNetWorks("");
      const filteredContacts = contacts.filter(
        (contact: User) =>
          !users.some((user) => user.userId === contact.userId),
      );
      setAvailableContacts(filteredContacts);
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

  const toggleShowAllParticipants = () => {
    setShowAllParticipants(!showAllParticipants);
  };

  const handleAddParticipantsConfirm = (selectedUserIds: string[]) => {
    // Implement API call to add participants
    const newParticipants = availableContacts.filter((contact) =>
      selectedUserIds.includes(contact.userId),
    );
    setUsers((prevUsers) => [...prevUsers, ...newParticipants]);
    setShowAddParticipants(false);
  };

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

  // Display avatar stack for participants
  const renderAvatarStack = () => {
    return (
      <div className="flex -space-x-2 overflow-hidden ml-2">
        {users.slice(0, 3).map((user) => (
          <div
            key={user.userId}
            className="inline-block h-8 w-8 rounded-full border-2 border-white"
          >
            {user.profilePicture ? (
              <img
                className="h-full w-full rounded-full object-cover"
                src={user.profilePicture}
                alt={user.firstName || "User"}
              />
            ) : (
              <div className="h-full w-full rounded-full bg-[var(--color-SoftRed)] flex items-center justify-center">
                <span className="text-sm font-medium text-[var(--color-crimsonRed)]">
                  {(user.firstName || "?").charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        ))}
        {users.length > 3 && (
          <div
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-xs font-medium cursor-pointer hover:bg-[var(--color-SoftRed)]"
            onClick={toggleShowAllParticipants}
          >
            +{users.length - 3}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="bg-white border-b border-[var(--color-softRosewood)] p-2 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="hidden md:block">
                <p className="text-xs text-[var(--color-mutedSilver)]">
                  <div className="bg-[var(--color-SoftRed)] rounded-full p-2 w-1/2">
                    <IoPeople className="h-5 w-5 text-[var(--color-crimsonRed)]" />
                  </div>
                  {users.length} participants
                </p>
              </div>
              {renderAvatarStack()}
            </div>
          </div>

          <div className="relative" ref={modalRef}>
            <button
              onClick={toggleGroupOptions}
              className="p-2 rounded-full hover:bg-[var(--color-SoftRed)] transition-colors"
              aria-label="Group settings"
            >
              <IoSettingsSharp className="h-5 w-5 text-[var(--color-softRosewood)]" />
            </button>

            {showGroupOptions && (
              <GroupSettingsDropdown
                onAddParticipant={handleAddParticipant}
                onRemoveParticipant={handleRemoveParticipant}
                onDeleteChat={handleDeleteChat}
              />
            )}
          </div>
        </div>
      </div>

      {/* Expandable participants list */}
      {showAllParticipants && (
        <div className="bg-white border-b border-[var(--color-SoftRed)] overflow-hidden transition-all duration-300 ease-in-out">
          <div className="p-3">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-sm text-[var(--color-charcoalBlack)]">
                All Participants
              </h4>
              <button
                onClick={toggleShowAllParticipants}
                className="text-[var(--color-mutedSilver)] hover:text-[var(--color-crimsonRed)] text-sm"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {users.map((user) => (
                <div
                  key={user.userId}
                  className="flex items-center p-2 rounded-md hover:bg-[var(--color-SoftRed)]"
                >
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.firstName || "User"}
                      className="h-8 w-8 rounded-full object-cover mr-2"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-[var(--color-SoftRed)] flex items-center justify-center mr-2">
                      <span className="text-sm text-[var(--color-crimsonRed)]">
                        {(user.firstName || "?").charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className="text-sm truncate">{user.firstName}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showAddParticipants && (
        <AddParticipantsModal
          contacts={availableContacts}
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
