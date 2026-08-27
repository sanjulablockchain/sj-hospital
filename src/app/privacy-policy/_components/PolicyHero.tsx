import Link from "next/link";
import { ThemedHeader } from "@/components/layout/ThemedHeader";
import { privacyNavigation } from "@/config/privacyNavigation";
import { policyLastUpdated } from "./PolicyContent";

/**
 * `#top`: shorter than every other hero on the site, and deliberately so. No
 * ticker, no four-fact strip, since a legal page has no facts to put in a
 * strip and a marquee over a privacy policy would be noise, not signal.
 *
 * No photograph either, so unlike the other heroes this one cannot take their
 * literal-colour exception: there is no dark image for a hardcoded white to
 * sit on, only `--home-surface-2`, which is a light surface in the light
 * theme. Every colour here is a token so the text tracks the surface.
 */
export function PolicyHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[52vh] flex-col overflow-hidden bg-[var(--home-surface-2)]"
    >
      <div
        className="animate-sj-sheen absolute inset-0"
        style={{
          background:
            "radial-gradient(64% 50% at 80% 26%, color-mix(in srgb, var(--home-accent) 30%, transparent) 0%, transparent 66%)",
        }}
      />

      <ThemedHeader navItems={privacyNavigation} homeHref="/" bookHref="/e-channeling" />

      <div className="relative z-10 mx-auto mt-auto flex w-full max-w-[1440px] px-5 pb-11 sm:px-8 lg:px-11">
        <div className="flex-1">
          <div className="animate-sj-up inline-flex items-center gap-3 text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            <span aria-hidden className="h-px w-11 bg-[var(--home-accent)]" />
            <Link href="/" className="text-[var(--home-accent)] hover:text-[var(--home-heading)]">
              Home
            </Link>
            <span aria-hidden className="opacity-50">
              /
            </span>
            Privacy policy
          </div>

          <h1 className="font-display animate-sj-up mt-4.5 text-[clamp(38px,6.4vw,100px)] leading-[0.9] font-extrabold tracking-[-0.045em] text-[var(--home-heading)] uppercase">
            Privacy policy
          </h1>

          <p
            className="animate-sj-up mt-8 max-w-[54ch] text-[18px] leading-[1.6] text-[var(--home-muted)]"
            style={{ textWrap: "pretty" }}
          >
            {policyLastUpdated}
          </p>
        </div>
      </div>
    </section>
  );
}
