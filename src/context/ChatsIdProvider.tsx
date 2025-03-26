import React, { createContext, useState } from "react";

interface ChatEntry {
  chatId: string;
  usersId: string[];
  chatName: string;
  chatImage: string[];
}

interface ChatsIdContextType {
  opnedChats: ChatEntry[];
  setOpnedChats: React.Dispatch<React.SetStateAction<ChatEntry[]>>;
}

export const ChatsIdContext = createContext<ChatsIdContextType>({
  opnedChats: [],
  setOpnedChats: () => {},
});

export default function ChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opnedChats, setOpnedChats] = useState<ChatEntry[]>([]);

  return (
    <ChatsIdContext.Provider value={{ opnedChats, setOpnedChats }}>
      {children}
    </ChatsIdContext.Provider>
  );
}
