import { test } from "node:test";
import assert from "node:assert/strict";
import { registerReason, staysEnglish } from "./registerPolicy.ts";

/**
 * The policy, checked against real paths out of the real content modules with
 * the real English strings beside them.
 *
 * Every path below was taken from `npm run i18n:register-audit`, not invented,
 * and the comment on each is the string that actually sits there. That is the
 * point of this file: a path rule reads plausibly and still classifies the
 * wrong field, and the only way to know is to name the string.
 */

const ENGLISH: [string, string, string][] = [
  // path, expected reason, the English string at that path
  ["hero.strapline", "hero", "Who we are"],
  ["hero.headingLead", "hero", "US standard,"],
  ["hero.headingOutline", "hero", "high-quality"],
  ["hero.headingAccent", "hero", "healthcare."],
  ["hero.heading.accentPrefix", "hero", "under "],
  ["hero.body", "hero", "Practical advice written by the doctors who see you in clinic..."],
  ["hero.breadcrumbCurrent", "hero", "About Us"],
  ["hero.bookCta", "hero", "Book a doctor"],
  ["hero.locationLabel", "hero", "Negombo, Sri Lanka"],
  ["heroStandfirst", "hero", "St. Joseph Hospital in Negombo delivers US standard..."],

  ["sectionEyebrows.hygiene", "eyebrow", "08 / Cleanliness and safety"],
  ["sectionEyebrows.form", "eyebrow", "08 / Submit your CV"],
  ["librarySection.eyebrow", "eyebrow", "02 / The library"],
  ["contactEyebrow", "eyebrow", "Get in touch"],
  ["servicesBento.tiles[0].badge", "eyebrow", "/01 Emergency & OPD"],
  ["seasonalSection.badge", "eyebrow", "Prevention"],

  ["whySection.heading", "heading", "Why school, not clinic"],
  ["faqHeading.line1", "heading", "Before you"],
  ["mythsSection.heading.line2", "heading", "the ones we"],
  ["directory.headingFiltered", "heading", "{group} services"],
  ["openings.headingAllRoles", "heading", "All open roles"],
  ["clinicServices[0].aboutHead", "heading", "One department, every consultation"],

  ["articles[0].title", "title", "Fever on day four is the day that matters"],
  ["news[3].title", "title", "New endoscopy suite opens on the second floor"],
  ["jobs[0].title", "title", "Pharmacist"],
  ["clinicServices[0].directoryTitle", "title", "Outpatient department (OPD)"],
  ["clinicServices[0].steps[1].title", "title", "Register"],
  ["sharedJobTitles.theatreNurse", "title", "Theatre Nurse"],
  ["mission.title", "title", "Our mission"],

  ["clinicServices[0].cta", "cta", "Book a consultation"],
  ["packages[0].ctaLabel", "cta", "Request a quote"],
  ["bookSection.contactCta", "cta", "Contact us"],
  ["facilities[0].linkLabel", "cta", "Ambulance bay open 24/7"],
  ["jumpCards[2].label", "cta", "The library"],
  ["contactRows[0].label", "cta", "Location"],
  ["bookRail[1].label", "cta", "Call us"],
  ["applyRows[0].label", "cta", "Email your CV"],
  ["bookSection.actions[0].label", "cta", "Book a consultation"],
  ["ambulanceCall.label", "cta", "Call an ambulance"],
  ["servicesBento.footer.label", "cta", "Full service directory"],
  ["allServicesLabel", "cta", "All services"],
  ["detailChrome.backToServices", "cta", "Back to all services"],
  ["directory.bookAppointment", "cta", "Book appointment"],
  ["chromeCopy.bookNow", "cta", "Book now"],
  ["chromeCopy.callUs", "cta", "Call us"],

  ["groupLabels.Surgical", "chip", "Surgical"],
  ["categoryLabels.All", "chip", "All"],
  ["departmentLabels.Nursing", "chip", "Nursing"],
  ["newsroomCopy.allLabel", "chip", "All"],

  ["NAV_LABELS.About us", "nav", "About us"],
  ["chromeCopy.language", "nav", "Language"],
  ["FOOTER_HEADINGS.Booking", "footer", "Booking"],
  ["chromeCopy.tagline", "footer", "Compassionate, patient centered care..."],
];

