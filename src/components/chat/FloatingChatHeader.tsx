import React from "react";
import { MoreHorizontal, X } from "lucide-react";

interface ChatInfo {
  title: string;
  profilePicture: string;
  status: "online" | "offline";
}

interface ChatHeaderProps {
  onClick?: () => void;
  chatInfo: ChatInfo;
  onClose: () => void;
}

function FloatingChatHeader({ onClick, chatInfo, onClose }: ChatHeaderProps) {
  return (
    <div
      className={`flex items-center justify-between bg-charcoalWhite dark:bg-darkGray 
        p-2 text-charcoalBlack dark:text-charcoalBlack rounded-t-lg border-b-2 z-10
        border-gray-200 dark:border-mutedSilver cursor-pointer h-[60px] `}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img
            src={chatInfo.profilePicture}
            alt={chatInfo.title}
            className="w-10 h-10 rounded-full"
          />

          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${
              chatInfo.status === "online" ? "bg-green-500" : "bg-mutedSilver"
            }`}
          />
        </div>

        <div>
          <p className="text-lg font-semibold">{chatInfo.title}</p>
          <p className="text-sm text-mutedSilver">
            {chatInfo.status === "online" ? "Available" : "Offline"}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button className="text-mutedSilver hover:text-darkBurgundy dark:hover:text-charcoalWhite">
          <MoreHorizontal size={20} />
        </button>
        <button
          onClick={onClose}
          className="text-mutedSilver hover:text-darkBurgundy dark:hover:text-charcoalWhite"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}

export default FloatingChatHeader;
