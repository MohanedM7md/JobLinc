import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function LoadingScreen() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(darkMode);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--color-warmWhite)] dark:bg-[var(--color-warmBlack)]">
      {/* Text-based Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-1 text-4xl font-extrabold"
      >
        <span className="text-crimsonRed">Job</span>
        <span className="text-charcoalBlack">Linc</span>
      </motion.div>

      {/* Spinner */}
      <motion.div
        className="mt-8 w-12 h-12 border-4 border-[var(--color-crimsonRed)] border-t-transparent rounded-full animate-spin"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />

      <p className="mt-4 text-sm tracking-wide text-[var(--color-mutedSilver)] dark:text-[var(--color-charcoalWhite)]">
        Connecting you to opportunities...
      </p>
    </div>
  );
}

export default LoadingScreen;
