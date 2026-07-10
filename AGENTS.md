# IssueHub 3.0

GitHub issue discovery platform. Two independent packages — no monorepo tooling, no shared build.

## Structure

- `backend/` — Express + MongoDB (Mongoose), CommonJS (`require`)
- `frontend/` — React + Vite + Tailwind CSS v4, ESM (`import`)

## Running locally

**Backend** (from `backend/`):
```
cp .env.example .env   # fill in MONGO_URI and JWT_SECRET
npm install
npm run dev             # nodemon on port 5000
```

**Frontend** (from `frontend/`):
```
npm install
npm run dev             # Vite dev server on port 5173
```

The frontend auto-detects the API base URL: `http://localhost:5000/api` in dev, `https://issuehub-euyj.onrender.com/api` in prod. Override with `VITE_API_URL`.

## Backend entry flow

`server.js` → loads dotenv → connects MongoDB → starts Express on `PORT` (default 5000).

API routes in `src/app.js`:
- `/api/auth` — register, login, logout, refresh, OAuth callback
- `/api/issues` — search GitHub issues (proxied through `githubService.js`)
- `/api/bookmarks` — save/unlist user bookmarks (MongoDB)
- `/api/user` — user profile
- `/api/ai` — mock AI issue explainer (no real LLM integration)

Auth is JWT-based. `authMiddleware.js` extracts Bearer token → verifies → attaches `req.user`. The frontend stores the token in `localStorage` and sends it via an axios interceptor.

## Frontend structure

- `src/services/api.js` — single axios instance; handles token injection and 401 refresh automatically
- `src/context/AppProviders.jsx` — provider nesting order: Theme → Auth → Bookmark → Progress → Filter
- `src/routes/AppRoutes.jsx` — `/login`, `/register`, `/auth/callback` are outside the main layout; `/`, `/explore`, `/saved`, `/dashboard` are inside `MainLayout`
- Styling uses Tailwind v4 via `@tailwindcss/vite` plugin; theme tokens defined in `src/styles.css` (dark default, `.light` class toggles light mode)

## Key gotchas

- **All dependencies are pinned to `"latest"`** — no lockfile consistency guarantees across installs.
- **No tests, no linter, no formatter, no CI** — there is no automated quality gate. Changes are verified manually.
- **GitHub API caching is in-memory only** (`Map` in `githubService.js`, 60s TTL). Cache is lost on server restart.
- **Rate limiting**: 100 requests / 15 min per IP (`express-rate-limit` in `src/app.js`).
- **CORS whitelist** is hardcoded in `src/app.js` — must update if adding new frontend deploy targets.
- **Custom cookie parser** in `app.js` (lines 45–61) — does not use the `cookie-parser` library.
- **User model** supports `local`, `github`, and `google` auth providers. The `password` field is conditionally hashed (skipped for OAuth users).
- **Bookmark uniqueness** enforced by compound index on `(githubIssueId, savedBy)`.
- **Tailwind v4** — uses `@import "tailwindcss"` and `@theme` directive in CSS, not the old `tailwind.config.js` approach.
- **No `opencode.json`** — no repo-level agent config beyond this file.
