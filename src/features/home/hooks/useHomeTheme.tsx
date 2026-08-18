"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";
type HomeThemeContextValue = { theme: Theme; toggle: () => void };

const HomeThemeContext = createContext<HomeThemeContextValue | null>(null);
const STORAGE_KEY = "sj-home-theme";

function getSnapshot(): Theme {
  const attr = document.getElementById("home-root")?.getAttribute("data-theme");
  return attr === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

function subscribe(onStoreChange: () => void) {
  const node = document.getElementById("home-root");
  if (!node) return () => {};
  const observer = new MutationObserver(onStoreChange);
  observer.observe(node, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export function HomeThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const node = document.getElementById("home-root");
    const current = node?.getAttribute("data-theme");
    const next: Theme = current === "light" ? "dark" : "light";
    node?.setAttribute("data-theme", next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

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
