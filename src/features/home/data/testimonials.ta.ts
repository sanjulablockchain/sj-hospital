// Tamil for the home page's `#voices` band.
//
// `testimonials[*].quote` is translated as the patient's own quoted speech,
// not paraphrased; `testimonials[*].name` is absent here on purpose, the
// patient's own name and never translated (see content.ts's header note).
// `testimonials[*].role` translates like any other short label.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const testimonials = [
  {
    quote:
      "என் Reports ஐ இரு மருத்துவர்கள் படித்து, அதே நாளில் அனுப்பினர். எனக்கு என்ன பிரச்சனை என்று உண்மையிலேயே விளக்கினார்கள்.",
    role: "OPD நோயாளர்",
  },
  {
    quote:
      "Nurses மிகவும் புரிந்துகொள்ளும் தன்மையுடையவர்கள், Check-up Reminders மிகவும் உதவுகின்றன. Facilities World Class போல உணர்ந்தேன்.",
    role: "தொடர் Check-ups",
  },
  {
    quote:
      "காலையில் அறுவை சிகிச்சை, நண்பகலுக்குள் என் சொந்த அறை, நான் Steady ஆகும் வரை என்னுடன் இருந்த ஒரு Nurse.",
    role: "Surgical நோயாளர்",
  },
];

export const sectionEyebrow = "14 / நோயாளர் குரல்கள்";
export const ariaPrev = "முந்தைய Testimonial";
export const ariaNext = "அடுத்த Testimonial";
