import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { overlayFiles, REPO_ROOT, SRC_DIR, toImportUrl, toRelative } from "./overlayFiles.ts";
import { stringPaths } from "./stringPaths.ts";
import { REGISTER_REASONS, registerReason } from "./registerPolicy.ts";
import { PENDING_REGISTER_SWEEP, sweepScope } from "./pendingRegisterSweep.ts";

/**
 * The direction nothing enforced before: a path the register policy says
 * renders in English must be ABSENT from every overlay.
 *
 * Its mirror image, "a path the policy says is translated must be present", is
 * each feature's own parity test. `assertTranslationParity` now subtracts the
 * policy from what it demands, so the two halves meet exactly: a path is owed a
 * translation unless it is a fact (`isUntranslatable`, per feature) or English
 * by register (`staysEnglish`, here), and if it is English by register it must
 * not be in the file at all.
 *
 * This is a WALKER, like `overlayNumerals.test.ts`: it discovers overlays from
 * disk rather than importing them by name, so a new overlay is covered the day
 * it is written and cannot be forgotten. `overlayCoverage.test.ts` lists it
 * alongside the other walkers for that reason.
 *
 * Violations are computed once, before any test is registered, so a scope that
 * is still pending can say in its skip message how much work is left.
 */

type Audited = {
  relative: string;
  scope: string;
  violations: { path: string; reason: string }[];
};

const audited: Audited[] = [];
for (const overlay of overlayFiles()) {
  const loaded = await import(toImportUrl(overlay.path));
  const violations = stringPaths(loaded)
    .map((path) => ({ path, reason: registerReason(path) }))
    .filter((entry): entry is { path: string; reason: string } => entry.reason !== null);
  audited.push({ relative: overlay.relative, scope: sweepScope(overlay.relative), violations });
}

const byScope = new Map<string, Audited[]>();
for (const entry of audited) {
  byScope.set(entry.scope, [...(byScope.get(entry.scope) ?? []), entry]);
}

/** The failure message doubles as the work list: every path, with its reason. */
function workList(entry: Audited): string {
  const lines = entry.violations.map(
    (violation) => `  ${violation.reason.padEnd(8)} ${violation.path}`
  );
  return (
    `${entry.relative} carries ${entry.violations.length} path(s) the register policy ` +
    `says render in English. Delete these keys from the overlay: keeping a string ` +
    `English means removing it, because \`localize\` iterates the English base and ` +
    `falls back to it. See docs/superpowers/i18n-register-rule.md.\n` +
    lines.join("\n") +
    `\n\nReasons: ${Object.entries(REGISTER_REASONS)
      .map(([reason, description]) => `${reason} = ${description}`)
      .join("; ")}`
  );
}

for (const entry of audited) {
  const pending = PENDING_REGISTER_SWEEP.has(entry.scope);
  test(
    `${entry.relative} carries no path the register policy says is English`,
    {
      skip: pending
        ? `${entry.scope} has not been swept yet: ${entry.violations.length} path(s) ` +
          `still to delete here. Run npm run i18n:register-audit -- --scope=${entry.scope}, ` +
          `then remove "${entry.scope}" from PENDING_REGISTER_SWEEP.`
        : false,
    },
    () => {
      assert.deepEqual(
        entry.violations.map((violation) => violation.path),
        [],
        workList(entry)
      );
    }
  );
}

/* ------------------------------------------------------------------ *
 * Tests aimed at the allowlist rather than at the content, so that it
 * cannot become a permanent hiding place.
 * ------------------------------------------------------------------ */

/**
 * While every scope is still pending, all 84 assertions above are skipped, and
 * a gate that has never been seen to fail is not a gate. This runs the same
 * assertion those tests run, on a scope that really does violate the policy,
 * and requires it to throw. It is the standing proof that removing a scope
 * from the allowlist has consequences, and it stops mattering (and passes
 * trivially, then goes away with the module) once the sweep is finished.
 */
test("the enforcement assertion has teeth while scopes are still exempt", () => {
  const violating = audited.find((entry) => entry.violations.length > 0);
  if (!violating) {
    assert.equal(
      PENDING_REGISTER_SWEEP.size,
      0,
      "no overlay violates the policy, so PENDING_REGISTER_SWEEP should be empty"
    );
    return;
  }
  assert.throws(
    () =>
      assert.deepEqual(
        violating.violations.map((violation) => violation.path),
        [],
        workList(violating)
      ),
    /register policy/,
    `${violating.relative} violates the policy, so the assertion the skipped tests ` +
      `carry must throw for it. If this does not throw, the gate is decorative.`
  );
});

test("every scope in PENDING_REGISTER_SWEEP still exists", () => {
  const onDisk = new Set(audited.map((entry) => entry.scope));
  const stale = [...PENDING_REGISTER_SWEEP].filter((scope) => !onDisk.has(scope));
  assert.deepEqual(
    stale,
    [],
    `PENDING_REGISTER_SWEEP names ${stale.join(", ")}, which owns no overlay on disk. ` +
      `A renamed or deleted feature leaves a line nobody can interpret: remove it.`
  );
});

test("no scope in PENDING_REGISTER_SWEEP is already clean", () => {
  const done = [...PENDING_REGISTER_SWEEP].filter((scope) =>
    (byScope.get(scope) ?? []).every((entry) => entry.violations.length === 0)
  );
  assert.deepEqual(
    done,
    [],
    `${done.join(", ")} obey the register policy already, so their exemption is ` +
      `excusing nothing. Remove them from PENDING_REGISTER_SWEEP in the same commit ` +
      `that swept them: an entry that outlives its work is how an allowlist like this ` +
      `turns into a permanent hiding place.`
  );
});

test("PENDING_REGISTER_SWEEP is deleted once it is empty", () => {
  if (PENDING_REGISTER_SWEEP.size > 0) return;

  const referrers: string[] = [];
  const skip = new Set(["src/lib/i18n/pendingRegisterSweep.ts", "src/lib/i18n/overlayRegister.test.ts"]);
  for (const file of sourceFiles(SRC_DIR).concat(sourceFiles(join(REPO_ROOT, "scripts")))) {
    const relative = toRelative(file);
    if (skip.has(relative)) continue;
    if (/pendingRegisterSweep|PENDING_REGISTER_SWEEP/.test(readFileSync(file, "utf8"))) {
      referrers.push(relative);
    }
  }

  assert.deepEqual(
    referrers,
    [],
    `The register sweep is finished, so src/lib/i18n/pendingRegisterSweep.ts has done ` +
      `its job and must go, along with this test and the gating in it. Still importing ` +
      `it: ${referrers.join(", ")}.`
  );
});

test("every overlay on disk belongs to a scope the allowlist can name", () => {
  const unnamed = audited.filter((entry) => entry.scope === "other").map((entry) => entry.relative);
  assert.deepEqual(
    unnamed,
    [],
    `sweepScope cannot place ${unnamed.join(", ")}, so those overlays can be neither ` +
      `exempted nor swept as a unit. Teach sweepScope where they live.`
  );
});

function sourceFiles(dir: string, into: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) sourceFiles(path, into);
    else if (/\.(ts|tsx|mjs|js)$/.test(entry.name)) into.push(path);
  }
  return into;
}
