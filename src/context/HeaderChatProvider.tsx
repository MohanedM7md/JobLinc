import { createContext, useContext, useState } from "react";

interface ChatData {
  chatName: string;
  chatImage: string;
}

interface ChatContextProps {
  selectedChat: ChatData | null;
  setSelectedChat: (chat: ChatData) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const HeaderChatProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedChat, setSelectedChat] = useState<ChatData | null>(null);

  return (
    <ChatContext.Provider value={{ selectedChat, setSelectedChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useHeaderChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
