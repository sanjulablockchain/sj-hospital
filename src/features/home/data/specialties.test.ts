import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { specialties } from "./content.ts";
import { SERVICE_GROUPS } from "../../services/data/groups.ts";
import { serviceSlugs } from "../../services/data/services.ts";

test("the specialties tabs are the six service groups, in the directory's order", () => {
  assert.deepEqual(
    specialties.tabs.map((t) => t.group),
    [...SERVICE_GROUPS],
  );
});

test("every specialty chip under /services names a real service", () => {
  for (const tab of specialties.tabs) {
    for (const link of tab.links) {
      const match = /^\/services\/([a-z0-9-]+)$/.exec(link.href);
      if (match) {
        assert.ok(serviceSlugs.includes(match[1]), `${tab.label}: no service called ${match[1]}`);
      } else {
        // The one chip that is not a service page (Ambulance) must still be an
        // absolute route on this site.
        assert.match(link.href, /^\/[a-z-]+(#[a-z-]+)?$/, `${tab.label}: ${link.href}`);
      }
    }
  }
});

test("every specialty photograph exists", () => {
  for (const tab of specialties.tabs) {
    assert.ok(existsSync(join("public", tab.image)), `${tab.label}: ${tab.image} missing`);
  }
});

test("the carousel's own links leave for the booking and services pages", () => {
  assert.equal(specialties.findDoctor.href, "/e-channeling");
  assert.equal(specialties.viewAll.href, "/services");
  assert.match(specialties.exploreMore.href, /^\/services/);
});
