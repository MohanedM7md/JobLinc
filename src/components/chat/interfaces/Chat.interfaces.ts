export interface FloatingHeaderData {
  title: string;
  profilePicture: string;
  status: "online" | "offline";
}

export interface HeaderProbs {
  onClick?: () => void;
  floatingHeaderData: FloatingHeaderData; //(title, profile picture, status)
  onClose: () => void;
}

export interface PageChatHeader {
  name: string;
  status?: string;
}

export interface PageChatWindowInterface {
  className?: string;
  chatId: string | null;
}

export interface ChatCardInterface {
  chatId: string;
  chatName: string;
  imageUrl: string;
  lastMessage: string;
  sentDate: string;
  unseenCount?: number;
  isPinned?: boolean;
  isMuted?: boolean;
}
export interface ChatCardProps extends ChatCardInterface {
  onClick: () => void;
  className?: string;
}

export interface ChatInputProps {
  chatId: string;
  onSendMessage: (message: string) => void;
}
