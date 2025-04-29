// modals/AddParticipantsModal.tsx
import { IoClose, IoSearch, IoCheckmark } from "react-icons/io5";
import { useState, RefObject } from "react";
import { User } from "../../interfaces/User.interfaces";
import ModalWrapper from "./ModalWrapper";

interface AddParticipantsModalProps {
  contacts: User[];
  onCancel: () => void;
  onConfirm: (selectedUserIds: string[]) => void;
  modalRef: RefObject<HTMLDivElement | null>;
}

function AddParticipantsModal({
  contacts,
  onCancel,
  onConfirm,
  modalRef,
}: AddParticipantsModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Filter contacts based on search term
  const filteredContacts = contacts.filter((contact) =>
    contact.firstName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleConfirm = () => {
    onConfirm(selectedUsers);
    setSelectedUsers([]);
  };

  return (
    <ModalWrapper>
      <div
        ref={modalRef}
        className="bg-white rounded-lg  w-full max-w-md mx-4 overflow-hidden"
      >
        <div className="p-4 bg-crimsonRed text-white flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add Group Participants</h2>
          <button
            onClick={onCancel}
            className="text-white hover:bg-[var(--color-crimsonRed)] rounded-full p-1"
          >
            <IoClose className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 border-b">
          <div className="relative">
            <IoSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              className="w-full py-2 pl-10 pr-4 border border-[var(--color-SoftRed)] rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-crimsonRed)]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="max-h-60 overflow-y-auto">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <div
                key={contact.userId}
                className={`flex items-center p-3 hover:bg-[var(--color-SoftRed)] cursor-pointer ${
                  selectedUsers.includes(contact.userId)
                    ? "bg-[var(--color-hoverSoftRed)]"
                    : ""
                }`}
                onClick={() => toggleUserSelection(contact.userId)}
              >
                <div className="relative">
                  {contact.profilePicture ? (
                    <img
                      src={contact.profilePicture}
                      alt={contact.firstName || "User"}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-xl text-gray-600">
                        {(contact.firstName || "?").charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  {selectedUsers.includes(contact.userId) && (
                    <div className="absolute bottom-0 right-0 bg-[var(--color-crimsonRed)] rounded-full p-1">
                      <IoCheckmark className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <p className="font-medium text-gray-800">
                    {contact.firstName}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              {searchTerm
                ? "No matching contacts found"
                : "No contacts available"}
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
            Add {selectedUsers.length > 0 ? `(${selectedUsers.length})` : ""}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default AddParticipantsModal;
