export type MediaItem = {
  date: string;
  title: string;
  tag: string;
};

export const mediaItems: MediaItem[] = [
  { date: "12 Jul 2026", title: "Digital X-ray suite opens to outpatients", tag: "News" },
  { date: "28 May 2026", title: "5,000 students screened in the school wellness drive", tag: "Report" },
  { date: "09 Mar 2026", title: "Inside a hospital cleaned every two hours", tag: "Press" },
  { date: "21 Jan 2026", title: "New surgical wing: opening gallery", tag: "Gallery" },
];

/** `#media`'s own copy, stranded in `MediaSection.tsx` until now. */
export const sectionEyebrow = "Media · News, press and gallery";
export const readMore = "Read the story";
export const cta = "Media enquiries and full newsroom";
export const href = "/media";
/** Every teaser row opens the newsroom; the stories themselves live there. */
export const storyHref = "/media#newsroom";
export const photo = "/images/services/heroes/radiology.jpg";
export const photoAlt = "Digital X-ray suite";
