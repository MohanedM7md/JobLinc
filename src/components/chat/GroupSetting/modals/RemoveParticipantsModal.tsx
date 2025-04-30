// modals/RemoveParticipantsModal.tsx
import { IoClose } from "react-icons/io5";
import { useState, RefObject } from "react";
import { User } from "../../interfaces/User.interfaces";
import ModalWrapper from "./ModalWrapper";

interface RemoveParticipantsModalProps {
  participants: User[];
  onCancel: () => void;
  onConfirm: (selectedUserIds: string[]) => void;
  modalRef: RefObject<HTMLDivElement | null>;
}

function RemoveParticipantsModal({
  participants,
  onCancel,
  onConfirm,
  modalRef,
}: RemoveParticipantsModalProps) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleConfirm = () => {
    onConfirm(selectedUsers);
    setSelectedUsers([]);
  };

  return (
    <ModalWrapper>
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden"
      >
        <div className="p-4 bg-[var(--color-crimsonRed)] text-white flex justify-between items-center">
          <h2 className="text-xl font-semibold">Remove Group Participants</h2>
          <button
            onClick={onCancel}
            className="text-white hover:bg-[var(--color-darkBurgundy)] rounded-full p-1"
          >
            <IoClose className="h-6 w-6" />
          </button>
        </div>

        <div className="max-h-60 overflow-y-auto">
          {participants.length > 0 ? (
            participants.map((user) => (
              <div
                key={user.userId}
                className={`flex items-center p-3 hover:bg-[var(--color-SoftRed)] cursor-pointer ${
                  selectedUsers.includes(user.userId)
                    ? "bg-[var(--color-hoverSoftRed)]"
                    : ""
                }`}
                onClick={() => toggleUserSelection(user.userId)}
              >
                <div className="relative">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.firstName || "User"}
                      className={`w-12 h-12 rounded-full object-cover border-2 ${
                        selectedUsers.includes(user.userId)
                          ? "border-[var(--color-crimsonRed)]"
                          : "border-gray-200"
                      }`}
                    />
                  ) : (
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        selectedUsers.includes(user.userId)
                          ? "bg-[var(--color-hoverSoftRed)]"
                          : "bg-gray-300"
                      }`}
                    >
                      <span className="text-xl text-gray-600">
                        {(user.firstName || "?").charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  {selectedUsers.includes(user.userId) && (
                    <div className="absolute bottom-0 right-0 bg-[var(--color-crimsonRed)] rounded-full p-1">
                      <IoClose className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <p className="font-medium text-gray-800">{user.firstName}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No participants in this group
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-50 flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-[var(--color-SoftRed)]"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={selectedUsers.length === 0}
            className={`px-4 py-2 rounded-md text-white ${
              selectedUsers.length === 0
                ? "bg-[#d7263880] cursor-not-allowed"
                : "bg-[var(--color-crimsonRed)] hover:bg-[var(--color-darkBurgundy)]"
            }`}
          >
            Remove {selectedUsers.length > 0 ? `(${selectedUsers.length})` : ""}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default RemoveParticipantsModal;
