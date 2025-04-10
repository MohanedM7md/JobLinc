import { ConnectionCardProps } from "../../interfaces/networkInterfaces";

function ConnectionCard(props : ConnectionCardProps) {
  return (
    <div className="flex items-center border-b border-gray-300 w-full p-3">
      <img
        src={props.profileImage}
        alt="Profile Picture"
        className="w-15 h-15 rounded-full object-cover cursor-pointer"
      />
      <div className="ml-4 flex-grow">
        <h3 className="font-semibold cursor-pointer hover:underline">
          {props.firstName} {props.lastName}
        </h3>
        <p className="text-gray-500 cursor-pointer">{props.userBio}</p>
        <p className="text-xs text-gray-500">{props.connectedDate}</p>
      </div>
      <div>
        <button
          id="msgbuttonid"
          className={`border-2 px-5 py-0.5 text-crimsonRed border-crimsonRed 
          rounded-full font-semibold hover:bg-lightGray hover:outline-1 cursor-pointer`}
        >
          Message
        </button>
        <i className="fa-solid fa-ellipsis mx-3 rounded-full hover:bg-gray-200 p-2 cursor-pointer"></i>
      </div>
    </div>
  );
}

export default ConnectionCard;