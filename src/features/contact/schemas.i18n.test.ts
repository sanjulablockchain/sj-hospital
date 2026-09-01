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
// otherwise fall back silently and answer a Sinhala reader in English.
test("every locale defines every message key", () => {
  const keys = Object.keys(VALIDATION_MESSAGES.en).sort();
  assert.deepEqual(Object.keys(VALIDATION_MESSAGES.si).sort(), keys);
  assert.deepEqual(Object.keys(VALIDATION_MESSAGES.ta).sort(), keys);
});
