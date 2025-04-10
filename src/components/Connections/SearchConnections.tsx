import { SearchProps } from "../../interfaces/networkInterfaces";
import { useRef } from "react";

function SearchConnections(props: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="border rounded-md w-50 hover:bg-gray-200 focus-within:bg-gray-200"
      tabIndex={0}
      onFocus={() => {
        inputRef.current?.focus();
      }}
    >
      <i
        className="
        fa-solid
        fa-magnifying-glass
        pl-2
        py-2
        text-gray-600
        text-xs
        cursor-text
        font-extrabold"
      ></i>
      <input
        className="
        p-1
        text-black
        outline-none
        placeholder-gray-500
        text-sm"
        type="text"
        placeholder="Search by name"
        ref={inputRef}
        value={props.searchTerm}
        onChange={(e) => props.setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchConnections;