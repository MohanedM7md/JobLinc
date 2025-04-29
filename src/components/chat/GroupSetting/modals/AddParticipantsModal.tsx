// modals/AddParticipantsModal.tsx
import { IoClose, IoSearch, IoCheckmark, IoRefresh } from "react-icons/io5";
import { useState, useEffect, RefObject } from "react";
import { getConnections, addParticipants } from "@services/api/chatServices";
import ModalWrapper from "./ModalWrapper";

interface Connection {
  userId: string;
  firstname: string;
  lastname: string;
  profilePicture: string;
  headline?: string;
  mutualConnections?: number;
  time?: string;
}

interface AddParticipantsModalProps {
  onCancel: () => void;
  onConfirm: (selectedUserIds: string[]) => void;
  modalRef: RefObject<HTMLDivElement | null>;
}

function AddParticipantsModal({
  onCancel,
  onConfirm,
  modalRef,
}: AddParticipantsModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const fetchedConnections = await getConnections();
      setConnections(fetchedConnections);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching connections:", error);
      setError("Failed to load connections. Please try again.");
      setIsLoading(false);
    }
  };

  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Filter connections based on search term (either firstname or lastname)
  const filteredConnections = connections.filter((connection) => {
    const fullName =
      `${connection.firstname} ${connection.lastname}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const handleConfirm = async () => {
    onConfirm(selectedUsers);
    try {
      const response = await addParticipants(selectedUsers);
    } catch (err) {
      console.log(err);
    }
    setConnections(
      connections.filter(
        (connection) => !selectedUsers.includes(connection.userId),
      ),
    );
    setSelectedUsers([]);
  };

  return (
    <ModalWrapper>
      <div
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-md mx-4 overflow-hidden shadow-lg"
      >
        <div className="p-4 bg-crimsonRed text-white flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add Group Participants</h2>
          <button
            onClick={onCancel}
            className="text-white hover:bg-[var(--color-darkBurgundy)] rounded-full p-1"
          >
            <IoClose className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 border-b">
          <div className="relative">
            <IoSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search connections..."
              className="w-full py-2 pl-10 pr-4 border border-[var(--color-SoftRed)] rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-crimsonRed)]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-8">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--color-crimsonRed)] mb-3"></div>
              <p className="text-gray-500">Loading your connections...</p>
            </div>
          ) : error ? (
            <div className="p-6 text-center">
              <p className="text-[var(--color-crimsonRed)] mb-4">{error}</p>
              <button
                onClick={fetchConnections}
                className="flex items-center justify-center mx-auto px-3 py-2 rounded bg-[var(--color-SoftRed)] hover:bg-[var(--color-hoverSoftRed)] text-[var(--color-crimsonRed)]"
              >
                <IoRefresh className="mr-2" /> Try Again
              </button>
            </div>
          ) : filteredConnections.length > 0 ? (
            filteredConnections.map((connection) => (
              <div
                key={connection.userId}
                className={`flex items-center p-3 hover:bg-[var(--color-SoftRed)] cursor-pointer transition-colors ${
                  selectedUsers.includes(connection.userId)
                    ? "bg-[var(--color-hoverSoftRed)]"
                    : ""
                }`}
                onClick={() => toggleUserSelection(connection.userId)}
              >
                <div className="relative">
                  {connection.profilePicture ? (
                    <img
                      src={connection.profilePicture}
                      alt={`${connection.firstname} ${connection.lastname}`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-xl text-gray-600">
                        {connection.firstname.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  {selectedUsers.includes(connection.userId) && (
                    <div className="absolute bottom-0 right-0 bg-[var(--color-crimsonRed)] rounded-full p-1">
                      <IoCheckmark className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <p className="font-medium text-gray-800">
                    {connection.firstname} {connection.lastname}
                  </p>
                  {connection.headline && (
                    <p className="text-xs text-gray-500">
                      {connection.headline}
                    </p>
                  )}
                  {connection.mutualConnections &&
                    connection.mutualConnections > 0 && (
                      <p className="text-xs text-gray-500">
                        {connection.mutualConnections} mutual connection
                        {connection.mutualConnections !== 1 ? "s" : ""}
                      </p>
                    )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              {searchTerm ? (
                <>
                  <p className="font-medium">No matching connections found</p>
                  <p className="text-sm mt-1">Try a different search term</p>
                </>
              ) : (
                <>
                  <p className="font-medium">No connections available</p>
                  <p className="text-sm mt-1">
                    You don't have any connections yet
                  </p>
                </>
              )}
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
