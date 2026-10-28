import Image from "next/image";
import { AFFILIATION } from "./affiliation";

export { AFFILIATION };

/**
 * The group's logo beside "Managed and operated by Kids & Teens Medical
 * Group, Los Angeles, USA": the hospital's American affiliation set as a
 * mark rather than a sentence, so it reads the same wherever it appears.
 * Both footers, the home hero and the home "who we are" band carry it, and
 * it opens the group's own site, ktdoctor.com, in a new tab (a plain `<a>`
 * with the safe `rel`, never `LocaleLink`, which is for routes on this site).
 *
 * Both lines stay English in every locale, like the footer's copyright line
 * and the motto beside it: the group's name never changes script, and the
 * caption is part of the mark, uppercase and letterspaced to match it. The
 * logo file is the one the network page already serves.
 *
 * `tone="dark"` is for the fixed-dark hero (white text on the photograph);
 * `tone="chrome"` paints from the theme tokens for everything else.
 * `layout="stacked"` puts the logo above the text for a narrow footer
 * column, where the inline form would wrap the caption mid-phrase.
 */
export function AffiliationMark({
  tone = "chrome",
  layout = "inline",
  className = "",
}: {
  tone?: "chrome" | "dark";
  layout?: "inline" | "stacked";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <a
      href={AFFILIATION.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex min-h-11 gap-3.5 no-underline ${
        layout === "stacked" ? "flex-col items-start" : "items-center"
      } ${className}`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ${
          dark ? "bg-white ring-white/30" : "bg-white ring-[var(--home-hairline-strong)]"
        }`}
      >
        <Image
          src={AFFILIATION.logo.src}
          alt={`${AFFILIATION.name} logo`}
          width={AFFILIATION.logo.width}
          height={AFFILIATION.logo.height}
          sizes="44px"
          className="h-9 w-9 object-contain"
        />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span
          className={`whitespace-nowrap text-[10.5px] font-bold tracking-[0.2em] uppercase ${
            dark ? "text-[#9FD6F5]" : "text-[var(--home-accent)]"
          }`}
        >
          {AFFILIATION.caption}
        </span>
        <span
          className={`text-[14px] leading-[1.3] font-extrabold transition-colors ${
            dark
              ? "text-white group-hover:text-[#9FD6F5]"
              : "text-[var(--home-heading)] group-hover:text-[var(--home-accent-soft)]"
          }`}
        >
          {AFFILIATION.name}
          <span className="sr-only"> (opens in a new tab)</span>
        </span>
        <span className={`text-[13px] leading-[1.3] font-semibold ${dark ? "text-white/70" : "text-[var(--home-muted)]"}`}>
          {AFFILIATION.place}
        </span>
      </span>
    </a>
  );
}
