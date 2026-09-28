"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";
type SiteThemeContextValue = { theme: Theme; toggle: () => void };

const SiteThemeContext = createContext<SiteThemeContextValue | null>(null);
const STORAGE_KEY = "sj-home-theme";

/**
 * `.sj-theme-transitioning`'s own `transition-duration` (globals.css) is
 * 350ms; this outlives it by a margin so the class is never removed mid
 * transition on a slower device, which would cut the crossfade short and
 * leave it snapping back to instant for whatever finishes after the class
 * comes off.
 */
const TRANSITION_MS = 500;

function getSnapshot(): Theme {
  const attr = document.getElementById("sj-root")?.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
}

// Light is the default theme: what the server renders and what ThemeScript
// applies when nothing is saved. Kept in step with ThemedShell's data-theme.
function getServerSnapshot(): Theme {
  return "light";
}

function subscribe(onStoreChange: () => void) {
  const node = document.getElementById("sj-root");
  if (!node) return () => {};
  const observer = new MutationObserver(onStoreChange);
  observer.observe(node, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export function SiteThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // Tracks the pending "remove the crossfade class" timer, so toggling twice
  // in quick succession clears the first timer rather than having it fire
  // mid-way through the second toggle's own transition and cut it short.
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggle = useCallback(() => {
    const node = document.getElementById("sj-root");
    if (!node) return;
    const current = node.getAttribute("data-theme");
    const next: Theme = current === "light" ? "dark" : "light";

    // Added before the attribute flips, in the same tick, so the class is
    // already present in the DOM when the browser recomputes every colour
    // for the new theme and has something to transition from.
    node.classList.add("sj-theme-transitioning");
    node.setAttribute("data-theme", next);
    window.localStorage.setItem(STORAGE_KEY, next);

    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    transitionTimer.current = setTimeout(() => {
      node.classList.remove("sj-theme-transitioning");
      transitionTimer.current = null;
    }, TRANSITION_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    };
  }, []);

  // The FOUC-prevention inline script only runs on a hard page load, so a
  // soft (client-side) navigation into the home page can leave data-theme
  // stuck at its hardcoded default even when a different theme is saved.
  // Reconcile it from localStorage once on mount: a no-op on hard loads
  // where the script already set it correctly.
  useEffect(() => {
    const node = document.getElementById("sj-root");
    if (!node) return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if ((stored === "light" || stored === "dark") && node.getAttribute("data-theme") !== stored) {
      node.setAttribute("data-theme", stored);
    }
  }, []);

  return (
    <SiteThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </SiteThemeContext.Provider>
  );
}

export function useSiteTheme() {
  const ctx = useContext(SiteThemeContext);
  if (!ctx) {
    throw new Error("useSiteTheme must be used within SiteThemeProvider");
  }
  return ctx;
}
