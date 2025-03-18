const db = {
  participants: [
    {
      userId: "1",
      firstname: "Mohaned",
      lastname: "",
      profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      userId: "2",
      firstname: "Mario",
      lastname: "",
      profilePicture: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      userId: "3",
      firstname: "Ahmed",
      lastname: "",
      profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      userId: "4",
      firstname: "John",
      lastname: "Doe",
      profilePicture: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      userId: "5",
      firstname: "Jane",
      lastname: "Smith",
      profilePicture: "https://randomuser.me/api/portraits/men/68.jpg",
    },
    {
      userId: "6",
      firstname: "Michael",
      lastname: "Johnson",
      profilePicture: "https://randomuser.me/api/portraits/men/23.jpg",
    },
    {
      userId: "7",
      firstname: "Sara",
      lastname: "Ali",
      profilePicture: "https://randomuser.me/api/portraits/women/34.jpg",
    },
    {
      userId: "8",
      firstname: "David",
      lastname: "Brown",
      profilePicture: "https://randomuser.me/api/portraits/men/30.jpg",
    },
    {
      userId: "9",
      firstname: "Emma",
      lastname: "Wilson",
      profilePicture: "https://randomuser.me/api/portraits/women/20.jpg",
    },
    {
      userId: "10",
      firstname: "Ali",
      lastname: "Hassan",
      profilePicture: "https://randomuser.me/api/portraits/men/50.jpg",
    },
  ],

  conversations: [
    {
      chatId: "chat-1",
      participants: ["1", "4"],
      lastMessage: "Sounds good! See you then.",
    },
    {
      chatId: "chat-2",
      participants: ["2", "5"],
      lastMessage: "Haha, alright! Talk soon.",
    },
    {
      chatId: "chat-3",
      participants: ["3", "6"],
      lastMessage: "Check your email, I sent you the files.",
    },
    {
      chatId: "chat-4",
      participants: ["1", "5"],
      lastMessage: "Hey Jane, need help with the project?",
    },
    {
      chatId: "chat-5",
      participants: ["2", "6"],
      lastMessage: "Let's meet tomorrow at 5 PM.",
    },
    {
      chatId: "chat-6",
      participants: ["7", "8"],
      lastMessage: "I'll send the report soon.",
    },
    {
      chatId: "chat-7",
      participants: ["1", "9"],
      lastMessage: "Don't forget our meeting!",
    },
    {
      chatId: "chat-8",
      participants: ["3", "10"],
      lastMessage: "Where are you now?",
    },
    {
      chatId: "chat-9",
      participants: ["4", "6"],
      lastMessage: "Happy birthday bro!",
    },
    {
      chatId: "chat-10",
      participants: ["8", "9"],
      lastMessage: "See you in class tomorrow!",
    },
    {
      chatId: "chat-11",
      participants: ["1", "6"],
      lastMessage: "Let's play football this weekend!",
    },
  ],

  messages: [
    // Chat 1: Mohaned & John Doe
    {
      messageId: "1-1633024800000",
      chatId: "chat-1",
      senderId: "1",
      sentDate: new Date(),
      content: { text: "Hey John!" },
      status: 2,
    },
    {
      messageId: "4-1633024800001",
      chatId: "chat-1",
      senderId: "4",
      sentDate: new Date(),
      content: { text: "Hey Mohaned!" },
      status: 1,
    },

    // Chat 2: Mario & Jane Smith
    {
      messageId: "2-1633024800002",
      chatId: "chat-2",
      senderId: "2",
      sentDate: new Date(),
      content: { text: "Hi Jane!" },
      status: 2,
    },
    {
      messageId: "5-1633024800003",
      chatId: "chat-2",
      senderId: "5",
      sentDate: new Date(),
      content: { text: "Hi Mario!" },
      status: 1,
    },

    // Chat 3: Ahmed & Michael Johnson
    {
      messageId: "3-1633024800004",
      chatId: "chat-3",
      senderId: "3",
      sentDate: new Date(),
      content: { text: "Hello Michael!" },
      status: 2,
    },
    {
      messageId: "6-1633024800005",
      chatId: "chat-3",
      senderId: "6",
      sentDate: new Date(),
      content: { text: "Hey Ahmed!" },
      status: 2,
    },

    // Chat 4: Mohaned & Jane Smith
    {
      messageId: "1-1633024800006",
      chatId: "chat-4",
      senderId: "1",
      sentDate: new Date(),
      content: { text: "Hey Jane, need help with the project?" },
      status: 2,
    },
    {
      messageId: "5-1633024800007",
      chatId: "chat-4",
      senderId: "5",
      sentDate: new Date(),
      content: { text: "Yes, please!" },
      status: 1,
    },

    // Chat 5: Mario & Michael Johnson
    {
      messageId: "2-1633024800008",
      chatId: "chat-5",
      senderId: "2",
      sentDate: new Date(),
      content: { text: "Let's meet tomorrow at 5 PM." },
      status: 2,
    },
    {
      messageId: "6-1633024800009",
      chatId: "chat-5",
      senderId: "6",
      sentDate: new Date(),
      content: { text: "Sounds good!" },
      status: 1,
    },

    // Chat 6: Sara & David
    {
      messageId: "7-1633024800010",
      chatId: "chat-6",
      senderId: "7",
      sentDate: new Date(),
      content: { text: "Hey David, I'll send the report soon." },
      status: 2,
    },
    {
      messageId: "8-1633024800011",
      chatId: "chat-6",
      senderId: "8",
      sentDate: new Date(),
      content: { text: "Alright, thanks!" },
      status: 1,
    },

    // Chat 7: Mohaned & Emma
    {
      messageId: "1-1633024800012",
      chatId: "chat-7",
      senderId: "1",
      sentDate: new Date(),
      content: { text: "Don't forget our meeting!" },
      status: 2,
    },
    {
      messageId: "9-1633024800013",
      chatId: "chat-7",
      senderId: "9",
      sentDate: new Date(),
      content: { text: "Got it, see you then!" },
      status: 1,
    },

    // Chat 8: Ahmed & Ali
    {
      messageId: "3-1633024800014",
      chatId: "chat-8",
      senderId: "3",
      sentDate: new Date(),
      content: { text: "Where are you now?" },
      status: 2,
    },
    {
      messageId: "10-1633024800015",
      chatId: "chat-8",
      senderId: "10",
      sentDate: new Date(),
      content: { text: "On my way!" },
      status: 1,
    },

    // Chat 9: John & Michael
    {
      messageId: "4-1633024800016",
      chatId: "chat-9",
      senderId: "4",
      sentDate: new Date(),
      content: { text: "Happy birthday bro!" },
      status: 2,
    },
    {
      messageId: "6-1633024800017",
      chatId: "chat-9",
      senderId: "6",
      sentDate: new Date(),
      content: { text: "Thanks man!" },
      status: 1,
    },

    // Chat 10: David & Emma
    {
      messageId: "8-1633024800018",
      chatId: "chat-10",
      senderId: "8",
      sentDate: new Date(),
      content: { text: "See you in class tomorrow!" },
      status: 2,
    },
    {
      messageId: "9-1633024800019",
      chatId: "chat-10",
      senderId: "9",
      sentDate: new Date(),
      content: { text: "Sure! Goodnight!" },
      status: 1,
    },

    // Chat 11: Mohaned & Michael
    {
      messageId: "1-1633024800020",
      chatId: "chat-11",
      senderId: "1",
      sentDate: new Date(),
      content: { text: "Let's play football this weekend!" },
      status: 2,
    },
    {
      messageId: "6-1633024800021",
      chatId: "chat-11",
      senderId: "6",
      sentDate: new Date(),
      content: { text: "Yes, I'm in!" },
      status: 1,
    },
  ],
};
export default db;
