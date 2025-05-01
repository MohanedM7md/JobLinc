import { searchUserInterface } from "@interfaces/networkInterfaces";
import { sendConnectionRequest } from "@services/api/networkServices";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function PeopleCard(props: searchUserInterface) {
  const navigate = useNavigate();
  const [connectionStatus, setConnectionStatus] = useState(props.connectionStatus);

  const handleUserClick = () => {  
    navigate(`/profile/${props.userId}`);
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
      if (response.status === 200) { 
        setConnectionStatus("Connected");
      }
    } catch (err) {
      console.error("Failed to send connection request:", err);
    }
  };

  return (
    <div data-testid="people-card" className="flex border-b border-gray-300 w-full p-3">
      <img
        src={props.profilePicture}
        alt="Profile"
        className="w-15 h-15 rounded-full object-cover cursor-pointer"
        onClick={handleUserClick}
      />
      <div className="ml-4 flex-grow mr-7">
        <h3 className="font-semibold cursor-pointer hover:underline" onClick={handleUserClick}>
          {props.firstname} {props.lastname}
        </h3>
        <p className="text-gray-500 text-base">
          {props.city}, {props.country}
        </p>
        <p className="text-xs text-gray-500">
          {props.mutualConnections} mutual connections
        </p>
      </div>
      <div className="w-1/3 flex justify-end items-center">
        {connectionStatus === "Connected" ? (
          <Link data-testid="message-button-route" to="/messaging">
            <button
              data-testid="message-button"
              className="border-2 px-5 py-0.5 text-crimsonRed border-crimsonRed rounded-full font-semibold hover:bg-lightGray hover:outline-1 cursor-pointer"
            >
              Message
            </button>
          </Link>
        ) : (
          <button
            data-testid="linc-button"
            onClick={handleLincClick}
            className="border-2 px-9 py-0.5 text-crimsonRed border-crimsonRed rounded-full font-semibold hover:bg-lightGray hover:outline-1 cursor-pointer"
          >
            Linc
          </button>
        )}
      </div>
    </div>
  );
}

export default PeopleCard;