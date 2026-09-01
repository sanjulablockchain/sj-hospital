import type { ReactNode } from "react";
import { ThemedShell } from "@/components/layout/ThemedShell";
import { FloatingActions } from "@/components/layout/FloatingActions";

// Same arrangement as the /network, /international-care, /pharmacy and
// /facilities layouts: the header lives inside the hero and scrolls away with
// it rather than sticking, so flowHeader cancels the sticky-header anchor
// offset for every in-page anchor on this route.
//
// FloatingActions is a client leaf ('use client', its own scroll listener), so
// this layout stays a Server Component and only renders it. It has to sit
// inside ThemedShell: the --home-* tokens it reads are scoped to ThemedShell's
// [data-sj] root.
export default function CareersLayout({ children }: { children: ReactNode }) {
  return (
    <ThemedShell flowHeader>
      {children}
      <FloatingActions />
    </ThemedShell>
  );
}