const TRANSLATED: [string, string][] = [
  // path, the English string at that path and why it stays translated
  ["hero.photoAlt", "assistive: an image description, left translated by the rule doc"],
  ["gallery[0].alt", "assistive: an image description"],
  ["atHomeServices[0].heroAlt", "assistive: an image description"],
  ["openings.filterAriaLabel", "assistive: 'Filter positions by department'"],
  ["accordionAria.open", "assistive: '{name}, open'"],
  ["ariaNext", "assistive: 'Next testimonial'"],
  ["chromeCopy.openMenu", "assistive: a chrome aria-label"],
  ["chromeCopy.changeLanguage", "assistive: a chrome aria-label"],

  ["firstAidSteps[0].title", "clinical: 'Cool water, twenty minutes', the instruction itself"],
  ["warnings[3].symptom", "clinical: 'Chest pressure spreading to jaw, arm or back'"],
  ["screening[0].advice", "clinical: screening advice"],
  ["LEVEL_LABELS.Come in now", "clinical: a triage urgency badge"],
  ["emergencyNumbers[0].label", "clinical: 'Hospital & ambulance', a first aid number"],

  ["form.emailLabel", "form field label: 'Email'"],
  ["form.fullNameLabel", "form field label: 'Full name'"],
  ["form.submitIdle", "form button: 'Submit application'"],
  ["experienceOptions[0].label", "form select option: 'New graduate'"],
  ["sourceOptions[2].label", "form select option: 'This website'"],

  ["faq[0].q", "FAQ question, translated by the rule doc"],
  ["clinicServices[0].faq[2].a", "FAQ answer"],
  ["myths[0].a", "myth answer, clinical body copy"],

  ["contactCta.body", "the contactCta SECTION's paragraph, not a CTA label"],
  ["heroFacts[0].k", "a hero fact chip, not the eyebrow, heading or standfirst"],
  ["heroFacts[0].v", "a hero fact chip"],
  ["factStrip[1].label", "a fact strip caption: 'Written by'"],
  ["pharmacy.stats[0].label", "a stat caption: 'Counter hours'"],
  ["theatreFigures[0].label", "a stat caption: 'Recovery nursing'"],
  ["stations[4].more", "descriptive copy despite the key name: 'Catches: the back row problem'"],
  ["articles[0].lede", "body copy"],
  ["clinicServices[0].tags[1]", "a per-card chip describing the card, not a filter chip"],
  ["pageMetadata.aboutUs.title", "a route <title>, not a card or article title"],
  ["pageMetadata.home.description", "a meta description, which is prose"],
];

test("every path the policy calls English is classified with the right reason", () => {
  for (const [path, reason, english] of ENGLISH) {
    assert.equal(
      registerReason(path),
      reason,
      `${path} (${english}) should be English because it is a ${reason}, got ` +
        `${registerReason(path) ?? "translated"}`
    );
  }
});

test("every path the policy leaves translated stays translated", () => {
  for (const [path, why] of TRANSLATED) {
    assert.equal(
      registerReason(path),
      null,
      `${path} must stay translated (${why}) but the policy classified it as ` +
        `${registerReason(path)}`
    );
  }
});

test("staysEnglish agrees with registerReason", () => {
  for (const [path] of ENGLISH) assert.equal(staysEnglish(path), true, path);
  for (const [path] of TRANSLATED) assert.equal(staysEnglish(path), false, path);
});

test("an empty path is never English", () => {
  // `stringPaths` never emits one, but a caller passing "" must not be told
  // that the whole module renders in English.
  assert.equal(staysEnglish(""), false);
});
