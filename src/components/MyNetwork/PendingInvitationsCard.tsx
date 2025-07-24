import { useState, useEffect } from "react";
import { invitationInterface } from "interfaces/networkInterfaces";
import { AcceptConnectionRequest, getPendingInvitations, RejectConnectionRequest } from "../../services/api/networkServices";
import NetworkModal from "./NetworkModal";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function PendingInvitationsCard() {
  const [invitations, setInvitations] = useState<invitationInterface[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getPendingInvitations();
        const parsedInvitations = Array.isArray(response)
          ? response.map((invitation) => ({
              userId: invitation.userId,
              profilePicture: invitation.profilePicture,
              firstname: invitation.firstname,
              lastname: invitation.lastname,
              headline: invitation.headline || "",
              mutualConnections: invitation.mutualConnections || 0,
              connectionStatus: invitation.connectionStatus || "Received",
            }))
          : [];
        setInvitations(parsedInvitations);
      } catch (error) {
        console.error("Error fetching network feed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  const handleAccept = async (index: number) => {
    const AcceptPromise = AcceptConnectionRequest(invitations[index].userId);
    toast.promise(AcceptPromise, {
      loading: `Accepting Invitation...`,
      success: `${invitations[index].firstname} ${invitations[index].lastname} is now a connection!`,
      error: "Failed to Accept Invitation. Please try again.",
    });
    try {
      const response = await AcceptPromise;
      if(response?.status === 200){
        setInvitations((prevInvitations) =>
          prevInvitations.map((invitation, i) =>
            i === index
              ? { ...invitation, connectionStatus: "Accepted" }
              : invitation
          )
        );
      }
    } catch (err) {
      console.error("Failed to accept connection request:", err);
    }
  };

  const handleReject = async (index: number) => {
    const RejectPromise = RejectConnectionRequest(invitations[index].userId);
    toast.promise(RejectPromise, {
      loading: `Rejecting Invitation...`,
      success: `${invitations[index].firstname} ${invitations[index].lastname}'s Invitation is rejected`,
      error: "Failed to Reject Invitation. Please try again.",
    });
    try {
      const response = await RejectPromise;
      if(response?.status === 200){
        setInvitations((prevInvitations) =>
          prevInvitations.filter((_, i) => i !== index)
        );
      }
    } catch (err) {
      console.error("Failed to reject connection request:", err);
    }
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

  const handleInvitationClick = (index: number) => {
    navigate(`/profile/${invitations[index].userId}`);
  };

  return (
    <div className="bg-white rounded-md border-2 border-gray-200">
      <div className="flex justify-between items-center m-2">
        <h2>
          {isLoading ? (
            <div className="h-5 w-40 bg-gray-200 rounded animate-pulse"></div>
          ) : (
            <>
              Invitations ({invitations.filter(inv => inv.connectionStatus === "Received").length}){" "}
              {invitations.length > 0 ? "" : "(No pending invitations)"}
            </>
          )}
        </h2>
        {isLoading ? (
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
        ) : (
          <button
            data-testid="manage-showall-button"
            className="font-semibold hover:bg-gray-100 hover:text-black text-darkGray p-1 rounded-md"
            onClick={handleShowAll}
          >
            {invitations.length > 0 ? "Show All" : "Manage"}
          </button>
        )}
      </div>

      <ul>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <li key={index} className="m-2">
              <div className="flex items-center">
                <div className="w-15 h-15 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="ml-4 flex-grow space-y-2">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-8 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </div>
            </li>
          ))
        ) : (
          invitations.slice(0, 3).map((invitation, index) => (
            <li key={index} className="m-2">
              {invitation.connectionStatus === "Accepted" ? (
                <div className="flex items-center bg-gray-100 p-2 rounded-md cursor-pointer">
                  <img
                    src={invitation.profilePicture}
                    alt="Profile Picture"
                    className="w-10 h-10 rounded-full object-cover cursor-pointer"
                    data-testid="profile-picture"
                    onClick={() => handleInvitationClick(index)}
                  />
                  <div className="ml-4 flex-grow">
                    <p className="font-semibold cursor-pointer hover:underline" 
                      onClick={() => handleInvitationClick(index)}>
                      {invitation.firstname} {invitation.lastname} is now a connection!
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
                    className="w-15 h-15 rounded-full object-cover cursor-pointer"
                    onClick={() => handleInvitationClick(index)}
                  />
                  <div className="ml-4 flex-grow">
                    <h3 className="font-semibold cursor-pointer hover:underline" 
                      onClick={() => handleInvitationClick(index)}>
                      {invitation.firstname} {invitation.lastname}
                    </h3>
                    <p className="text-gray-500 line-clamp-2 cursor-pointer" 
                      onClick={() => handleInvitationClick(index)}>
                      {invitation.headline}
                    </p>
                    <p className="text-xs text-gray-500">
                      {`${invitation.mutualConnections} Mutual Connections.`}
                    </p>
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
          ))
        )}
      </ul>

      <NetworkModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="font-semibold mb-4">All Invitations </h2>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <li key={index} className="mb-4 flex items-center">
              <div className="flex items-center w-full">
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="ml-4 flex-grow space-y-2">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-8 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <>
            <p className="text-center text-gray-500">
              {invitations.length > 0 ? "" : "No pending invitations"}
            </p>
            <ul>
              {invitations.map((invitation, index) => (
                <li key={index} className="mb-4 flex items-center">
                  {invitation.connectionStatus === "Accepted" ? (
                    <div className="flex items-center bg-gray-100 p-2 rounded-md w-full">
                      <img
                        src={invitation.profilePicture}
                        alt="Profile Picture"
                        className="w-10 h-10 rounded-full object-cover cursor-pointer"
                        onClick={() => handleInvitationClick(index)}
                      />
                      <div className="ml-4 flex-grow">
                        <p className="font-semibold">
                          {invitation.firstname} {invitation.lastname} is now a connection!
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
                        className="w-10 h-10 rounded-full object-cover cursor-pointer"
                      />
                      <div className="ml-4 flex-grow">
                        <h3 className="font-semibold cursor-pointer hover:underline" 
                          onClick={() => handleInvitationClick(index)}>
                          {invitation.firstname} {invitation.lastname}
                        </h3>
                        <p className="text-gray-500 line-clamp-2 cursor-pointer" 
                          onClick={() => handleInvitationClick(index)}>
                          {invitation.headline}
                        </p>
                        <p className="text-xs text-gray-500">
                          {invitation.mutualConnections.toString()} Mutual connections.
                        </p>
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
          </>
        )}
      </NetworkModal>
    </div>
  );
}

export default PendingInvitationsCard;