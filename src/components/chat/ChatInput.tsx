import { useState, useEffect, useRef, ChangeEvent } from "react";
import { Paperclip, X, Loader2 } from "lucide-react";
import { ChatInputProps } from "./interfaces/Chat.interfaces";
import { uploadingMedia } from "@services/api/chatServices";

function ChatInput({
  chatId,
  onSendMessage,
  onTypingMessage,
  className,
}: ChatInputProps) {
  const [message, setMessage] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      onTypingMessage(false);
    };
  }, []);

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value;
    setMessage(newMessage);

    // Handle typing indicator
    if (newMessage.trim() && !isTyping) {
      setIsTyping(true);
      onTypingMessage(true);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    if (!newMessage.trim()) {
      setIsTyping(false);
      onTypingMessage(false);
    } else {
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        onTypingMessage(false);
      }, 2000);
    }
  };

  const uploadMedia = async (file: File) => {
    try {
      const response = await uploadingMedia(file);
      return response;
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  };

  const handleSendMessage = async () => {
    if ((!message.trim() && !selectedFile) || !chatId) return;

    setUploading(true);

    try {
      let mediaUrl = null;

      if (selectedFile) {
        mediaUrl = await uploadMedia(selectedFile);
      }

      if (message.trim()) {
        onSendMessage(message, "text");
      }

      if (mediaUrl) {
        const fileType = getFileType(selectedFile!);
        onSendMessage(mediaUrl, fileType);
      }
      setIsTyping(false);
      onTypingMessage(false);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      setMessage("");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setUploading(false);
    }
  };

  const getFileType = (file: File): "image" | "video" | "document" => {
    if (file.type.startsWith("image/")) return "image";
    if (file.type.startsWith("video/")) return "video";
    return "document";
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0]; // Only take the first file

      // Check file size and type
      const isImage =
        file.type.startsWith("image/") ||
        [".png", ".jpg", ".jpeg"].some((ext) => file.name.endsWith(ext));
      const isVideo =
        file.type.startsWith("video/") ||
        [".mp4", ".mov"].some((ext) => file.name.endsWith(ext));

      if (isImage && file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      if (isVideo && file.size > 50 * 1024 * 1024) {
        alert("Video size should be less than 50MB");
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className={`flex flex-col items-center p-3 ${className} bg-white dark:bg-warmBlack border-t border-gray-200 dark:border-gray-700`}
    >
      {selectedFile && (
        <div className="w-full mb-2">
          <div className="flex items-center justify-between p-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
            <div className="flex items-center gap-2 text-sm truncate max-w-[80%]">
              <Paperclip size={16} />
              <span className="truncate">
                {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
              </span>
            </div>
            <button
              onClick={handleRemoveFile}
              className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col w-full gap-2">
        <div className="flex space-x-2 items-center">
          <textarea
            name="msg"
            value={message}
            onChange={handleMessageChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyPress}
            rows={3}
            maxLength={300}
            placeholder="Write a message..."
            className={`flex-1 resize-none rounded-lg px-4 py-2 bg-gray-100 overflow-visible dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm focus:outline-none transition-all text-sm ${
              isFocused ? "ring-2 ring-crimsonRed" : "ring-1 ring-gray-300"
            }`}
          />

          <button
            onClick={handleSendMessage}
            disabled={(!message.trim() && !selectedFile) || uploading}
            className={`rounded-full p-3 h-10 w-10 flex items-center justify-center transition-colors text-center ${
              (message.trim() || selectedFile) && !uploading
                ? "bg-crimsonRed hover:bg-darkBurgundy text-white"
                : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}
          >
            {uploading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <span className="text-lg font-bold">➤</span>
            )}
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleFileButtonClick}
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white p-1"
            disabled={uploading}
          >
            <Paperclip size={20} />
          </button>
        </div>

        <input
          data-testid="input-file"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}

export default ChatInput;
