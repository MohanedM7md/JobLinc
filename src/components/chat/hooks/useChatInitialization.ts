import { useEffect } from "react";
import { fetchChatData, createChat } from "@services/api/chatServices";
import { RecievedMessage } from "../interfaces/Message.interfaces";
import { User } from "../interfaces/User.interfaces";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export default function useChatInitialization(
  usersId: string[],
  chatId: string | null,
  setChatId: (id: string) => void,
  setUsers: SetState<User[]>,
  setMessages: SetState<RecievedMessage[]>,
  setOpnedChats: SetState<any>,
) {
  useEffect(() => {
    const fetchData = async () => {
      if (usersId.length && !chatId) {
        const data = await createChat(usersId);
        setUsers(data.participants);
        setMessages(data.messages);
        setChatId(data.chatId);
        setOpnedChats((prev) => [...prev]);
      } else if (chatId) {
        const data = await fetchChatData(chatId);
        setUsers(data.participants);
        setMessages(data.messages);
      }
    };

    fetchData();
  }, [usersId, chatId]);
}
