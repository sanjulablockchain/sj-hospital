import type { ReactNode } from "react";
import type { Metadata } from "next";
import { localeAlternates } from "@/lib/i18n/alternates";
import type { Locale } from "@/lib/i18n/locales";
import { ThemedShell } from "@/components/layout/ThemedShell";
import { FloatingActions } from "@/components/layout/FloatingActions";

// FloatingActions is a client leaf ('use client', its own scroll listener);
// this layout stays a Server Component and only renders it. It must stay
// inside ThemedShell: the --home-* tokens it reads are scoped to ThemedShell's
// [data-sj] root, so rendering it outside would leave the button unstyled.
export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: localeAlternates("/health-tips", locale as Locale) };
}

export default function HealthTipsLayout({ children }: { children: ReactNode }) {
  return (
    <ThemedShell palette="brand">
      {children}
      <FloatingActions />
    </ThemedShell>
  );
}
