import { test } from "node:test";
import assert from "node:assert/strict";
import { patientCareTiles } from "./patientCareTiles.ts";
import { isHomeIconKey } from "../types.ts";

// The tiles come from the mega nav, whose icon vocabulary is wider than the
// home page's (`info`, `network`, `newspaper`, `briefcase`, `heart` have no
// home path data). A Patient Care link that picked one of those would render
// through `HomeIcon`, which indexes its path table by the key, so the band
// guards the key at render time and this pins that today's six all resolve.
test("every patient care tile's icon is one the home page can draw", () => {
  for (const tile of patientCareTiles()) {
    assert.ok(isHomeIconKey(tile.icon), `${tile.label}: icon "${tile.icon}" has no home path data`);
  }
});

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
