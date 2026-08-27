/**
 * The only two mailboxes this site publishes.
 *
 * The site had grown five: `info@`, plus `careers@`, `media@`,
 * `international@` and the `hr@ktdoctor.com` route the careers page carried
 * over from the old /career page. Two of those were never confirmed to exist,
 * and their own data file headers said so ("assumed from the `careers@`
 * pattern, not confirmed"). Only the two below are real, so they are the only
 * two anywhere in `src`, and `contactEmails.test.ts` scans the tree to keep it
 * that way.
 *
 * GENERAL is the front door: enquiries, careers, press, anything that does not
 * end in a booking. APPOINTMENTS is for anything that does end in a slot on a
 * calendar, which is why the e-channeling help rail and the international
 * patient desk both use it.
 */
export const GENERAL_EMAIL = "info@sjhospital.lk";
export const APPOINTMENTS_EMAIL = "appointments@sjhospital.lk";

/** Both of the above, in the order the guard test reports them. */
export const ALLOWED_EMAILS: readonly string[] = [GENERAL_EMAIL, APPOINTMENTS_EMAIL];
