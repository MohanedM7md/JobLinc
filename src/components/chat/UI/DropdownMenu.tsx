import { useRef, useEffect } from "react";
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  align?: "left" | "right";
}

function DropdownMenu({
  isOpen,
  onClose,
  children,
  align = "right",
}: DropdownMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className={`absolute ${align === "right" ? "right-0" : "left-0"} mt-2 w-48 rounded-lg bg-white shadow-lg border border-gray-100 overflow-hidden z-20`}
          style={{
            transformOrigin: align === "right" ? "top right" : "top left",
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DropdownMenu;
