import { MapPinIcon, MailIcon, PhoneIcon, SmartphoneIcon } from "@/components/ui/Icons";
import { SectionHead } from "./SectionHead";
import { ContactForm } from "./ContactForm";
import type { ContactContent } from "../data/getContent";

// Same icon set as ReachSection, keyed by the row's structural `icon` field
// rather than its translatable `label` for the same reason that file's own
// comment gives.
const ICONS: Record<string, React.ReactNode> = {
  location: <MapPinIcon className="h-5 w-5" />,
  phone: <PhoneIcon className="h-5 w-5" />,
  whatsapp: <SmartphoneIcon className="h-5 w-5" />,
  email: <MailIcon className="h-5 w-5" />,
};

/**
 * `#message`: heading and standfirst ported from the deleted
 * ContactFormPanel.tsx, plus the consolidated `ContactForm` beside a
 * `contactRows` rail, the same "form beside its contact rail" grid
 * `/accommodation`'s `BookSection` already uses: a form alone at a readable
 * width left most of this section's line-length as a bare background,
 * exactly the fixed-width-box-in-a-fluid-section gap that component's own
 * rail was already built to close.
 *
 * `heading` reuses `jumpCards[1].label`. `intro` is `messageIntro`, distinct
 * from `jumpCards[1].note`.
 */
export function MessageSection({ content }: { content: ContactContent }) {
  const { contactRows, form, jumpCards, messageIntro, sectionEyebrows } = content;
  return (
    <section id="message" className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18">
      <SectionHead eyebrow={sectionEyebrows.message} heading={jumpCards[1].label} intro={messageIntro} />

      <div className="mt-10.5 grid gap-10 min-[900px]:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="border border-[var(--home-hairline)] bg-[var(--home-surface)] px-6 py-8 sm:px-9 sm:py-10">
          <ContactForm copy={form} />
        </div>

        {/* flex-1 on each row, not just gap-px on the column: see BookSection's
            own comment for why a bare gap leaves the hairline colour painted
            under the last row instead of the rows filling the grid's
            stretched height. */}
        <div className="flex flex-col gap-px bg-[var(--home-hairline)]">
          {contactRows.map((row) => (
            <a
              key={row.href}
              href={row.href}
              target={row.external ? "_blank" : undefined}
              rel={row.external ? "noopener noreferrer" : undefined}
              className="sj-fill flex flex-1 items-center gap-3.5 bg-[var(--home-bg)] px-6 py-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[var(--home-accent)] text-[var(--home-on-accent)]">
                {ICONS[row.icon]}
              </span>
              <span className="min-w-0">
                <span className="block text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
                  {row.label}
                </span>
                <span className="block wrap-break-word text-[15px] font-semibold text-[var(--home-heading)]">
                  {row.value}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
