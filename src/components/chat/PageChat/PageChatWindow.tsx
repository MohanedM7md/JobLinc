import ChatContent from "../ChatContent";
import PageChatHeader from "./PageChatHeader";
import useChatId from "@context/ChatIdProvider";
import useNetworkUserId from "@context/NetworkUserIdProvider";
import { PageChatWindowProps } from "@chatComponent/interfaces/Chat.interfaces";

function PageChatWindow({ className, chatName }: PageChatWindowProps) {
  const { chatId } = useChatId();
  const { usersId, title } = useNetworkUserId();
  console.log(title);
  return (
    <div
      className={`${className} w-full flex flex-col`}
      data-testid="test-PageWindow"
    >
      {chatId || usersId.length ? (
        <>
          <PageChatHeader name={chatName ? chatName : title} status={""} />
          <ChatContent />
        </>
      ) : (
        <div className="flex-grow flex items-center justify-center">
          <h2 className="text-gray-500">Choose a chat to start messaging</h2>
        </div>
      )}
    </div>
  );
}
export default PageChatWindow;
