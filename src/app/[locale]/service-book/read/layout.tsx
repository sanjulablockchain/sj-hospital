import type { ReactNode } from "react";
import type { Metadata } from "next";
import { localeAlternates } from "@/lib/i18n/alternates";
import type { Locale } from "@/lib/i18n/locales";
import { ThemedShell } from "@/components/layout/ThemedShell";

// The reader is a full screen tool: no site header, utility bar, footer or
// floating WhatsApp and call buttons over the pages. It brings its own bar,
// with a way back to the intro page.
export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: localeAlternates("/service-book/read", locale as Locale) };
}

export default function ServiceBookReaderLayout({ children }: { children: ReactNode }) {
  return (
    <ThemedShell palette="brand" header="none">
      {children}
    </ThemedShell>
  );
}
