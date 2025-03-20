export interface FloatingHeaderData {
  title: string;
  profilePicture: string;
  status: "online" | "offline";
}

export interface FlaotingHeaderProbs {
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
  chatId: string;
}

export interface ChatCardInterface {
  chatId: string;
  chatName: string;
  chatPicture: string;
  lastMessage: string;
  sentDate: string;
  unseenCount?: number;
  isRead?: boolean;
}
export interface ChatSession {
  chatId: string;
  userId: string;
}
export interface ChatCardProps extends ChatCardInterface {
  onClick: () => void;
  className?: string;
}

export interface ChatInputProps {
  chatId: string;
  onSendMessage: (message: string) => void;
}
