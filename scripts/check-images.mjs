#!/usr/bin/env node
// Enforces the image rules in CLAUDE.md.
//
//   npm run check:images
//
// 1. Size: every raster file under public/images (and the app icons in
//    src/app) is at most 300 KB, every SVG at most 50 KB.
// 2. No raw <img>: images render through next/image.
// 3. No external images: no string under src points an image at another
//    domain, and next.config.ts declares no remote image patterns. The one
//    approved exception is the OpenStreetMap tile server behind the Leaflet
//    map on the contact page.
//
// Exits 1 and lists every problem.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import ts from "typescript";

const ROOT = join(import.meta.dirname, "..");
const RASTER_LIMIT = 300 * 1024;
const SVG_LIMIT = 50 * 1024;
const RASTER = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif", ".ico"]);
const ALLOWED_HOSTS = ["tile.openstreetmap.org"];
const IMAGE_URL = /^(https?:)?\/\/[^\s"'`]+\.(png|jpe?g|webp|avif|gif|svg|ico)(\?[^\s"'`]*)?$/i;

const rel = (path) => relative(ROOT, path).replaceAll("\\", "/");
const problems = [];

function* walk(dir, match) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path, match);
    else if (match(entry.name)) yield path;
  }
}

// 1. Size.
const imageFiles = [
  ...walk(join(ROOT, "public", "images"), () => true),
  ...readdirSync(join(ROOT, "src", "app"))
    .filter((name) => RASTER.has(extname(name).toLowerCase()) || extname(name) === ".svg")
    .map((name) => join(ROOT, "src", "app", name)),
];
for (const file of imageFiles) {
  const ext = extname(file).toLowerCase();
  const size = statSync(file).size;
  const limit = ext === ".svg" ? SVG_LIMIT : RASTER.has(ext) ? RASTER_LIMIT : null;
  if (limit === null) continue;
  if (size > limit) {
    problems.push(`${rel(file)}  ${Math.round(size / 1024)} KB, over the ${limit / 1024} KB limit`);
  }
}

// 2 and 3. Source.
const isAllowed = (url) => ALLOWED_HOSTS.some((host) => url.includes(host));
for (const file of walk(join(ROOT, "src"), (name) => /\.tsx?$/.test(name) && !/\.test\.tsx?$/.test(name))) {
  const source = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
  const at = (node) => `${rel(file)}:${source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1}`;
  const visit = (node) => {
    if ((ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) && node.tagName.getText() === "img") {
      problems.push(`${at(node)}  raw <img>, render it with next/image`);
    }
    if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) && IMAGE_URL.test(node.text.trim())) {
      if (!isAllowed(node.text)) problems.push(`${at(node)}  external image ${node.text.trim()}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
}

const nextConfig = readFileSync(join(ROOT, "next.config.ts"), "utf8");
if (/remotePatterns|domains\s*:/.test(nextConfig)) {
  problems.push("next.config.ts  declares remote image sources; images must be served from public/images");
}

if (problems.length) {
  console.error(problems.join("\n"));
  console.error(`\n${problems.length} image problem(s).`);
  process.exit(1);
}
console.log(`check:images: ${imageFiles.length} files within limits, no raw <img>, no external images.`);
