import { searchUserInterface } from "@interfaces/networkInterfaces";

interface UserCardProps {
  user: searchUserInterface;
}

function UserCard({ user }: UserCardProps) {
  const headline = user.experiences[0]?.replace(/ at .*/, '') || 'Professional';

  return (
    <div className="flex p-1.5 w-full max-w-[300px] bg-white hover:bg-gray-50 rounded-md transition-colors duration-150 cursor-pointer">
      <div className="flex justify-between items-center w-full gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h2 className="text-sm font-medium text-gray-800 truncate">
              {user.firstname} {user.lastname}
            </h2>
            <span className="text-red-600 text-xs">•</span>
            <p className="text-xs text-gray-600 truncate flex-1">
              {headline}
            </p>
          </div>
        </div>

       
        <div className="flex-shrink-0">
          <img
            src={user.profilePicture || 'src/assets/Tyrone.jpg'}
            alt={`${user.firstname} ${user.lastname}`}
            className="w-9 h-9 rounded-full border-[0.5px] border-red-600/10 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default UserCard;