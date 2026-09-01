import { test } from "node:test";
import assert from "node:assert/strict";
import { contactMessageSchema, VALIDATION_MESSAGES } from "./schemas.ts";

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
