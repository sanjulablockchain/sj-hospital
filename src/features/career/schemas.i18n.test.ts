import { test } from "node:test";
import assert from "node:assert/strict";
import { jobApplicationSchema, VALIDATION_MESSAGES, validationMessages } from "./schemas.ts";
import * as si from "./schemas.si.ts";
import * as ta from "./schemas.ta.ts";
import { assertTranslationParity, stringPaths } from "../../lib/i18n/stringPaths.ts";

/**
 * The careers form's error messages, held to the same standard as contact's.
 *
 * `schemas.test.ts` already checks that every locale defines every key and
 * that the schema validates identically in all three. What it never checked
 * is whether the Sinhala and Tamil values are actually Sinhala and Tamil, so
 * a message left in English would have passed: the key exists and it is
 * non-blank. `contact/schemas.i18n.test.ts` is the better pattern and final
 * review 3 asked for this file to match it.
 *
 * The tables themselves now live in `schemas.si.ts` and `schemas.ta.ts` as
 * overlays with their own `__review` markers, so `npm run i18n:status` lists
 * them and a Sinhala or Tamil speaker has to read the words an applicant sees
 * when the form rejects their CV. They used to sit inline in `schemas.ts`,
 * invisible to the gate.
 */

const EMPTY = {
  roleTitle: "",
  fullName: "",
  email: "",
  phone: "",
  consent: "",
};

test("every English validation message has Sinhala and Tamil", () => {
  for (const [locale, overlay] of [
    ["si", si.validationMessages],
    ["ta", ta.validationMessages],
  ] as const) {
    const missing = assertTranslationParity(validationMessages, overlay, () => false);
    assert.deepEqual(missing, [], `${locale} is missing: ${missing.join(", ")}`);
  }
});

// The register keeps Role, Email, Mobile, CV, PDF, Word, Attach, Submit,
// Consent Box, Tick and Automated Reply in English, so a message can be
// mostly English words and still be a real translation. What it can never be
// is the English string itself, normalised: that is a copy-paste, and it is
// how "Bank Transfer" shipped as the translation of "Bank transfer" elsewhere
// in this project.
test("no validation message is left identical to its English source, ignoring case and whitespace", () => {
  for (const [locale, overlay] of [
    ["si", si.validationMessages],
    ["ta", ta.validationMessages],
  ] as const) {
    for (const path of stringPaths(overlay)) {
      const normalize = (s: string) => s.trim().toLowerCase();
      assert.notEqual(
        normalize(overlay[path as keyof typeof overlay]),
        normalize(validationMessages[path as keyof typeof validationMessages]),
        `${locale} ${path} differs from the English only by case or whitespace, which is not a translation.`
      );
    }
  }
});

// Stronger than "not still English": every message must carry its own script.
// A code-mixed message is the register, but one with no Sinhala or Tamil
// character at all is an English sentence with a word swapped, which the
// identity check above cannot see.
test("every Sinhala message is in Sinhala and every Tamil message is in Tamil", () => {
  for (const [locale, overlay, script] of [
    ["si", si.validationMessages, /[඀-෿]/],
    ["ta", ta.validationMessages, /[஀-௿]/],
  ] as const) {
    for (const [key, value] of Object.entries(overlay)) {
      assert.match(value, script, `${locale} ${key}: "${value}" carries no ${locale} script`);
    }
  }
});

// The messages a form actually answers with, taken from the schema rather
// than from the table, so a message wired to the wrong key would show up.
test("a form filled in Sinhala is answered in Sinhala, and in Tamil in Tamil", () => {
  for (const [locale, script] of [
    ["si", /[඀-෿]/],
    ["ta", /[஀-௿]/],
  ] as const) {
    const result = jobApplicationSchema(locale).safeParse(EMPTY);
    assert.equal(result.success, false);
    for (const issue of result.error?.issues ?? []) {
      assert.match(issue.message, script, `"${issue.message}" is not ${locale}`);
    }
  }
});

// The success banner is the one an applicant who filled the form correctly
// sees, so it gets its own check rather than riding solely on the key parity
// above: answered in English it would still have a key and still be non-blank.
test("the success banner answers in the applicant's own script", () => {
  assert.equal(
    VALIDATION_MESSAGES.en.sendSuccess,
    "Thank you. Your application has reached us, and you will hear from a person rather than an automated reply."
  );
  assert.match(VALIDATION_MESSAGES.si.sendSuccess, /[඀-෿]/);
  assert.match(VALIDATION_MESSAGES.ta.sendSuccess, /[஀-௿]/);
});

// `{email}` is what keeps the careers mailbox in one place rather than pasted
// into three locales' messages, the same rule contact's `{phone}` follows.
test("sendFailed carries the email token rather than a second copy of the mailbox", () => {
  for (const [locale, overlay] of [
    ["si", si.validationMessages],
    ["ta", ta.validationMessages],
  ] as const) {
    assert.ok(overlay.sendFailed.includes("{email}"), `${locale} sendFailed lost {email}`);
    assert.doesNotMatch(
      overlay.sendFailed,
      /@/,
      `${locale} sendFailed writes an address into the sentence. The mailbox belongs in ` +
        `src/config, reached through the {email} token.`
    );
  }
});
