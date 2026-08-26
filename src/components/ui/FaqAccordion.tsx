import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { AccordionList } from "@/components/ui/AccordionList";
import type { AccordionItem } from "@/components/ui/AccordionList";

export type FaqItem = AccordionItem;

type FaqAccordionProps = {
  faq: FaqItem[];
  /**
   * Section heading. A node rather than a string so a caller can hard-break it,
   * as /school-wellness does: where the line falls is a typographic decision
   * that belongs beside the markup. The type stays the same everywhere else,
   * so the four pages using this still share one size and weight.
   */
  heading: ReactNode;
  /** Optional numbered kicker above the heading, as the pharmacy page uses. */
  eyebrow?: string;
};

/**
 * `#faq`: one-open-at-a-time accordion under a heading. The rows themselves
 * live in the shared `AccordionList`, which `/network`'s referrals section also
 * uses inside a different layout.
 *
 * Shared rather than owned by a feature: the services detail pages, pharmacy
 * and international care all need this exact section.
 */
export function FaqAccordion({ faq, heading, eyebrow }: FaqAccordionProps) {
  return (
    <section id="faq" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11 max-[640px]:pt-18">
      <Reveal>
        {eyebrow ? (
          <div className="mb-4.5 text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            {eyebrow}
          </div>
        ) : null}
        <h2 className="font-display text-[clamp(34px,3.8vw,54px)] leading-[1.02] font-extrabold tracking-[-0.03em] text-[var(--home-heading)] uppercase">
          {heading}
        </h2>
      </Reveal>

      <AccordionList
        items={faq}
        stepMs={45}
        className="mt-10 flex flex-col gap-px bg-[var(--home-hairline)]"
      />
    </section>
  );
}
