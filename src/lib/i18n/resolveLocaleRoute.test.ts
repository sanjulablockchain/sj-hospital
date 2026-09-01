import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveLocaleRoute } from "./resolveLocaleRoute.ts";

test("an already-prefixed path is served as it stands", () => {
  assert.deepEqual(resolveLocaleRoute("/si/contact-us", undefined), { kind: "pass" });
  assert.deepEqual(resolveLocaleRoute("/ta", "si"), { kind: "pass" });
});

// No cookie means no opinion, so English is served from the bare URL. This is
// the branch every crawler takes, which is why it must never be a redirect.
test("no cookie serves English without changing the URL", () => {
  assert.deepEqual(resolveLocaleRoute("/contact-us", undefined), {
    kind: "rewrite",
    pathname: "/en/contact-us",
  });
  assert.deepEqual(resolveLocaleRoute("/", undefined), {
    kind: "rewrite",
    pathname: "/en",
  });
});

test("a remembered choice redirects to that locale", () => {
  assert.deepEqual(resolveLocaleRoute("/contact-us", "si"), {
    kind: "redirect",
    pathname: "/si/contact-us",
  });
  assert.deepEqual(resolveLocaleRoute("/", "ta"), {
    kind: "redirect",
    pathname: "/ta",
  });
});

test("a cookie saying English serves English, without redirecting", () => {
  assert.deepEqual(resolveLocaleRoute("/contact-us", "en"), {
    kind: "rewrite",
    pathname: "/en/contact-us",
  });
});

test("a junk cookie is ignored rather than trusted", () => {
  for (const junk of ["", "fr", "EN", "en-US", "../etc", "si;ta"]) {
    assert.deepEqual(
      resolveLocaleRoute("/contact-us", junk),
      { kind: "rewrite", pathname: "/en/contact-us" },
      `cookie ${junk} must fall back to English`
    );
  }
});

// /en/... is reachable by hand and would otherwise serve the same page at two
// URLs, which splits its search ranking.
test("an explicit /en URL redirects to the canonical bare path", () => {
  assert.deepEqual(resolveLocaleRoute("/en/contact-us", undefined), {
    kind: "redirect",
    pathname: "/contact-us",
  });
  assert.deepEqual(resolveLocaleRoute("/en", undefined), {
    kind: "redirect",
    pathname: "/",
  });
});

// The property that matters most: following the redirects must always stop.
// Chains are allowed and one real case produces one: /en with a Sinhala cookie
// goes /en -> / -> /si, which is correct behaviour, not a loop. What must never
// happen is a chain that fails to terminate.
test("following redirects always terminates", () => {
  const paths = ["/", "/contact-us", "/services/cardiology", "/en", "/en/services", "/si", "/si/x"];
  const cookies = [undefined, "en", "si", "ta", "junk"];

  for (const path of paths) {
    for (const cookie of cookies) {
      const seen = new Set([path]);
      let current = path;

      for (let hop = 0; hop < 5; hop += 1) {
        const action = resolveLocaleRoute(current, cookie);
        if (action.kind !== "redirect") break;

        assert.ok(
          !seen.has(action.pathname),
          `${path} with cookie ${cookie} redirects back to ${action.pathname}, a loop`
        );
        seen.add(action.pathname);
        current = action.pathname;
      }

      assert.notEqual(
        resolveLocaleRoute(current, cookie).kind,
        "redirect",
        `${path} with cookie ${cookie} was still redirecting after 5 hops`
      );
    }
  }
});

// The chain above, pinned explicitly so the two-hop case is a documented
// decision rather than an accident nobody noticed.
test("an explicit /en with a Sinhala cookie lands on Sinhala in two hops", () => {
  assert.deepEqual(resolveLocaleRoute("/en/contact-us", "si"), {
    kind: "redirect",
    pathname: "/contact-us",
  });
  assert.deepEqual(resolveLocaleRoute("/contact-us", "si"), {
    kind: "redirect",
    pathname: "/si/contact-us",
  });
});
