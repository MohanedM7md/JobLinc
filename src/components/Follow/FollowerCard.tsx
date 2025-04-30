import { FollowInterface } from "@interfaces/networkInterfaces";
import NetworkModal from "../MyNetwork/NetworkModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { removeFollowerRequest } from "@services/api/networkServices";

function FollowerCard(props: FollowInterface & { onRemove: (id: string) => void }) {
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

  const handleRemoveFollower = async () => {
    const id = props.userId ?? props.companyId;
    if (!id) {
      console.log("user or company id is null");
      return;
    }

    const removePromise = removeFollowerRequest(id);
    toast.promise(removePromise, {
      loading: "Removing follower...",
      success: `${props.firstName ?? props.companyName ?? `user`} removed successfully!`,
      error: `Failed to remove ${props.firstName ?? props.companyName ?? `user`}. Please try again.`,
    });

    try {
      const response = await removePromise;
      console.log("Remove Follower Request Response:", response);
      setModalOpen(false);
      props.onRemove(id);
    } catch (err) {
      console.error("Failed to remove follower:", err);
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
            {props.firstName} {props.lastName}
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
        <button
          data-testid="remove-follower-button"
          className="border-2 px-4 py-0.5 text-darkGray border-darkGray rounded-full font-semibold hover:bg-lightGray hover:outline-1"
          onClick={handleOpenModal}
        >
          Remove Follower
        </button>

        <NetworkModal isOpen={modalOpen} onClose={handleCloseModal}>
          <div className="flex flex-col">
            <div className="border-b border-gray-300 py-2">
              <h1 className="font-bold">Remove Follower</h1>
            </div>
            <div className="border-b border-gray-300 flex items-center justify-center py-3">
              <p className="font-semibold">
                Are you sure you want to remove {props.userId ? `${props.firstName} ${props.lastName}` : props.companyName}?
              </p>
            </div>
            <div className="flex items-center justify-end space-x-4 pt-3">
              <button
                data-testid="remove-modal-button"
                className="cursor-pointer border-2 px-5 py-0.5 rounded-full font-semibold hover:bg-lightGray hover:outline-1 text-crimsonRed border-crimsonRed"
                onClick={handleRemoveFollower}
              >
                Remove
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
  );
}

export default FollowerCard;