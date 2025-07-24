import React, { useState } from "react";

function Checkbox({ className = "" }: { className?: string }) {
  const [checked, setChecked] = useState(false);
  return (
    <label className={`${className} cursor-pointer`}>
      <input aria-label="cht-slct" type="checkbox" className="peer hidden" />
      <span
        onClick={() => setChecked((c) => !c)}
        className={` w-7 h-7 border-2 border-gray-400 rounded-lg bg-white flex items-center justify-center 
                      transition-all duration-300 peer-checked:bg-crimsonRed 
                      peer-hover:bg-gray-300 peer-hover:shadow-md peer-hover:scale-105
                      peer-checked:hover:bg-crimsonRed`}
      >
        <svg
          className={` w-5 h-6 text-white ${checked ? "scale-100" : "scale-0 "} transition-transform duration-300`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12l5 5L20 7" />
        </svg>
      </span>
    </label>
  );
}

export default Checkbox;
