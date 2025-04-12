import { useState, useEffect } from "react";
import { invitationInterface } from "interfaces/networkInterfaces";
import { getPendingInvitations } from "../../services/api/networkServices";
import NetworkModal from "./NetworkModal";

interface PendingInvitationsCardProps {
  manageButtonid: string;
}

function PendingInvitationsCard({ manageButtonid }: PendingInvitationsCardProps) {
  const [invitations, setInvitations] = useState<invitationInterface[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await getPendingInvitations(5, controller.signal);
        setInvitations(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Error fetching network feed:", error);
      }
    };
    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  const handleAccept = (index: number) => {
    setInvitations((prevInvitations) =>
      prevInvitations.map((invitation, i) =>
        i === index
          ? { ...invitation, acknowledged: true }
          : invitation
      )
    );
  };

  const handleReject = (index: number) => {
    setInvitations((prevInvitations) =>
      prevInvitations.filter((_, i) => i !== index)
    );
  };

  const handleRemoveAcknowledgment = (index: number) => {
    setInvitations((prevInvitations) =>
      prevInvitations.filter((_, i) => i !== index)
    );
  };

  const handleShowAll = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-md border-2 border-gray-200">
      <div className="flex justify-between items-center m-2">
        <h2 data-testid="invitation-count">
          Invitations (
          {invitations.filter((inv) => !inv.acknowledged).length}){" "}
          {invitations.length === 0 && "(No pending invitations)"}
        </h2>
        <button
          id={manageButtonid}
          data-testid="manage-button"
          className="font-semibold hover:bg-gray-100 hover:text-black text-darkGray p-1 rounded-md"
          onClick={handleShowAll}
          aria-label="Manage invitations"
        >
          {invitations.length > 0 ? "Show All" : "Manage"}
        </button>
      </div>

      <ul data-testid="invitation-list">
        {invitations.slice(0, 3).map((invitation, index) => (
          <li key={index} className="m-2" data-testid={`invitation-item-${index}`}>
            {invitation.acknowledged ? (
              <div
                className="flex items-center bg-gray-100 p-2 rounded-md"
                aria-label={`Acknowledged invitation from ${invitation.userName}`}
                data-testid={`acknowledged-invitation-${index}`}
              >
                <img
                  src={invitation.profilePicture}
                  alt={`${invitation.userName}'s Profile Picture`}
                  className="w-10 h-10 rounded-full object-cover"
                  data-testid={`profile-picture-${index}`}
                />
                <div className="ml-4 flex-grow">
                  <p className="font-semibold" data-testid={`invitation-name-${index}`}>
                    {invitation.userName} is now a connection!
                  </p>
                </div>
                <button
                  className="text-red-600 hover:text-red-800 hover:cursor-pointer"
                  onClick={() => handleRemoveAcknowledgment(index)}
                  aria-label={`Remove acknowledgment for ${invitation.userName}`}
                  data-testid={`remove-acknowledgment-button-${index}`}
                >
                  &times;
                </button>
              </div>
            ) : (
              <div className="flex items-center" data-testid={`unacknowledged-invitation-${index}`}>
                <img
                  src={invitation.profilePicture}
                  alt={`${invitation.userName}'s Profile Picture`}
                  className="w-15 h-15 rounded-full object-cover"
                  data-testid={`profile-picture-unacknowledged-${index}`}
                />
                <div className="ml-4 flex-grow">
                  <h3 className="font-semibold" data-testid={`invitation-name-unacknowledged-${index}`}>
                    {invitation.userName}
                  </h3>
                  <p className="text-gray-500" data-testid={`invitation-bio-${index}`}>
                    {invitation.userBio}
                  </p>
                  <p className="text-xs text-gray-500" data-testid={`invitation-mutuals-${index}`}>
                    {invitation.Mutuals}
                  </p>
                </div>
                <div>
                  <button
                    className="text-darkGray font-semibold hover:bg-lightGray p-1 rounded-md m-1 mx-2"
                    onClick={() => handleReject(index)}
                    aria-label={`Reject invitation from ${invitation.userName}`}
                    data-testid={`reject-button-${index}`}
                  >
                    Ignore
                  </button>
                  <button
                    className="text-crimsonRed border-crimsonRed border-2 hover:outline-1 hover:bg-lightGray font-semibold py-0.5 px-5 rounded-full m-1 mx-2"
                    onClick={() => handleAccept(index)}
                    aria-label={`Accept invitation from ${invitation.userName}`}
                    data-testid={`accept-button-${index}`}
                  >
                    Accept
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <NetworkModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2 className="font-semibold mb-4" data-testid="modal-title">All Invitations</h2>
          <p className="text-center text-gray-500" data-testid="modal-no-invites">
            {invitations.length === 0 && "No pending invitations"}
          </p>
          <ul data-testid="modal-invitation-list">
            {invitations.map((invitation, index) => (
              <li key={index} className="mb-4 flex items-center" data-testid={`modal-invitation-item-${index}`}>
                {invitation.acknowledged ? (
                  <div
                    className="flex items-center bg-gray-100 p-2 rounded-md w-full"
                    aria-label={`Acknowledged invitation from ${invitation.userName}`}
                    data-testid={`modal-acknowledged-invitation-${index}`}
                  >
                    <img
                      src={invitation.profilePicture}
                      alt={`${invitation.userName}'s Profile Picture`}
                      className="w-10 h-10 rounded-full object-cover"
                      data-testid={`modal-profile-picture-${index}`}
                    />
                    <div className="ml-4 flex-grow">
                      <p className="font-semibold" data-testid={`modal-invitation-name-${index}`}>
                        {invitation.userName} is now a connection!
                      </p>
                    </div>
                    <button
                      className="text-red-600 hover:text-red-800 hover:cursor-pointer"
                      onClick={() => handleRemoveAcknowledgment(index)}
                      aria-label={`Remove acknowledgment for ${invitation.userName}`}
                      data-testid={`modal-remove-acknowledgment-button-${index}`}
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center w-full" data-testid={`modal-unacknowledged-invitation-${index}`}>
                    <img
                      src={invitation.profilePicture}
                      alt={`${invitation.userName}'s Profile Picture`}
                      className="w-10 h-10 rounded-full object-cover"
                      data-testid={`modal-profile-picture-unacknowledged-${index}`}
                    />
                    <div className="ml-4 flex-grow">
                      <h3 className="font-semibold" data-testid={`modal-invitation-name-unacknowledged-${index}`}>
                        {invitation.userName}
                      </h3>
                      <p className="text-gray-500" data-testid={`modal-invitation-bio-${index}`}>
                        {invitation.userBio}
                      </p>
                      <p className="text-xs text-gray-500" data-testid={`modal-invitation-mutuals-${index}`}>
                        {invitation.Mutuals}
                      </p>
                    </div>
                    <div>
                      <button
                        className="text-crimsonRed border-crimsonRed border hover:outline hover:bg-lightGray font-semibold py-0.5 px-3 rounded-full m-1 text-sm"
                        onClick={() => handleAccept(index)}
                        aria-label={`Accept invitation from ${invitation.userName}`}
                        data-testid={`modal-accept-button-${index}`}
                      >
                        Accept
                      </button>
                      <button
                        className="text-darkGray font-semibold hover:bg-lightGray p-1 rounded-md m-1 text-sm"
                        onClick={() => handleReject(index)}
                        aria-label={`Reject invitation from ${invitation.userName}`}
                        data-testid={`modal-reject-button-${index}`}
                      >
                        Ignore
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </NetworkModal>
      )}
    </div>
  );
}

export default PendingInvitationsCard;
