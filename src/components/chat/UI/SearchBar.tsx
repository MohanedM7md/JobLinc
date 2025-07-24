import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  className?: string;
  FocusToggler: () => void;
  onChange: (value: string) => void;
}

function SearchBar({ className = "", FocusToggler, onChange }: SearchBarProps) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`h-10 flex items-center border border-gray-300 rounded-lg px-2 cursor-pointer bg-white 
        ${isFocused ? "shadow-md border-blue-500" : "hover:border-gray-400"}`}
    >
      <input
        type="text"
        name="text"
        className={`border-none outline-none text-sm caret-crimsonRed flex-grow ${className}`}
        placeholder="Search..."
        value={value}
        onFocus={() => {
          setIsFocused(true);
          FocusToggler();
        }}
        onBlur={() => {
          setIsFocused(false);
          FocusToggler();
        }}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
      <Search
        className="w-4 h-4 text-gray-500"
        data-testid="test-search-icon"
      />
    </div>
  );
}

export default SearchBar;
