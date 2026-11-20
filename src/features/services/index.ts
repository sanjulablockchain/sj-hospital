export { ServicesIndexPage } from "./components/ServicesIndexPage";
export { ServiceDetailPage } from "./components/ServiceDetailPage";
// The catalogue itself, for the home page's live service count.
export { services } from "./data/services";
// The localized catalog, for pages outside this feature that quote a
// service's own steps or facts (the laboratory price list).
export { getServicesContent } from "./data/getContent";
// The Service Book excerpt, for /e-channeling's Super Channelling page.
export { BookExcerptSection, type BookExcerptLabels } from "./components/detail/BookExcerptSection";
export type { ServiceBookExcerpt } from "./types";
