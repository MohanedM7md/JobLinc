import React, { useState, memo } from "react";
import FloatingChatHeader from "./FloatingChatHeader";
import ChatContent from "../ChatContent";
import useChats from "@hooks/useChats";
import useChatid from "@context/ChatIdProvider";
import useNetworkUserId from "@context/NetworkUserIdProvider";
import { FloatingChatWindowProps } from "@chatComponent/interfaces/Chat.interfaces";

function FloatingChatWindow({
  style,
  className,
  chatName,
  chatPicture,
}: FloatingChatWindowProps) {
  const { chatId } = useChatid();
  const { usersId } = useNetworkUserId();
  const [isActive, setActive] = useState<boolean>(true);
  const activeToggler = () => {
    setActive((prevIsActive) => !prevIsActive);
  };
  const { setOpnedChats } = useChats();
  const CloseChat = (chatId?: string, usersId?: string[]) => {
    console.log("onclode", chatId);
    setOpnedChats((prevChats) => {
      return usersId?.length
        ? prevChats.filter((chat) => chat.usersId !== usersId!)
        : prevChats.filter((chat) => chat.chatId !== chatId);
    });
  };

  return (
    <div
      className={`fixed w-full bottom-0 sm:w-[400px] shadow-xl border
         border-gray-200 rounded-t-lg transition-transform duration-300
          ${className} ${!isActive ? "translate-y-[calc(100%-60px)]" : ""}`}
      style={style}
      data-testid="test-floatingWindow"
    >
      <FloatingChatHeader
        onClick={activeToggler}
        title={chatName}
        chatPicture={chatPicture}
        onClose={() => CloseChat(chatId, usersId)}
      />
      <ChatContent />
    </div>
  );
}

export default memo(FloatingChatWindow);
