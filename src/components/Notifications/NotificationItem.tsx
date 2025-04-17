import React from "react";
import { FaComment, FaHeart, FaEnvelope } from "react-icons/fa";

type Notification = {
  id: number;
  type: "message" | "like" | "comment";
  content: string;
  avatarUrl: string;
  messagePreview?: string;
  isRead: boolean;
  onClick: () => void;
};

const iconMap = {
  message: <FaEnvelope className="text-pink-500 text-sm" />,
  comment: <FaComment className="text-blue-500 text-sm" />,
  like: <FaHeart className="text-red-500 text-sm" />,
};

const NotificationItem: React.FC<Notification> = ({
  type,
  content,
  avatarUrl,
  messagePreview,
  isRead,
  onClick,
}) => {
  return (
    <div
      className={`flex p-3 rounded-lg mb-3 border transition-all cursor-pointer shadow-sm group ${
        isRead
          ? "bg-white border-gray-200 hover:bg-gray-50"
          : "bg-gray-50 border-blue-300 hover:bg-blue-50"
      }`}
      onClick={onClick}
    >
      <img
        src={avatarUrl}
        alt="avatar"
        className="w-10 h-10 rounded-full object-cover mr-3 mt-1"
      />

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {iconMap[type]}
            <p className="text-sm text-gray-800 leading-snug">{content}</p>
          </div>

          {!isRead && (
            <span className="w-2 h-2 rounded-full bg-blue-500 mt-1" />
          )}
        </div>

        {type === "message" && messagePreview && (
          <p className="text-xs text-gray-500 mt-1 italic ml-6">
            {messagePreview}
          </p>
        )}

        <p className="text-xs text-gray-400 mt-1 ml-6">Just now</p>
      </div>
    </div>
  );
};

export default NotificationItem;
