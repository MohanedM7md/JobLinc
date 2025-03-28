import { http, HttpResponse } from "msw";
import db from "./db"; // Import the mock database

export const msghandlers = [
  // Handler for fetching user chats
  http.get("/api/chats/:userId", async ({ params }) => {
    const { userId } = params;
    console.log("Mock: Fetching chats for user:", userId);

    const chats = db.conversations
      .filter((chat) => userId && chat.participants.includes(userId as string))
      .map((chat) => {
        const otherUserId = chat.participants.find((id) => id !== userId);
        const otherUser = db.participants.find(
          (user) => user.userId === otherUserId,
        );

        return {
          chatId: chat.chatId,
          chatName: otherUser?.firstname || "Unknown",
          chatPicture: otherUser?.profilePicture || "",
          lastMessage: chat.lastMessage,
        };
      })
      .sort((a, b) => (a.lastMessage > b.lastMessage ? -1 : 1));
    return new HttpResponse(JSON.stringify(chats), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),

  // Handler for fetching messages of a chat
  http.get("/api/messages/:chatId", async ({ params }) => {
    const { chatId } = params;
    console.log("Mock: Fetching messages for chat:", chatId);

    const chat = db.conversations.find((chat) => chat.chatId === chatId);
    if (!chat) {
      return new HttpResponse(JSON.stringify({ message: "Chat not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const users = chat.participants
      .map((userId) =>
        db.participants.find((participant) => participant.userId === userId),
      )
      .filter(Boolean)
      .map((user) => ({
        userId: user!.userId,
        firstName: user!.firstname,
        lastName: user!.lastname || "",
        profilePicture: user!.profilePicture,
      }));

    const messages = db.messages
      .filter((msg) => msg.chatId === chatId)
      .map((msg) => ({
        messageId: msg.messageId,
        senderId: msg.senderId,
        sentDate: msg.sentDate,
        content: msg.content,
        status: msg.status,
      }))
      .sort(
        (a, b) =>
          new Date(a.sentDate).getTime() - new Date(b.sentDate).getTime(),
      );

    return new HttpResponse(JSON.stringify({ messages, users }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
];
