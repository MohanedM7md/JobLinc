import { useState, useEffect, useRef, ChangeEvent } from "react";
import { Paperclip, Image, Smile } from "lucide-react";
import { ChatInputProps } from "./interfaces/Chat.interfaces";

function ChatInput({
  chatId,
  onSendMessage,
  onTypingMessage,
  className,
}: ChatInputProps) {
  const [message, setMessage] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onTypingMessage(isTyping);
  }, [isTyping]);

  useEffect(() => {
    if (!message.trim()) setIsTyping(false);
    else setIsTyping(true);
  }, [message]);

  const handleSendMessage = () => {
    if ((!message.trim() && selectedFiles.length === 0) || !chatId) return;
    if (message.trim()) {
      onSendMessage(message, "text");
    }
    if (selectedFiles.length > 0) {
      selectedFiles.forEach((file) => {
        onSendMessage(file, "media");
      });
      setSelectedFiles([]);
    }
    setMessage("");
    onTypingMessage(false);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles([...selectedFiles, ...files]);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`flex flex-col items-center p-3 ${className}
     bg-charcoalWhite dark:bg-warmBlack border-t border-gray-200 relative`}
    >
      <textarea
        name="msg"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`flex-1 w-full bg-warmWhite dark:bg-darkGray text-charcoalBlack
         dark:text-charcoalWhite p-2 rounded-lg resize-none h-10 focus:outline-none
         shadow-inner transition-all ${
           isFocused ? "ring-2 ring-crimsonRed" : "ring-1 ring-gray-400"
         }`}
        placeholder="Write a message..."
      />

      <div className="flex justify-between w-full pt-4">
        <div>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            data-testid="file-input"
          />
          <button
            onClick={handleFileButtonClick}
            className="text-mutedSilver dark:text-charcoalWhite hover:text-charcoalBlack
            dark:hover:text-warmWhite p-2"
            data-testid="attach-button"
          >
            <Paperclip size={20} />
          </button>
          <button
            className="text-mutedSilver dark:text-charcoalWhite hover:text-charcoalBlack
            dark:hover:text-warmWhite p-2"
          >
            <Image size={20} />
          </button>
          <button
            className="text-mutedSilver dark:text-charcoalWhite hover:text-charcoalBlack
            dark:hover:text-warmWhite p-2"
          >
            <Smile size={20} />
          </button>
        </div>

        <button
          id="send-msg-btn"
          onClick={handleSendMessage}
          disabled={!message.trim() && selectedFiles.length === 0}
          className={`ml-2 p-1 rounded-l-full font-bold rounded-r-full transition-colors
            ${
              message.trim() || selectedFiles.length > 0
                ? "bg-crimsonRed hover:bg-darkBurgundy text-warmWhite"
                : "bg-mutedSilver text-charcoalBlack cursor-not-allowed"
            } w-15 md:w-20`}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
