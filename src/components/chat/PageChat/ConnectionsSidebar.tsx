import { motion } from "framer-motion";
import { X } from "lucide-react";
import ConnectionsList from "../ConnectionsList";

function ConnectionsSidebar({
  className,
  isOpen,
  onClose,
}: {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? "0%" : "100%" }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-6 z-50 ${className}`}
    >
      <div className="flex justify-between items-center border-b pb-2">
        <h3 className="text-lg font-semibold">Create a Group</h3>
        <button onClick={onClose}>
          <X className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <ConnectionsList
        isOpen={isOpen}
        onClose={onClose}
        containerClass="h-full"
        buttonClass="w-full"
      />
    </motion.div>
  );
}

export default ConnectionsSidebar;
