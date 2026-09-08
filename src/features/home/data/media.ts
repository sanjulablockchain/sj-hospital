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
export const sectionEyebrow = "12 / Media";
export const heading = { line1: "News, press", line2: "& gallery" };
export const cta = "Media enquiries";
