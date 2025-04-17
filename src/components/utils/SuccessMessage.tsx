import { motion } from "framer-motion";
import { CircleCheckBig } from "lucide-react";

interface SuccessMessageProps {
  message: string;
}

export default function SuccessMessage(props: SuccessMessageProps) {
  return (
    <motion.div
      className="bg-emerald-600 text-white p-4 rounded-lg flex flex-row justify-between"
      initial={{ width: "0%", opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      exit={{ width: "0%", opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <motion.span
        className="mx-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <CircleCheckBig />
      </motion.span>
      <motion.h1
        className="font-medium truncate"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {props.message}
      </motion.h1>
    </motion.div>
  );
}
