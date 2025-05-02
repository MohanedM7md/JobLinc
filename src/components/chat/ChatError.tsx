interface ChatErrorProps {
  error: string;
}

export default function ChatError({ error }: ChatErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-4">
      <div className="text-red-500 text-xl mb-4" dir="rtl">
        <svg
          className="w-12 h-12 mx-auto mb-2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
        {error}
      </div>
    </div>
  );
}
