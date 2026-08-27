import { SectionHead } from "./SectionHead";
import { ContactForm } from "./ContactForm";
import { jumpCards, messageIntro } from "../data/content";

/**
 * `#message`: heading and standfirst ported from the deleted
 * ContactFormPanel.tsx, plus the consolidated `ContactForm`.
 *
 * `heading` reuses `jumpCards[1].label`. `intro` is `messageIntro`, distinct
 * from `jumpCards[1].note`.
 */
export function MessageSection() {
  return (
    <section id="message" className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18">
      <SectionHead eyebrow="02 / Send a message" heading={jumpCards[1].label} intro={messageIntro} />

      <div className="mt-10.5 max-w-[720px] border border-[var(--home-hairline)] bg-[var(--home-surface)] px-6 py-8 sm:px-9 sm:py-10">
        <ContactForm />
      </div>
    </section>
  );
}
