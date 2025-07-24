import { User } from "./User.interfaces";

export enum MessageStatus {
  Sent = "sent",
  Delivered = "delivered",
  Failed = "failed",
}

export interface MessageBase {
  sentDate: Date;
  messageId: string;
  content: {
    text?: string;
    image?: string;
    video?: string;
    document?: string;
  };
  seenBy: string[];
  status: "sent" | "delivered" | "failed";
}
export interface RecievedMessage extends MessageBase {
  senderId: string;
}

export interface MessageBubbleInterface extends MessageBase {
  sender: {
    userId: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
}

export interface ChatMessagesProbs {
  users: User[];
  messages: RecievedMessage[];
  className?: string;
  loading: boolean;
}

export interface SentMessage {}
