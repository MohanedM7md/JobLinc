import { BlockedUserInterface } from "@interfaces/networkInterfaces";
import { changeConnectionStatus } from "@services/api/networkServices";
import toast from "react-hot-toast";

function BlockedUserCard(props : BlockedUserInterface & { onRemove: (id: string) => void }) {
  const { firstname: firstName, lastname: lastName, profilePicture, userId } = props;
  const handleUnblockClick = () => {
    const unblockPromise = changeConnectionStatus(userId, "Unblock");
    toast.promise(
      unblockPromise,
      {
        loading: "Unblocking user...",
        success: "User unblocked successfully!",
        error: "Failed to unblock user. Please try again.",
      }
    );
    unblockPromise.then((response) => {
      if (response?.status === 200) {
        props.onRemove(props.userId)
        console.log("Unblock Response:", response);
      } else {
        console.error("Failed to unblock user:", response);
      }
    }).catch((error) => {
      console.error("Error unblocking user:", error);
    });
  }
  return (
    <div 
    data-testid="connection-card"
    className="flex items-center border-b border-gray-300 w-full p-3">
      <img
        src={profilePicture}
        alt="Profile Picture"
        className="w-15 h-15 rounded-full object-cover cursor-pointer"
      />
      <div className="ml-4 flex-grow mr-7">
        <h3 role="heading" className="font-semibold cursor-pointer hover:underline">
          {firstName} {lastName}
        </h3>
        <p className="text-gray-500 cursor-pointer text-base line-clamp-2"></p>
      </div>
      <div className="w-1/3 flex justify-end items-center">
          <button
            data-testid="message-button"
            className="border-2 px-5 py-0.5 text-crimsonRed border-crimsonRed rounded-full font-semibold hover:bg-lightGray hover:outline-1 cursor-pointer "
            onClick={handleUnblockClick}
          >
            Unblock
          </button>
    </div>
    </div>
  );
}
export default BlockedUserCard;