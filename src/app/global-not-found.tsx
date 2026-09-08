import type { Metadata } from "next";
import Link from "next/link";
import { Manrope, Bricolage_Grotesque, Noto_Sans_Sinhala, Noto_Sans_Tamil } from "next/font/google";
import "./globals.css";

/**
 * The 404 for a URL that matches no route at all, e.g. `/xx/contact-us`
 * (an unknown locale segment) or a stray typo with no `[locale]` match.
 *
 * Next names this exact case in its own docs (`not-found.md`): a root layout
 * defined at a top level dynamic segment, `src/app/[locale]/layout.tsx` here
 * with no `src/app/layout.tsx` above it, has no single layout a segment level
 * `not-found.tsx` can compose against for a request the router cannot even
 * assign a locale to, so it used to fall through to Next's bare, unbranded,
 * unstyled built-in 404: no `lang`, no stylesheet. `global-not-found.tsx`
 * (enabled via `experimental.globalNotFound` in next.config.ts) is handled at
 * the routing level, before any layout, which is exactly what a request with
 * no valid locale segment needs.
 *
 * It bypasses the app's normal render tree entirely (the Next docs are
 * explicit: "you'll need to import any global styles, fonts, or other
 * dependencies"), so this file imports `globals.css` itself and instantiates
 * its own, smaller font set: the two English families `--sj-body` /
 * `--sj-display` default to, plus Sinhala and Tamil, skipping the four
 * decorative display faces the rest of the site loads. `[data-sj]` on the
 * wrapping `<div>` is enough to pick up the `--home-*` dark theme tokens
 * `globals.css` scopes to it, the same tokens `ThemedShell` sets on every
 * other page, without importing `ThemedShell` itself (its `ThemeScript` /
 * `SiteThemeProvider` are for the light/dark toggle, not needed on a page
 * with one fixed look).
 *
 * There is no reliable way to know which of the three languages a reader
 * meant: the segment that failed IS the locale. So instead of guessing, the
 * message is trilingual, each line in its own script and its own font, with
 * one link back to the English home page (`/`, always valid, never
 * locale-prefixed) rather than a locale this page cannot determine.
 */

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], weight: ["400", "600", "700"] });
const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["700", "800"],
});
const notoSansSinhala = Noto_Sans_Sinhala({ subsets: ["sinhala"], weight: ["400", "600"] });
const notoSansTamil = Noto_Sans_Tamil({ subsets: ["tamil"], weight: ["400", "600"] });

export const metadata: Metadata = {
  title: "Page not found | St. Joseph Hospital Negombo",
  description: "The page you're looking for doesn't exist at this address.",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${manrope.variable} ${bricolageGrotesque.variable} antialiased`}>
      <body className="min-h-full">
        <div
          data-sj
          data-theme="dark"
          className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[var(--home-bg)] px-6 py-24 text-center text-[var(--home-body)]"
        >
          <div className="inline-flex items-center gap-3 text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent-soft)] uppercase">
            <span className="h-px w-11 bg-[var(--home-accent)]" aria-hidden />
            St. Joseph Hospital Negombo
          </div>

          <h1 className="font-display max-w-[22ch] text-[clamp(30px,6vw,52px)] leading-[1.05] font-extrabold tracking-[-0.02em] text-[var(--home-heading)] uppercase">
            Page not found
          </h1>

          <div className="flex max-w-[52ch] flex-col gap-3 text-[16px] leading-[1.6]">
            <p>The page you&rsquo;re looking for doesn&rsquo;t exist at this address.</p>
            <p className={notoSansSinhala.className} lang="si">
              ඔබ සොයන පිටුව මෙම ලිපිනයේ නොමැත.
            </p>
            <p className={notoSansTamil.className} lang="ta">
              நீங்கள் தேடும் பக்கம் இந்த முகவரியில் இல்லை.
            </p>
          </div>

          <Link
            href="/"
            className="mt-2 inline-flex items-center gap-2.5 border border-[var(--home-hairline)] px-6 py-4 text-[15px] font-bold text-[var(--home-heading)] hover:border-[var(--home-accent)]"
          >
            Back to the home page <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </body>
    </html>
  );
}
