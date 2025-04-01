import { http, HttpResponse } from "msw";
import db from "./db"; // Import the mock database
import SERVER_URL from "@services/api/config";

export const msghandlers = [
  http.get(`${SERVER_URL}/socket.io/`, () => {
    return new HttpResponse(JSON.stringify({ sid: "mock-socket-id" }), {
      status: 200,
    });
  }),
  http.post(`${SERVER_URL}/socket.io/`, () => {
    return new HttpResponse(JSON.stringify({ sid: "mock-socket-id" }), {
      status: 200,
    });
  }),
  // Fetch user's network (friends list)
  http.get(`${SERVER_URL}/api/Networks/:userId`, async ({ params }) => {
    const { userId } = params;
    const user = db.participants.find(
      (participant) => participant.userId === userId,
    );
    if (!user) {
      return new HttpResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }
    const networkIds = user.network;
    const chatCards = db.participants
      .filter((participant) => networkIds.includes(participant.userId))
      .map((participant) => ({
        userId: participant.userId,
        firstname: participant.firstname,
        lastname: participant.lastname,
        profilePicture: [participant.profilePicture],
      }));
    return new HttpResponse(JSON.stringify(chatCards), { status: 200 });
  }),

  // Fetch user chats
  http.get(`${SERVER_URL}/api/all`, async ({ params }) => {
    console.log("Mock: Fetching chats for user:", "1");
    const chats = db.conversations
      .filter((chat) => chat.participants.includes("1"))
      .map((chat) => {
        const otherUserId = chat.participants.find((id) => id !== "1");
        const otherUser = db.participants.find(
          (user) => user.userId === otherUserId,
        );
        return {
          chatId: chat.chatId,
          chatName: otherUser?.firstname || "Unknown",
          chatPicture: chat.chatPicture,
          lastMessage: chat.lastMessage,
          unseenCount: chat.unseenCount,
          isRead: chat.isRead,
        };
      })
      .sort((a, b) => (a.lastMessage > b.lastMessage ? -1 : 1));
    return new HttpResponse(JSON.stringify(chats), { status: 200 });
  }),

  // Fetch messages of a chat
  http.get(`${SERVER_URL}/api/c/chat/:chatId`, async ({ params }) => {
    const { chatId } = params;
    console.log("Mock: Fetching messages for chat:", chatId);
    const chat = db.conversations.find((chat) => chat.chatId === chatId);
    if (!chat) {
      return new HttpResponse(JSON.stringify({ message: "Chat not found" }), {
        status: 404,
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
    });
  }),

  // Create or fetch chat messages
  http.post(`${SERVER_URL}/api/messages`, async ({ request }) => {
    const { usersId, myId } = await request.json();
    console.log(`Mock: Chat created for users: ${usersId} and ${myId}`);
    let chat = db.conversations.find(
      (chat) =>
        chat.participants.length === 2 &&
        chat.participants.includes(usersId) &&
        chat.participants.includes(myId),
    );
    if (!chat) {
      chat = {
        chatId: `chat_${Date.now()}`,
        participants: [...usersId, myId],
        lastMessage: "",
      };
      db.conversations.push(chat);
    }
    const users = chat!.participants
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
      .filter((msg) => msg.chatId === chat!.chatId)
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
    return new HttpResponse(
      JSON.stringify({ chatId: chat!.chatId, users, messages }),
      { status: 200 },
    );
  }),
];
