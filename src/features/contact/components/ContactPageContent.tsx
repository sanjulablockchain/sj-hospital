import { PageBanner } from "@/components/layout/PageBanner";
import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";
import { LocationMap } from "./LocationMap";

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
        <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <ContactInfo />

          <div className="flex flex-col gap-10">
            <div className="rounded-[22px] border border-ink/10 bg-surface p-7 sm:p-8">
              <h2 className="mb-1 font-heading text-2xl font-extrabold text-ink">Drop Us a Line</h2>
              <p className="mb-6 text-sm text-muted">We will contact you within one business day.</p>
              <ContactForm />
            </div>

            <LocationMap />
          </div>
        </div>
      </section>
    </>
  );
}
