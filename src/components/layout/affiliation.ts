/**
 * The group's affiliation, as the mark prints it. Kept in a `.ts` file so
 * `node --test` can pin it (AffiliationMark.test.ts) without loading JSX.
 *
 * `href` is the group's own site, as the owner asked on 2026-10-28: the mark
 * used to open the family band on /network, which the home network accordion
 * and the utility bar still do.
 */
export const AFFILIATION = {
  caption: "Managed and operated by",
  name: "Kids & Teens Medical Group",
  place: "Los Angeles, USA",
  href: "https://www.ktdoctor.com",
  logo: { src: "/images/network/logos/kids-and-teens.png", width: 144, height: 144 },
} as const;
