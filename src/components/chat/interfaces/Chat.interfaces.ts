export interface FlaotingHeaderProbs {
  onClick?: () => void;
  title: string | undefined;
  chatPicture: string[] | undefined;
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
  onTypingMessage: (isTyping: boolean) => void;
}

export interface NetWorkCard {
  userId: string;
  chatPicture: string;
  chatName: string;
  onClick: () => void;
  className?: string;
}

export interface PageChatWindowProps {
  className?: string;
  chatName: string;
}

export interface FloatingChatWindowProps {
  style?: React.CSSProperties;
  className?: string;
  chatName: string;
  chatPicture: string[];
}
export interface ChatCardInterface {
  chatId: string;
  chatName: string;
  chatPicture: string[];
  lastMessage: string;
  sentDate: string;
  unseenCount: number;
  isRead: boolean;
}
