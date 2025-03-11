import React from "react";
import MessageBubble from "./MessageBubble";

const mockMessages = [
  {
    sender: {
      id: "1",
      name: "John Doe",
      profilePicture: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    time: new Date(),
    content: {
      text: "Hey! How's it going?",
      image: "https://source.unsplash.com/random",
    },
  },
  {
    sender: {
      id: "2",
      name: "Jane Smith",
      profilePicture: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    time: new Date(),
    content: {
      text: "It's me mario",
    },
  },
  {
    sender: {
      id: "3",
      name: "Michael Johnson",
      profilePicture: "https://randomuser.me/api/portraits/men/23.jpg",
    },
    time: new Date(),
    content: {
      text: "الله اكبر عليك ي فنان",
      document:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  },
];

function ChatMessages() {
  return mockMessages.map((message) => <MessageBubble message={message} />);
}

export default ChatMessages;
