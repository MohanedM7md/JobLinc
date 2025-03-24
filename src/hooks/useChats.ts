import { useContext } from "react";
import { ChatsIdContext } from "@context/ChatsIdProvider";

export default function useChats() {
  const context = useContext(ChatsIdContext);
  if (!context) throw new Error("useChats must be used within a ChatProvider");

  return context;
}
