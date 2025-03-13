import React from "react";
import ConversationItem from "./ConversationItem";

type ConversationItemType = {
  id: string;
  imageUrl: string;
  userName: string;
  lastMessage: string;
  sentDate: string;
};
interface ConversationListProps {
  conversations: ConversationItemType[];
  onConversationClick: (id: string) => void;
}

function ConversationList({
  conversations,
  onConversationClick,
}: ConversationListProps) {
  return (
    <div className="mt-4">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          id={conversation.id}
          imageUrl={conversation.imageUrl}
          userName={conversation.userName}
          lastMessage={conversation.lastMessage}
          sentDate={conversation.sentDate}
          onClick={() => onConversationClick(conversation.id)}
        />
      ))}
    </div>
  );
}

export default ConversationList;
