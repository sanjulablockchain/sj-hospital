import Image from "next/image";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { Reveal } from "@/components/ui/Reveal";
import type { Hospital, HospitalAction } from "../types";
import type { LocationsContent } from "../data/getContent";

/**
 * `#hospitals`: the numbered eyebrow and heading, then one card per hospital
 * in a two-up grid that stacks under 900px.
 *
 * Each card carries the id the header's Locations menu deep links to
 * (`/locations#negombo`), with `scroll-mt` so the card lands below the sticky
 * header rather than under it. An `open` card shows the photograph, the
 * address, the fact rows and its actions; a `pending` card swaps the
 * photograph for a quiet tinted band with the pin, keeps the name and city,
 * and lets `body` say the details are still to come.
 *
 * `minmax(0, 1fr)` on the grid tracks and `min-w-0` on the text column: a
 * bare `fr` track cannot shrink below its content's intrinsic width, so a
 * long unbreakable Sinhala or Tamil token would otherwise push the grid (and
 * the page) wider than a 360px viewport.
 */
export function HospitalsSection({ content }: { content: LocationsContent }) {
  const { hospitals, hospitalsHeading, hospitalsIntro, sectionEyebrows } = content;
  return (
    <section
      id="hospitals"
      className="mx-auto max-w-[1440px] scroll-mt-[calc(var(--sj-header-h)+16px)] px-5 pt-24 sm:px-8 lg:px-11 max-[640px]:pt-16"
    >
      <Reveal className="flex flex-wrap items-end justify-between gap-10">
        <div className="min-w-0">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            {sectionEyebrows.hospitals}
          </div>
          <h2 className="font-display wrap-break-word mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            {hospitalsHeading.line1}
            <br />
            {hospitalsHeading.line2}
          </h2>
        </div>
        <p className="max-w-[38ch] text-[16.5px] leading-[1.6] text-[var(--home-muted)]">{hospitalsIntro}</p>
      </Reveal>

      <div className="mt-12 grid grid-cols-[repeat(2,minmax(0,1fr))] gap-px bg-[var(--home-hairline)] max-[899px]:grid-cols-1">
        {hospitals.map((hospital) => (
          <HospitalCard key={hospital.id} hospital={hospital} />
        ))}
      </div>
    </section>
  );
}

function HospitalCard({ hospital }: { hospital: Hospital }) {
  const open = hospital.status === "open";
  return (
    <Reveal className="flex min-w-0 flex-col bg-[var(--home-surface)]">
      <article
        id={hospital.id}
        className="flex h-full min-w-0 flex-col scroll-mt-[calc(var(--sj-header-h)+16px)]"
      >
        {open && hospital.photo ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0B0826]">
            <Image
              src={hospital.photo}
              alt={hospital.photoAlt ?? hospital.name}
              fill
              sizes="(min-width: 900px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div
            aria-hidden
            className="flex aspect-[16/9] w-full items-center justify-center bg-[var(--home-accent-tint-soft)]"
          >
            <PinGlyph className="h-14 w-14 text-[var(--home-accent-soft)]" />
          </div>
        )}

        <div className="flex flex-1 flex-col px-7 py-8 sm:px-9 sm:py-9">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <p className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-muted)] uppercase">
              {hospital.city}
              <span aria-hidden className="mx-2 opacity-50">
                /
              </span>
              {hospital.region}
            </p>
            <span
              className={`inline-flex items-center gap-2 border px-3 py-1.5 text-[11.5px] font-bold tracking-[0.12em] uppercase ${
                open
                  ? "border-[var(--home-accent)] text-[var(--home-accent-soft)]"
                  : "border-[var(--home-hairline)] text-[var(--home-muted)]"
              }`}
            >
              {open && (
                <span aria-hidden className="animate-sj-pulse h-1.5 w-1.5 rounded-full bg-[var(--home-accent)]" />
              )}
              {hospital.statusLabel}
            </span>
          </div>

          <h3 className="font-display wrap-break-word mt-4 text-[clamp(28px,3vw,40px)] leading-[0.95] font-extrabold tracking-[-0.03em] text-[var(--home-heading)]">
            {hospital.name}
          </h3>
          <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.6] text-[var(--home-body)]">{hospital.body}</p>

          {hospital.address && (
            <address className="mt-6 text-[16px] leading-[1.5] text-[var(--home-heading)] not-italic">
              <span className="block font-semibold">{hospital.address.street}</span>
              <span className="block text-[var(--home-muted)]">{hospital.address.locality}</span>
            </address>
          )}

          {hospital.facts.length > 0 && (
            <dl className="mt-6 grid grid-cols-[repeat(3,minmax(0,1fr))] gap-px border border-[var(--home-hairline)] bg-[var(--home-hairline)] max-[640px]:grid-cols-1">
              {hospital.facts.map((fact) => (
                <div key={fact.label} className="min-w-0 bg-[var(--home-surface)] px-4 py-3.5">
                  <dt className="text-[11px] font-bold tracking-[0.16em] text-[var(--home-muted)] uppercase">
                    {fact.label}
                  </dt>
                  <dd className="font-display mt-1 text-[17px] font-bold tracking-[-0.01em] text-[var(--home-heading)] tabular-nums">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-auto flex flex-wrap gap-2.5 pt-8">
            {hospital.actions.map((action, index) => (
              <ActionLink key={action.href} action={action} primary={index === 0} />
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/**
 * The first action is the accent button, the rest are quiet bordered ones.
 * Every button is at least 44px tall for a thumb.
 */
function ActionLink({ action, primary }: { action: HospitalAction; primary: boolean }) {
  const className = primary
    ? "sj-invert inline-flex min-h-11 items-center gap-2 bg-[var(--home-accent)] px-5 py-3 text-[14px] font-bold text-[var(--home-on-accent)]"
    : "inline-flex min-h-11 items-center gap-2 border border-[var(--home-hairline)] px-5 py-3 text-[14px] font-bold text-[var(--home-heading)] transition-colors hover:border-[var(--home-accent)] hover:text-[var(--home-accent-soft)]";

  if (action.internal) {
    return (
      <LocaleLink href={action.href} className={className}>
        {action.label} <span aria-hidden>&rarr;</span>
      </LocaleLink>
    );
  }
  return (
    <a
      href={action.href}
      className={className}
      {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {action.label} <span aria-hidden>&rarr;</span>
    </a>
  );
}

/** The same pin the header's Locations tiles use, drawn once more here so this feature does not reach into the mega-nav's internals. */
function PinGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M12 21s-6.5-5.7-6.5-11a6.5 6.5 0 0 1 13 0c0 5.3-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
