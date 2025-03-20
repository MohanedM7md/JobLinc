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
  const windowClass = classNames(
    "fixed bottom-0 sm:bottom-0 w-full sm:w-[400px] max-h-[70vh] shadow-xl b\
    order border-gray-200 rounded-t-lg transition-transform duration-300",
    className,
    {
      "translate-y-[calc(100%-60px)]": !isActive,
    },
  );
  return (
    <div
      className={windowClass}
      style={style}
      data-testid="test-floatingWindow"
    >
      <FloatingChatHeader
        onClick={activeToggler}
        floatingHeaderData={mockInfo}
        onClose={() => CloseChat(chatId)}
      />

      <ChatContent className="h-[80vh] overflow-auto" userId="2" />
    </div>
  );
}

export default memo(FloatingChatWindow);
