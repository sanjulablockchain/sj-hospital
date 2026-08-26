import { test } from "node:test";
import assert from "node:assert/strict";
import { ALLOWED_CV_TYPES, MAX_CV_SIZE_BYTES, jobApplicationSchema } from "./schemas.ts";
import { experienceOptions, roleOptions, sourceOptions } from "./data/content.ts";

const valid = {
  roleTitle: "Theatre Nurse",
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
  const result = jobApplicationSchema.safeParse(valid);
  assert.ok(result.success, JSON.stringify(result.error?.issues));
});

// The role goes straight into the subject line of an email to Human Resources,
// and FormData is whatever the client chooses to send, so it is checked against
// the advertised list rather than accepted as free text.
test("a role that is not advertised is rejected", () => {
  for (const rogue of ["Chief Executive, please", "Nursing Officer, Intensive Care Unit", "<script>"]) {
    const result = jobApplicationSchema.safeParse({ ...valid, roleTitle: rogue });
    assert.ok(!result.success, `"${rogue}" was accepted as a role`);
  }
});

test("every advertised role is accepted", () => {
  for (const role of roleOptions) {
    assert.ok(jobApplicationSchema.safeParse({ ...valid, roleTitle: role }).success, role);
  }
});

test("the optional selects accept their own options, blank, and nothing else", () => {
  for (const option of experienceOptions) {
    assert.ok(jobApplicationSchema.safeParse({ ...valid, experience: option }).success, option);
  }
  for (const option of sourceOptions) {
    assert.ok(jobApplicationSchema.safeParse({ ...valid, source: option }).success, option);
  }
  assert.ok(jobApplicationSchema.safeParse({ ...valid, experience: "", source: "" }).success);
  assert.ok(!jobApplicationSchema.safeParse({ ...valid, experience: "Twenty years" }).success);
  assert.ok(!jobApplicationSchema.safeParse({ ...valid, source: "A billboard" }).success);
});

// An unticked checkbox is simply absent from FormData, which the action turns
// into "". Neither that nor any other value may stand in for consent.
test("consent must be an actual tick", () => {
  for (const value of ["", "off", "false", "true", "1"]) {
    assert.ok(
      !jobApplicationSchema.safeParse({ ...valid, consent: value }).success,
      `consent="${value}" was accepted`
    );
  }
  assert.ok(jobApplicationSchema.safeParse({ ...valid, consent: "on" }).success);
});

test("name, email and phone are all required", () => {
  for (const field of ["fullName", "email", "phone"]) {
    const result = jobApplicationSchema.safeParse({ ...valid, [field]: "   " });
    assert.ok(!result.success, `${field} accepted whitespace`);
  }
  assert.ok(!jobApplicationSchema.safeParse({ ...valid, email: "not-an-address" }).success);
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
