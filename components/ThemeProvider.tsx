"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  darkMode: true,
  toggleDarkMode: () => {},
});

export function ThemeProvider({
  children,
  initialDark = true,
}: {
  children: ReactNode;
  initialDark?: boolean;
}) {
  const [darkMode, setDarkMode] = useState(initialDark);

const toggleDarkMode = () => {
  const next = !darkMode;
  setDarkMode(next);
  document.documentElement.classList.toggle("dark", next);
  document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
  document.cookie = `theme=${next ? "dark" : "light"}; path=/; max-age=31536000; samesite=lax`;
};

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}