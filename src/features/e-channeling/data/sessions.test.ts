import { test } from "node:test";
import assert from "node:assert/strict";
import { groupSessions } from "./sessions.ts";
import { doctors } from "./doctors.ts";

test("consecutive days with the same times collapse into one range", () => {
  assert.deepEqual(
    groupSessions({ mon: ["4.00 PM"], tue: ["4.00 PM"], wed: ["4.00 PM"], sat: ["3.00 PM"], sun: ["2.30 PM"] }),
    [
      { from: "mon", to: "wed", times: ["4.00 PM"] },
      { from: "sat", to: "sat", times: ["3.00 PM"] },
      { from: "sun", to: "sun", times: ["2.30 PM"] },
    ]
  );
});

test("a gap day or a different time breaks the run", () => {
  assert.deepEqual(groupSessions({ mon: ["3.00 PM"], tue: ["3.00 PM"], thu: ["3.00 PM"], fri: ["5.00 PM"] }), [
    { from: "mon", to: "tue", times: ["3.00 PM"] },
    { from: "thu", to: "thu", times: ["3.00 PM"] },
    { from: "fri", to: "fri", times: ["5.00 PM"] },
  ]);
});

test("times must match as a whole list, not just the first", () => {
  assert.deepEqual(groupSessions({ mon: ["7.00 AM", "4.00 PM"], tue: ["7.00 AM"] }), [
    { from: "mon", to: "mon", times: ["7.00 AM", "4.00 PM"] },
    { from: "tue", to: "tue", times: ["7.00 AM"] },
  ]);
});

test("no sessions gives no groups", () => {
  assert.deepEqual(groupSessions({}), []);
});

test("every consultant has weekly sessions or a note saying why not", () => {
  for (const d of doctors) {
    assert.ok(groupSessions(d.sessions).length > 0 || d.sessionNote, `${d.name} has no sessions and no note`);
  }
});

test("every session time is written the one way the site prints times", () => {
  const time = String.raw`(?:[1-9]|1[0-2])\.[0-5]\d (?:AM|PM)`;
  const pattern = new RegExp(`^${time}(?: – ${time})?$`);
  for (const d of doctors) {
    for (const times of Object.values(d.sessions)) {
      for (const t of times ?? []) assert.match(t, pattern, `${d.name}: ${t}`);
    }
  }
});
