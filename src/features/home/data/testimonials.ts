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
export const sectionEyebrow = "15 / Patient voices";
export const ariaPrev = "Previous testimonial";
export const ariaNext = "Next testimonial";
