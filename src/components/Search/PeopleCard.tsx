import NetworkModal from "@components/MyNetwork/NetworkModal";
import { searchUserInterface } from "@interfaces/networkInterfaces";
import { 
  AcceptConnectionRequest, 
  changeConnectionStatus, 
  sendConnectionRequest, 
  sendFollowRequest, 
  sendUnfollowRequest 
} from "@services/api/networkServices";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useChats from "@hooks/useChats";
import { PlusIcon } from "lucide-react";

function PeopleCard(props: searchUserInterface) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(props.connectionStatus);
  const [isFollowing, setIsFollowing] = useState(props.isFollowing || false);
  const { setOpnedChats } = useChats();

  const handleUserClick = () => {  
    navigate(`/profile/${props.userId}`);
  };

  const handleAcceptInvitation = async () => {
    const AcceptPromise = AcceptConnectionRequest(props.userId!);
    toast.promise(AcceptPromise, {
      loading: `Accepting Invitation...`,
      success: `${props.firstname} ${props.lastname} is now a connection!`,
      error: "Failed to Accept Invitation. Please try again.",
    });
    try {
      await AcceptPromise;
      setConnectionStatus("Accepted");
    } catch (err) {
      console.error("Failed to accept connection request:", err);
    }
  };

  const handleLincClick = async () => {
    const connectionPromise = sendConnectionRequest(props.userId!);
    toast.promise(connectionPromise, { 
      loading: "Sending connection request...", 
      success: "Connection sent successfully!", 
      error: "Failed to send connection request. Please try again.", 
    });
    
    try {
      await connectionPromise;
      setConnectionStatus("Sent");
    } catch (err) {
      console.error("Failed to send connection request:", err);
    }
  };

  const handleAssuringModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleWithdrawModal = async () => {
    const withdrawRequestPromise = changeConnectionStatus(props.userId!, "Canceled");
    toast.promise(withdrawRequestPromise, { 
      loading: "Withdrawing connection request...", 
      success: "Request Withdrawn successfully!", 
      error: "Failed to withdraw connection request. Please try again." 
    });
    try {
      await withdrawRequestPromise;
      setConnectionStatus("Canceled");
    } catch (error) {
      console.error("Failed to withdraw connection request:", error);
    }
    setModalOpen(false);
  };

  const handleFollow = async () => {
    const followPromise = sendFollowRequest(props.userId!);
    toast.promise(followPromise, {
      loading: "Sending Follow request...",
      success: `${props.firstname} Followed successfully!`,
      error: `Failed to Follow ${props.firstname}. Please try again.`,
    });

    try {
      const response = await followPromise;
      if(response.status === 200){
        console.log("Follow response", response);
        setIsFollowing(true);
      }
    } catch (err) {
      console.error("Failed to send Follow request:", err);
    }
  };

  const handleUnfollow = async () => {
    const unfollowPromise = sendUnfollowRequest(props.userId!);
    toast.promise(unfollowPromise, {
      loading: "Sending UnFollow request...",
      success: `${props.firstname} UnFollowed successfully!`,
      error: `Failed to UnFollow ${props.firstname}. Please try again.`,
    });

    try {
      const response = await unfollowPromise;
      if(response.status === 200){
        console.log("Unfollow response", response);
        setIsFollowing(false);
      }
    } catch (err) {
      console.error("Failed to send UnFollow request:", err);
    }
  };

  return (
    <div data-testid="people-card" className="flex flex-col sm:flex-row items-start sm:items-center border-b border-gray-300 w-full p-3 gap-3 sm:gap-0">
      <img
        src={props.profilePicture}
        alt="Profile"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover cursor-pointer flex-shrink-0"
        onClick={handleUserClick}
      />

      <div className="ml-0 sm:ml-4 flex-grow mr-2 sm:mr-7 min-w-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
          <h3 
            className="font-semibold cursor-pointer hover:underline truncate text-sm sm:text-base"
            onClick={handleUserClick}
          >
            {props.firstname} {props.lastname}
          </h3>
          <div className="flex gap-2">
            {isFollowing ? (
              <button
                onClick={handleUnfollow}
                className="text-darkGray text-xs sm:text-sm font-semibold flex items-center gap-1 hover:bg-lightGray px-1.5 sm:px-2 rounded"
                data-testid="unfollow-button"
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={handleFollow}
                className="text-crimsonRed text-xs sm:text-sm font-semibold flex items-center gap-1 hover:bg-lightGray px-1.5 sm:px-2 rounded"
                data-testid="follow-button"
              >
                <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="sm:inline">Follow</span>
              </button>
            )}
          </div>
        </div>
        <p className="text-gray-500 text-sm sm:text-base truncate mt-1">
          {props.city}, {props.country}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">
          {props.mutualConnections} mutual connections
        </p>
      </div>

      <div className="w-auto flex-shrink-0 flex justify-end sm:ml-4 mt-2 sm:mt-0">
        {connectionStatus === "Accepted" ? (
          <button
            data-testid="message-button"
            className="text-base border-2 px-3 sm:px-5 py-0.5 text-crimsonRed border-crimsonRed rounded-full font-semibold hover:bg-lightGray hover:outline-1 cursor-pointer whitespace-nowrap"
            onClick={() => {
              setOpnedChats((prevChats) => [
                ...prevChats,
                {
                  chatId: "",
                  usersId: [props.userId!],
                  chatName: props.firstname,
                  chatImage: [props.profilePicture],
                },
              ]);
            }}
          >
            Message
          </button>
        ) : connectionStatus === "Sent" ? (
          <button
            data-testid="pending-button"
            className="text-base border-2 px-3 sm:px-6 py-0.5 text-darkGray border-darkGray rounded-full font-semibold hover:bg-lightGray hover:outline-1 cursor-default whitespace-nowrap"
            onClick={handleAssuringModal}
          >
            Pending
          </button>
        ) : connectionStatus === "Received" ? (
          <button
            data-testid="accept-button"
            className="text-base border-2 px-5 sm:px-9 py-0.5 text-crimsonRed border-crimsonRed rounded-full font-semibold hover:bg-lightGray hover:outline-1 cursor-pointer whitespace-nowrap"
            onClick={handleAcceptInvitation}
          >
            Accept
          </button>
        ) : (
          <button
            data-testid="linc-button"
            onClick={handleLincClick}
            className="text-base border-2 px-7 sm:px-9 py-0.5 text-crimsonRed border-crimsonRed rounded-full font-semibold hover:bg-lightGray hover:outline-1 cursor-pointer whitespace-nowrap"
          >
            Linc
          </button>
        )}
      </div>

      <NetworkModal isOpen={modalOpen} onClose={handleCloseModal}>
        <div className="flex flex-col">
          <div className="border-b border-gray-300 py-2">
            <h1 className="font-bold">Withdraw Invitation.</h1>
          </div>
          <div className="border-b border-gray-300 flex items-center justify-center py-3">
            <p className="font-semibold">
              Are you sure you want to withdraw your invitation?
            </p>
          </div>
          <div className="flex items-center justify-end space-x-4 pt-3">
            <button
              data-testid="withdraw-modal-button"
              className="cursor-pointer border-2 px-5 py-0.5 rounded-full font-semibold hover:bg-lightGray hover:outline-1 text-crimsonRed border-crimsonRed"
              onClick={handleWithdrawModal}
            >
              Withdraw
            </button>
            <button
              data-testid="cancel-modal-button"
              className="cursor-pointer border-2 px-5 py-0.5 rounded-full font-semibold hover:bg-lightGray hover:outline-1 text-darkGray border-darkGray"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </NetworkModal>
    </div>
  );
}

export default PeopleCard;