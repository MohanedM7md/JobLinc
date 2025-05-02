import { FollowInterface } from "@interfaces/networkInterfaces";
import NetworkModal from "../MyNetwork/NetworkModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { sendFollowRequest, sendUnfollowRequest } from "@services/api/networkServices";

function FollowingCard(props: FollowInterface) {
  const [isFollowing, setIsFollowing] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleUserClick = () => {
    if (props.userId) {
      navigate(`/profile/${props.userId}`);
      console.log("User ID:", props.userId);
    }
  };

  const handleCompanyClick = () => {
    if (props.companyId) {
      navigate(`/company/${props.companyId}`);
      console.log("Company ID:", props.companyId);
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true); 
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleFollowRequest = async () => {
    const id = props.userId ?? props.companyId;
    if (!id) {
      console.log("ID is Null");
      return;
    }

    const followPromise = sendFollowRequest(id);
    toast.promise(followPromise, {
      loading: "Sending Follow request...",
      success: `${props.firstname ?? props.companyName ?? `user`} Followed successfully!`,
      error: `Failed to Follow ${props.firstname ?? props.companyName ?? `user`}. Please try again.`,
    });

    try {
      const response = await followPromise;
      if(response.status === 200){
      console.log("Follow Request Response:", response);
      setIsFollowing(true); 
      }
    } catch (err) {
      console.error("Failed to send Follow request:", err);
    }
  };

  const handleConfirmUnfollow = async () => {
    const id = props.userId ?? props.companyId;
    if (!id) {
      console.log("user or company id is null");
      return;
    }

    const unfollowPromise = sendUnfollowRequest(id);
    toast.promise(unfollowPromise, {
      loading: "Sending UnFollow request...",
      success: `${props.firstname ?? props.companyName ?? `user`} UnFollowed successfully!`,
      error: `Failed to UnFollow ${props.firstname ?? props.companyName ?? `user`}. Please try again.`,
    });

    try {
      const response = await unfollowPromise;
      if(response.status === 200){
      console.log("UnFollow Request Response:", response);
      setIsFollowing(false);
      setModalOpen(false);
      }
    } catch (err) {
      console.error("Failed to send UnFollow request:", err);
    }
  };

  return (
    <div data-testid="follower-card" className="flex items-center border-b border-gray-300 w-full p-3">
      <img
        src={props.userId ? props.profilePicture ?? "" : props.companyLogo ?? ""}
        alt="Profile Picture or Company Logo"
        className="w-15 h-15 rounded-full object-cover cursor-pointer"
        onClick={props.userId ? handleUserClick : handleCompanyClick}
      />
      <div className="ml-4 flex-grow mr-7">
        {props.userId ? (
          <h3 role="heading" className="font-semibold cursor-pointer hover:underline" onClick={handleUserClick}>
            {props.firstname} {props.lastname}
          </h3>
        ) : (
          <h3 role="heading" className="font-semibold cursor-pointer hover:underline" onClick={handleCompanyClick}>
            {props.companyName}
          </h3>
        )}

        <p className="text-gray-500 cursor-pointer text-base line-clamp-2" onClick={props.userId ? handleUserClick : handleCompanyClick}>
          {props.headline}
        </p>
      </div>
      <div className="w-1/3 flex justify-end items-center">
        <div>
        {isFollowing ? (
        <button
        data-testid="unfollow-button"
        className="border-2 px-9 py-0.5 text-darkGray border-darkGray rounded-full font-semibold hover:bg-lightGray hover:outline-1"
        onClick={handleOpenModal}
        >
        Following
      </button>
      ) : (
      <button
        data-testid="follow-button"
        className="border-2 px-9 py-0.5 text-crimsonRed border-crimsonRed rounded-full font-semibold hover:bg-lightGray hover:outline-1"
        onClick={handleFollowRequest}
        >
        Follow
      </button>
      )}

          <NetworkModal isOpen={modalOpen} onClose={handleCloseModal}>
            <div className="flex flex-col">
              <div className="border-b border-gray-300 py-2">
                <h1 className="font-bold">Unfollow</h1>
              </div>
              <div className="border-b border-gray-300 flex items-center justify-center py-3">
                <p className="font-semibold">
                  You are about to unfollow {props.userId ? `${props.firstname} ${props.lastname}` : props.companyName}
                </p>
              </div>
              <div className="flex items-center justify-end space-x-4 pt-3">
                <button
                  data-testid="unfollow-modal-button"
                  className="cursor-pointer border-2 px-5 py-0.5 rounded-full font-semibold hover:bg-lightGray hover:outline-1 text-crimsonRed border-crimsonRed"
                  onClick={handleConfirmUnfollow}
                >
                  Unfollow
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
      </div>
    </div>
  );
}

export default FollowingCard;