import { motion } from "framer-motion";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
  ariaLabel: string;
  className?: string;
  size?: "sm" | "md"; // Added size prop with options
}

const ToggleSwitch = ({
  checked,
  onChange,
  label,
  ariaLabel,
  className = "",
  size = "sm", // Default to small size
}: ToggleSwitchProps) => {
  // Size-dependent values
  const switchHeight = size === "sm" ? "h-6" : "h-8";
  const switchPadding = size === "sm" ? "px-1 py-0.5" : "px-2 py-1";
  const knobSize = size === "sm" ? "h-5 w-5" : "h-6 w-6";
  const translateX =
    size === "sm"
      ? checked
        ? "0.85rem"
        : "0rem"
      : checked
        ? "1.25rem"
        : "0.125rem";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {label && (
        <span
          className={`${size === "sm" ? "text-xs" : "text-sm"} font-medium text-gray-700 hidden md:inline`}
        >
          {label}
        </span>
      )}
      <button
        onClick={onChange}
        className={`relative inline-flex ${switchHeight} items-center ${switchPadding} rounded-full 
            transition-colors duration-300 focus:outline-none  w-10
            focus:ring-2 focus:ring-red-500 focus:ring-offset-1 ${
              checked ? "bg-red-500" : "bg-gray-200"
            }`}
        aria-label={ariaLabel}
        aria-checked={checked}
        role="switch"
      >
        <motion.div
          className={`${knobSize} rounded-full bg-white   shadow-md`}
          initial={false}
          animate={{
            x: translateX,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
