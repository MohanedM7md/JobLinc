// modals/ModalWrapper.tsx
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ModalWrapperProps {
  children: ReactNode;
}

function ModalWrapper({ children }: ModalWrapperProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export default ModalWrapper;
