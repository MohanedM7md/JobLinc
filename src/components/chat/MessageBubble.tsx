import React from "react";
import { Img } from "react-image";
import UserProfile from "../UserProfile";
import { isRTL } from "../../utils/IsArabic";
import { MessageBubbleInterface } from "./interfaces/Message.interfaces";

function MessageBubble({ message }: { message: MessageBubbleInterface }) {
  const rtl = isRTL(message.content.text);

  return (
    <div
      data-testid={message.messageId}
      className="flex items-start gap-3 pl-1"
    >
      <UserProfile.Image
        alt={message.sender.firstName}
        photoUrl={message.sender.profilePicture}
        className="w-10 h-10 rounded-full flex-shrink-0"
      />

      <div className="w-full">
        <UserProfile.Name
          name={message.sender.firstName}
          className="text-lg font-semibold text-gray-800"
        />

        <div
          className={`hover:bg-gray-200 rounded-md bg-gray-100 p-2 w-full 
          ${rtl ? "text-right" : "text-left"}`}
        >
          {message.content.text && (
            <p className="transition-all duration-200">
              {message.content.text}
            </p>
          )}

          {message.content.image && (
            <Img
              src={message.content.image}
              alt="Sent Image"
              className="rounded mt-2 w-full max-w-xs object-cover hover:opacity-80 
              hover:scale-105 transition-all duration-300 cursor-pointer"
            />
          )}

          {message.content.video && (
            <video
              controls
              className="mt-2 w-full max-w-xs rounded hover:opacity-80 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <source src={message.content.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          {message.content.document && (
            <a
              href={message.content.document}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm mt-2 inline-block underline hover:text-blue-800 hover:font-bold transition-all duration-200 cursor-pointer"
            >
              View Document
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(MessageBubble);
