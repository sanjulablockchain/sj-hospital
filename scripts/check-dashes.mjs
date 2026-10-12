#!/usr/bin/env node
// Enforces the "no dash punctuation in visible text" rule in CLAUDE.md.
//
//   npm run check:dashes
//
// Parses every .ts / .tsx file under src with the TypeScript compiler and
// inspects only what can reach a reader: string literals, template literal
// text and JSX text. Comments and code are never looked at, so a hyphen in a
// comment, a class name or an import path is fine. Test files are skipped.
//
// Flags, in any of those strings:
//   * an em dash or en dash, as the literal character or any HTML entity
//     (`&mdash;`, `&ndash;`, `&#8212;`, `&#x2014;`, `&#8211;`, `&#x2013;`);
//   * a hyphen used as punctuation, i.e. surrounded by spaces (" - "),
//     except inside a CSS calc() or a className / style value.
//
// Exits 1 and lists file:line for every hit.

import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import ts from "typescript";

const ROOT = join(import.meta.dirname, "..");
const SRC = join(ROOT, "src");

const DASH_CHAR = /[–—]/;
const DASH_ENTITY = /&(mdash|ndash|#8212|#8211|#x2014|#x2013);/i;
// Spaces on both sides inside the one string. A template piece that is just
// "-" between two substitutions (`${a}-${b}`) is a joined id, not punctuation.
const SPACED_HYPHEN = /\s-\s/;
const CODE_ATTRIBUTES = new Set(["className", "style", "d", "viewBox", "points", "transform"]);

function* sourceFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* sourceFiles(path);
    else if (/\.tsx?$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name)) yield path;
  }
}

function insideCodeAttribute(node) {
  for (let n = node.parent; n; n = n.parent) {
    if (ts.isJsxAttribute(n)) return CODE_ATTRIBUTES.has(n.name.getText());
    if (ts.isPropertyAssignment(n) && ts.isObjectLiteralExpression(n.parent)) {
      const key = n.name.getText().replace(/["']/g, "");
      if (key === "className" || key === "style") return true;
    }
  }
  return false;
}

function isModuleSpecifier(node) {
  const p = node.parent;
  return (ts.isImportDeclaration(p) || ts.isExportDeclaration(p)) && p.moduleSpecifier === node;
}

function problem(text, node) {
  if (DASH_CHAR.test(text)) return "em or en dash";
  if (DASH_ENTITY.test(text)) return "dash entity";
  if (SPACED_HYPHEN.test(text) && !/calc\(/.test(text) && !insideCodeAttribute(node)) {
    return 'hyphen used as punctuation (" - ")';
  }
  return null;
}

const hits = [];
for (const file of sourceFiles(SRC)) {
  const source = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
  const visit = (node) => {
    let text = null;
    if (ts.isStringLiteral(node) && !isModuleSpecifier(node)) text = node.text;
    else if (ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateLiteralToken(node)) text = node.text;
    else if (ts.isJsxText(node)) text = node.text;
    if (text) {
      const why = problem(text, node);
      if (why) {
        const { line } = source.getLineAndCharacterOfPosition(node.getStart(source));
        const snippet = text.replace(/\s+/g, " ").trim().slice(0, 90);
        hits.push(`${relative(ROOT, file).replaceAll("\\", "/")}:${line + 1}  ${why}\n    ${snippet}`);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
}

if (hits.length) {
  console.error(hits.join("\n"));
  console.error(`\n${hits.length} dash punctuation problem(s) in visible text. Rewrite with a comma, colon, full stop or "and".`);
  process.exit(1);
}
console.log("check:dashes: no dash punctuation in visible text.");
