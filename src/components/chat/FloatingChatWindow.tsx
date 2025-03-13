import React, { useState } from "react";
import FloatingChatHeader from "./FloatingChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import useChats from "../../hooks/useChats";

interface User {
  name: string;
  profilePicture: string;
  status: "online" | "offline";
}

const mockUser: User = {
  name: "Shahd Khalifa",
  profilePicture: "https://randomuser.me/api/portraits/women/45.jpg",
  status: "online",
};

function FloatingChatWindow({
  style,
  className,
  id,
}: {
  style?: React.CSSProperties;
  className?: string;
  id: string;
}) {
  console.log(className);
  const [isActive, setActive] = useState<boolean>(false);
  const activeToggler = () => {
    setActive((prevIsActive) => !prevIsActive);
  };
  const { setOpnedChatsId } = useChats();
  const CloseChat = (id: string) => {
    setOpnedChatsId((prevsChatsId) => {
      return prevsChatsId.filter((Chat) => Chat != id);
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
        user={mockUser}
        onClose={() => CloseChat(id)}
      />

      <ChatMessages id={id} />

      <ChatInput />
    </div>
  );
}

export default React.memo(FloatingChatWindow);
