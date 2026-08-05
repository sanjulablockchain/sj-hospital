# Docker Support Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Docker support to the SJ Hospital Next.js app: a minimal production image and a docker-compose dev environment with hot reload.

**Architecture:** One multi-stage `Dockerfile` (`base` → `deps` → `dev` / `builder` → `runner`), selected by two docker-compose files — `docker-compose.yml` builds the `runner` target for production, `docker-compose.dev.yml` builds the `dev` target and bind-mounts source for hot reload. `next.config.ts` gains `output: "standalone"` so the `runner` stage can copy only the minimal `.next/standalone` output.

**Tech Stack:** Docker, Docker Compose, Node 22 (alpine), Next.js 16 standalone output.

## Global Constraints

- Node version floor: `>=20.9.0` (Next.js 16's own `engines` field) — use `node:22-alpine` as the base image.
- `output: "standalone"` is required in `next.config.ts` for the production image to work at all.
- Runtime env vars (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `CONTACT_TO_EMAILS`) are injected via `env_file: .env.local` in both compose files — never baked into the image at build time.
- The production (`runner`) image runs as a non-root user.
- Out of scope: no database/cache/mail-catcher service, no reverse proxy/nginx config, no CI/registry pipeline, no multi-instance/Kubernetes cache coordination.
- Spec reference: `docs/superpowers/specs/2026-08-04-docker-design.md`.

---

### Task 1: Enable standalone output in `next.config.ts`

**Files:**
- Modify: `next.config.ts`

**Interfaces:**
- Produces: a `.next/standalone/` directory after `npm run build`, containing `server.js` — this is what Task 3's `runner` stage copies.

- [ ] **Step 1: Edit `next.config.ts` to add `output: "standalone"`**

Replace the full file content:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
};

export default nextConfig;
```

- [ ] **Step 2: Verify the app still builds and produces standalone output**

Run: `npm run build`

Expected: build succeeds, and `.next/standalone/server.js` exists. Confirm with:

`node -e "require('fs').accessSync('.next/standalone/server.js')"` (no output = file exists; throws if missing)

- [ ] **Step 3: Commit**

```bash
git add next.config.ts
git commit -m "Enable standalone output for Docker production builds"
```

---

### Task 2: Add Dockerfile and .dockerignore

**Files:**
- Create: `Dockerfile`
- Create: `.dockerignore`

**Interfaces:**
- Consumes: `.next/standalone/server.js` (from Task 1, produced inside the `builder` stage during image build — not from the host).
- Produces: two buildable image targets, `dev` and `runner`, that Tasks 3 and 4's compose files reference by name (`target: dev`, `target: runner`).

- [ ] **Step 1: Create `.dockerignore`**

```
node_modules
.next
.git
.gitignore
npm-debug.log*
.env*
!.env.local.example
docs
*.md
.vscode
.DS_Store
Dockerfile
docker-compose*.yml
.dockerignore
```

- [ ] **Step 2: Create `Dockerfile`**

```dockerfile
# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS dev
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM base AS builder
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next && chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

- [ ] **Step 3: Build the `runner` target and verify it succeeds**

Run: `docker build --target runner -t sj-hospital:prod .`

Expected: build completes with no errors, ending in something like `naming to docker.io/library/sj-hospital:prod`.

- [ ] **Step 4: Run the production image and verify the app responds**

Run:
```bash
docker run --rm -d --name sj-hospital-prod-test -p 3000:3000 --env-file .env.local sj-hospital:prod
sleep 3
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000
docker stop sj-hospital-prod-test
```

Expected: the `curl` line prints `200`.

- [ ] **Step 5: Build the `dev` target and verify it succeeds**

Run: `docker build --target dev -t sj-hospital:dev .`

Expected: build completes with no errors.

- [ ] **Step 6: Commit**

```bash
git add Dockerfile .dockerignore
git commit -m "Add multi-stage Dockerfile for dev and production images"
```

---

### Task 3: Add production docker-compose.yml

**Files:**
- Create: `docker-compose.yml`

**Interfaces:**
- Consumes: the `runner` target defined in Task 2's `Dockerfile`.

- [ ] **Step 1: Create `docker-compose.yml`**

```yaml
services:
  web:
    build:
      context: .
      target: runner
    ports:
      - "3000:3000"
    env_file:
      - .env.local
    restart: unless-stopped
```

- [ ] **Step 2: Verify it builds and serves the app**

Run:
```bash
docker compose up --build -d
sleep 3
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000
docker compose down
```

Expected: the `curl` line prints `200`.

- [ ] **Step 3: Commit**

```bash
git add docker-compose.yml
git commit -m "Add production docker-compose configuration"
```

---

### Task 4: Add development docker-compose.dev.yml

**Files:**
- Create: `docker-compose.dev.yml`

**Interfaces:**
- Consumes: the `dev` target defined in Task 2's `Dockerfile`.

- [ ] **Step 1: Create `docker-compose.dev.yml`**

```yaml
services:
  web:
    build:
      context: .
      target: dev
    ports:
      - "3000:3000"
    env_file:
      - .env.local
    volumes:
      - .:/app
      - /app/node_modules
```

- [ ] **Step 2: Verify it builds and serves the app**

Run:
```bash
docker compose -f docker-compose.dev.yml up --build -d
sleep 3
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000
```

Expected: the `curl` line prints `200`.

- [ ] **Step 3: Verify hot reload works via a bind-mounted edit**

Run: append a harmless whitespace line to `src/app/page.tsx` (or the site's home page file), then:
```bash
docker compose -f docker-compose.dev.yml logs --tail=20 web
```

Expected: logs show Next.js recompiling (e.g. a line containing `Compiled` or `✓ Compiled`) shortly after the file save — confirming the bind mount and hot reload work. Revert the whitespace edit afterward.

- [ ] **Step 4: Tear down**

Run: `docker compose -f docker-compose.dev.yml down`

- [ ] **Step 5: Commit**

```bash
git add docker-compose.dev.yml
git commit -m "Add development docker-compose configuration with hot reload"
```

---

### Task 5: Document Docker commands in CLAUDE.md

**Files:**
- Modify: `CLAUDE.md` (the `## Commands` section)

**Interfaces:**
- None — documentation only.

- [ ] **Step 1: Add Docker commands below the existing npm commands block**

In `CLAUDE.md`, the current `## Commands` section reads:

```bash
npm run dev     # dev server → http://localhost:3000
npm run build   # production build
npm start       # serve the production build
npm run lint    # ESLint (flat config: eslint.config.mjs)
```

Replace it with:

```bash
npm run dev     # dev server → http://localhost:3000
npm run build   # production build
npm start       # serve the production build
npm run lint    # ESLint (flat config: eslint.config.mjs)

# Docker
docker compose -f docker-compose.dev.yml up --build   # containerized dev server with hot reload → http://localhost:3000
docker compose up --build                              # containerized production build + serve → http://localhost:3000
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "Document Docker commands in CLAUDE.md"
```
