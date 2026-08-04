import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function MissionVision() {
  return (
    <section className="bg-white px-6 pb-20">
      <div className="mx-auto grid max-w-[1240px] gap-6 sm:grid-cols-2">
        <RevealOnScroll>
          <div className="h-full rounded-[22px] bg-gradient-to-br from-primary to-primary-mid p-8 text-white">
            <h3 className="mb-3 font-heading text-xl font-extrabold">Our Mission</h3>
            <p className="text-sm leading-relaxed text-white/85">
              Our aim is to provide our community with complete healthcare solutions that combine
              advanced technology with patient-centered care, empowering them to take charge of their
              health.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={100}>
          <div className="h-full rounded-[22px] border border-ink/10 bg-surface p-8">
            <h3 className="mb-3 font-heading text-xl font-extrabold text-ink">Our Vision</h3>
            <p className="text-sm leading-relaxed text-muted">
              We aim to make the highest quality healthcare available to everyone in Sri Lanka
              through collective efforts.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
