import { HomeThemeScript } from "./HomeThemeScript";
import { HomeThemeProvider } from "../hooks/useHomeTheme";
import { HomeFooter } from "./HomeFooter";
import { FloatingActions } from "./FloatingActions";

export function HomePage() {
  return (
    <div
      id="home-root"
      data-home
      data-theme="dark"
      suppressHydrationWarning
      className="min-h-screen bg-[var(--home-bg)] text-[var(--home-body)] antialiased"
    >
      <HomeThemeScript />
      <HomeThemeProvider>
        <main>{/* sections are added starting Task 5 */}</main>
        <HomeFooter />
        <FloatingActions />
      </HomeThemeProvider>
    </div>
  );
}
