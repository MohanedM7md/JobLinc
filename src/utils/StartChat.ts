import useChats from "@hooks/useChats";
interface ChatEntry {
  chatId?: string;
  usersId: string[];
  chatName: string;
  chatImage: string[];
}
export const startChat = ({
  chatId = "",
  usersId,
  chatName,
  chatImage,
}: ChatEntry) => {
  const { setOpnedChats } = useChats();
  setOpnedChats((prevChats) => [
    ...prevChats,
    { chatId, usersId, chatName, chatImage },
  ]);
};
