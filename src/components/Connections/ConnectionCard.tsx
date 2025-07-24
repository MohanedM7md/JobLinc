import { useEffect, useRef, useState } from "react";
import { ConnectionInterface } from "../../interfaces/networkInterfaces";
import { useNavigate } from "react-router-dom";
import NetworkModal from "../../components/MyNetwork/NetworkModal";
import { changeConnectionStatus } from "@services/api/networkServices";
import toast from "react-hot-toast";
import useChats from "@hooks/useChats";

function  ConnectionCard(props: ConnectionInterface & { onRemove: (id: string) => void }) {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLButtonElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { setOpnedChats } = useChats();


  
  function getRelativeTime(connectedDate: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - connectedDate.getTime();

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInMinutes < 60) {
      return diffInMinutes === 0
        ? "connected just now"
        : `connected ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    } else if (diffInHours < 24) {
      return `connected ${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else if (diffInDays < 7) {
      return `connected ${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } else if (diffInWeeks < 4) {
      return `connected ${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
    } else if (diffInMonths < 12) {
      return `connected ${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
    } else {
      return `connected ${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
    }
  }

  const handleellipsisClick = () => {
    setShowPopup(!showPopup);
  };
  const handleOpenModal = () => {
    setShowPopup(false);
    setModalOpen(true);
  }
  const handleCloseModal = () => {
    setModalOpen(false);
  }
  const handleRemoveConnection= async ()  => {
    const removeconnectionpromise =  changeConnectionStatus(props.userId, "Canceled");
    removeconnectionpromise.then((response) => {
        toast.promise (
          removeconnectionpromise,
          {
            loading: "Removing Connection...",
            success: "User removed successfully!",
            error: "Failed to remove user. Please try again.",
          }
        )
        if (response?.status === 200) {
          props.onRemove(props.userId)
          console.log("Remove Connection Response:", response);
        } else {
          console.error("Failed to Remove user:", response);
        }
      }).catch((error) => {
        console.error("Error Removing user:", error);
      });
      
    props.onRemove(props.userId);
    handleCloseModal();
  };
  const handleUserClick= () => {  
    navigate(`/profile/${props.userId}`);
  }
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (popupRef.current && (!popupRef.current.contains(event.target as Node)) && iconRef.current && !iconRef.current.contains(event.target as Node)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const { profilePicture: profileImage, firstname: firstName, lastname: lastName, headline: userBio, time: connectedDate} = props;

  return (
    <div 
    data-testid="connection-card"
    className="flex items-center border-b border-gray-300 w-full p-3">
      <img
        src={profileImage}
        alt="Profile Picture"
        className="w-15 h-15 rounded-full object-cover cursor-pointer"
        onClick={handleUserClick}
      />
      <div className="ml-4 flex-grow mr-7">
        <h3 role="heading" className="font-semibold cursor-pointer hover:underline" onClick={handleUserClick}>
          {firstName} {lastName}
        </h3>
        <p className="text-gray-500 cursor-pointer text-base line-clamp-2" onClick={handleUserClick}>{userBio}</p>
        <p className="text-xs text-gray-500">{connectedDate ? getRelativeTime(connectedDate) : "connected date unavailable"}</p>
      </div>
      <div className="w-1/3 flex justify-end items-center">
          <button
            data-testid="message-button"
            className="border-2 px-5 py-0.5 text-crimsonRed border-crimsonRed rounded-full font-semibold hover:bg-lightGray hover:outline-1 cursor-pointer "
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
        <div>
          <i
            data-testid="ellipsis-button"
            className="fa-solid fa-ellipsis mx-3 rounded-full hover:bg-gray-200 p-2 cursor-pointer relative"
            onClick={handleellipsisClick}
            ref={iconRef}
          ></i>
          {showPopup ? (
            <div
              className="popup absolute bg-white border border-gray-300 rounded-md shadow-lg z-10"
              ref = {divRef}
            >
              <button
                data-testid="remove-connection-button"
                className="cursor-pointer flex items-center text-darkGray font-semibold hover:bg-lightGray p-1 rounded-md m-1 mx-2"
                onClick={handleOpenModal} ref={popupRef}
              >
                <i className="fa-solid fa-trash"></i>
                <span className="px-0.5">Remove Connection</span>
              </button>
            </div>
          ) : null}
        </div>
        <NetworkModal isOpen={modalOpen} onClose={handleCloseModal}>
            <div className="flex flex-col">
              <div className="border-b border-gray-300 py-2">
                <h1 className="font-bold">Remove Connection.</h1>
              </div>
              <div className="border-b border-gray-300 flex items-center justify-center py-3">
                <p className="font-normal">Are you sure you want to remove your connection with <span className="font-bold">{firstName} {lastName}</span>?</p>
              </div>
              <div className="flex items-center justify-end space-x-4 pt-3">
                <button 
                data-testid="confirm-remove-connection-button"
                className="cursor-pointer border-2 px-5 py-0.5 rounded-full font-semibold hover:bg-lightGray hover:outline-1 text-crimsonRed border-crimsonRed"
                 onClick={handleRemoveConnection}>
                  Remove
                </button>
                <button 
                data-testid="cancel-remove-connection-button"
                className="cursor-pointer border-2 px-5 py-0.5 rounded-full font-semibold hover:bg-lightGray hover:outline-1 text-darkGray border-darkGray" onClick={handleCloseModal}>
                  cancel
                </button>
              </div>
            </div>
          </NetworkModal>
      </div>
    </div>
  );
}

export default ConnectionCard;