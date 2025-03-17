import FloatingChatSidebar from "./FloatingChatSidebar";
import FloatingChatWindow from "./FloatingChatWindow";
import useChats from "../../../hooks/useChats";
import { ChatIdProvider } from "../../../context/ChatIdProvider";
import { useUser } from "../mockUse";
import { useEffect } from "react";

function FloatingChatSystem() {
  const { opnedChatsId } = useChats();
  const { setUser } = useUser();
  useEffect(() => {
    const UserId = window.prompt("Enter User ID:") || "1";
    setUser(UserId);
  }, []);
  return (
    <>
      <FloatingChatSidebar />
      {opnedChatsId.map((opnedChatId, index) => {
        return (
          <ChatIdProvider id={opnedChatId}>
            <FloatingChatWindow
              key={opnedChatId}
              style={{ right: `${index * 410 + 330}px` }}
            />
          </ChatIdProvider>
        );
      })}
    </>
  );
}

export default FloatingChatSystem;
