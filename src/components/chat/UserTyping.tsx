import React from "react";

export default function UserTypingIndicator({
  userImage,
}: {
  userImage: string | undefined;
}) {
  return (
    <div className="relative bg-gray-100 ml-1">
      <div className=" absolute left-2">
        <div className="flex items-center space-x-2">
          <img
            src={userImage}
            className="w-4 h-4 rounded-full border border-gray-300"
          />

          <div className="flex space-x-1">
            <span
              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></span>
            <span
              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></span>
            <span
              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce "
              style={{ animationDelay: "0.2s" }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
}
