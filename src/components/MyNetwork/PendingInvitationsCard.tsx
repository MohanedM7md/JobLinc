import { useState, useEffect } from "react";
import { invitationInterface } from "interfaces/networkInterfaces";
import { getPendingInvitations } from "../../services/api/networkServices";
import NetworkModal from "./NetworkModal";

function PendingInvitationsCard() {
  const [invitations, setInvitations] = useState<invitationInterface[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await getPendingInvitations();
        console.log("Invitations:", response);
        // const parsedInvitations = Array.isArray(response)
        //   ? response.map((invitation) => ({
        //     userId: invitation.userId,
        //     profilePicture: invitation.profilePicture,
        //     firstName: invitation.firstname,
        //     lastName: invitation.lastname,
        //     userBio: invitation.userBio || "No bio provided",
        //     Mutuals: invitation.mutuals || 0,
        //     acknowledged: invitation.connectionStatus === "Pending" ? false : true,          
        //   }))
        //   : [];
        // setInvitations(parsedInvitations);
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
          ? {
              ...invitation,
              acknowledged: true,
            }
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
        <h2>Invitations ({invitations.filter((inv) => !inv.acknowledged).length}) {invitations.length>0 ? "" : "(No pending invitations)"}</h2>
        <button
          data-testid="manage-showall-button"
          className="font-semibold hover:bg-gray-100 hover:text-black text-darkGray p-1 rounded-md"
          onClick={handleShowAll}
        >
          {invitations.length > 0 ? "Show All" : "Manage"}
        </button>
      </div>

      <ul>
        {invitations.slice(0, 3).map((invitation, index) => (
          <li key={index} className="m-2">
            {invitation.acknowledged ? (
              
              <div className="flex items-center bg-gray-100 p-2 rounded-md cursor-pointer">
                <img
                  src={invitation.profilePicture}
                  alt="Profile Picture"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-4 flex-grow">
                  <p className="font-semibold">
                    {invitation.firstName} {invitation.lastName} is now a connection!
                  </p>
                </div>
                <button
                  data-testid="remove-acknowledgment-button"
                  className="text-red-600 hover:text-red-800 hover:cursor-pointer"
                  onClick={() => handleRemoveAcknowledgment(index)}
                >
                  &times;
                </button>
              </div>
            ) : (
              
              <div className="flex items-center">
                <img
                  src={invitation.profilePicture}
                  alt="Profile Picture"
                  className="w-15 h-15 rounded-full object-cover"
                />
                <div className="ml-4 flex-grow">
                  <h3 className="font-semibold">{invitation.firstName} {invitation.lastName}</h3>
                  <p className="text-gray-500 line-clamp-2">{invitation.userBio}</p>
                  <p className="text-xs text-gray-500">{`${invitation.Mutuals} Mutual Connections.`}</p>
                </div>
                <div>
                  <button
                    data-testid="ignore-inv-button"
                    className="text-darkGray font-semibold hover:bg-lightGray p-1 rounded-md m-1 mx-2"
                    onClick={() => handleReject(index)}
                  >
                    Ignore
                  </button>
                  <button
                    data-testid="accept-inv-button"
                    className="text-crimsonRed border-crimsonRed border-2 hover:outline-1 hover:bg-lightGray font-semibold py-0.5 px-5 rounded-full m-1 mx-2"
                    onClick={() => handleAccept(index)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      <NetworkModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="font-semibold mb-4">All Invitations </h2>
        <p className="text-center text-gray-500">{invitations.length > 0 ? "" : "No pending invitations"}</p>
        <ul>
          {invitations.map((invitation, index) => (
            <li key={index} className="mb-4 flex items-center">
              {invitation.acknowledged ? (
                
                <div className="flex items-center bg-gray-100 p-2 rounded-md w-full">
                <img
                  src={invitation.profilePicture}
                  alt="Profile Picture"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-4 flex-grow">
                  <p className="font-semibold">
                    {invitation.firstName} {invitation.lastName} is now a connection!
                  </p>
                </div>
                <button
                  data-testid="remove-acknowledgment-modal-button"
                  className="text-red-600 hover:text-red-800 hover:cursor-pointer"
                  onClick={() => handleRemoveAcknowledgment(index)}
                >
                  &times;
                </button>
              </div>
              ) : (
                
                <div className="flex items-center w-full">
                  <img
                    src={invitation.profilePicture}
                    alt="Profile Picture"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="ml-4 flex-grow">
                    <h3 className="font-semibold">{invitation.firstName} {invitation.lastName}</h3>
                    <p className="text-gray-500 line-clamp-2">{invitation.userBio}</p>
                    <p className="text-xs text-gray-500">{invitation.Mutuals.toString()} Mutual connections.</p>
                  </div>
                  <div>
                    <button
                      data-testid="accept-modal-button"
                      className="text-crimsonRed border-crimsonRed border hover:outline hover:bg-lightGray font-semibold py-0.5 px-3 rounded-full m-1 text-sm"
                      onClick={() => handleAccept(index)}
                    >
                      Accept
                    </button>
                    <button
                      data-testid="ignore-modal-button"
                      className="text-darkGray font-semibold hover:bg-lightGray p-1 rounded-md m-1 text-sm"
                      onClick={() => handleReject(index)}
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
    </div>
  );
}

export default PendingInvitationsCard;