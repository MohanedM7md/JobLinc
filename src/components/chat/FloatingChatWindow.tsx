import React, { useState } from "react";
import FloatingChatHeader from "./FloatingChatHeader";
import ChatContent from "./ChatContent";
import useChats from "../../hooks/useChats";
import useChatid from "../../context/ChatIdProvider";
const mockInfo: any = {
  title: "string",
  profilePicture: "https://randomuser.me/api/portraits/men/2.jpg",
  status: "online",
};

function FloatingChatWindow({
  style,
  className,
}: {
  style?: React.CSSProperties;
  className?: string;
}) {
  const { chatId } = useChatid();
  const [isActive, setActive] = useState<boolean>(false);
  const activeToggler = () => {
    setActive((prevIsActive) => !prevIsActive);
  };
  const { setOpnedChatsId } = useChats();
  const CloseChat = (chatId: string) => {
    setOpnedChatsId((prevsChatsId) => {
      return prevsChatsId.filter((id) => id != chatId);
    });
  };
  return (
    <div
      className={`fixed ${className} bottom-0 sm:bottom-0 w-full
                 sm:w-[400px] max-h-[70vh] shadow-xl border border-gray-200
                rounded-t-lg transition-transform duration-300
                 ${isActive ? "" : "translate-y-[calc(100%-60px)]"}`}
      style={style}
    >
      <FloatingChatHeader
        onClick={activeToggler}
        chatInfo={mockInfo}
        onClose={() => CloseChat(chatId)}
      />
      <ChatContent chatId={chatId} />
    </div>
  );
}

export default React.memo(FloatingChatWindow);
