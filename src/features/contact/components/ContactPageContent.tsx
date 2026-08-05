import { PageBanner } from "@/components/layout/PageBanner";
import { ContactDetailsPanel } from "./ContactDetailsPanel";
import { ContactFormPanel } from "./ContactFormPanel";
import { MapSection } from "./MapSection";

export function ContactPageContent() {
  return (
    <>
      <PageBanner
        title="Get In Touch"
        subtitle="We will contact you within one business day."
        imageSrc="/images/welcome.jpg"
        imageAlt="Reception desk at St. Joseph Hospital Negombo"
      />

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-10">
          <div className="overflow-hidden rounded-[26px] border border-ink/10 shadow-[0_30px_70px_-40px_rgba(30,27,46,0.35)]">
            <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr]">
              <ContactDetailsPanel />
              <ContactFormPanel />
            </div>
          </div>

          <MapSection />
        </div>
      </section>
    </>
  );
}
