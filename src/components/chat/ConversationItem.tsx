import React from "react";
import { Img } from "react-image";
import { Checkbox } from "./CheckBox";

type ConversationItemProps = {
  imageUrl: string;
  userName: string;
  lastMessage: string;
  sentDate: string;
  size?: string;
};

export const ConversationItem = ({
  imageUrl,
  userName,
  lastMessage,
  sentDate,
  size = "w-full",
}: ConversationItemProps) => {
  return (
    <div
      className={`${size} flex items-center p-2  rounded-lg cursor-pointer `}
    >
      <div className="relative w-12 h-12 group grid grid-cols-1 grid-rows-1 items-center">
        <Img
          className="col-start-1 row-start-1 rounded-full w-full h-full object-fit"
          src={imageUrl}
        />

        <div className="col-start-1 row-start-1 flex items-center justify-center bg-darkGray  h-0  group-hover:h-full group-has-checked:h-full opacity-0 group-hover:opacity-100 group-has-checked:opacity-100 rounded-full transition-all">
          <Checkbox />
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex flex-1 justify-between items-center ml-3">
        <div>
          <div className="font-medium">{userName}</div>
          <div className="text-sm text-gray-500 truncate max-w-[200px]">
            {lastMessage}
          </div>
        </div>
        <div className="text-xs text-gray-400">{sentDate}</div>
      </div>
    </div>
  );
};
