import React, { createContext, useContext, useState } from "react";

interface ChatIdContextType {
  usersId: string[];
  setUsersId: React.Dispatch<React.SetStateAction<string[]>>;
}
export const ChatsIdContext = createContext<ChatIdContextType>({
  usersId: [],
  setUsersId: () => {},
});

export function NetworkUserIdProvider({
  children,
  ids,
}: {
  children: React.ReactNode;
  ids?: string[];
}) {
  const [usersId, setUsersId] = useState<string[]>(ids ?? []);

  return (
    <ChatsIdContext.Provider value={{ usersId, setUsersId }}>
      {children}
    </ChatsIdContext.Provider>
  );
}

export default function useNetworkUserId() {
  const context = useContext(ChatsIdContext);
  if (!context) throw new Error("useChats must be used within a ChatProvider");

  return context;
}
