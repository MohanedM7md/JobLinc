import React from "react";
import { motion } from "framer-motion";
import store from "@store/store";
import { User } from "./interfaces/User.interfaces";

interface SeenByProps {
  seenBy: string[];
  users: User[];
  messageStatus: "sent" | "delivered" | "seen" | "failed";
  senderId: string;
}

const SeenBy = React.memo(
  ({ seenBy, users, messageStatus, senderId }: SeenByProps) => {
    const currentUserId = store.getState().user.userId;

    if (senderId !== currentUserId) {
      return null;
    }

    console.log("seenBy", seenBy);
    const seenUsers = users.filter((user) => seenBy.includes(user.userId));
    console.log("seenUser", seenUsers);
    console.log("Message status", messageStatus == undefined);
    if (messageStatus != undefined && messageStatus !== "delivered") {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="p-2 bg-gray-100 rounded-md text-sm text-gray-700"
        >
          Status:{" "}
          <span
            className={
              messageStatus === "failed"
                ? "text-red-500"
                : messageStatus === "sent"
                  ? "text-yellow-600"
                  : "text-green-600"
            }
          >
            {messageStatus}
          </span>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="p-2 bg-gray-100 rounded-md text-sm space-x-2 flex flex-wrap items-center gap-2 text-gray-700"
      >
        <div className="font-semibold">Seen by:</div>
        {seenUsers.length > 0 ? (
          seenUsers.map((user) => (
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
          ))
        ) : (
          <span className="text-gray-500 italic">No views yet</span>
        )}
      </motion.div>
    );
  },
);

export default SeenBy;
