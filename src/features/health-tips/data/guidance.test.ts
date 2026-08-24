import { test } from "node:test";
import assert from "node:assert/strict";
import { warnings, WARNING_LEVELS } from "./warnings.ts";
import { screening } from "./screening.ts";
import { firstAidSteps, homeKit, emergencyNumbers } from "./firstAid.ts";
import { denguePoints } from "./dengue.ts";
import { myths } from "./myths.ts";

test("eleven warning rows, each at one of the four escalation levels", () => {
  assert.equal(warnings.length, 11);
  for (const w of warnings) {
    assert.ok(WARNING_LEVELS.includes(w.level), `${w.symptom} has an unknown level: ${w.level}`);
  }
});

test("warning rows run most urgent first, never escalating back up", () => {
  const order = warnings.map((w) => WARNING_LEVELS.indexOf(w.level));
  for (let i = 1; i < order.length; i += 1) {
    assert.ok(order[i] >= order[i - 1], `row ${i} escalates back up: ${warnings[i].symptom}`);
  }
});

test("every warning row carries advice long enough to be useful", () => {
  for (const w of warnings) {
    assert.ok(w.symptom.length > 15, `symptom too terse: ${w.symptom}`);
    assert.ok(w.advice.length > 120, `advice too thin: ${w.symptom}`);
  }
});

test("no warning row tells the reader to self-medicate unprompted", () => {
  for (const w of warnings) {
    const tellsToTake = /\b(chew|take|swallow)\b[^.]*\b(aspirin|ibuprofen|antibiotic)/i.test(w.advice);
    if (!tellsToTake) continue;
    assert.match(
      w.advice,
      /if you have been told|as your doctor|prescribed/i,
      `unconditional self-medication advice: ${w.symptom}`,
    );
  }
});

test("eleven screening rows, each naming a check, a who and a frequency", () => {
  assert.equal(screening.length, 11);
  for (const s of screening) {
    assert.ok(s.check.length > 3, `check too terse: ${s.check}`);
    assert.ok(s.who.length > 15, `who too terse: ${s.check}`);
    assert.ok(s.freq.length > 2, `freq too terse: ${s.check}`);
  }
});

test("four first aid steps, each with an action and a never", () => {
  assert.equal(firstAidSteps.length, 4);
  for (const s of firstAidSteps) {
    assert.ok(s.action.length > 80, `action too thin: ${s.title}`);
    assert.ok(s.avoid.length > 10, `avoid too thin: ${s.title}`);
    assert.ok(!/^never/i.test(s.avoid), `avoid repeats the Never label: ${s.avoid}`);
  }
});

test("the home kit lists eleven items", () => {
  assert.equal(homeKit.length, 11);
  for (const item of homeKit) assert.ok(item.length > 4, `kit item too terse: ${item}`);
});

test("emergency numbers cover the hospital, pharmacy and both national lines", () => {
  assert.equal(emergencyNumbers.length, 4);
  const flat = emergencyNumbers.map((n) => n.number.replace(/\s/g, ""));
  assert.deepEqual(flat, ["0117848484", "0742223334", "1990", "0112686143"]);
  const dialable = emergencyNumbers.filter((n) => n.tel !== undefined);
  assert.equal(dialable.length, 2, "only our own two lines should be tel: links");
});

test("seven dengue points, all actionable", () => {
  assert.equal(denguePoints.length, 7);
  for (const p of denguePoints) assert.ok(p.length > 30, `dengue point too terse: ${p}`);
});

test("eight myths, each a question with a full answer", () => {
  assert.equal(myths.length, 8);
  for (const m of myths) {
    assert.match(m.q, /\?$/, `not phrased as a question: ${m.q}`);
    assert.ok(m.a.length > 150, `answer too thin: ${m.q}`);
  }
});
