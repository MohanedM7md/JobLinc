import React, { useEffect, useState, useRef } from "react";
import { EllipsisVertical } from "lucide-react";
import Checkbox from "./UI/CheckBox";
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
  className = "w-full",
}: ChatCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [markAsRead, setMarkAsRead] = useState(isRead);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMarkAsRead(isRead);
  }, [isRead]);

  // Close menu when clicking outside
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
  console.log("chat cards updating chatName", chatName);
  console.log("is my crad Read", isRead);
  console.log("is my crad Read", unreadCount);
  return (
    <div
      onClick={handleClick}
      data-testid={chatId}
      className={`${className} flex items-center p-3 cursor-pointer
                  relative rounded-lg shadow-sm group
                ${!markAsRead ? "bg-SoftRed hover:bg-hoverSoftRed" : "bg-charcoalWhite hover:bg-gray-200"} `}
    >
      <div className="relative w-12 h-12 shrink-0 group">
        <ChatAvatarGrid chatName={chatName} chatPicture={chatPicture} />
        <div
          className="absolute inset-0 flex items-center justify-center 
            bg-darkGray bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-all"
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
          <span className="text-xs text-gray-400">
            {new Date(sentDate).toLocaleDateString()}
          </span>
          <button
            ref={buttonRef}
            onClick={toggleMenu}
            className={`p-2 rounded-full z-20 transition
          ${!markAsRead ? "hover:bg-hoverDarkBurgundy" : "hover:bg-gray-300"}`}
          >
            <EllipsisVertical
              data-testid="chatdCard-ellipsis"
              className="w-5 h-5 text-gray-600 dark:text-gray-300 opacity-0 group-hover:opacity-100"
            />
          </button>
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

          {!markAsRead && (
            <div
              data-testid="unseen-count"
              className="absolute top-2 right-3 text-xs text-white bg-red-400 rounded-full w-4
                        opacity-100 group-hover:opacity-0 text-center"
            >
              {unreadCount ? unreadCount : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
