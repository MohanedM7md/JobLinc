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
      <div>
        <PageChatHeader name={chatTitle.name} status={chatTitle.status} />
        <ChatContent chatId={chatId} />
      </div>
    </div>
  );
}
export default PageChatWindow;
