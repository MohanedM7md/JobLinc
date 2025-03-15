import React, { createContext, useState } from "react";
type ChatsIdContextType = {
  opnedChatsId: string[];
  setOpnedChatsId: React.Dispatch<React.SetStateAction<string[]>>;
};
export const ChatsIdContext = createContext<ChatsIdContextType>({
  opnedChatsId: [],
  setOpnedChatsId: () => {},
});

export default function ChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opnedChatsId, setOpnedChatsId] = useState<string[]>([]);

  return (
    <ChatsIdContext.Provider value={{ opnedChatsId, setOpnedChatsId }}>
      {children}
    </ChatsIdContext.Provider>
  );
}
