import { test } from "node:test";
import assert from "node:assert/strict";
import { patientCareTiles } from "./patientCareTiles.ts";

test("the patient care band renders the mega nav's six patient care destinations", () => {
  const tiles = patientCareTiles();
  assert.equal(tiles.length, 6);
  for (const tile of tiles) {
    assert.ok(tile.icon, `${tile.label} has no icon`);
    assert.ok(tile.description, `${tile.label} has no description`);
    assert.match(tile.href, /^\//, `${tile.label}: ${tile.href}`);
  }
  assert.deepEqual(
    tiles.map((t) => t.href),
    ["/facilities", "/pharmacy", "/home-care", "/international-care", "/school-wellness", "/accommodation"],
  );
});
