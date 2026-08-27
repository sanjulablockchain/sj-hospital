import Link from "next/link";
import { ThemedHeader } from "@/components/layout/ThemedHeader";
import { privacyNavigation } from "@/config/privacyNavigation";
import { policyLastUpdated } from "./PolicyContent";

/**
 * `#top`: shorter than every other hero on the site, and deliberately so. No
 * ticker, no four-fact strip, since a legal page has no facts to put in a
 * strip and a marquee over a privacy policy would be noise, not signal.
 *
 * Accent colours are literal rather than `var(--home-accent)`, as on the other
 * hero blocks: this sits on a photograph in both themes, and the light theme
 * swaps that token to a deep `#0B6FC0` that would sink into the image. This
 * hero has no photograph, but it is still a dark band in both themes for the
 * header to sit on, so the same reasoning applies.
 */
export function PolicyHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[52vh] flex-col overflow-hidden bg-[#060B1F]"
    >
      <div
        className="animate-sj-sheen absolute inset-0"
        style={{
          background:
            "radial-gradient(64% 50% at 80% 26%, rgba(44,166,240,0.3) 0%, rgba(6,11,31,0) 66%)",
        }}
      />

      <ThemedHeader navItems={privacyNavigation} homeHref="/" bookHref="/e-channeling" />

      <div className="relative z-10 mx-auto mt-auto flex w-full max-w-[1440px] px-5 pb-11 sm:px-8 lg:px-11">
        <div className="flex-1">
          <div className="animate-sj-up inline-flex items-center gap-3 text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">
            <span aria-hidden className="h-px w-11 bg-[#2CA6F0]" />
            <Link href="/" className="text-[#7FCBFF] hover:text-white">
              Home
            </Link>
            <span aria-hidden className="opacity-50">
              /
            </span>
            Privacy policy
          </div>

          <h1 className="font-display animate-sj-up mt-4.5 text-[clamp(38px,6.4vw,100px)] leading-[0.9] font-extrabold tracking-[-0.045em] text-white uppercase">
            Privacy policy
          </h1>

          <p
            className="animate-sj-up mt-8 max-w-[54ch] text-[18px] leading-[1.6] text-white/82"
            style={{ textWrap: "pretty" }}
          >
            {policyLastUpdated}
          </p>
        </div>
      </div>
    </section>
  );
}
