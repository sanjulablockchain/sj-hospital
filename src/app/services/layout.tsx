import type { ReactNode } from "react";
import { ThemedShell } from "@/components/layout/ThemedShell";
import { FloatingActions } from "@/components/layout/FloatingActions";

// The header lives inside the hero and scrolls away with it (not sticky), so
// flowHeader cancels the sticky-header anchor offset for every in-page anchor
// under /services — matching how the home page's shell is configured.
//
// FloatingActions is a client leaf ('use client', its own scroll listener) —
// this layout stays a Server Component and only renders it, the same
// arrangement HomePage uses. It must stay inside ThemedShell: the
// --home-* tokens it reads are scoped to ThemedShell's [data-sj] root, so
// rendering it outside that wrapper would leave the button unstyled.
export default function ServicesLayout({ children }: { children: ReactNode }) {
  return (
    <ThemedShell flowHeader>
      {children}
      <FloatingActions />
    </ThemedShell>
  );
}
