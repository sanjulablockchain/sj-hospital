#!/usr/bin/env node
// Reports the review state of every translation overlay.
//
//   npm run i18n:status                     list every overlay and its status
//   npm run i18n:status -- --require-reviewed   exit 1 if any is still a draft
//
// The second form is the pre-merge gate. Translations are drafted by Claude
// and must be read by a Sinhala or Tamil speaker before they reach production:
// the health-tips content alone covers symptoms, first aid and emergency
// guidance, where a mistranslation carries real risk.
//
// Discovery and marker reading both live in `src/lib/i18n/overlayFiles.ts`,
// shared with the tests, so the gate and the suite cannot disagree about which
// overlays exist. Two things this script used to get wrong, both confirmed by
// mutation in final review 3:
//
//   * It read each feature's `data` directory one level deep and listed the
//     chrome's two overlays by hand, while its own comment called that a glob.
//     A draft overlay in a subdirectory, or beside `data` rather than inside
//     it, was absent from the report and `--require-reviewed` exited 0 with
//     unread copy on disk. Discovery is now a recursive walk of `src`, so
//     every `*.si.ts` / `*.ta.ts` is found wherever it lives and there is no
//     hardcoded list left to fall out of date.
//
//   * It pulled `status` out of the raw source with a regex, so a comment
//     reading `// status: "reviewed" once a speaker signs off` above
//     `status: "draft"` reported the file as signed off, and so did a sibling
//     key named `prior_status`. The marker is now read by importing the
//     module, which is what the file actually exports and cannot be fooled by
//     a comment or by a key that merely ends in the right word.
//
// A sign-off also needs a signatory: `status: "reviewed"` with
// `reviewer: null` is not a sign-off, and the gate used to exit 0 on it.

import { isSignedOff, overlayFiles, readReviewMarker } from "../src/lib/i18n/overlayFiles.ts";

const LOCALES = ["si", "ta"];

const rows = [];
for (const overlay of overlayFiles()) {
  const marker = await readReviewMarker(overlay.path);
  rows.push({
    file: overlay.relative,
    locale: overlay.locale,
    status: marker.status,
    reviewer: marker.reviewer ?? "none",
    signedOff: isSignedOff(marker),
  });
}

const requireReviewed = process.argv.includes("--require-reviewed");

if (rows.length === 0) {
  console.log("No translation overlays found yet.");
  process.exit(0);
}

/** `ok` only for a genuine sign-off, so the marker cannot overstate itself. */
function mark(row) {
  if (row.signedOff) return "ok      ";
  if (row.status === "reviewed") return "UNSIGNED";
  if (row.status === "draft") return "DRAFT   ";
  return "UNKNOWN ";
}

const width = Math.max(...rows.map((r) => r.file.length));
for (const row of rows) {
  console.log(`${mark(row)} ${row.file.padEnd(width)}  reviewer: ${row.reviewer}`);
}

const outstanding = rows.filter((r) => !r.signedOff);
const byLocale = LOCALES.map((locale) => {
  const all = rows.filter((r) => r.locale === locale);
  const done = all.filter((r) => r.signedOff).length;
  return `${locale}: ${done}/${all.length} reviewed`;
}).join(", ");

console.log(`\n${rows.length} overlays. ${byLocale}.`);

const unsigned = rows.filter((r) => r.status === "reviewed" && !r.signedOff);
if (unsigned.length > 0) {
  console.log(
    `\n${unsigned.length} overlay(s) are marked reviewed with no reviewer named.` +
      ` A sign-off with nobody's name on it is not a sign-off, so these still count` +
      ` as outstanding.`
  );
}

const unknown = rows.filter((r) => r.status !== "reviewed" && r.status !== "draft");
if (unknown.length > 0) {
  console.log(
    `\n${unknown.length} overlay(s) have no readable __review marker: ` +
      unknown.map((r) => r.file).join(", ")
  );
}

if (requireReviewed && outstanding.length > 0) {
  console.error(
    `\n${outstanding.length} overlay(s) are not signed off. A Sinhala or Tamil speaker` +
      ` must read these and put their name on them before they ship.`
  );
  process.exit(1);
}
