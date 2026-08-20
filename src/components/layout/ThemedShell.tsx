import type { ReactNode } from "react";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { SiteThemeProvider } from "@/components/theme/useSiteTheme";

export function ThemedShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      id="sj-root"
      data-sj
      data-theme="dark"
      suppressHydrationWarning
      className={
        className ??
        "min-h-screen bg-[var(--home-bg)] text-[var(--home-body)] antialiased"
      }
    >
      <ThemeScript />
      <SiteThemeProvider>{children}</SiteThemeProvider>
    </div>
  );
}
