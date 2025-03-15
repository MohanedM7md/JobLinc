import { createContext, useEffect, useState } from "react";

type ThemeContextType = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  setDarkMode: () => {},
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;

    const userPrefrence =
      "theme" in localStorage
        ? localStorage.theme === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;

    document.documentElement.classList.toggle("dark", userPrefrence);
    return userPrefrence;
  });

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };
