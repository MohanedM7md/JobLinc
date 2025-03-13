import React from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

interface User {
  name: string;
  profilePicture: string;
  status: "online" | "offline";
}

const mockUser: User = {
  name: "Shahd Khalifa",
  profilePicture: "https://randomuser.me/api/portraits/women/45.jpg",
  status: "online",
};

function ChatWindow() {
  return (
    <div
      id={""}
      className="w-[400px] shadow-xl border-1 border-gray-200 rounded-t-lg"
    >
      <ChatHeader user={mockUser} onClose={() => console.log("Chat Closed")} />

      <ChatMessages />

      <ChatInput />
    </div>
  );
}

export default ChatWindow;
