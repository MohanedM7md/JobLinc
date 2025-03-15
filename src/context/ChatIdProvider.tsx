import React, { Children, createContext, useContext, useState } from "react";

interface ChatIdContextType {
  chatId: string;
  setChatId: React.Dispatch<React.SetStateAction<string>>;
}
export const ChatsIdContext = createContext<ChatIdContextType>({
  chatId: "",
  setChatId: () => {},
});

export function ChatIdProvider({ children }: { children: React.ReactNode }) {
  const [chatId, setChatId] = useState("");
  <ChatsIdContext.Provider value={{ chatId, setChatId }}>
    {children}
  </ChatsIdContext.Provider>;
}

export default function useChats() {
  const context = useContext(ChatsIdContext);
  if (!context) throw new Error("useChats must be used within a ChatProvider");

  return context;
}
