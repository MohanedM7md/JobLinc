import { useState } from "react";
import { sendConnectionRequest } from "@services/api/networkServices";
import { toast } from "react-hot-toast";
import NetworkModal from "./NetworkModal";
import { connectsInterface } from "interfaces/networkInterfaces";
import { useNavigate } from "react-router-dom";

function ConnectCard(props: connectsInterface) {
  const [isClicked, setIsClicked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handlelincClick = async () => {
    if (!isClicked) {
      const connectionPromise = sendConnectionRequest("targetuserid", "currentUserId");

      toast.promise(connectionPromise, {
        loading: "Sending connection request...",
        success: "Connection sent successfully!",
        error: "Failed to send connection request. Please try again.",
      });

      try {
        const response = await connectionPromise;
        console.log("Connection Request Response:", response);
        setIsClicked(true);
      } catch (err) {
        console.error("Failed to send connection request:", err);
      }
    } else {
      handleassuringmodal();
    }
  };

  const handleassuringmodal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleWithdrawModal = () => {
    setModalOpen(false);
    setIsClicked(false);
  };
  const handleNavigate = () => {
    navigate(`/profile/${props.userId}`);
  }

  return (
    <div
      data-testid="connect-card"
      className="border-2 border-gray-200 rounded-xl flex-col w-57 h-80 justify-center items-center cursor-pointer"
    >
      <div className="relative flex flex-col w-full h-7/20 justify-center items-center" onClick={()=>handleNavigate()}>
        <img
          src={props.profilePicture}
          alt={`User Profile Photo`}
          className="absolute w-29 h-29 rounded-full top-7/20 object-cover shadow-sm"
        />
        <img
          src="src/assets/Cinema.jpg"
          alt="Cover Image"
          className="w-full h-full border-b-1 border-gray-300 rounded-t-lg"
        />
      </div>
      <div className="relative flex flex-col w-full h-13/20 justify-around items-center" onClick={()=>handleNavigate()}>
        <div className="flex flex-col w-full justify-center items-center mt-12">
          <p className="font-semibold text-md text-center">
            {props.firstName} {props.lastName}
          </p>
          <p className="line clamp-2 text-gray-500 text-md text-center">{props.headline}</p>
        </div>
        <div className="flex w-full justify-center items-center" onClick={()=>handleNavigate()} >
          <p className="flex items-center space-x-2">
            <img
              src={props.profilePicture}
              alt="Mutual Friend Photo"
              className="w-8 h-8 rounded-full top-1/5 object-cover shadow-sm"
            />
            <span className="line-clamp-3 text-xs text-gray-500 ">{`${props.Mutuals} Mutual connections.`}</span>
          </p>
        </div>
        <div className="flex flex-col w-full justify-center items-center">
          <button
            data-testid="linc-button"
            onClick={handlelincClick}
            className={`border-2 px-15 py-0.5 ${
              isClicked ? "text-darkGray border-darkGray" : "text-crimsonRed border-crimsonRed"
            } rounded-full font-semibold hover:bg-lightGray hover:outline-1`}
          >
            <i
              className={`${
                isClicked ? "fa-regular fa-clock" : "fa-solid fa-user-plus"
              } mr-1`}
            ></i>
            {isClicked ? "Pending" : "Linc"}
          </button>
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
                  withdraw
                </button>
                <button
                  data-testid="cancel-modal-button"
                  className="cursor-pointer border-2 px-5 py-0.5 rounded-full font-semibold hover:bg-lightGray hover:outline-1 text-darkGray border-darkGray"
                  onClick={handleCloseModal}
                >
                  cancel
                </button>
              </div>
            </div>
          </NetworkModal>
        </div>
      </div>
    </div>
  );
}

export default ConnectCard;