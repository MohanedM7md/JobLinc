import ChatContent from "../ChatContent";
import PageChatHeader from "./PageChatHeader";
import { useState } from "react";
import useChatId from "@context/ChatIdProvider";
import useNetworkUserId from "@context/NetworkUserIdProvider";

const chatTitle = {
  name: "Mohaned",
  status: "Naime",
};

function PageChatWindow({ className }: { className: string }) {
  const { chatId } = useChatId();
  const { usersId } = useNetworkUserId();
  console.log("--------------PageChatWindow rendered--------------id:", chatId);
  console.log("User Id", usersId);
  return (
    <div
      className={`${className} w-2/3 flex flex-col`}
      data-testid="test-PageWindow"
    >
      {chatId || usersId.length ? (
        <>
          <PageChatHeader name={chatTitle.name} status={chatTitle.status} />
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
