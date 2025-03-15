import { User } from "./User.interfaces";

export enum MessageStatus {
  Sent,
  Delivered,
  Read,
}

export interface MessageBase {
  time: Date; // Timestamp of the message
  content: {
    text?: string; // Optional text content
    image?: string; // Optional image URL
    video?: string; // Optional video URL
    document?: string; // Optional document URL
  };
}
export interface Message extends MessageBase {
  senderId: string; // ID of the message sender
  status: MessageStatus; // Status of the message
}

export interface MessageInterface extends MessageBase {
  sender: {
    id: string; // ID of the sender
    name: string; // Name of the sender
    profilePicture: string; // URL of the sender's profile picture
  };
}

export interface ChatMessagesProbs {
  users: User[];
  messages: Message[];
  className?: string;
}
