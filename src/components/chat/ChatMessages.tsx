import MessageBubble from "./MessageBubble";
import { ChatMessagesProbs } from "./interfaces/Message.interfaces";
import { User } from "./interfaces/User.interfaces";
import SkeletonMessageBubble from "./SkeletonMessageBubble";

function ChatMessages({
  users,
  messages,
  className,
  loading,
}: ChatMessagesProbs) {
  return (
    <div className="flex-1 space-y-2 bg-gray-100 flex flex-col pt-2 h-auto">
      {loading ? (
        Array.from({ length: 4 }).map((_, idx) => (
          <SkeletonMessageBubble key={idx} />
        ))
      ) : messages.length > 0 ? (
        messages.map((message, index) => {
          const sender = {
            ...(users.find((user: User) => user.userId == message.senderId) || {
              userId: "",
              firstName: "Unknown",
              lastName: "Unknown",
              profilePicture: "",
            }),
          };

          return (
            <MessageBubble
              users={users}
              key={index}
              message={{ sender, ...message }}
            />
          );
        })
      ) : (
        <div className="text-gray-500 text-center mt-4">No messages found</div>
      )}
    </div>
  );
}

export default ChatMessages;
