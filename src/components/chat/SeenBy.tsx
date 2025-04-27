import React from "react";
import { motion } from "framer-motion";
import { XCircle, Clock, CheckCircle } from "lucide-react";
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
    if (senderId !== currentUserId) return null;

    const seenUsers = users.filter((user) => seenBy.includes(user.userId));

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center gap-3 mt-1 text-xs ml-2 text-gray-600"
      >
        {messageStatus === "failed" ? (
          <div className="flex items-center gap-1 text-red-600 font-semibold">
            <XCircle className="w-4 h-4" />
            Failed to send
          </div>
        ) : messageStatus === "sent" ? (
          <div className="flex items-center gap-1 text-yellow-600">
            <Clock className="w-4 h-4" />
            Sent
          </div>
        ) : messageStatus === "delivered" && seenUsers.length === 0 ? (
          <div className="flex items-center gap-1 text-blue-600">
            <CheckCircle className="w-4 h-4" />
            Delivered
          </div>
        ) : null}

        {seenUsers.length > 0 &&
          messageStatus !== "failed" &&
          messageStatus !== "sent" && (
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-gray-400">Seen by</span>
              {seenUsers.slice(0, 3).map((user) => (
                <div
                  key={user.userId}
                  className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-full"
                >
                  <img
                    src={user.profilePicture}
                    alt={user.firstName}
                    title={`${user.firstName} ${user.lastName}`}
                    className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                  />
                  <span className="text-xs text-gray-700">
                    {user.firstName}
                  </span>
                </div>
              ))}
              {seenUsers.length > 3 && (
                <span className="ml-1 text-gray-400 font-medium">
                  +{seenUsers.length - 3}
                </span>
              )}
            </div>
          )}
      </motion.div>
    );
  },
);

export default SeenBy;
