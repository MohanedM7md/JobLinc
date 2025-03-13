import React from "react";
import { Img } from "react-image";
import UserProfile from "../UserProfile";
import { isRTL } from "../../utils/IsArabic";

interface MessageInterface {
  sender: {
    id: string;
    name: string;
    profilePicture: string;
  };
  time: Date;
  content: {
    text?: string;
    image?: string;
    video?: string;
    document?: string;
  };
}

function MessageBubble({ message }: { message: MessageInterface }) {
  const rtl = isRTL(message.content.text);

  return (
    <div className="flex flex-col pl-1">
      <UserProfile.Image
        alt={message.sender.name}
        photoUrl={message.sender.profilePicture}
        className="w-10 h-10 rounded-full absolute inline"
      />

      <div className=" w-full">
        <UserProfile.Name
          name={message.sender.name}
          className="pl-12 text-lg font-semibold text-gray-800"
        />

        <div
          className={`hover:bg-gray-200 rounded-md bg-gray-100 pl-12 pr-2 w-full ${rtl ? "text-right mr-2" : "text-left"}`}
        >
          {message.content.text && (
            <p className="transition-all duration-200 p-1 ">
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
