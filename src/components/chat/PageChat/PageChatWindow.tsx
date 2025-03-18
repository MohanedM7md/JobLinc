import ChatContent from "../ChatContent";
import PageChatHeader from "./PageChatHeader";
import { PageChatWindowInterface } from "../interfaces/Chat.interfaces";

const chatTitle = {
  name: "Mohaned",
  status: "Naime",
};

function PageChatWindow({ className, chatId }: PageChatWindowInterface) {
  console.log("--------------PageChatWindow rendered--------------id:", chatId);

  return (
    <div className={`${className} w-2/3 flex flex-col`}>
      {chatId ? (
        <div>
          <PageChatHeader name={chatTitle.name} status={chatTitle.status} />
          <ChatContent chatId={chatId} />
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center">
          <h2 className="text-gray-500">Choose a chat to start messaging</h2>
        </div>
      )}
    </div>
  );
}
export default PageChatWindow;
