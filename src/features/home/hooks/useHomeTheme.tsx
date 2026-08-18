"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";
type HomeThemeContextValue = { theme: Theme; toggle: () => void };

const HomeThemeContext = createContext<HomeThemeContextValue | null>(null);
const STORAGE_KEY = "sj-home-theme";

function readCurrentDomTheme(): Theme {
  const attr = document.getElementById("home-root")?.getAttribute("data-theme");
  return attr === "light" ? "light" : "dark";
}

export function HomeThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(readCurrentDomTheme());
  }, []);

  useEffect(() => {
    document.getElementById("home-root")?.setAttribute("data-theme", theme);
  }, [theme]);

  const toggle = () => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  };

  return (
    <HomeThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </HomeThemeContext.Provider>
  );
}

export function useHomeTheme() {
  const ctx = useContext(HomeThemeContext);
  if (!ctx) {
    throw new Error("useHomeTheme must be used within HomeThemeProvider");
  }
  return ctx;
}
