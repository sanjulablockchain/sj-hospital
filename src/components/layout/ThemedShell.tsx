import type { ReactNode } from "react";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { SiteThemeProvider } from "@/components/theme/useSiteTheme";
import { ThemedHeader } from "@/components/layout/ThemedHeader";
import { UtilityBar } from "@/components/layout/UtilityBar";
import { megaNavigation } from "@/config/megaNavigation";

type ThemedShellProps = {
  children: ReactNode;
  className?: string;
  /**
   * `"brand"` switches every `--home-*` token to the logo purple and sky set
   * (globals.css, `[data-sj][data-palette="brand"]`). Omitted, the page keeps
   * the default navy palette. The home page is the first to use it.
   */
  palette?: "brand";
  /**
   * `"fixed"` (default) floats the header over the hero, transparent until the
   * page scrolls. `"solid"` puts it in normal flow, sticky and always solid,
   * which is how the v4 home reference draws it.
   */
  header?: "fixed" | "solid";
  /** The dark emergency strip above the header. */
  utilityBar?: boolean;
};

/**
 * The themed root every page renders inside, and the one place the site
 * header is rendered. The header is fixed over the page by default, so it
 * lives here rather than in each hero (which pad their top by `--sj-header-h`
 * instead), and the navigation tree is read here, on the server, and handed
 * to the client header as a plain prop.
 */
export function ThemedShell({
  children,
  className,
  palette,
  header = "fixed",
  utilityBar = false,
}: ThemedShellProps) {
  return (
    <div
      id="sj-root"
      data-sj
      data-theme="light"
      data-palette={palette}
      suppressHydrationWarning
      className={
        className ??
        "min-h-screen bg-[var(--home-bg)] text-[var(--home-body)] antialiased"
      }
    >
      <ThemeScript />
      <SiteThemeProvider>
        {utilityBar ? <UtilityBar /> : null}
        <ThemedHeader sections={megaNavigation} variant={header} />
        {children}
      </SiteThemeProvider>
    </div>
  );
}
