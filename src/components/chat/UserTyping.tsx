import React from "react";

export default function UserTypingIndicator({
  userImage,
}: {
  userImage: string | undefined;
}) {
  return (
    <div
      className="relative bg-gray-100 ml-1"
      data-testid="typing-indicator-container"
    >
      <div className="absolute left-2">
        <div className="flex items-center space-x-2">
          <img
            src={userImage || ""}
            className="w-4 h-4 rounded-full border border-gray-300"
            alt="User typing indicator"
          />

          <div className="flex space-x-1">
            {[0, 1, 2].map((delay) => (
              <span
                key={delay}
                data-testid="typing-dot"
                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: `${delay * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
