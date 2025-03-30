import { createContext, useContext, useRef, ReactNode } from "react";

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
  const userRef = useRef<string>(userId);
  const user = userRef.current;

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
