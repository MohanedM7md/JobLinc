import NetworkModal from "../../components/MyNetwork/NetworkModal";
import { ConnectionInterface } from "@interfaces/networkInterfaces";
import { changeConnectionStatus, sendConnectionRequest } from "@services/api/networkServices";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useChats from "@hooks/useChats";



function UserConnectionCard(props: ConnectionInterface) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(props.connectionStatus);
  const { setOpnedChats } = useChats();




const handleUserClick = () => {  
      navigate(`/profile/${props.userId}`);
      console.log("User ID:", props.userId);
  };


const handleLincClick = async () => {
    const connectionPromise = sendConnectionRequest(props.userId);
    toast.promise(connectionPromise, { 
        loading: "Sending connection request...", 
        success: "Connection sent successfully!", 
        error: "Failed to send connection request. Please try again.", 
    });
    try {
        const response = await connectionPromise;
        console.log("Connection Request Response:", response);
        if (response.status === 200) { 
            setConnectionStatus("Pending");
        }
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
    const withdrawRequestPromise = changeConnectionStatus(props.userId, "Canceled");
    toast.promise(withdrawRequestPromise, { 
        loading: "Withdrawing connection request...", 
        success: "Request Withdrawn successfully!", 
        error: "Failed to withdraw connection request. Please try again." 
    });
    try {
        const response = await withdrawRequestPromise;
        if (response?.status === 200) { 
            console.log("Withdraw Request response:", response);
            setConnectionStatus("Canceled");
        } else {
            console.error("Failed to withdraw connection request:", response);
        }
    } catch (error) {
        console.error("Failed to withdraw connection request:", error);
    }
    setModalOpen(false);
};
  return (
      <div data-testid="connection-card" className="flex items-center border-b border-gray-300 w-full p-3">
          <img
              src={props.profilePicture}
              alt="Profile Picture"
              className="w-15 h-15 rounded-full object-cover cursor-pointer"
              onClick={handleUserClick}
          />
          <div className="ml-4 flex-grow mr-7">
              <h3 role="heading" className="font-semibold cursor-pointer hover:underline" onClick={handleUserClick}>
                  {props.firstname} {props.lastname}
              </h3>
              <p className="text-gray-500 cursor-pointer text-base line-clamp-2" onClick={handleUserClick}>{props.headline}</p>
              <p className="text-xs text-gray-500">{props.city}, {props.country}</p>
          </div>
          <div className="w-1/3 flex justify-end items-center">
              {connectionStatus === "Accepted" ? (

                      <button data-testid="message-button" 
                      className="border-2 px-5 py-0.5 text-crimsonRed border-crimsonRed rounded-full font-semibold hover:bg-lightGray hover:outline-1 cursor-pointer"
                      onClick={() => {
                        setOpnedChats((prevChats) => [
                          ...prevChats,
                          {
                            chatId: "",
                            usersId: [props.userId],
                            chatName: props.firstname,
                            chatImage: [props.profilePicture],
                          },
                        ]);
                      }}
                      >
                          Message
                      </button>

              ) : connectionStatus === "Pending" ? (
                  <button
                      data-testid="pending-button"
                      className="border-2 px-6 py-0.5 text-darkGray border-darkGray rounded-full font-semibold hover:bg-lightGray hover:outline-1 cursor-default"
                      onClick={handleAssuringModal}
                  >
                      Pending
                  </button>
              ) : (
                  <button
                      data-testid="linc-button"
                      onClick={handleLincClick}
                      className="border-2 px-9 py-0.5 text-crimsonRed border-crimsonRed rounded-full font-semibold hover:bg-lightGray hover:outline-1 cursor-pointer"
                  >
                      Linc
                  </button>
              )}
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
      </div>
  );
}
export default UserConnectionCard;