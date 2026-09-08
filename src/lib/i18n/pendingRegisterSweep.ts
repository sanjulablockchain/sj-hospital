/**
 * TEMPORARY. This file must end up empty, and then be deleted.
 *
 * `registerPolicy.ts` says which content paths render in English in every
 * language. `overlayRegister.test.ts` enforces that in the direction nothing
 * enforced before: a path the policy calls English must be ABSENT from every
 * overlay. On the day that check was written, roughly a thousand Sinhala and a
 * thousand Tamil strings broke it, because the content sweep that deletes them
 * had not started.
 *
 * The suite has to keep working as a gate WHILE that sweep happens, feature by
 * feature, over several sessions. This set is how: a scope named here is
 * exempt from the new check, and only from the new check. Every other gate
 * still applies to it, including parity, array lengths, the identity
 * assertion, the numeral test and the overlay coverage binding.
 *
 * ## How to use it
 *
 * Sweep one scope. Delete every path
 * `npm run i18n:register-audit -- --scope=<scope>` lists for it. Then delete
 * that scope's line from this set, in the same commit. The suite will hold it
 * to the policy from then on, and the audit's CHECK section plus the feature's
 * own parity test are what catch a deletion that went too far.
 *
 * ## Why this cannot become a permanent hiding place
 *
 * Three assertions in `overlayRegister.test.ts` are aimed at this file rather
 * than at the content:
 *
 *   1. A scope named here must exist on disk. A renamed or removed feature
 *      fails, rather than leaving a line nobody can interpret.
 *   2. A scope named here must STILL VIOLATE the policy. The moment a scope is
 *      swept clean, its own exemption fails the suite and has to be removed.
 *      An entry can therefore never outlive the work it excuses, which is the
 *      failure mode every allowlist of this kind eventually has.
 *   3. When this set is empty, the suite fails while anything still imports
 *      it. Emptying the set is not the end of the job: this module and its two
 *      references have to go with it.
 *
 * What none of the three can do is stop somebody ADDING a scope back to buy
 * silence. That is deliberately left to review: an addition here is one line
 * in a diff, next to a comment saying the file must end up empty.
 */

/**
 * The scope an overlay belongs to, derived from where it lives.
 *
 * A feature is its directory name, which is the unit the sweep proceeds in.
 * The two overlays outside `src/features` get their own scopes, because they
 * are swept differently and one of them needs a code change first (see
 * `chrome` below).
 */
export function sweepScope(relativePath: string): string {
  const feature = /^src\/features\/([^/]+)\//.exec(relativePath);
  if (feature) return feature[1];
  if (relativePath.startsWith("src/config/")) return "config";
  if (relativePath.startsWith("src/components/")) return "chrome";
  return "other";
}

