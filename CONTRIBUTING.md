# Contributing to IssueHub 3.0

Thanks for your interest in contributing! Here's what you need to know.

## Development Setup

1. Fork and clone the repo
2. Follow the setup steps in [README.md](./README.md#getting-started)
3. Create a branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Project Layout

This is a two-package repo with no shared tooling:

- **`backend/`** — Express + Mongoose (CommonJS, `require`/`module.exports`)
- **`frontend/`** — React + Vite + Tailwind v4 (ESM, `import`/`export`)

Each package has its own `package.json` and `node_modules`. Run commands from the respective directory.

## Making Changes

### Backend

- Entry point is `server.js` → `src/app.js`
- Routes go in `src/routes/`, controllers in `src/controllers/`
- Models use Mongoose schemas in `src/models/`
- Wrap async route handlers with the `asyncHandler` utility from `src/utils/asyncHandler.js`
- Auth-protected routes use the `protect` middleware from `src/middleware/authMiddleware.js`
- Keep the CORS whitelist in `src/app.js` up to date if adding new frontend URLs

### Frontend

- Pages go in `src/pages/`, reusable components in `src/components/`
- Global state is managed via React Context in `src/context/`
- API calls go through the shared axios instance in `src/services/api.js` (handles token injection and refresh)
- Styling uses Tailwind v4 — use utility classes, not CSS modules
- Theme tokens live in `src/styles.css` (dark mode is default, `.light` class toggles light mode)

## Code Style

There is no linter or formatter configured. When making changes, follow the existing patterns:

- **Backend**: CommonJS (`require`), 2-space indentation, semicolons
- **Frontend**: ESM (`import`), 2-space indentation, JSX with double quotes
- Keep functions small and focused
- Name files in camelCase for JS (`buildGithubQuery.js`) and PascalCase for JSX components (`IssueCard.jsx`)

## Commit Messages

Use clear, descriptive commit messages:

```
add bookmark toggle to issue cards
fix JWT refresh loop on expired tokens
update CORS whitelist for staging URL
```

No strict format required — just be concise and say what changed.

## Testing

There is no test suite. Verify changes manually:

1. Start the backend (`npm run dev` from `backend/`)
2. Start the frontend (`npm run dev` from `frontend/`)
3. Test your changes in the browser and/or via API calls with a tool like curl or Postman

## Pull Requests

1. Keep PRs focused — one feature or fix per PR
2. Describe what changed and why in the PR description
3. Include screenshots for UI changes
4. Make sure the app runs without errors before submitting

## Reporting Issues

Open an issue on GitHub with:

- A clear title and description
- Steps to reproduce (if it's a bug)
- Expected vs actual behavior
- Screenshots if applicable
