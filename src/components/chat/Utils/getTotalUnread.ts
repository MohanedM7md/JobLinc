import { ChatCardInterface } from "../interfaces/Chat.interfaces";
export function getTotalUnread(chats: ChatCardInterface[]): number {
  return chats.reduce(
    (total, chat) => total + (chat.isRead ? 0 : chat.unreadCount),
    0,
  );
}
