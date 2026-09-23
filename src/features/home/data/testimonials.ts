export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "My reports were read by two doctors and sent the same day. They actually explained what was wrong with me.",
    name: "Michael Perera",
    role: "OPD patient",
  },
  {
    quote:
      "The nurses are so understanding, and the check-up reminders really help. The facilities feel world class.",
    name: "Malini De Silva",
    role: "Regular check-ups",
  },
  {
    quote:
      "Surgery in the morning, my own room by noon, and a nurse who stayed with me until I was steady.",
    name: "Samantha Jayasinghe",
    role: "Surgical patient",
  },
];

/**
 * `#voices`'s own copy, stranded in `TestimonialsSection.tsx` until now.
 * `testimonials[*].name` is the patient's own name and never translates; the
 * quote and the role do. See the commit message for how the quotes were
 * translated: as quoted speech, not paraphrase.
 */
export const heading = "Satisfied patient reviews";
export const body = "Real words from patients who were treated, operated on and looked after here.";
/** Screen-reader label on each dot; `{n}` is the 1-based index. */
export const ariaShow = "Show review {n}";
export const ariaPrev = "Previous review";
export const ariaNext = "Next review";
export const photo = "/images/welcome.jpg";
export const photoAlt = "Patients at the St. Joseph Hospital reception";
