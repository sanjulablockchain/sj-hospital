import type { ReactNode } from "react";
import { ThemedShell } from "@/components/layout/ThemedShell";

// The header lives inside the hero and scrolls away with it (not sticky), so
// flowHeader cancels the sticky-header anchor offset for every in-page anchor
// under /services — matching how the home page's shell is configured.
export default function ServicesLayout({ children }: { children: ReactNode }) {
  return <ThemedShell flowHeader>{children}</ThemedShell>;
}
