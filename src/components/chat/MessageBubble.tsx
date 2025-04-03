import React, { useState } from "react";
import { Img } from "react-image";
import UserProfile from "../UserProfile";
import { isRTL } from "../../utils/IsArabic";
import { MessageBubbleInterface } from "./interfaces/Message.interfaces";
import { User } from "./interfaces/User.interfaces";
import { motion, AnimatePresence } from "framer-motion";

function SeenByList({ seenBy, users }: { seenBy: string[]; users: User[] }) {
  const seenUsers = users.filter((user) => seenBy.includes(user.userId));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-2 bg-gray-100 rounded-md text-sm  space-x-2 flex text-gray-700"
    >
      <p className="font-semibold">Seen by:</p>

      {seenUsers.map((user) => (
        <div
          key={user.userId}
          className="flex items-center gap-2 rounded-md shadow-sm"
        >
          <img
            src={user.profilePicture}
            alt={user.firstName}
            className="w-6 h-6 rounded-full"
          />
          <span>
            {user.firstName} {user.lastName}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

function MessageBubble({
  message,
  users,
}: {
  message: MessageBubbleInterface;
  users: User[];
}) {
  const rtl = isRTL(message.content.text);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      data-testid={message.messageId}
      className="flex flex-col items-start gap-3 pl-1 cursor-pointer"
      onClick={() => setIsExpanded((prev) => !prev)}
    >
      <div className="flex items-start gap-3">
        <img
          alt={message.sender.firstName}
          src={message.sender.profilePicture}
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

      <AnimatePresence>
        {isExpanded && message.seenBy.length > 0 && (
          <SeenByList users={users} seenBy={message.seenBy} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default React.memo(MessageBubble);
