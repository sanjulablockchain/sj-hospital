import type { ReactNode } from "react";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { SiteThemeProvider } from "@/components/theme/useSiteTheme";
import { ThemedHeader } from "@/components/layout/ThemedHeader";
import { megaNavigation } from "@/config/megaNavigation";

/**
 * The themed root every page renders inside, and the one place the site
 * header is rendered. The header is fixed over the page, so it lives here
 * rather than in each hero (which pad their top by `--sj-header-h` instead),
 * and the navigation tree is read here, on the server, and handed to the
 * client header as a plain prop.
 */
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
      <SiteThemeProvider>
        <ThemedHeader sections={megaNavigation} />
        {children}
      </SiteThemeProvider>
    </div>
  );
}
