import { Reveal } from "@/components/ui/Reveal";
import type { LabTest } from "../data/importRules";
import type { LaboratoryContent } from "../data/getContent";
import { LabTestTable } from "./LabTestTable";

/**
 * `#list`: the eyebrow, heading and intro over the price list. The table
 * copy is sliced off the localized content here and handed to the client
 * leaf as a prop.
 */
export function LabListSection({ content, tests }: { content: LaboratoryContent; tests: readonly LabTest[] }) {
  const { sectionEyebrows, listHeading, listIntro, table, turnaroundTemplate } = content;
  return (
    <section id="list" className="mx-auto max-w-[1440px] px-5 pt-24 sm:px-8 lg:px-11">
      <Reveal>
        <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent-soft)] uppercase">
          {sectionEyebrows.list}
        </div>
        <h2 className="font-display wrap-break-word mt-4.5 text-[clamp(38px,5.2vw,74px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-[var(--home-heading)] uppercase">
          {listHeading.line1}
          <br />
          {listHeading.line2}
        </h2>
        <p className="mt-5.5 max-w-[62ch] text-[17px] leading-[1.65] text-[var(--home-body)]" style={{ textWrap: "pretty" }}>
          {listIntro}
        </p>
      </Reveal>
      <div className="mt-10">
        <LabTestTable tests={tests} copy={table} turnaround={turnaroundTemplate} />
      </div>
    </section>
  );
}
