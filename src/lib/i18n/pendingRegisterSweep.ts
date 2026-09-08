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
 * Two of these need work in `.ts` files before their overlays can lose keys,
 * and a sweep agent that does not know this will produce a page with blank
 * strings on it and a green-looking diff:
 *
 * - `chrome`: `chromeCopyFor` in `src/components/layout/chromeCopy.ts` reads
 *   the overlay object DIRECTLY, without `localize`, because every caller is a
 *   client component. A missing key there renders empty, not English. Route it
 *   through `localize` (or spread it over the English object) first.
 * - `config`: `navigationLabels.test.ts` asserts that every nav label and
 *   footer heading in `src/config/*Navigation.ts` HAS a dictionary entry. The
 *   policy says the whole nav bar and footer are English, so that assertion
 *   has to be inverted when this scope is swept. `navLabel` and
 *   `footerHeading` already fall back to the English string, so the runtime is
 *   ready.
 */
export const PENDING_REGISTER_SWEEP: ReadonlySet<string> = new Set([
  "about",
  "accommodation",
  "career",
  "chrome",
  "config",
  "contact",
  "e-channeling",
  "facilities",
  "health-tips",
  "home",
  "home-care",
  "international-care",
  "media",
  "network",
  "pharmacy",
  "school-wellness",
  "services",
]);
