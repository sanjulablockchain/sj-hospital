/**
 * The weekly compound walk, itemised. Kept as plain strings because each is a
 * single instruction with nothing else attached to it.
 */
export const denguePoints = [
  "Walk your compound once a week and tip out anything holding water",
  "Scrub the container, do not just empty it: eggs survive dry for months",
  "Check the places people forget: gutters, plant pot trays, discarded tyres, coconut shells, bottle caps",
  "Cover water storage tanks and barrels with a tight lid or mesh",
  "The mosquito bites in daylight, so repellent in the morning and late afternoon matters most",
  "Screens and long sleeves protect children at school hours, not just at night",
  "One infected neighbourhood container is enough: coordinate with the people next door",
];

/**
 * `#seasonal`'s own copy, moved here out of `SeasonalSection.tsx` so the
 * component takes it as a prop rather than importing it. `heading` is three
 * independent lines, not a literal split of one English sentence: the
 * component still puts a structural `<br />` between them.
 */
export const seasonalSection = {
  badge: "Prevention",
  heading: { line1: "Dengue starts", line2: "in your own", line3: "garden" },
  body1:
    "The mosquito that carries dengue breeds in clean, still water, close to where people live. It does not travel far. Almost every case we treat was infected within a hundred metres of home, school or work.",
  body2:
    "Twenty minutes once a week, walking your own compound and tipping out water, does more than any spray. Eggs survive dry for months, so scrubbing the container matters as much as emptying it.",
  ctaWarning: "Dengue warning signs",
  ctaFever: "Get a fever checked",
};
