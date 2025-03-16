import { useRef } from 'react';

interface SearchbarProps {
  [key: string]: any;
}

function Searchbar(_props: SearchbarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={`flex items-center 
        p-2 rounded 
        mr-1
        gap-3 
        bg-gray-200
        w-70
        h-7.5
        focus-within:outline-black 
        focus-within:outline-1
        focus-within:flex-grow
        duration-600
        ease-out
        cursor-text`}
      tabIndex={0}
      onFocus={() => {
        inputRef.current?.focus();
      }}
    >
      <i
        className="
        fa-solid
        fa-magnifying-glass
        text-black
        text-md
        "
      ></i>
      <input
        type="text"
        className="
          flex-grow
          text-black
          outline-none
          placeholder-gray-500"
        placeholder="Search"
        ref={inputRef}
      />
    </div>
  );
}

export default Searchbar;
