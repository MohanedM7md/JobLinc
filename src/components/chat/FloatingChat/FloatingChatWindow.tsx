import React, { useState, memo } from "react";
import FloatingChatHeader from "./FloatingChatHeader";
import ChatContent from "../ChatContent";
import useChats from "../../../hooks/useChats";
import useChatid from "../../../context/ChatIdProvider";
import classNames from "classnames";
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
  const [isActive, setActive] = useState<boolean>(true);
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
      className={`fixed w-full bottom-0 sm:w-[400px] shadow-xl border
         border-gray-200 rounded-t-lg transition-transform duration-300
          ${className} ${!isActive ? "translate-y-[calc(100%-60px)]" : ""}`}
      style={style}
      data-testid="test-floatingWindow"
    >
      <FloatingChatHeader
        onClick={activeToggler}
        floatingHeaderData={mockInfo}
        onClose={() => CloseChat(chatId)}
      />
      <ChatContent userId="2" />
    </div>
  );
}

export default memo(FloatingChatWindow);