/**
 * Scopes whose content has not been swept yet. Remove a scope the moment its
 * audit comes back clean. When this is empty, delete this module.
 *
 * `chrome` and `config` were swept and removed on 2026-09-09, each after a
 * code change its overlays depended on:
 *
 * - `chrome`: `chromeCopyFor` in `src/components/layout/chromeCopy.ts` used to
 *   read the overlay object DIRECTLY, without `localize`, because every caller
 *   is a client component; a missing key rendered empty, not English. It now
 *   merges through `localize`, the same as every feature.
 * - `config`: `navigationLabels.test.ts` used to assert that every nav label
 *   and footer heading in `src/config/*Navigation.ts` HAS a dictionary entry.
 *   The policy says the whole nav bar and footer are English, so that
 *   assertion is now inverted (a label must NOT have one). `navLabel` and
 *   `footerHeading` already fell back to the English string, so the runtime
 *   needed no change. `config` also carries `pageMetadata.si.ts` / `.ta.ts`
 *   (`src/config/pageMetadata.ts`), which already read through `localize` and
 *   needed no code change; only the policy (ruling 3: a route's `<title>` is
 *   English) and the overlay content moved.
 *
 * `services` was swept on 2026-09-09, needing no code change: its getter
 * (`src/features/services/data/getContent.ts`) already reads every overlay
 * through `localize`. 372 Sinhala and 372 Tamil strings were deleted across
 * its 16 overlays (`atHome`, `clinics`, `diagnostics`, `emergency`, `groups`,
 * `indexContent`, `surgical`, `womenChildren`, each `.si.ts` / `.ta.ts`),
 * every one of them a `title` / `directoryTitle` / `cta` / `aboutHead` /
 * `steps[].title` on a catalog service, a section eyebrow or heading, a
 * card title, a link label, or a filter chip (`groupLabels`). No overlay
 * file was deleted: every one still exports the same names, some now with
 * an emptied object (`{}`) or dictionary where every key was English, which
 * `localize` treats identically to a missing key. FAQ questions and answers,
 * body paragraphs and descriptions were left translated throughout.
 *
 * `home` was swept on 2026-09-09, needing no code change: every home band's
 * getter already reads its overlay through `localize`. 137 Sinhala and 137
 * Tamil strings were deleted across its 18 overlays (`careers`, `content`,
 * `facilities`, `healthTips`, `homeCare`, `internationalCare`, `media`,
 * `network`, `testimonials`, each `.si.ts` / `.ta.ts`): every hero field,
 * section eyebrow, section/tile heading, card/article title, CTA and link
 * label, and the two `mediaItems[].tag` display chips. Two now-unused
 * cross-feature imports (`content.si.ts`/`.ta.ts` importing `home-care`'s and
 * `pharmacy`'s own hero strings for headings that no longer exist) were
 * removed along with the fields that used them; `careers.si.ts`/`.ta.ts`
 * similarly dropped its now-unused import of career's `sharedJobTitles`,
 * since `jobOpenings[].title` (the only field that read it) is deleted too.
 * `career`'s own `sharedJobTitles` dictionary is swept separately as part of
 * `career`'s own scope. No overlay file was deleted; body paragraphs,
 * intro/stat-caption prose and the testimonials were left translated
 * throughout.
 *
 * `health-tips` was swept on 2026-09-09, needing no code change: every band's
 * getter already reads its overlay through `localize`. 78 Sinhala and 78
 * Tamil strings were deleted across its 14 overlays (`dengue`, `firstAid`,
 * `library`, `myths`, `pageContent`, `screening`, `warnings`, each
 * `.si.ts` / `.ta.ts`): every section eyebrow, section/tile heading, CTA and
 * link label, the hero (entirely, in `pageContent`), `library.si/ta.ts`'s
 * `categoryLabels` filter-chip dictionary (now `{}`) and every
 * `articles[*].title` / `featured.title`. The clinical content this scope
 * exists to protect (`warnings[*]`, `firstAidSteps[*]`, `screening[*]`,
 * `myths[*]`, `denguePoints`, `homeKit`, `emergencyNumbers`, every article's
 * own `lede`/`by`, and every FAQ) is untouched and stays translated: the
 * policy's `CLINICAL_ROOTS` guard already keeps those paths out of reach, so
 * the audit never listed them. No overlay file was deleted.
 *
 * `career` was swept on 2026-09-09, needing no code change: its getter
 * already reads its overlay through `localize`. 87 Sinhala and 87 Tamil
 * strings were deleted across its 2 content overlays (`schemas.si/ta.ts`,
 * the Zod validation error strings, were already clean): the hero
 * (entirely), every `sectionEyebrows` entry, every section/tile heading,
 * every `jobs[*].title`/`benefits[*].title`/`process[*].title`/
 * `students[*].title` (card titles), every `jumpCards[*].label`/
 * `applyRows[*].label` (link labels), and `departmentLabels` (the openings
 * filter's chip row, now `{}`). `sharedJobTitles`, career's own four
 * shared job titles re-exported for `home`'s careers teaser, is swept the
 * same way (its four properties are each `jobs[N].title` read back through
 * a named export) and is now `{}`; `home`'s own `careers.si/ta.ts`, swept
 * separately, no longer imports it, since the field that consumed it
 * (`jobOpenings[*].title`) is deleted there too. `jobs[*].requirements`,
 * `.detail`, `.line`, every FAQ, every benefit's `.items`, and every form
 * label and error message are untouched and stay translated.
 *
 * `media` was swept on 2026-09-09, needing no code change: its getter
 * already reads its overlay through `localize`. 87 Sinhala and 87 Tamil
 * strings were deleted from its single content overlay (`content.si/ta.ts`):
 * the hero (entirely), every `sectionEyebrows` entry, every section/tile
 * heading, every `desk[*]`/`news[*]`/`featured`/`gallery[*].title` (card
 * titles; this supersedes the file's former "quoted material, kept English"
 * framing for `news[*].title`/`featured.title`, which is now moot since
 * those paths render from the base rather than being an overlay decision at
 * all), every `jumpCards[*].label`/`enquiryKitCta`/`enquiryInterviewCta`
 * (link labels), `categoryLabels` (the newsroom filter's chip row, now
 * `{}`), `newsroomCopy.allLabel` and `gallery[*].tag` (ruling 2: a display
 * chip of the same kind as a filter chip). `topics[*].v`'s "Consultant"
 * register discussion, every FAQ (`rules[*]`), and every other body/intro
 * paragraph are untouched and stay translated.
 *
 * `facilities` was swept on 2026-09-09, needing no code change: its getter
 * already reads its overlay through `localize`. 75 Sinhala and 75 Tamil
 * strings were deleted from its single content overlay (`content.si/ta.ts`):
 * the hero (entirely), every `sectionEyebrows` entry, every section/tile
 * heading, every `careNotes[*]`/`showcaseCards[*].title` (card titles),
 * every `jumpCards[*]`/`contactRows[*]`/`showcaseCards[*].linkLabel`/
 * `ambulanceCall.label` (link labels, now `{}` where nothing else was in
 * the object), and the four bare heading exports (`roomsStandardHeading`,
 * `roomsExtrasHeading`, `roomsCta`, `visitingCardHeading`,
 * `gettingHereHeading`, `whileYouWaitHeading`). `buildingZones[*].name`,
 * `roomRows[*].name` and every other body/intro paragraph are untouched
 * and stay translated.
 *
 * `about` was swept on 2026-09-09, needing no code change: its getter
 * already reads its overlay through `localize`. 33 Sinhala and 33 Tamil
 * strings were deleted from its single content overlay (`content.si/ta.ts`):
 * the hero (entirely, now `{}`), `sectionEyebrows` (now `{}`),
 * `jumpCards[*].label`, `reasons[*].title`, `mission.title`, `vision.title`
 * and the bare `groupHeading` export. `storyParagraphs`, `groupBody`, every
 * `reasons[*].description`, `mission.body`, `vision.body` and every other
 * body/intro paragraph are untouched and stay translated.
 *
 * `accommodation` was swept on 2026-09-09, needing no code change: its getter
 * already reads its overlay through `localize`. 29 Sinhala and 29 Tamil
 * strings were deleted from its single content overlay (`content.si/ta.ts`):
 * the hero (entirely, now `{}`), `sectionEyebrows` (now `{}`),
 * `jumpCards[*].label`, `bookRail[*].label` (now `{}`, `{}`), and the three
 * bare heading exports `bookHeading`, `roomsHeading`, `specialtiesHeading`.
 * `roomTypes[*].description`, every amenity, `bookIntro` and every other
 * body/intro paragraph are untouched and stay translated.
 *
 * `contact` was swept on 2026-09-09, needing no code change: its getter
 * already reads its overlay through `localize`. 27 Sinhala and 27 Tamil
 * strings were deleted from its single content overlay (`content.si/ta.ts`;
 * `schemas.si/ta.ts` was already clean): the hero (entirely, now `{}`),
 * `sectionEyebrows` (now `{}`), `jumpCards[*].label` and
 * `contactRows[*].label`. Per the rule document, `contact`'s own filter-like
 * row and jump cards go English while its form stays translated: `form`'s
 * field labels, placeholders and error messages, `reachIntro`, `messageIntro`,
 * `mapIntro` and every `contactRows[*].sub` are untouched. Fixed four
 * now-stale `KEEPS_ENGLISH` entries (`heroFacts[0].k`, `heroFacts[2].v`,
 * `contactRows[2].label`, `contactRows[3].label`); `form.emailLabel` and
 * `form.emailPlaceholder` remain, since the form is unaffected.
 *
 * `e-channeling` was swept on 2026-09-09, needing no code change: its getters
 * already read their overlays through `localize` (`doctors.si/ta.ts` was
 * already clean). 23 Sinhala and 23 Tamil strings were deleted from its
 * single content overlay (`content.si/ta.ts`): the hero (entirely, now
 * `{}`), `directoryEyebrow`, `directoryHeading`, the directory's own filter
 * row (`directory.searchPlaceholder`, `.allSpecialities`, `.clearFilters`,
 * ruling 6), `directory.noResultsHeading`, `directory.showAllDoctors`,
 * `directory.bookAppointment`, and `helpRail.heading`/`.callCtaTemplate`/
 * `.emailCta`. Fixed the now-stale `hero.breadcrumbCurrent` `KEEPS_ENGLISH`
 * entry (now an empty set) and an orphaned Tamil comment about shortening
 * `directoryHeading`, whose field is gone. `directory.introTemplate`,
 * `.noResultsBodyTemplate`, `helpRail.body` and every doctor's own copy are
 * untouched and stay translated.
 *
 * `home-care` was swept on 2026-09-09, needing no code change: its getter
 * already reads its overlay through `localize`. 60 Sinhala and 60 Tamil
 * strings were deleted from its single content overlay (`content.si/ta.ts`):
 * the hero (entirely, now `{}`), `sectionEyebrows` (now `{}`),
 * `jumpCards[*].label`, `contactRows[*].label` (now `{}`, `{}`),
 * `visitRoles[*].title`, `suitedCases[*].title`, `handoffs[*].eyebrow`/
 * `.heading`/`.linkLabel`, `steps[*].title`, and the bare
 * `whoHeading`/`samplingHeading`/`howHeading`/`faqHeading`/`bookHeading`
 * exports (each now `{}`). Fixed two stale comments the deleted
 * `hero.visitsCta` left behind: the file header's 360px pill-width note and
 * a long Tamil comment measuring an alternative phrasing for it. `body`,
 * `desc`, `whoIntro`, `samplingIntro`, `bookIntro`, `emergencyNote` and every
 * FAQ are untouched and stay translated. `KEEPS_ENGLISH` was already empty
 * and needed no change.
 *
 * A future scope may need a similar check before it is swept: read the
 * feature's own getter (`getContent.ts` or equivalent) for whether it reads
 * an overlay directly or through `localize` before deleting from it.
 */
export const PENDING_REGISTER_SWEEP: ReadonlySet<string> = new Set([
  "international-care",
  "network",
  "pharmacy",
  "school-wellness",
]);
