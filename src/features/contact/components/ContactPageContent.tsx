import { PageBanner } from "@/components/layout/PageBanner";
import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";
import { LocationMap } from "./LocationMapLazy";

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
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
            <div className="flex h-full flex-col gap-8 rounded-[22px] border border-ink/10 bg-surface p-7 sm:p-8">
              <div>
                <h2 className="mb-1 font-heading text-2xl font-extrabold text-ink">
                  Always Here to Help You
                </h2>
                <p className="text-sm text-muted">Reach us directly using the details below.</p>
              </div>
              <ContactInfo />
            </div>

            <div className="flex h-full flex-col rounded-[22px] border border-ink/10 bg-surface p-7 sm:p-8">
              <h2 className="mb-1 font-heading text-2xl font-extrabold text-ink">Drop Us a Line</h2>
              <p className="mb-6 text-sm text-muted">We will contact you within one business day.</p>
              <ContactForm />
            </div>
          </div>

          <LocationMap />
        </div>
      </section>
    </>
  );
}
