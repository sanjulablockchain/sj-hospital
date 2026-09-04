import { readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

/**
 * Every translation overlay on disk, found by walking `src` recursively.
 *
 * One definition of "every overlay", shared by `scripts/i18n-status.mjs` (the
 * pre-merge review gate) and by the tests that check overlays mechanically, so
 * the gate and the suite cannot drift apart about what exists. The gate used
 * to keep its own list: a non-recursive read of each feature's own
 * `data` directory plus two hardcoded chrome paths, which meant an overlay one
 * directory deeper, or beside `data/` instead of inside it, was absent from
 * the report and `--require-reviewed` passed with unread drafts on disk.
 *
 * The naming convention is the whole contract: an overlay is any file called
 * `<base>.si.ts` or `<base>.ta.ts` (or `.tsx`) anywhere under `src`, and its
 * English source is `<base>.ts` beside it.
 */

const HERE = fileURLToPath(new URL(".", import.meta.url));
/** The repository root: this file lives at `src/lib/i18n/overlayFiles.ts`. */
export const REPO_ROOT = resolve(HERE, "..", "..", "..");
export const SRC_DIR = join(REPO_ROOT, "src");

const OVERLAY_NAME = /^(.*)\.(si|ta)\.tsx?$/;

export type OverlayFile = {
  /** Absolute path to the overlay. */
  readonly path: string;
  /** Repository-relative path with forward slashes, stable across platforms. */
  readonly relative: string;
  /** Absolute path to the English module the overlay translates. */
  readonly basePath: string;
  /** Repository-relative path of the English module. */
  readonly baseRelative: string;
  readonly locale: "si" | "ta";
};

/** Repository-relative, forward-slashed, so messages read the same everywhere. */
export function toRelative(path: string): string {
  return relative(REPO_ROOT, path).split("\\").join("/");
}

/** A `file://` URL, which is what `import()` needs for an absolute Windows path. */
export function toImportUrl(path: string): string {
  return pathToFileURL(path).href;
}

function walk(dir: string, into: string[]): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path, into);
    else if (OVERLAY_NAME.test(entry.name)) into.push(path);
  }
  return into;
}

/** Every overlay under `src`, sorted by path so output and failures are stable. */
export function overlayFiles(): OverlayFile[] {
  return walk(SRC_DIR, [])
    .map((path) => {
      const name = OVERLAY_NAME.exec(path.split("\\").join("/").split("/").pop() as string);
      const locale = (name as RegExpExecArray)[2] as "si" | "ta";
      const basePath = path.replace(/\.(si|ta)\.tsx?$/, ".ts");
      return {
        path,
        relative: toRelative(path),
        basePath,
        baseRelative: toRelative(basePath),
        locale,
      };
    })
    .sort((a, b) => a.relative.localeCompare(b.relative));
}

/**
 * The `__review` marker of one overlay, read by importing the module rather
 * than by pattern-matching its source.
 *
 * Importing is what makes the answer honest: the gate's old regex read raw
 * source text, so a comment reading `// status: "reviewed" once a speaker
 * signs off` above `status: "draft"` reported the file as signed off, and so
 * did a sibling key named `prior_status`. Node strips the types in these files
 * natively, and they are plain data with no imports, so the exported value is
 * available directly and there is nothing left to fool.
 *
 * A file that cannot be imported, or that carries no marker, comes back as
 * `status: "unknown"`, which no caller treats as reviewed.
 */
export async function readReviewMarker(
  path: string
): Promise<{ status: string; reviewer: string | null; date: string | null }> {
  let marker: unknown;
  try {
    marker = (await import(toImportUrl(path))).__review;
  } catch {
    return { status: "unreadable", reviewer: null, date: null };
  }

  if (marker === null || typeof marker !== "object") {
    return { status: "unknown", reviewer: null, date: null };
  }

  const fields = marker as Record<string, unknown>;
  return {
    status: typeof fields.status === "string" ? fields.status : "unknown",
    reviewer: typeof fields.reviewer === "string" ? fields.reviewer : null,
    date: typeof fields.date === "string" ? fields.date : null,
  };
}

/**
 * Whether a marker is a genuine sign-off: a top-level `status` of exactly
 * `"reviewed"`, with a named reviewer. A sign-off with nobody's name on it is
 * not a sign-off, and the gate used to exit 0 on 78 overlays reading
 * `status: "reviewed", reviewer: null`.
 */
export function isSignedOff(marker: { status: string; reviewer: string | null }): boolean {
  return marker.status === "reviewed" && (marker.reviewer ?? "").trim() !== "";
}
