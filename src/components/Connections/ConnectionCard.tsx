import { ConnectionCardProps } from "../../interfaces/networkInterfaces";

function ConnectionCard(props: ConnectionCardProps) {
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
    }
    else {
      return `connected ${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
    }
  }

  const { profileImage, firstName, lastName, userBio, connectedDate } = props;

  return (
    <div className="flex items-center border-b border-gray-300 w-full p-3">
      <img
        src={profileImage}
        alt="Profile Picture"
        className="w-15 h-15 rounded-full object-cover cursor-pointer"
      />
      <div className="ml-4 flex-grow">
        <h3 className="font-semibold cursor-pointer hover:underline">
          {firstName} {lastName}
        </h3>
        <p className="text-gray-500 cursor-pointer">{userBio}</p>
        <p className="text-xs text-gray-500">{getRelativeTime(connectedDate)}</p>
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