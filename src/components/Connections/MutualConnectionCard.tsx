import { ConnectionInterface } from "@interfaces/networkInterfaces";
import { Link, useNavigate } from "react-router-dom";

function MutualConnectionCard(props: ConnectionInterface ){
    const navigate = useNavigate();
    const handleUserClick= () => {  
        navigate(`/profile/${props.userId}`);
        console.log("User ID:", props.userId);
      }
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
          {props.firstname} {props.lastname}
        </h3>
        <p className="text-gray-500 cursor-pointer text-base line-clamp-2" onClick={handleUserClick}>{props.headline}</p>
        <p className="text-xs text-gray-500">{props.city}, {props.country}</p>
      </div>
      <div className="w-1/3 flex justify-end items-center">
        <Link data-testid="message-button-route" to="/messaging">
        <button
          data-testid="message-button"
          className="border-2 px-5 py-0.5 text-crimsonRed border-crimsonRed rounded-full font-semibold hover:bg-lightGray hover:outline-1 cursor-pointer">
          Message
        </button>
        </Link>
        </div>
    </div>
    );
}
export default MutualConnectionCard;