interface Participant {
  userId: string;
  firstname: string;
  lastname: string;
  profilePicture: string;
  network: string[];
}

interface Conversation {
  chatId: string;
  participants: string[];
  lastMessage: string;
  unseenCount: number;
  isRead: boolean;
}

interface Message {
  messageId: string;
  chatId: string;
  senderId: string;
  sentDate: Date;
  content: {
    text: string;
  };
  status: number;
}

interface Database {
  participants: Participant[];
  conversations: Conversation[];
  messages: Message[];
}

const db: Database = {
  participants: [
    {
      userId: "1",
      firstname: "Mohaned",
      lastname: "",
      profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
      network: ["2", "5", "10", "20"],
    },
    {
      userId: "2",
      firstname: "Mario",
      lastname: "",
      profilePicture: "https://randomuser.me/api/portraits/men/2.jpg",
      network: ["1", "3", "6", "15"],
    },
    {
      userId: "3",
      firstname: "Ahmed",
      lastname: "",
      profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
      network: ["2", "4", "8", "16"],
    },
    {
      userId: "4",
      firstname: "John",
      lastname: "Doe",
      profilePicture: "https://randomuser.me/api/portraits/men/45.jpg",
      network: ["3", "9", "11", "30"],
    },
    {
      userId: "5",
      firstname: "Jane",
      lastname: "Smith",
      profilePicture: "https://randomuser.me/api/portraits/men/68.jpg",
      network: ["1", "7", "12", "25"],
    },
    {
      userId: "6",
      firstname: "Michael",
      lastname: "Johnson",
      profilePicture: "https://randomuser.me/api/portraits/men/23.jpg",
      network: ["2", "14", "17", "22"],
    },
    {
      userId: "7",
      firstname: "Sara",
      lastname: "Ali",
      profilePicture: "https://randomuser.me/api/portraits/women/34.jpg",
      network: ["5", "8", "18", "29"],
    },
    {
      userId: "8",
      firstname: "David",
      lastname: "Brown",
      profilePicture: "https://randomuser.me/api/portraits/men/30.jpg",
      network: ["3", "7", "13", "19"],
    },
    {
      userId: "9",
      firstname: "Emma",
      lastname: "Wilson",
      profilePicture: "https://randomuser.me/api/portraits/women/20.jpg",
      network: ["4", "16", "20", "26"],
    },
    {
      userId: "10",
      firstname: "Ali",
      lastname: "Hassan",
      profilePicture: "https://randomuser.me/api/portraits/men/50.jpg",
      network: ["1", "11", "15", "23"],
    },
    {
      userId: "11",
      firstname: "Chris",
      lastname: "Evans",
      profilePicture: "https://randomuser.me/api/portraits/men/11.jpg",
      network: ["4", "10", "21", "27"],
    },
    {
      userId: "12",
      firstname: "Robert",
      lastname: "Downey",
      profilePicture: "https://randomuser.me/api/portraits/men/12.jpg",
      network: ["5", "13", "17", "28"],
    },
    {
      userId: "13",
      firstname: "Scarlett",
      lastname: "Johansson",
      profilePicture: "https://randomuser.me/api/portraits/women/13.jpg",
      network: ["8", "12", "24", "30"],
    },
    {
      userId: "14",
      firstname: "Mark",
      lastname: "Ruffalo",
      profilePicture: "https://randomuser.me/api/portraits/men/14.jpg",
      network: ["6", "19", "25", "29"],
    },
    {
      userId: "15",
      firstname: "Chris",
      lastname: "Hemsworth",
      profilePicture: "https://randomuser.me/api/portraits/men/15.jpg",
      network: ["2", "10", "22", "26"],
    },
    {
      userId: "16",
      firstname: "Tom",
      lastname: "Holland",
      profilePicture: "https://randomuser.me/api/portraits/men/16.jpg",
      network: ["3", "9", "21", "28"],
    },
    {
      userId: "17",
      firstname: "Benedict",
      lastname: "Cumberbatch",
      profilePicture: "https://randomuser.me/api/portraits/men/17.jpg",
      network: ["6", "12", "23", "29"],
    },
    {
      userId: "18",
      firstname: "Chadwick",
      lastname: "Boseman",
      profilePicture: "https://randomuser.me/api/portraits/men/18.jpg",
      network: ["7", "19", "27", "30"],
    },
    {
      userId: "19",
      firstname: "Brie",
      lastname: "Larson",
      profilePicture: "https://randomuser.me/api/portraits/women/19.jpg",
      network: ["8", "14", "18", "25"],
    },
    {
      userId: "20",
      firstname: "Paul",
      lastname: "Rudd",
      profilePicture: "https://randomuser.me/api/portraits/men/20.jpg",
      network: ["1", "9", "22", "30"],
    },
    {
      userId: "21",
      firstname: "Jeremy",
      lastname: "Renner",
      profilePicture: "https://randomuser.me/api/portraits/men/21.jpg",
      network: ["11", "16", "24", "29"],
    },
    {
      userId: "22",
      firstname: "Elizabeth",
      lastname: "Olsen",
      profilePicture: "https://randomuser.me/api/portraits/women/22.jpg",
      network: ["6", "15", "20", "27"],
    },
    {
      userId: "23",
      firstname: "Anthony",
      lastname: "Mackie",
      profilePicture: "https://randomuser.me/api/portraits/men/23.jpg",
      network: ["10", "17", "24", "26"],
    },
    {
      userId: "24",
      firstname: "Sebastian",
      lastname: "Stan",
      profilePicture: "https://randomuser.me/api/portraits/men/24.jpg",
      network: ["13", "21", "23", "28"],
    },
    {
      userId: "25",
      firstname: "Tom",
      lastname: "Hiddleston",
      profilePicture: "https://randomuser.me/api/portraits/men/25.jpg",
      network: ["5", "14", "19", "30"],
    },
    {
      userId: "26",
      firstname: "Zoe",
      lastname: "Saldana",
      profilePicture: "https://randomuser.me/api/portraits/women/26.jpg",
      network: ["9", "15", "23", "27"],
    },
    {
      userId: "27",
      firstname: "Dave",
      lastname: "Bautista",
      profilePicture: "https://randomuser.me/api/portraits/men/27.jpg",
      network: ["11", "18", "22", "26"],
    },
    {
      userId: "28",
      firstname: "Chris",
      lastname: "Pratt",
      profilePicture: "https://randomuser.me/api/portraits/men/28.jpg",
      network: ["12", "16", "24", "30"],
    },
    {
      userId: "29",
      firstname: "Vin",
      lastname: "Diesel",
      profilePicture: "https://randomuser.me/api/portraits/men/29.jpg",
      network: ["7", "14", "17", "21"],
    },
    {
      userId: "30",
      firstname: "Bradley",
      lastname: "Cooper",
      profilePicture: "https://randomuser.me/api/portraits/men/30.jpg",
      network: ["4", "13", "18", "20", "25", "28"],
    },
  ],

  conversations: [
    {
      chatId: "chat-1",
      participants: ["1", "2"],
      lastMessage: "That was a great match!",
      unseenCount: 3,
      isRead: false,
    },
    {
      chatId: "chat-2",
      participants: ["1", "3"],
      lastMessage: "Hey Ahmed, how are you?",
      unseenCount: 2,
      isRead: false,
    },
    {
      chatId: "chat-3",
      participants: ["1", "4"],
      lastMessage: "Sounds good! See you then.",
      unseenCount: 1,
      isRead: false,
    },
    {
      chatId: "chat-4",
      participants: ["1", "5"],
      lastMessage: "Hey Jane, need help with the project?",
      unseenCount: 5,
      isRead: false,
    },
    {
      chatId: "chat-5",
      participants: ["1", "6"],
      lastMessage: "Let's play football this weekend!",
      unseenCount: 0,
      isRead: true,
    },
    {
      chatId: "chat-6",
      participants: ["1", "7"],
      lastMessage: "I will update you soon!",
      unseenCount: 4,
      isRead: false,
    },
    {
      chatId: "chat-7",
      participants: ["1", "8"],
      lastMessage: "Did you check the new tech updates?",
      unseenCount: 2,
      isRead: false,
    },
    {
      chatId: "chat-8",
      participants: ["1", "9"],
      lastMessage: "Don't forget our meeting!",
      unseenCount: 3,
      isRead: false,
    },
    {
      chatId: "chat-9",
      participants: ["1", "10"],
      lastMessage: "Where are you now?",
      unseenCount: 1,
      isRead: false,
    },
    {
      chatId: "chat-10",
      participants: ["1", "11"],
      lastMessage: "Let's catch up soon!",
      unseenCount: 6,
      isRead: false,
    },
    {
      chatId: "chat-11",
      participants: ["1", "12"],
      lastMessage: "How's the project going?",
      unseenCount: 2,
      isRead: false,
    },
    {
      chatId: "chat-12",
      participants: ["1", "13"],
      lastMessage: "See you at the meeting!",
      unseenCount: 3,
      isRead: false,
    },
    {
      chatId: "chat-13",
      participants: ["1", "14"],
      lastMessage: "Let's discuss the details.",
      unseenCount: 4,
      isRead: false,
    },
    {
      chatId: "chat-14",
      participants: ["1", "15"],
      lastMessage: "Can you send me the files?",
      unseenCount: 1,
      isRead: false,
    },
    {
      chatId: "chat-15",
      participants: ["1", "16"],
      lastMessage: "Looking forward to it!",
      unseenCount: 2,
      isRead: false,
    },
    {
      chatId: "chat-16",
      participants: ["1", "17"],
      lastMessage: "I'll get back to you soon.",
      unseenCount: 0,
      isRead: true,
    },
    {
      chatId: "chat-17",
      participants: ["1", "18"],
      lastMessage: "Let's meet up tomorrow.",
      unseenCount: 3,
      isRead: false,
    },
    {
      chatId: "chat-18",
      participants: ["1", "19"],
      lastMessage: "Thanks for the update!",
      unseenCount: 1,
      isRead: false,
    },
    {
      chatId: "chat-19",
      participants: ["1", "20"],
      lastMessage: "I'll send you the details.",
      unseenCount: 5,
      isRead: false,
    },
    {
      chatId: "chat-20",
      participants: ["1", "21"],
      lastMessage: "Let's work on it together.",
      unseenCount: 4,
      isRead: false,
    },
    {
      chatId: "chat-21",
      participants: ["1", "22"],
      lastMessage: "I'll call you later.",
      unseenCount: 1,
      isRead: false,
    },
    {
      chatId: "chat-22",
      participants: ["1", "23"],
      lastMessage: "Can we reschedule?",
      unseenCount: 2,
      isRead: false,
    },
    {
      chatId: "chat-23",
      participants: ["1", "24"],
      lastMessage: "I'll be there soon.",
      unseenCount: 3,
      isRead: false,
    },
    {
      chatId: "chat-24",
      participants: ["1", "25"],
      lastMessage: "Let's finalize the plan.",
      unseenCount: 2,
      isRead: false,
    },
    {
      chatId: "chat-25",
      participants: ["1", "26"],
      lastMessage: "I'll update you tomorrow.",
      unseenCount: 4,
      isRead: false,
    },
    {
      chatId: "chat-26",
      participants: ["1", "27"],
      lastMessage: "Can you review this?",
      unseenCount: 1,
      isRead: false,
    },
    {
      chatId: "chat-27",
      participants: ["1", "28"],
      lastMessage: "Let's discuss it further.",
      unseenCount: 2,
      isRead: false,
    },
    {
      chatId: "chat-28",
      participants: ["1", "29"],
      lastMessage: "I'll send you the report.",
      unseenCount: 3,
      isRead: false,
    },
    {
      chatId: "chat-29",
      participants: ["1", "30"],
      lastMessage: "Let's catch up soon!",
      unseenCount: 5,
      isRead: false,
    },
    {
      chatId: "chat-30",
      participants: ["2", "5"],
      lastMessage: "Haha, alright! Talk soon.",
      unseenCount: 2,
      isRead: false,
    },
    {
      chatId: "chat-31",
      participants: ["3", "6"],
      lastMessage: "Check your email, I sent you the files.",
      unseenCount: 1,
      isRead: false,
    },
    {
      chatId: "chat-32",
      participants: ["2", "6"],
      lastMessage: "Let's meet tomorrow at 5 PM.",
      unseenCount: 3,
      isRead: false,
    },
    {
      chatId: "chat-33",
      participants: ["7", "8"],
      lastMessage: "I'll send the report soon.",
      unseenCount: 4,
      isRead: false,
    },
    {
      chatId: "chat-34",
      participants: ["3", "10"],
      lastMessage: "Where are you now?",
      unseenCount: 2,
      isRead: false,
    },
    {
      chatId: "chat-35",
      participants: ["4", "6"],
      lastMessage: "Happy birthday bro!",
      unseenCount: 3,
      isRead: false,
    },
    {
      chatId: "chat-36",
      participants: ["8", "9"],
      lastMessage: "See you in class tomorrow!",
      unseenCount: 1,
      isRead: false,
    },
    {
      chatId: "chat-37",
      participants: ["2", "9"],
      lastMessage: "Let's collaborate on that project.",
      unseenCount: 5,
      isRead: false,
    },
  ],

  messages: [],
};

const generateMessages = (
  chatId: string,
  senderId1: string,
  senderId2: string,
) => {
  let messages = [];
  for (let i = 1; i <= 30; i++) {
    messages.push({
      messageId: `${chatId}-${Date.now()}-${i}`,
      chatId: chatId,
      senderId: i % 2 === 0 ? senderId1 : senderId2,
      sentDate: new Date(),
      content: {
        text: `Message ${i} from ${i % 2 === 0 ? senderId1 : senderId2}`,
      },
      status: 2,
    });
  }
  return messages;
};

for (let conversation of db.conversations) {
  const [participant1, participant2] = conversation.participants;
  db.messages.push(
    ...generateMessages(conversation.chatId, participant1, participant2),
  );
}

export default db;
