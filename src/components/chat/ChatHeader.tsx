import React from "react";
import { MoreHorizontal, X } from "lucide-react";

interface User {
  name: string;
  profilePicture: string;
  status: "online" | "offline";
}

interface ChatHeaderProps {
  onClick?: () => void;
  user: User;
  onClose: () => void;
}

function ChatHeader({ onClick, user, onClose }: ChatHeaderProps) {
  return (
    <div
      className={`flex items-center justify-between bg-charcoalWhite 
        p-2 dark:text-charcoalBlack rounded-t-lg border-b-1 z-10
        border-gray-300 cursor-pointer h-[60px] `}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img
            src={user.profilePicture}
            alt={user.name}
            className="w-10 h-10 rounded-full"
          />

          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${
              user.status === "online" ? "bg-green-500" : "bg-mutedSilver"
            }`}
          />
        </div>

        <div>
          <p className="text-lg font-semibold">{user.name}</p>
          <p className="text-sm text-mutedSilver">
            {user.status === "online" ? "Available" : "Offline"}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2 ">
        <button className="text-mutedSilver hover:text-warmBlack">
          <MoreHorizontal size={20} />
        </button>
        <button
          onClick={onClose}
          className="text-mutedSilver hover:text-warmBlack"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
