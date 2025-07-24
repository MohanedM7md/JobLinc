// UpdateFailed.tsx
import { XCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface UpdateFailedProps {
  WhatFailed: string;
  errorText?: string;
  setVisible: (value: boolean) => void;
  helperText?: string;
  goTo?: string;
}

function UpdateFailed({ WhatFailed, errorText, setVisible, helperText, goTo }: UpdateFailedProps) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setVisible]);

  return (
    <div
      ref={boxRef}
      className="z-50 bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8 max-w-[90%] sm:max-w-xl mx-auto mt-10 flex flex-col gap-6"
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
        <XCircle className="text-red-600 w-12 h-12" />
        <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left text-charcoalBlack">
          {WhatFailed}
        </h2>
      </div>
      <p className="text-base sm:text-lg text-center sm:text-left text-gray-700">
        {errorText}
      </p>
      <p className="text-base sm:text-lg text-center sm:text-left text-gray-700 font-bold hover:cursor-pointer hover:underline" onClick={() => { navigate(goTo || "/home") }}>
        {helperText}
      </p>
      <div className="flex justify-center sm:justify-start">
        <button
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:cursor-pointer transition"
          onClick={() => setVisible(false)}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default UpdateFailed;
