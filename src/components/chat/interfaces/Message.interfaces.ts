import { User } from "./User.interfaces";

export enum MessageStatus {
  Sent,
  Delivered,
  Read,
}

export interface MessageBase {
  id: string;
  time: Date;
  content: {
    text?: string;
    image?: string;
    video?: string;
    document?: string;
  };
}
export interface RecievedMessage extends MessageBase {
  senderId: string;
  status: MessageStatus;
}

export interface MessageBubbleInterface extends MessageBase {
  sender: {
    id: string;
    name: string;
    profilePicture: string;
  };
}

export interface ChatMessagesProbs {
  users: User[];
  messages: RecievedMessage[];
  className?: string;
}

export interface SentMessage {}
