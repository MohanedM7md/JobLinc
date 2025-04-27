import { memo } from "react";
import { ReqChatCardProps } from "./interfaces/Chat.interfaces";
import { getRelativeTimeString } from "@utils/DateFormatter";
import { X, Check } from "lucide-react";

function ReqChatCard({
  chatId,
  chatPicture,
  chatName,
  lastMessage,
  sentDate,
  unreadCount,
  isRead,
  senderName,
  handleAcceptRequest,
  handleRejectRequest,
}: ReqChatCardProps) {
  return (
    <div
      className="
        flex items-center w-full px-4 py-3 mb-3
        bg-white rounded-xl
        border border-gray-100
        transition-all duration-200
        hover:bg-gray-50 hover:shadow-md
        cursor-pointer
      "
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <img
          src={chatPicture[0] || "/default-avatar.png"}
          alt={chatName}
          className="w-12 h-12 rounded-full object-cover"
        />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-blue-500 text-white text-xs font-bold">
            {unreadCount}
          </span>
        )}
      </div>

      {/* Chat info */}
      <div className="flex-1 min-w-0 ml-4">
        <div className="flex justify-between items-baseline">
          <h3 className="font-medium text-gray-900 truncate">{chatName}</h3>
        </div>
        <p className="text-sm text-gray-500 truncate mt-0.5">{lastMessage}</p>
      </div>

      {/* Action section with date above buttons */}
      <div className="flex flex-col items-end ml-4">
        {/* Date positioned above buttons */}
        <span className="text-xs text-gray-400 mb-2">
          {getRelativeTimeString(sentDate)}
        </span>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAcceptRequest(chatId);
            }}
            className="
              p-1.5 rounded-full
              text-green-600 bg-green-50
              hover:bg-green-100 hover:text-green-700
              focus:outline-none focus:ring-2 focus:ring-green-200
              transition-colors duration-150
            "
            title="Accept Chat Request"
          >
            <Check size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRejectRequest(chatId);
            }}
            className="
              p-1.5 rounded-full
              text-red-600 bg-red-50
              hover:bg-red-100 hover:text-red-700
              focus:outline-none focus:ring-2 focus:ring-red-200
              transition-colors duration-150
            "
            title="Reject Chat Request"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(ReqChatCard);
