import { X } from "lucide-react";
import { FlaotingHeaderProbs } from "../interfaces/Chat.interfaces";
import ChatAvatarGrid from "@chatComponent/ChatAvatarGrid";
import { memo } from "react";
function FloatingChatHeader({
  onClick,
  title,
  chatPicture,
  onClose,
}: FlaotingHeaderProbs) {
  console.log(chatPicture);
  return (
    <div
      className={`flex items-center justify-between bg-charcoalWhite dark:bg-darkGray 
        p-2 text-charcoalBlack dark:text-charcoalBlack rounded-t-lg border-b-2 z-10
        border-gray-200 dark:border-mutedSilver cursor-pointer h-[60px] `}
      onClick={onClick}
      data-testid="test-header"
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <ChatAvatarGrid chatName={title!} chatPicture={chatPicture!} />
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${
              "online" === "online" ? "bg-green-500" : "bg-mutedSilver"
            }`}
          />
        </div>

        <div>
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-sm text-mutedSilver">
            {"online" === "online" ? "Available" : "Offline"}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          data-testid="close-button"
          onClick={onClose}
          className="text-mutedSilver hover:text-darkBurgundy dark:hover:text-charcoalWhite"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}

export default memo(FloatingChatHeader);
