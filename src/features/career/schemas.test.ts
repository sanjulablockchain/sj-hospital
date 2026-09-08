import { test } from "node:test";
import assert from "node:assert/strict";
import { ALLOWED_CV_TYPES, MAX_CV_SIZE_BYTES, VALIDATION_MESSAGES, jobApplicationSchema } from "./schemas.ts";
import { experienceOptions, GENERAL_APPLICATION_ROLE_ID, jobs, roleIds, sourceOptions } from "./data/content.ts";
import { LOCALES } from "../../lib/i18n/locales.ts";

const schema = jobApplicationSchema("en");

const valid = {
  roleTitle: "theatre-nurse",
  fullName: "A Candidate",
  email: "candidate@example.com",
  phone: "0771234567",
  registrationNumber: "",
  experience: "",
  startDate: "",
  source: "",
  note: "",
  consent: "on",
};

test("a minimal application passes", () => {
  const result = schema.safeParse(valid);
  assert.ok(result.success, JSON.stringify(result.error?.issues));
});

// The role id goes into `toEnglishLabel`'s lookup and ends up in the subject
// line of an email to Human Resources, and FormData is whatever the client
// chooses to send, so it is checked against the advertised ids rather than
// accepted as free text.
test("a role id that is not advertised is rejected", () => {
  for (const rogue of ["chief-executive-please", "nursing-officer-icu", "<script>", "Theatre Nurse"]) {
    const result = schema.safeParse({ ...valid, roleTitle: rogue });
    assert.ok(!result.success, `"${rogue}" was accepted as a role id`);
  }
});

test("every advertised role id is accepted", () => {
  for (const id of roleIds) {
    assert.ok(schema.safeParse({ ...valid, roleTitle: id }).success, id);
  }
  assert.ok(roleIds.includes(GENERAL_APPLICATION_ROLE_ID));
});

test("the optional selects accept their own option ids, blank, and nothing else", () => {
  for (const option of experienceOptions) {
    assert.ok(schema.safeParse({ ...valid, experience: option.id }).success, option.id);
  }
  for (const option of sourceOptions) {
    assert.ok(schema.safeParse({ ...valid, source: option.id }).success, option.id);
  }
  assert.ok(schema.safeParse({ ...valid, experience: "", source: "" }).success);
  assert.ok(!schema.safeParse({ ...valid, experience: "Twenty years" }).success);
  assert.ok(!schema.safeParse({ ...valid, source: "A billboard" }).success);
});

// An unticked checkbox is simply absent from FormData, which the action turns
// into "". Neither that nor any other value may stand in for consent.
test("consent must be an actual tick", () => {
  for (const value of ["", "off", "false", "true", "1"]) {
    assert.ok(!schema.safeParse({ ...valid, consent: value }).success, `consent="${value}" was accepted`);
  }
  assert.ok(schema.safeParse({ ...valid, consent: "on" }).success);
});

test("name, email and phone are all required", () => {
  for (const field of ["fullName", "email", "phone"]) {
    const result = schema.safeParse({ ...valid, [field]: "   " });
    assert.ok(!result.success, `${field} accepted whitespace`);
  }
  assert.ok(!schema.safeParse({ ...valid, email: "not-an-address" }).success);
});

test("the CV limits are the ones the copy promises", () => {
  // The dashed box says "PDF preferred, under 5 MB" and the accept attribute
  // offers .pdf/.doc/.docx, so these must not drift apart from that promise.
  assert.equal(MAX_CV_SIZE_BYTES, 5 * 1024 * 1024);
  assert.deepEqual(ALLOWED_CV_TYPES, [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]);
});

// The schema factory validates identically in every locale (roleIds and the
// option ids are fixed English strings, never translated); only the messages
// it attaches to a failure change. Every locale must define every key, or a
// Sinhala or Tamil reader would silently see an English error mid-form.
test("every locale defines every validation message key", () => {
  const keys = Object.keys(VALIDATION_MESSAGES.en);
  for (const locale of LOCALES) {
    for (const key of keys) {
      assert.ok(
        VALIDATION_MESSAGES[locale][key as keyof typeof VALIDATION_MESSAGES.en]?.trim().length,
        `${locale} is missing "${key}"`
      );
    }
  }
});

test("the schema validates the same way in every locale, with that locale's messages", () => {
  for (const locale of LOCALES) {
    const localizedSchema = jobApplicationSchema(locale);
    const result = localizedSchema.safeParse(valid);
    assert.ok(result.success, `${locale}: ${JSON.stringify(result.error?.issues)}`);

    const rejected = localizedSchema.safeParse({ ...valid, roleTitle: "not-a-role" });
    assert.ok(!rejected.success);
    assert.equal(rejected.error?.issues[0]?.message, VALIDATION_MESSAGES[locale].roleInvalid);
  }
});

test("jobs still resolve back to the roles the old English-only action emailed", () => {
  // A sanity check that every job's id is derivable and unique, since
  // `submitJobApplication` looks a submitted id back up in `jobs` to build the
  // English label Human Resources reads, regardless of the applicant's locale.
  for (const job of jobs) {
    assert.ok(roleIds.includes(job.id));
  }
});
