import { test } from "node:test";
import assert from "node:assert/strict";
import { initialSlideState, stepSlides } from "./slideState.ts";

test("stepping wraps in both directions", () => {
  const start = initialSlideState(8, 0);
  assert.equal(stepSlides(start, 8, -1, 0).active, 7);
  assert.equal(stepSlides(start, 8, 8, 0).active, 0);
  assert.equal(stepSlides(start, 8, 3, 0).active, 3);
});

test("each layer remembers when it mounted, so its Ken Burns phase can match the first", () => {
  let state = initialSlideState(8, 1000);
  assert.deepEqual(state.mountedAt, { 0: 1000, 1: 1000 });
  state = stepSlides(state, 8, 1, 8000);
  assert.equal(state.mountedAt[2], 8000);
  state = stepSlides(state, 8, 0, 15000);
  assert.equal(state.mountedAt[1], 1000, "a layer already mounted keeps its original time");
});

test("the mounted set always holds the active slide and the one after it", () => {
  let state = initialSlideState(8, 0);
  assert.deepEqual(state.mounted, [0, 1]);
  state = stepSlides(state, 8, 1, 0);
  assert.deepEqual(state.mounted, [0, 1, 2]);
  state = stepSlides(state, 8, 7, 0);
  assert.ok(state.mounted.includes(7) && state.mounted.includes(0));
});

test("slides already shown stay mounted, so a crossfade back never flashes blank", () => {
  let state = initialSlideState(8, 0);
  for (const to of [1, 2, 3, 2, 1, 0]) state = stepSlides(state, 8, to, 0);
  assert.deepEqual(state.shown, [0, 1, 2, 3]);
  assert.ok([0, 1, 2, 3].every((i) => state.mounted.includes(i)));
});
