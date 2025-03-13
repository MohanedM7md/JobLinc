import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import PageChatHeader from "./PageChatHeader";

interface User {
  name: string;

  status: "online" | "offline";
}

const mockUser: User = {
  name: "Shahd Khalifa",
  status: "online",
};

export default function PageChatWindow({
  className,
  chatId,
}: {
  className?: string;
  chatId: string | null;
}) {
  return (
    <div className={`${className} w-2/3 flex flex-col`}>
      {chatId ? (
        <div>
          <PageChatHeader name={mockUser.name} status={mockUser.status} />
          <ChatMessages id={chatId} />
          <ChatInput
            id={chatId}
            onSendMessage={() => {
              console.log("SendMessage");
            }}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          Select a conversation to start chatting
        </div>
      )}
    </div>
  );
}
