import { RevealStagger } from "@/components/ui/RevealStagger";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon, SmartphoneIcon } from "@/components/ui/Icons";
import { SectionHead } from "./SectionHead";
import { contactRows, jumpCards, reachIntro } from "../data/content";

// Icons are JSX, so they stay here rather than in `data/content.ts`, keyed by
// the same `label` each row already carries.
const ICONS: Record<string, React.ReactNode> = {
  Location: <MapPinIcon className="h-5 w-5" />,
  "Call us": <PhoneIcon className="h-5 w-5" />,
  "WhatsApp / Mobile": <SmartphoneIcon className="h-5 w-5" />,
  Email: <MailIcon className="h-5 w-5" />,
};

/**
 * `#reach`: the four `contactRows` ported verbatim from the deleted
 * ContactDetailsPanel.tsx, as a `RevealStagger` hairline grid, plus the same
 * panel's accent band restated as a full-width strip below the grid.
 *
 * `heading` reuses `jumpCards[0].label`, the same anchor-nav-label-mirrors-
 * destination-heading pattern the about-us sections use. `intro` is
 * `reachIntro`, distinct from `jumpCards[0].note`.
 */
export function ReachSection() {
  return (
    <section id="reach" className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18">
      <SectionHead eyebrow="01 / Reach us" heading={jumpCards[0].label} intro={reachIntro} />

      <RevealStagger
        stepMs={80}
        className="mt-10.5 grid grid-cols-4 gap-px bg-[var(--home-hairline)] max-[1023px]:grid-cols-2 max-[640px]:grid-cols-1"
      >
        {contactRows.map((row) => (
          <a
            key={row.label}
            href={row.href}
            target={row.external ? "_blank" : undefined}
            rel={row.external ? "noopener noreferrer" : undefined}
            className="sj-fill flex flex-col gap-3 bg-[var(--home-bg)] px-6 py-6.5"
          >
            <span className="flex h-11 w-11 items-center justify-center bg-[var(--home-accent)] text-[var(--home-on-accent)]">
              {ICONS[row.label]}
            </span>
            <span className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
              {row.label}
            </span>
            <span className="wrap-break-word text-[17px] font-semibold text-[var(--home-heading)]">
              {row.value}
            </span>
            <span className="text-[14px] text-[var(--home-muted)]">{row.sub}</span>
          </a>
        ))}
      </RevealStagger>

      <div className="mt-px flex items-center gap-2.5 bg-[var(--home-accent)] px-6 py-4.5 text-[var(--home-on-accent)]">
        <ClockIcon className="h-5 w-5 shrink-0" />
        <span className="text-sm font-bold">Open 24/7, every hour of every day</span>
      </div>
    </section>
  );
}
