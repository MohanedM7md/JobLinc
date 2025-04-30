import { useState, useEffect, useRef, ChangeEvent } from "react";
import { Paperclip, Image, Smile, X, Loader2 } from "lucide-react";
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
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ... keep existing useEffect hooks ...

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
      // Upload file if exists
      if (selectedFile) {
        mediaUrl = await uploadMedia(selectedFile);
      }

      // Send text message if exists
      if (message.trim()) {
        onSendMessage(message, "text");
      }

      // Send media message if exists
      if (mediaUrl) {
        const fileType = getFileType(selectedFile!);
        onSendMessage(mediaUrl, fileType);
      }

      setMessage("");
      setSelectedFile(null);
      onTypingMessage(false);
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
      fileInputRef.current.value = ""; // Reset input to allow selecting same file again
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={`flex flex-col items-center p-3 ${className} bg-charcoalWhite dark:bg-warmBlack border-t border-gray-200 relative`}
    >
      {/* Selected file preview */}
      {selectedFile && (
        <div className="w-full mb-2">
          <div className="flex items-center justify-between p-2 bg-gray-200 dark:bg-gray-700 rounded">
            <span className="text-sm truncate max-w-xs">
              {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
            </span>
            <button
              onClick={handleRemoveFile}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="flex w-full items-center">
        <textarea
          name="msg"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`flex-1 w-full bg-warmWhite dark:bg-darkGray text-charcoalBlack dark:text-charcoalWhite p-2 rounded-lg resize-none h-20 focus:outline-none shadow-inner transition-all ${
            isFocused ? "ring-2 ring-crimsonRed" : "ring-1 ring-gray-400"
          }`}
          placeholder="Write a message..."
        />

        <button
          id="send-msg-btn"
          onClick={handleSendMessage}
          disabled={(!message.trim() && !selectedFile) || uploading}
          className={`ml-2 p-1 font-bold rounded-md h-2/4 align-bottom transition-colors flex items-center justify-center min-w-20 ${
            (message.trim() || selectedFile) && !uploading
              ? "bg-crimsonRed hover:bg-darkBurgundy text-warmWhite"
              : "bg-mutedSilver text-charcoalBlack cursor-not-allowed"
          }`}
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
        </button>
      </div>

      <div className="flex justify-between w-full pt-4">
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            data-testid="file-input"
            // Removed 'multiple' attribute to allow only single file selection
          />
          <button
            onClick={handleFileButtonClick}
            className="text-mutedSilver dark:text-charcoalWhite hover:text-charcoalBlack dark:hover:text-warmWhite p-2"
            data-testid="attach-button"
            disabled={uploading}
          >
            <Paperclip size={20} />
          </button>
          <button
            className="text-mutedSilver dark:text-charcoalWhite hover:text-charcoalBlack dark:hover:text-warmWhite p-2"
            disabled={uploading}
          >
            <Image size={20} />
          </button>
          <button
            className="text-mutedSilver dark:text-charcoalWhite hover:text-charcoalBlack dark:hover:text-warmWhite p-2"
            disabled={uploading}
          >
            <Smile size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
