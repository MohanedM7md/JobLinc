import React, { createContext, useContext, useState, ReactNode } from "react";

interface UnreadCountContextType {
  totalUnreadCount: number;
  setTotalUnreadCount: React.Dispatch<React.SetStateAction<number>>;
}

const UnreadCountContext = createContext<UnreadCountContextType | undefined>(
  undefined,
);

export const UnreadCountProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [totalUnreadCount, setTotalUnreadCount] = useState<number>(0);

  return (
    <UnreadCountContext.Provider
      value={{ totalUnreadCount, setTotalUnreadCount }}
    >
      {children}
    </UnreadCountContext.Provider>
  );
};

export const useUnreadCount = (): UnreadCountContextType | undefined => {
  const context = useContext(UnreadCountContext);
  if (!context) {
    return undefined;
  }
  return context;
};
