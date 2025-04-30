import React, { createContext, useContext, useState } from "react";

interface ChatIdContextType {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  usersId: string[];
  setUsersId: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ChatsIdContext = createContext<ChatIdContextType>({
  title: "",
  setTitle: () => {},
  usersId: [],
  setUsersId: () => {},
});

interface NetworkUserIdProviderProps {
  children: React.ReactNode;
  ids?: string[];
  initialTitle?: string;
}

export function NetworkUserIdProvider({
  children,
  ids,
  initialTitle = "",
}: NetworkUserIdProviderProps) {
  const [usersId, setUsersId] = useState<string[]>(ids ?? []);
  const [title, setTitle] = useState<string>(initialTitle);

  return (
    <ChatsIdContext.Provider value={{ title, setTitle, usersId, setUsersId }}>
      {children}
    </ChatsIdContext.Provider>
  );
}

export default function useNetworkUserId() {
  const context = useContext(ChatsIdContext);
  if (!context)
    throw new Error(
      "useNetworkUserId must be used within a NetworkUserIdProvider",
    );

  return context;
}
