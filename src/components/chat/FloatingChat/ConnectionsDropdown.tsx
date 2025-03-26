import { useState, useRef } from "react";
import { Users2 } from "lucide-react";
import ConnectionsList from "../ConnectionsList";
import useChats from "@hooks/useChats";

function ConnectionsDropdown({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnCreat = (usersId: string[]) => {
    setOpnedChats((prevChats) => {
      return [
        ...prevChats,
        { chatId: "", usersId, chatName: "", chatImage: [] },
      ];
    });
  };
  const { setOpnedChats } = useChats();
  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 rounded-full hover:bg-gray-200 transition"
        aria-label="Connections"
      >
        <Users2 className="w-6 h-6 text-gray-600" />
      </button>

      {isOpen && (
        <div
          className={`fixed right-75 bottom-30 bg-white shadow-lg rounded-lg p-3 border border-gray-200 ${className}`}
        >
          <ConnectionsList
            onCreate={handleOnCreat}
            containerClass="w-80"
            buttonClass="w-full"
          />
        </div>
      )}
    </>
  );
}

export default ConnectionsDropdown;
