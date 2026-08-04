# Docker support for SJ Hospital

Date: 2026-08-04

## Purpose

Add Docker support to the SJ Hospital Next.js app for two goals:
1. A production-ready, minimal Docker image for deploying the built app.
2. A docker-compose based dev environment so `npm run dev` behaves identically on any machine, with hot reload.

## Context

- Next.js 16.2.11 App Router, React 19, TypeScript, Tailwind v4. No `tailwind.config.js` (CSS-first config).
- No database or other backing service exists today. The only external dependency is SMTP (via `nodemailer`) for the contact form, configured through `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, and `CONTACT_TO_EMAILS` in `.env.local` (see `.env.local.example`). None of these are `NEXT_PUBLIC_*`, so they're server-only and safe to inject at container runtime rather than at build time.
- `next.config.ts` currently has no options set. Per Next.js's own deployment docs (`node_modules/next/dist/docs/01-app/01-getting-started/17-deploying.md` and `.../02-guides/self-hosting.md`), Docker deployments should use `output: "standalone"` to produce a minimal, self-contained `.next/standalone` output — this is required for the production image design below.
- Next.js 16 requires `node >= 20.9.0` (from `next`'s own `package.json` `engines` field).
- This is a single-container deployment (no Kubernetes / multi-instance concerns), so multi-server cache coordination, `deploymentId`, and shared cache handlers from the self-hosting guide are explicitly out of scope.

## Architecture

A single multi-stage `Dockerfile` with four stages, plus two docker-compose files selecting different stages for different purposes:

```
base (node:22-alpine)
 └─ deps      npm ci
     ├─ dev      copy source, CMD npm run dev         (used by docker-compose.dev.yml)
     └─ builder  copy source, npm run build
         └─ runner   copy standalone output only, non-root, CMD node server.js   (used by docker-compose.yml)
```

- `node:22-alpine` satisfies the `>=20.9.0` engine requirement while tracking current Node LTS.
- Runtime env vars (`SMTP_*`, `CONTACT_TO_EMAILS`) are supplied via `env_file: .env.local` in both compose files — never baked into the image, so the same image can be promoted across environments with different values (per Next.js self-hosting guidance).

## Files to add/change

### `next.config.ts`
Add `output: "standalone"`.

### `Dockerfile` (new)
- `base`: `FROM node:22-alpine`, sets `WORKDIR /app`.
- `deps`: copies `package.json` + `package-lock.json`, runs `npm ci`.
- `dev`: `FROM base`, copies `deps`'s `node_modules`, copies full source, `EXPOSE 3000`, `CMD ["npm", "run", "dev"]`. Never runs standalone in production — `docker-compose.dev.yml` bind-mounts the repo over this image's source so edits hot-reload.
- `builder`: `FROM base`, copies `deps`'s `node_modules` + full source, runs `npm run build`.
- `runner`: fresh `FROM base` (not derived from `builder`, to stay minimal), creates a non-root `nextjs` user/group, copies only `.next/standalone`, `.next/static` (into `.next/static`), and `public/` from `builder`, sets `ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0`, `EXPOSE 3000`, runs as `nextjs`, `CMD ["node", "server.js"]`.

### `.dockerignore` (new)
Excludes `node_modules`, `.next`, `.git`, `.env*` (except `.env.local.example`), `docs/`, `*.md`, and other non-runtime files.

### `docker-compose.yml` (new — production)
One `web` service: `build: { context: ., target: runner }`, `ports: ["3000:3000"]`, `env_file: .env.local`, `restart: unless-stopped`.

### `docker-compose.dev.yml` (new — development)
One `web` service: `build: { context: ., target: dev }`, bind-mounts `.:/app`, anonymous volume on `/app/node_modules` (so the container's own installed modules aren't shadowed by the host bind mount), `ports: ["3000:3000"]`, `env_file: .env.local`. Run via `docker compose -f docker-compose.dev.yml up`.

### `CLAUDE.md`
Add the Docker commands to the existing "Commands" section so they're discoverable alongside `npm run dev`/`build`/`start`.

## Out of scope

- No database/cache/mail-catcher service — none exists in the app today; adding one would be speculative.
- No reverse proxy/nginx config — left to whatever infra ultimately hosts the container, per Next.js's own self-hosting guide.
- No CI pipeline or registry push wiring.
- No multi-instance/Kubernetes concerns (shared cache handler, `deploymentId`, encryption key pinning) — single-container deploy only.

## Testing plan

- `docker build --target runner -t sj-hospital:prod .` then `docker compose up` — verify the site loads at `localhost:3000` and the contact form still sends mail (using real or test SMTP credentials in `.env.local`).
- `docker compose -f docker-compose.dev.yml up` — edit a page file on the host and confirm hot reload works inside the container.
- `npm run build` locally (outside Docker) still succeeds with `output: "standalone"` added, and `npm run lint` remains clean.
