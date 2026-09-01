import type { ReactNode } from "react";
import { ThemedShell } from "@/components/layout/ThemedShell";
import { FloatingActions } from "@/components/layout/FloatingActions";

// The header lives inside the hero and scrolls away with it (not sticky), so
// flowHeader cancels the sticky-header anchor offset for every in-page anchor
// on this page, matching how the home page and /services are configured.
//
// FloatingActions is a client leaf ('use client', its own scroll listener);
// this layout stays a Server Component and only renders it. It must stay
// inside ThemedShell: the --home-* tokens it reads are scoped to ThemedShell's
// [data-sj] root, so rendering it outside would leave the button unstyled.
export default function HealthTipsLayout({ children }: { children: ReactNode }) {
  return (
    <ThemedShell flowHeader>
      {children}
      <FloatingActions />
    </ThemedShell>
  );
}
