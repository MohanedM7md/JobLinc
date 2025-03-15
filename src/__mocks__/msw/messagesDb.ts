export const messagesDb = {
  users: [
    {
      id: "1",
      name: "Mohaned",
      profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: "2",
      name: "Mario",
      profilePicture: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: "3",
      name: "Ahmed",
      profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: "4",
      name: "John Doe",
      profilePicture: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      id: "5",
      name: "Jane Smith",
      profilePicture: "https://randomuser.me/api/portraits/men/68.jpg",
    },
    {
      id: "6",
      name: "Michael Johnson",
      profilePicture: "https://randomuser.me/api/portraits/men/23.jpg",
    },
  ],

  conversations: [
    {
      chatId: "chat-1",
      participants: ["1", "4"], // Mohaned & John Doe
      imageUrl: "https://randomuser.me/api/portraits/men/45.jpg",
      chatName: "John Doe",
      lastMessage: "Sounds good! See you then.",
      sentDate: "Mar 6",
    },
    {
      chatId: "chat-2",
      participants: ["2", "5"], // Mario & Jane Smith
      imageUrl: "https://randomuser.me/api/portraits/men/68.jpg",
      chatName: "Jane Smith",
      lastMessage: "Haha, alright! Talk soon.",
      sentDate: "Mar 5",
    },
    {
      chatId: "chat-3",
      participants: ["3", "6"], // Ahmed & Michael Johnson
      imageUrl: "https://randomuser.me/api/portraits/men/23.jpg",
      chatName: "Michael Johnson",
      lastMessage: "Check your email, I sent you the files.",
      sentDate: "Mar 4",
    },
  ],

  messages: [
    // Chat 1: Mohaned & John Doe
    {
      chatId: "chat-1",
      senderId: "1",
      time: new Date("2024-03-06T12:00:00"),
      content: { text: "Hey John! Wanna grab coffee later?" },
    },
    {
      chatId: "chat-1",
      senderId: "4",
      time: new Date("2024-03-06T12:05:00"),
      content: { text: "Sure! What time works for you?" },
    },
    {
      chatId: "chat-1",
      senderId: "1",
      time: new Date("2024-03-06T12:10:00"),
      content: { text: "How about 3 PM at the usual spot?" },
    },
    {
      chatId: "chat-1",
      senderId: "4",
      time: new Date("2024-03-06T12:15:00"),
      content: { text: "Sounds good! See you then." },
    },

    // Chat 2: Mario & Jane Smith
    {
      chatId: "chat-2",
      senderId: "2",
      time: new Date("2024-03-05T14:00:00"),
      content: { text: "Hey Jane, did you watch that new movie?" },
    },
    {
      chatId: "chat-2",
      senderId: "5",
      time: new Date("2024-03-05T14:10:00"),
      content: { text: "Not yet! Is it good?" },
    },
    {
      chatId: "chat-2",
      senderId: "2",
      time: new Date("2024-03-05T14:15:00"),
      content: { text: "It's amazing! You have to see it." },
    },
    {
      chatId: "chat-2",
      senderId: "5",
      time: new Date("2024-03-05T14:20:00"),
      content: { text: "Haha, alright! Talk soon." },
    },

    // Chat 3: Ahmed & Michael Johnson
    {
      chatId: "chat-3",
      senderId: "3",
      time: new Date("2024-03-04T09:00:00"),
      content: { text: "Michael, did you finish the project?" },
    },
    {
      chatId: "chat-3",
      senderId: "6",
      time: new Date("2024-03-04T09:10:00"),
      content: { text: "Almost! Just polishing a few things." },
    },
    {
      chatId: "chat-3",
      senderId: "3",
      time: new Date("2024-03-04T09:15:00"),
      content: { text: "Great! Let me know when it's done." },
    },
    {
      chatId: "chat-3",
      senderId: "6",
      time: new Date("2024-03-04T09:20:00"),
      content: { text: "Check your email, I sent you the files." },
    },
  ],
};
