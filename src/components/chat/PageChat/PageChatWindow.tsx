import ChatContent from "../ChatContent";
import PageChatHeader from "./PageChatHeader";
import { useState } from "react";
import useChatId from "@context/ChatIdProvider";

const chatTitle = {
  name: "Mohaned",
  status: "Naime",
};

function PageChatWindow({ className }: { className: string }) {
  const [userId, setUserId] = useState<string>("");
  const { chatId } = useChatId();
  console.log("--------------PageChatWindow rendered--------------id:", chatId);

  return (
    <div
      className={`${className} w-2/3 flex flex-col`}
      data-testid="test-PageWindow"
    >
      <button
        onClick={() => setUserId("2")}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      >
        Set User ID to 2
      </button>

      {chatId || userId ? (
        <>
          <PageChatHeader name={chatTitle.name} status={chatTitle.status} />
          <ChatContent userId={userId} />
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
