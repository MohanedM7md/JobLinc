import store from "@store/store";
import { RecievedMessage } from "../interfaces/Message.interfaces";

export function buildMessageObject(
  message: string | File,
  type: string,
): RecievedMessage {
  const messageId = Date.now().toString();
  const senderId = store.getState().user.userId;

  const content: any = {};
  switch (type) {
    case "text":
      content.text = message;
      break;
    case "image":
      content.image = message;
      break;
    case "video":
      content.video = message;
      break;
    case "document":
      content.document = message;
      break;
    default:
      content.text = typeof message === "string" ? message : "";
  }

  return {
    messageId,
    senderId,
    time: new Date(),
    seenBy: [senderId],
    status: "sent",
    content,
  };
}
