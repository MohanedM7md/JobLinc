import React, { useState, useEffect } from "react";
import { Img } from "react-image";
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
  className = "w-full",
}: ChatCardProps) {
  return (
    <div
      onClick={onClick}
      id={chatId}
      className={`${className} bg-charcoalWhite hover:bg-gray-200 flex items-center p-2 cursor-pointer `}
    >
      <div className="relative w-12 h-12 group grid grid-cols-1 grid-rows-1 items-center">
        <img
          className="col-start-1 row-start-1 rounded-full w-full h-full object-fit"
          alt={chatName}
          src={chatPicture}
        />

        <div
          className="col-start-1 row-start-1 flex
           items-center justify-center bg-darkGray  h-0
           group-hover:h-full group-has-checked:h-full opacity-0
            group-hover:opacity-100 group-has-checked:opacity-100 
            rounded-full transition-all"
        >
          <Checkbox />
        </div>
      </div>
      <div className="flex flex-1 justify-between items-center ml-3">
        <div>
          <div className="font-medium">{chatName}</div>
          <div className="text-sm text-gray-500 truncate max-w-[200px]">
            {lastMessage}
          </div>
        </div>
        <div className="text-xs text-gray-400">{sentDate}</div>
      </div>
    </div>
  );
}
