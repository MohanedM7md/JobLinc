import { useState, useRef } from "react";
import { Users2 } from "lucide-react";
import ConnectionsList from "../ConnectionsList";

function ConnectionsDropdown({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 rounded-full hover:bg-gray-200 transition"
        aria-label="Connections"
      >
        <Users2 className="w-6 h-6 text-gray-600" />
      </button>

      {isOpen && (
        <div
          className={`absolute bg-white shadow-lg rounded-lg p-3 border border-gray-200 ${className}`}
        >
          <ConnectionsList
            isOpen={isOpen}
            containerClass="w-80"
            buttonClass="w-full"
          />
        </div>
      )}
    </div>
  );
}

export default ConnectionsDropdown;
