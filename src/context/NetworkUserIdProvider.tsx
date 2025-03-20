import React, { createContext, useContext, useState } from "react";

interface ChatIdContextType {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}
export const ChatsIdContext = createContext<ChatIdContextType>({
  userId: "",
  setUserId: () => {},
});

export function NetworkUserIdProvider({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  const [userId, setUserId] = useState(id ? id : "");

  return (
    <ChatsIdContext.Provider value={{ userId, setUserId }}>
      {children}
    </ChatsIdContext.Provider>
  );
}

export default function useNetworkUserId() {
  const context = useContext(ChatsIdContext);
  if (!context) throw new Error("useChats must be used within a ChatProvider");

  return context;
}
