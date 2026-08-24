import type { ReactNode } from "react";
import { ThemedShell } from "@/components/layout/ThemedShell";
import { FloatingActions } from "@/components/layout/FloatingActions";

// The header lives inside the hero and scrolls away with it rather than
// sticking, so flowHeader cancels the sticky-header anchor offset for every
// in-page anchor on this page, matching how /services and the home page are
// configured.
//
// FloatingActions is a client leaf with its own scroll listener; this layout
// stays a Server Component and only renders it. It has to sit inside
// ThemedShell, because the --home-* tokens it reads are scoped to ThemedShell's
// [data-sj] root.
export default function FacilitiesLayout({ children }: { children: ReactNode }) {
  return (
    <ThemedShell flowHeader>
      {children}
      <FloatingActions />
    </ThemedShell>
  );
}
