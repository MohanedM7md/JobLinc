import NetworkModal from "../../components/MyNetwork/NetworkModal";
import { ConnectionInterface } from "@interfaces/networkInterfaces";
import { sendConnectionRequest } from "@services/api/networkServices";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function UserConnectionCard(props: ConnectionInterface ){
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const handleUserClick= () => {  
        navigate(`/profile/${props.userId}`);
        console.log("User ID:", props.userId);
      }
      const handlelincClick = async () => {
          if (!isClicked) {
            const connectionPromise = sendConnectionRequest(props.userId);
      
            
            try {
              const response = await connectionPromise;
              console.log("Connection Request Response:", response);
              
              toast.promise(connectionPromise, {
                loading: "Sending connection request...",
                success: "Connection sent successfully!",
                error: "Failed to send connection request. Please try again.",
            });
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
    return(
    <div
    data-testid="connection-card"
    className="flex items-center border-b border-gray-300 w-full p-3">
      <img
        src={props.profilePicture}
        alt="Profile Picture"
        className="w-15 h-15 rounded-full object-cover cursor-pointer"
        onClick={handleUserClick}
      />
      <div className="ml-4 flex-grow mr-7">
        <h3 role="heading" className="font-semibold cursor-pointer hover:underline" onClick={handleUserClick}>
          {props.firstName} {props.lastName}
        </h3>
        <p className="text-gray-500 cursor-pointer text-base line-clamp-2" onClick={handleUserClick}>{props.headline}</p>
        <p className="text-xs text-gray-500">{props.city}, {props.country}</p>
      </div>
      <div className="w-1/3 flex justify-end items-center">
      {props.connectionStatus === "pending" ? (
        <div className="">
          <button
            data-testid="linc-button"
            onClick={handlelincClick}
            className={`border-2 px-9 py-0.5 ${
              isClicked ? "text-darkGray border-darkGray" : "text-crimsonRed border-crimsonRed"
            } rounded-full font-semibold hover:bg-lightGray hover:outline-1`}
          >
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
        ) : 
        <Link data-testid="message-button-route" to="/messaging">
        <button
          data-testid="message-button"
          className="border-2 px-5 py-0.5 text-crimsonRed border-crimsonRed rounded-full font-semibold hover:bg-lightGray hover:outline-1 cursor-pointer">
          Message
        </button>
        </Link>
      }
        </div>
    </div>
    );
}
export default UserConnectionCard;