import { test } from "node:test";
import assert from "node:assert/strict";
import { contactMessageSchema, VALIDATION_MESSAGES, validationMessages } from "./schemas.ts";
import * as si from "./schemas.si.ts";
import * as ta from "./schemas.ta.ts";
import { assertTranslationParity, stringPaths } from "../../lib/i18n/stringPaths.ts";

const EMPTY = { firstName: "", lastName: "", email: "", message: "" };

test("English messages are unchanged from before this task", () => {
  const result = contactMessageSchema("en").safeParse(EMPTY);
  assert.equal(result.success, false);
  const messages = result.error.issues.map((i) => i.message);
  assert.ok(messages.includes("First name is required"));
  assert.ok(messages.includes("Last name is required"));
});

test("a form filled in Sinhala is answered in Sinhala", () => {
  const result = contactMessageSchema("si").safeParse(EMPTY);
  assert.equal(result.success, false);
  for (const issue of result.error.issues) {
    assert.match(issue.message, /[඀-෿]/, `"${issue.message}" is not Sinhala`);
  }
});

test("a form filled in Tamil is answered in Tamil", () => {
  const result = contactMessageSchema("ta").safeParse(EMPTY);
  assert.equal(result.success, false);
  for (const issue of result.error.issues) {
    assert.match(issue.message, /[஀-௿]/, `"${issue.message}" is not Tamil`);
  }
});

// A message key added to English and forgotten in the other two would
// otherwise fall back silently and answer a Sinhala reader in English. This
// also covers the three banner keys (fixFields, sendFailed, sendSuccess)
// added alongside the field messages, with no extra assertion needed.
test("every locale defines every message key", () => {
  const keys = Object.keys(VALIDATION_MESSAGES.en).sort();
  assert.deepEqual(Object.keys(VALIDATION_MESSAGES.si).sort(), keys);
  assert.deepEqual(Object.keys(VALIDATION_MESSAGES.ta).sort(), keys);
});

// The success banner is the one a reader who filled the form correctly
// actually sees, so it gets its own check rather than riding solely on the
// key-parity test above: a Sinhala reader's success message answered in
// English would pass that test (the key exists) while still being wrong.
test("the success banner answers in the form's own script", () => {
  assert.equal(
    VALIDATION_MESSAGES.en.sendSuccess,
    "Thanks for reaching out. We'll get back to you within one business day."
  );
  assert.match(
    VALIDATION_MESSAGES.si.sendSuccess,
    /[඀-෿]/,
    `"${VALIDATION_MESSAGES.si.sendSuccess}" is not Sinhala`
  );
  assert.match(
    VALIDATION_MESSAGES.ta.sendSuccess,
    /[஀-௿]/,
    `"${VALIDATION_MESSAGES.ta.sendSuccess}" is not Tamil`
  );
});

// The Sinhala and Tamil tables now live in `schemas.si.ts` and `schemas.ta.ts`
// as overlays with their own `__review` markers, so they reach
// `npm run i18n:status` and a speaker has to sign them off. Importing them by
// name here is also what binds them to the suite: `overlayCoverage.test.ts`
// fails on any overlay no test imports, and these strings sat outside every
// check until this task.
//
// The register is the same as the feature's content overlays, so "Email" and
// "message" stay in English and the identity check below is normalised: a
// value differing from the English only by case or padding is not a
// translation.
test("every English validation message has Sinhala and Tamil", () => {
  for (const [locale, overlay] of [
    ["si", si.validationMessages],
    ["ta", ta.validationMessages],
  ] as const) {
    const missing = assertTranslationParity(validationMessages, overlay, () => false);
    assert.deepEqual(missing, [], `${locale} is missing: ${missing.join(", ")}`);
  }
});

test("no validation message is left identical to its English source, ignoring case and whitespace", () => {
  for (const [locale, overlay] of [
    ["si", si.validationMessages],
    ["ta", ta.validationMessages],
  ] as const) {
    for (const path of stringPaths(overlay)) {
      const normalize = (s: string) => s.trim().toLowerCase();
      const english = validationMessages[path as keyof typeof validationMessages];
      assert.notEqual(
        normalize(overlay[path as keyof typeof overlay]),
        normalize(english),
        `${locale} ${path} differs from the English only by case or whitespace, which is not a translation.`
      );
    }
  }
});

// The `{phone}` token is what keeps the hospital's number in exactly one
// place. A translation that pasted the digits in instead would drift out of
// step with `data/content.ts` the day the number changes, and
// `overlayNumerals.test.ts` would not object, because adding a number the
// English does not have is legitimate everywhere else on the site.
test("sendFailed carries the phone token rather than a second copy of the number", () => {
  for (const [locale, overlay] of [
    ["si", si.validationMessages],
    ["ta", ta.validationMessages],
  ] as const) {
    assert.ok(overlay.sendFailed.includes("{phone}"), `${locale} sendFailed lost {phone}`);
    assert.doesNotMatch(
      overlay.sendFailed,
      /[0-9]/,
      `${locale} sendFailed writes digits into the sentence. The number belongs in ` +
        `data/content.ts, reached through the {phone} token.`
    );
  }
});
