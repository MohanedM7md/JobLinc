import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  user: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({
  children,
  userId,
}: {
  children: ReactNode;
  userId: string;
}) {
  const [user, setUser] = useState<string>(userId);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
