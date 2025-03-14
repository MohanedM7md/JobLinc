import FloatingChatSidebar from "./FloatingChatSidebar";
import FloatingChatWindow from "./FloatingChatWindow";
import useChats from "../../hooks/useChats";

function FloatingChatSystem() {
  const { opnedChatsId } = useChats();
  return (
    <>
      <FloatingChatSidebar />
      {opnedChatsId.map((opnedChatId, index) => {
        return (
          <FloatingChatWindow
            key={opnedChatId}
            style={{ right: `${index * 410 + 330}px` }}
            id={opnedChatId}
          />
        );
      })}
    </>
  );
}

export default FloatingChatSystem;
