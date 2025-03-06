export const Checkbox = ({ style = "w-4 h-6" }: { style?: string }) => {
  return (
    <label className="relative inline-block cursor-pointer">
      <input type="checkbox" className="peer hidden" />
      <span
        className="w-8 h-8 border-2 border-gray-400 rounded-lg bg-white flex items-center justify-center 
                      transition-all duration-300 peer-checked:bg-softRosewood
                      peer-hover:bg-gray-300 peer-hover:shadow-md peer-hover:scale-105"
      >
        <svg
          className={`${style}text-white opacity-0 scale-0 transition-transform duration-300 peer-checked:opacity-100 peer-checked:scale-100`}
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
};
