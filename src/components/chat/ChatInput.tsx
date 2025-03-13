import React, { useState } from "react";
import { Paperclip, Image, Smile, Send } from "lucide-react";

interface ChatInputProps {
  id: string | null;
  onSendMessage: (id: string, message: string) => void;
}

function ChatInput({ id, onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const handleSendMessage = () => {
    if (!message.trim() || !id) return;
    onSendMessage(id, message);
    setMessage("");
  };
  return (
    <div
      className="flex flex-col items-center p-3
     bg-charcoalWhite dark:bg-warmBlack border-t-1 border-gray-200"
    >
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 w-full bg-warmWhite dark:bg-darkGray text-charcoalBlack
         dark:text-charcoalWhite p-2 rounded-lg resize-none h-10 focus:outline-none
          shadow-inner focus:ring-1 focus:ring-gray-400"
        placeholder="Write a message..."
      />
      <div className="flex justify-between w-full pt-4 ">
        <div>
          <button
            className="text-mutedSilver dark:text-charcoalWhite
           hover:text-charcoalBlack dark:hover:text-warmWhite p-2"
          >
            <Paperclip size={20} />
          </button>
          <button
            className="text-mutedSilver dark:text-charcoalWhite
           hover:text-charcoalBlack dark:hover:text-warmWhite p-2"
          >
            <Image size={20} />
          </button>
          <button
            className="text-mutedSilver dark:text-charcoalWhite
           hover:text-charcoalBlack dark:hover:text-warmWhite p-2"
          >
            <Smile size={20} />
          </button>
        </div>
        <button
          onClick={handleSendMessage}
          disabled={!message.trim()}
          className={`ml-2 p-1 rounded-l-full font-bold rounded-r-full transition-colors
            ${
              message.trim()
                ? "bg-crimsonRed hover:bg-darkBurgundy text-warmWhite"
                : "bg-mutedSilver text-charcoalBlack cursor-not-allowed"
            }
        w-15 md:w-20`}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
