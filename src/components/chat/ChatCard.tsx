import React, { useEffect, useState, useRef } from "react";
import { EllipsisVertical } from "lucide-react";
import { useUnreadCount } from "@context/UnreadCountProvider";
import { getRelativeTimeString } from "@utils/DateFormatter";
import { ChatCardProps } from "./interfaces/Chat.interfaces";
import ChatAvatarGrid from "./ChatAvatarGrid";
import { ReadToggler } from "@services/api/chatServices";

export default function ChatCard({
  chatId,
  chatPicture,
  chatName,
  lastMessage,
  sentDate,
  onClick,
  unreadCount,
  isRead,
  senderName,
  className = "w-full",
}: ChatCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [markAsRead, setMarkAsRead] = useState(isRead);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setMarkAsRead(isRead);
  }, [isRead]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Deleting chat: ${chatId}`);
    setIsMenuOpen(false);
  };

  const handleMarkReadUnread = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    ReadToggler(chatId);
    setMarkAsRead((prev) => !prev);
  };

  const handleClick = async (e: React.MouseEvent) => {
    setMarkAsRead(true);

    if (onClick) {
      onClick();
    }
  };

  const getCompactTimeString = (date: Date) => {
    const timeString = getRelativeTimeString(date);

    if (window.innerWidth < 640) {
      return timeString
        .replace("minutes", "m")
        .replace("minute", "m")
        .replace("hours", "h")
        .replace("hour", "h")
        .replace("days", "d")
        .replace("day", "d")
        .replace("weeks", "w")
        .replace("week", "w");
    }

    return timeString;
  };

  return (
    <div
      onClick={handleClick}
      data-testid={chatId}
      className={`flex items-center p-3 cursor-pointer
                  relative rounded-lg shadow-sm group
                ${className} ${!markAsRead ? "bg-SoftRed hover:bg-hoverSoftRed" : "bg-charcoalWhite hover:bg-gray-200"}  `}
    >
      <div className="relative w-12 h-12 shrink-0 group">
        <ChatAvatarGrid chatName={chatName} chatPicture={chatPicture} />
        <div
          className="absolute inset-0 flex items-center justify-center 
            bg-darkGray bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-all"
        ></div>
      </div>

      <div className="flex-1 flex flex-col ml-3 overflow-hidden min-w-0">
        <div className="flex justify-between items-center w-full">
          <div className="font-medium truncate pr-1">{chatName}</div>
          <div className="flex items-center shrink-0">
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {getCompactTimeString(sentDate)}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center w-full mt-0.5">
          <div className="text-sm text-gray-500 truncate pr-2 flex-1">
            {`${senderName ? senderName + ": " : ""}    ${lastMessage}`}
          </div>

          <div className="flex items-center shrink-0">
            <button
              ref={buttonRef}
              onClick={toggleMenu}
              className={`p-1.5 rounded-full z-20 transition
              ${!markAsRead ? "hover:bg-hoverDarkBurgundy" : "hover:bg-gray-300"}`}
            >
              <EllipsisVertical
                data-testid="chatdCard-ellipsis"
                className="w-4 h-4 text-gray-600 dark:text-gray-300 opacity-0 group-hover:opacity-100"
              />
            </button>

            {!markAsRead && (
              <div
                data-testid="unseen-count"
                className="ml-1 text-xs text-white bg-red-400 rounded-full w-4 h-4 flex items-center justify-center
                          opacity-100 group-hover:opacity-0"
              >
                {unreadCount ? unreadCount : null}
              </div>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute top-12 right-3 w-36 bg-white shadow-md rounded-md p-2 z-50"
          onClick={(e) => e.stopPropagation()}
        >
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
            {markAsRead ? "Mark as Unread" : "Mark as Read"}
          </button>
        </div>
      )}
    </div>
  );
}
