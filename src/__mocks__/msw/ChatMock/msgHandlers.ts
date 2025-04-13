import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import db from "./db";

const API_URL = "http://localhost:4000";

// HTTP handlers
export const msghandlers = [
  // Get user's network (friends list)
  http.get(`${API_URL}/api/Networks/:userId`, ({ params }) => {
    const { userId } = params;
    const user = db.participants.find(
      (participant) => participant.userId === userId,
    );
    if (!user) {
      return HttpResponse.json({ error: "User not found" }, { status: 404 });
    }

    const networkIds = user.network;
    const chatCards = db.participants
      .filter((participant) => networkIds.includes(participant.userId))
      .map((participant) => ({
        userId: participant.userId,
        firstname: participant.firstname,
        lastname: participant.lastname,
        profilePicture: participant.profilePicture,
      }));

    return HttpResponse.json(chatCards);
  }),

  // Get all chats for user
  http.get(`${API_URL}/api/chat/all`, ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    const chats = db.conversations
      .filter((chat) => chat.participants.includes(userId))
      .map((chat) => {
        const otherUserId = chat.participants.find((id) => id !== userId);
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

    return HttpResponse.json(chats);
  }),

  // Get chat messages
  http.get(`${API_URL}/api/chat/c/:chatId`, ({ params }) => {
    const { chatId } = params;
    const chat = db.conversations.find((chat) => chat.chatId === chatId);

    if (!chat) {
      return HttpResponse.json({ message: "Chat not found" }, { status: 404 });
    }

    const participants = chat.participants
      .map((userId) =>
        db.participants.find((participant) => participant.userId === userId),
      )
      .filter(Boolean)
      .map((user) => ({
        userId: user.userId,
        firstName: user.firstname,
        lastName: user.lastname || "",
        profilePicture: user.profilePicture,
      }));

    const messages = db.messages
      .filter((msg) => msg.chatId === chatId)
      .map((msg) => ({
        messageId: msg.messageId,
        senderId: msg.senderId,
        sentDate: msg.sentDate,
        content: msg.content,
        seenBy: msg.seeenBy,
      }))
      .sort(
        (a, b) =>
          new Date(a.sentDate).getTime() - new Date(b.sentDate).getTime(),
      );

    return HttpResponse.json({ messages, participants });
  }),

  // Create or get chat
  http.post(`${API_URL}/api/messages`, async ({ request }) => {
    const { userId, myId } = await request.json();

    let chat = db.conversations.find(
      (chat) =>
        chat.participants.length === 2 &&
        chat.participants.includes(userId) &&
        chat.participants.includes(myId),
    );

    if (!chat) {
      chat = {
        chatId: `chat_${Date.now()}`,
        participants: [userId, myId],
        lastMessage: null,
      };
      db.conversations.push(chat);
    }

    const users = chat.participants
      .map((userId) =>
        db.participants.find((participant) => participant.userId === userId),
      )
      .filter(Boolean)
      .map((user) => ({
        userId: user.userId,
        firstName: user.firstname,
        lastName: user.lastname || "",
        profilePicture: user.profilePicture,
      }));

    const messages = db.messages
      .filter((msg) => msg.chatId === chat.chatId)
      .map((msg) => ({
        messageId: msg.messageId,
        senderId: msg.senderId,
        sentDate: msg.sentDate,
        content: msg.content,
        status: msg.status,
      }))
      .sort((a, b) => new Date(a.sentDate) - new Date(b.sentDate));

    return HttpResponse.json({ chatId: chat.chatId, users, messages });
  }),
];
