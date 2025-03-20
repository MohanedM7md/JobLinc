import React, { useEffect, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import Checkbox from "./UI/CheckBox";
import { ChatCardProps } from "./interfaces/Chat.interfaces";

export default function ChatCard({
  chatId,
  chatPicture,
  chatName,
  lastMessage,
  sentDate,
  onClick,
  unseenCount,
  isRead,
  className = "w-full",
}: ChatCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const handleDelete = () => {
    console.log(`Deleting chat: ${chatId}`);
    setIsMenuOpen(false);
  };

  const handleMarkReadUnread = () => {
    console.log(`Toggling read/unread for: ${chatId}`);
    setIsMenuOpen(false);
  };

  return (
    <div
      onClick={onClick}
      id={chatId}
      className={`${className} ${!isRead ? "bg-SoftRed hover:bg-hoverSoftRed" : "bg-charcoalWhite hover:bg-gray-200"}  
  flex items-center p-3 cursor-pointer relative rounded-lg shadow-sm group`}
    >
      <div className="relative w-12 h-12 shrink-0 group">
        <img
          className="rounded-full w-full h-full object-cover"
          alt={chatName}
          src={chatPicture}
        />
        <div
          className="absolute inset-0 flex items-center justify-center bg-darkGray bg-opacity-50
      rounded-full opacity-0 group-hover:opacity-100 transition-all"
        >
          <Checkbox />
        </div>
      </div>

      <div className="flex flex-1 justify-between items-center ml-3 overflow-hidden">
        <div className="flex flex-col overflow-hidden">
          <div className="font-medium">{chatName}</div>
          <div className="text-sm text-gray-500 truncate max-w-[250px]">
            {lastMessage}
          </div>
        </div>

        <div className="flex items-center gap-2 min-w-[60px] justify-end">
          <span className="text-xs text-gray-400">{sentDate}</span>
          <button
            onClick={toggleMenu}
            className={`p-2 rounded-full z-20 transition
          ${!isRead ? "hover:bg-hoverDarkBurgundy" : "hover:bg-gray-300"}`}
          >
            <EllipsisVertical className="w-5 h-5 text-gray-600 dark:text-gray-300 opacity-0 group-hover:opacity-100" />
          </button>
          {isMenuOpen && (
            <div className="absolute top-12 right-3 w-36 bg-white shadow-md rounded-md p-2 z-50">
              <button
                className="w-full text-left px-3 py-1 text-sm hover:bg-gray-200"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="w-full text-left px-3 py-1 text-sm hover:bg-gray-200"
                onClick={handleMarkReadUnread}
              >
                {isRead ? "Mark as Unread" : "Mark as Read"}
              </button>
            </div>
          )}

          {unseenCount > 0 && (
            <div
              className="absolute top-2 right-3 text-xs text-white bg-red-500 rounded-full px-1 
          opacity-100 group-hover:opacity-0"
            >
              {unseenCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
