import { test } from "node:test";
import assert from "node:assert/strict";
import { groupSessions } from "./sessions.ts";
import { doctors } from "./doctors.ts";

const run = (from: string, to = from) => ({ from, to });

test("consecutive days with the same times collapse into one run", () => {
  assert.deepEqual(
    groupSessions({ mon: ["4.00 PM"], tue: ["4.00 PM"], wed: ["4.00 PM"], sat: ["3.00 PM"], sun: ["2.30 PM"] }),
    [
      { days: [run("mon", "wed")], times: ["4.00 PM"] },
      { days: [run("sat")], times: ["3.00 PM"] },
      { days: [run("sun")], times: ["2.30 PM"] },
    ]
  );
});

test("non-consecutive days with the same times share one line", () => {
  assert.deepEqual(
    groupSessions({
      mon: ["4.00 PM"],
      tue: ["7.30 AM", "7.00 PM"],
      wed: ["4.00 PM"],
      thu: ["7.30 AM", "7.00 PM"],
      fri: ["4.00 PM"],
      sat: ["4.00 PM"],
    }),
    [
      { days: [run("mon"), run("wed"), run("fri", "sat")], times: ["4.00 PM"] },
      { days: [run("tue"), run("thu")], times: ["7.30 AM", "7.00 PM"] },
    ]
  );
});

test("times must match as a whole list, not just the first", () => {
  assert.deepEqual(groupSessions({ mon: ["7.00 AM", "4.00 PM"], tue: ["7.00 AM"] }), [
    { days: [run("mon")], times: ["7.00 AM", "4.00 PM"] },
    { days: [run("tue")], times: ["7.00 AM"] },
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

// Every card in the directory shares the tallest card's height, so one long
// week pads all 88. Five lines is the longest today (a consultant whose every
// day has a different time); a roster change that pushes past it should be
// looked at, not silently absorbed.
test("no card needs more than five session lines", () => {
  for (const d of doctors) {
    const lines = groupSessions(d.sessions).length + (d.sessionNote ? 1 : 0);
    assert.ok(lines <= 5, `${d.name} needs ${lines} lines`);
  }
});

test("every session time is written the one way the site prints times", () => {
  const time = String.raw`(?:[1-9]|1[0-2])\.[0-5]\d (?:AM|PM)`;
  const pattern = new RegExp(`^${time}(?: to ${time})?$`);
  for (const d of doctors) {
    for (const times of Object.values(d.sessions)) {
      for (const t of times ?? []) assert.match(t, pattern, `${d.name}: ${t}`);
    }
  }
});
