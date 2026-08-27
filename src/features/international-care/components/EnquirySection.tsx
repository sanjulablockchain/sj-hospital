import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { enquiryChips } from "../data/content";

/**
 * Shared by all four rows. The hover is the reference's own pair, background
 * and text only: `sj-invert` would be the obvious utility, but it also flips
 * `border-color`, which on these rows would turn the hairline between them
 * white on hover.
 */
const ROW =
  "font-display flex flex-1 items-center justify-between gap-5 px-8 py-6.5 text-[22px] font-semibold tracking-[-0.02em] text-[var(--home-heading)] transition-colors duration-[250ms] hover:bg-[var(--home-invert-bg)] hover:text-[var(--home-invert-fg)]";

/** The three direct contacts, in the order the reference stacks them. */
const contactRows = [
  { label: "Email the desk", href: "mailto:appointments@sjhospital.lk", glyph: "→" },
  { label: "WhatsApp your reports", href: "https://wa.me/94742223334", glyph: "→" },
  { label: "0117 84 84 84", href: "tel:+94117848484", glyph: "☎", numeric: true },
];

/**
 * `#enquiry`: the closing call to action, an accent panel beside a stack of
 * contact rows that each invert on hover.
 *
 * The heading drops to a fixed 42px below 900px rather than staying on its
 * clamp, matching the reference's `[data-r="ctahead"]` rule: at 5vw the three
 * lines start colliding with the panel's own padding on a tablet.
 *
 * The last row is a next/link to the services directory, since that is an
 * internal route; the three above it are mail, WhatsApp and telephone, which
 * are not.
 */
export function EnquirySection() {
  return (
    <section
      id="enquiry"
      className="mx-auto max-w-[1440px] px-5 pt-28 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <Reveal>
        <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-px bg-[var(--home-hairline)] max-[899px]:grid-cols-1">
          <div className="bg-[var(--home-accent)] px-11 py-13 text-[var(--home-on-accent)]">
            <div className="text-[11.5px] font-bold tracking-[0.24em] uppercase opacity-70">
              08 / Start here
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(36px,5vw,72px)] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase max-[899px]:text-[42px]">
              Send your
              <br />
              reports. Get
              <br />
              a real answer.
            </h2>
            <p className="mt-5.5 max-w-[44ch] text-[17px] leading-[1.6] opacity-85">
              Email or WhatsApp your scans, reports, current medicines and a short history. The desk
              arranges a consultation with the right doctor by video or by phone, and the written
              estimate follows before anything is booked.
            </p>
            <ul className="mt-6.5 flex flex-wrap gap-2.5 text-[13.5px] font-bold">
              {enquiryChips.map((chip) => (
                <li key={chip} className="border border-[var(--home-on-accent)]/30 px-3.75 py-2.5">
                  {chip}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col bg-[var(--home-bg)]">
            {contactRows.map((row) => (
              <a
                key={row.href}
                href={row.href}
                className={`${ROW} border-b border-[var(--home-hairline)] ${
                  row.numeric ? "tabular-nums" : ""
                }`}
              >
                {row.label}
                <span aria-hidden>{row.glyph}</span>
              </a>
            ))}
            <Link href="/services" className={ROW}>
              Browse all services
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
