import FloatingChatSidebar from "./FloatingChatSidebar";
import FloatingChatWindow from "./FloatingChatWindow";
import useChats from "../../hooks/useChats";
import { ChatIdProvider } from "../../context/ChatIdProvider";

function FloatingChatSystem() {
  const { opnedChatsId } = useChats();
  return (
    <>
      <FloatingChatSidebar />
      {opnedChatsId.map((opnedChatId, index) => {
        return (
          <ChatIdProvider id={opnedChatId}>
            <FloatingChatWindow
              key={opnedChatId}
              style={{ right: `${index * 410 + 330}px` }}
              chatId={opnedChatId}
            />
          </ChatIdProvider>
        );
      })}
    </>
  );
}

export default FloatingChatSystem;
