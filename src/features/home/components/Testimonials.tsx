import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type Testimonial = {
  title: string;
  quote: string;
  name: string;
};

const testimonials: Testimonial[] = [
  {
    title: "Exceptional care and professionalism!",
    quote:
      "I was amazed by the level of care. The doctors explained my condition and the staff was incredibly kind. My lab reports were double-checked by two doctors and sent via WhatsApp the same day!",
    name: "Michael Perera",
  },
  {
    title: "Top-notch service with a personal touch!",
    quote:
      "The doctors and nurses are so friendly and understanding. The reminder messages for my regular check-ups really help, and the facilities are world-class. Truly grateful for their service!",
    name: "Malini De Silva",
  },
  {
    title: "Fast and reliable medical care!",
    quote:
      "I went for an OPD consultation in the morning and got a 10% discount on my lab tests. The hospital is modern, clean, and well-managed. Everything from booking online to results was smooth!",
    name: "Samantha Jayasinghe",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5 text-accent">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-surface px-6 py-20">
      <div className="mx-auto max-w-[1240px]">
        <RevealOnScroll className="mx-auto mb-13 max-w-xl text-center">
          <p className="mb-3 font-heading text-[13px] font-bold uppercase tracking-[0.12em] text-accent-dark">
            Patient Stories
          </p>
          <h2 className="mb-3 font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Hear from our patients
          </h2>
          <p className="text-base text-muted">
            Real stories from real patients who experienced exceptional care.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <RevealOnScroll key={testimonial.name} delayMs={index * 90}>
              <div className="flex h-full flex-col gap-4 rounded-[22px] border border-ink/10 bg-white p-8">
                <StarRating />
                <h3 className="font-heading text-[17px] font-bold text-primary">
                  {testimonial.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-ink/75">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 border-t border-ink/10 pt-4">
                  <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-mid font-heading font-bold text-white">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="text-sm font-bold text-ink">{testimonial.name}</div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
