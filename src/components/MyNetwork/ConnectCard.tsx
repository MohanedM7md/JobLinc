import { useState } from "react";
import { sendConnectionRequest } from "@services/api/networkServices";
import NetworkModal from "./NetworkModal";

interface ProfilePictureProps {
  lincbuttonid: string; 
  profilePicture: string;
  userName: string; 
  userBio: string; 
  Mutuals: string;
}

function ConnectCard(props: ProfilePictureProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ modalOpen, setModalOpen] = useState(false);

  const handlelincClick = async () => {
    if (!isClicked) {
      setLoading(true);
      setError(null);

      try {
        const response = await sendConnectionRequest("targetuserid", "currentUserId");
        console.log("Connection Request Response:", response);
        setIsClicked(true);
      } catch (err) {
        console.error("Failed to send connection request:", err);
        setError("Unable to send connection request. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setIsClicked(false);
      handleassuringmodal();
    }
  };
  const handleassuringmodal = () => {
    setModalOpen(true);
  }
  const handleCloseModal = () => { 
    setModalOpen(false);
  }

  return (
    <div className="border-2 border-gray-200 rounded-xl flex-col w-57 h-80 justify-center items-center cursor-pointer">
      <div className="relative flex flex-col w-full h-7/20 justify-center items-center">
        <img
          src={props.profilePicture}
          alt="User Profile Photo"
          className="absolute w-29 h-29 rounded-full top-7/20 object-cover shadow-sm"
        />
        <img
          src="src/assets/Cinema.jpg"
          alt="Cover Image"
          className="w-full h-full border-b-1 border-gray-300 rounded-t-lg"
        />
      </div>
      <div className="relative flex flex-col w-full h-13/20 justify-around items-center">
        
        <div className="flex flex-col w-full justify-center items-center mt-12">
          <p className="font-semibold text-md text-center">{props.userName}</p>
          <p className="line clamp-2 text-gray-500 text-md text-center">{props.userBio}</p>
        </div>
        <div className="flex w-full justify-center items-center">
          <p className="flex items-center space-x-2">
            <img
              src={props.profilePicture}
              alt="Mutual Friend Photo"
              className="w-8 h-8 rounded-full top-1/5 object-cover shadow-sm"
            />
            <span className="line-clamp-3 text-xs text-gray-500 ">{props.Mutuals}</span>
          </p>
        </div>
        <div className="flex flex-col w-full justify-center items-center">
          <button
            id={props.lincbuttonid}
            onClick={handlelincClick}
            disabled={loading}
            className={`border-2 px-15 py-0.5 ${
              isClicked ? "text-darkGray border-darkGray" : "text-crimsonRed border-crimsonRed"
            } rounded-full font-semibold hover:bg-lightGray hover:outline-1`}
          >
            {loading ? (
              <span>Loading...</span>
            ) : (
              <i
                className={`${
                  isClicked ? "fa-regular fa-clock" : "fa-solid fa-user-plus"
                } mr-1`}
              ></i>
            )}
            {isClicked ? "Pending" : "Linc"}
          </button>
          <NetworkModal isOpen={modalOpen} onClose={handleCloseModal}>
            <div className="flex flex-col">
              <div className="border-b border-gray-300 py-2">
                <h1 className="font-bold">Withdraw Invitation.</h1>
              </div>
              <div className="border-b border-gray-300 flex items-center justify-center py-3">
                <p className="font-semibold">Are you sure you want to withdraw your invitation?</p>
              </div>
              <div className="flex items-center justify-end space-x-4 pt-3">
                <button className="cursor-pointer border-2 px-5 py-0.5 rounded-full font-semibold hover:bg-lightGray hover:outline-1 text-crimsonRed border-crimsonRed" onClick={handleCloseModal}>
                  withdraw
                </button>
                <button className="cursor-pointer border-2 px-5 py-0.5 rounded-full font-semibold hover:bg-lightGray hover:outline-1 text-darkGray border-darkGray" onClick={handleCloseModal}>
                  cancel
                </button>
              </div>
            </div>
          </NetworkModal>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>} 
        </div>
      </div>
    </div>
  );
}

export default ConnectCard;