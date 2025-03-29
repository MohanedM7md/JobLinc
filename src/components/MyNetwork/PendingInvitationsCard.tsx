import { useState } from "react";

interface Invitation {
  profilePicture: string;
  userName: string;
  userBio: string;
  Mutuals: string;
  ignoreButtonid: string;
  acceptButtonid: string;
}

interface PendingInvitationsCardProps {
  manageButtonid: string;
  invitations: Invitation[];
}

function PendingInvitationsCard(props: PendingInvitationsCardProps) {
  // State to manage the invitations
  const [invitations, setInvitations] = useState(props.invitations);
  
  // Function to handle accepting an invitation
  const handleAccept = (index: number) => {
    setInvitations((prevInvitations) =>
      prevInvitations.filter((_, i) => i !== index)
    );
  };
  const handleReject = (index: number) => {
    setInvitations((prevInvitations) =>
      prevInvitations.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="bg-white rounded-md border-2 border-gray-200">
      <div className="flex justify-between items-center m-2">
        <h2>Invitations ({invitations.length})</h2>
        <button
          id={props.manageButtonid}
          className="font-semibold hover:bg-gray-100 hover:text-black text-darkGray p-1 rounded-md"
        >
        {invitations.length > 0 ? "Show All" : "Manage"}
        </button>
      </div>
      <ul>
        {invitations.length > 0 ? (
          invitations.map((invitation, index) => (
            <li key={index} className="m-2">
              <div className="flex items-center">
                <div>
                  <img
                    src={invitation.profilePicture}
                    alt="Profile Picture"
                    className="w-15 h-15 rounded-full object-cover"
                  />
                </div>
                <div className="flex justify-between items-center w-full">
                  <div className="ml-4">
                    <h3 className="font-semibold">{invitation.userName}</h3>
                    <p className="text-gray-500">{invitation.userBio}</p>
                    <p className="text-xs text-gray-500">{invitation.Mutuals}</p>
                  </div>
                  <div>
                    <button
                      id={invitation.ignoreButtonid}
                      className="text-darkGray font-semibold hover:bg-lightGray p-1 rounded-md m-1 mx-2"
                      onClick={() => handleReject(index)} // Remove invitation on click
                    >
                    Ignore
                    </button>
                    <button
                      id={invitation.acceptButtonid}
                      className="text-crimsonRed border-crimsonRed border-2 hover:outline-1 hover:bg-lightGray font-semibold py-0.5 px-5 rounded-full m-1 mx-2"
                      onClick={() => handleAccept(index)} // Remove invitation on click
                    >
                    Accept
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500 m-4">No Pending Invitations</p>
        )}
      </ul>
    </div>
  );
}

export default PendingInvitationsCard;
