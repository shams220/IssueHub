# IssueHub 3.0

A GitHub issue discovery platform that helps developers find and track open-source issues to contribute to. Search by language, difficulty, topic, or repository — then bookmark issues you want to tackle.

## Features

- **GitHub Issue Search** — full-text search with filters for language, difficulty level, and topic tags
- **Trending Issues** — curated list of beginner-friendly issues sorted by activity
- **Bookmarking** — save issues to your account and track them over time
- **AI Issue Explainer** — get a plain-English breakdown of what an issue is about and how to approach it
- **OAuth Login** — sign in with GitHub or Google, or create a local account
- **Responsive UI** — works on desktop and mobile with a collapsible sidebar

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS v4, React Router |
| Backend | Express.js, MongoDB (Mongoose), JWT auth |
| External | GitHub REST API (search issues) |
| Hosting | Vercel (frontend), Render (backend), MongoDB Atlas (database) |

## Project Structure

```
IssueHub3.0/
├── backend/
│   ├── server.js              # Entry point
│   ├── src/
│   │   ├── app.js             # Express setup, CORS, routes
│   │   ├── config/db.js       # MongoDB connection
│   │   ├── controllers/       # Route handlers
│   │   ├── middleware/         # Auth, error handling, validation
│   │   ├── models/            # User, Bookmark (Mongoose schemas)
│   │   ├── routes/            # API route definitions
│   │   ├── services/          # GitHub API proxy
│   │   └── utils/             # Query builder, token generator, helpers
│   └── .env.example
└── frontend/
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── main.jsx           # App entry
        ├── App.jsx
        ├── routes/            # Route definitions + protected routes
        ├── pages/             # Home, ExploreIssues, SavedIssues, Dashboard, Login, Register
        ├── components/        # Navbar, Sidebar, IssueCard, SearchBar, FilterSidebar, etc.
        ├── context/           # Auth, Bookmark, Filter, Theme, Progress providers
        ├── services/api.js    # Axios instance with token refresh
        ├── layouts/           # MainLayout (sidebar + content)
        └── styles.css         # Tailwind v4 theme tokens
```

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB Atlas connection string (or local MongoDB)
- A GitHub personal access token (optional, but raises API rate limits from 10 to 30 req/min)

### Backend Setup

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your values:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_random_secret_string
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
GITHUB_TOKEN=your_github_token   # optional
```

```bash
npm install
npm run dev
```

The API starts at `http://localhost:5000`.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app starts at `http://localhost:5173`. It automatically connects to the backend at `localhost:5000` in development.

## API Routes

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Create account | No |
| POST | `/api/auth/login` | Email/password login | No |
| POST | `/api/auth/logout` | Invalidate session | Yes |
| POST | `/api/auth/refresh` | Refresh access token | Yes |
| GET | `/api/issues` | Search GitHub issues | No |
| GET | `/api/issues/trending` | Beginner-friendly issues | No |
| GET | `/api/issues/:id` | Single issue by ID | No |
| GET | `/api/bookmarks` | List saved bookmarks | Yes |
| POST | `/api/bookmarks` | Save an issue | Yes |
| DELETE | `/api/bookmarks/:id` | Remove a bookmark | Yes |
| GET | `/api/user/profile` | Get current user | Yes |
| POST | `/api/ai/explain-issue` | AI breakdown of an issue | No |

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Server port (default: 5000) |
| `MONGO_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret for signing JWTs |
| `JWT_EXPIRES_IN` | No | Token expiry (default: 7d) |
| `CLIENT_URL` | No | Frontend URL for CORS |
| `GITHUB_TOKEN` | No | GitHub PAT for higher API limits |

Frontend env:

| Variable | Description |
|---|---|
| `VITE_API_URL` | Override API base URL (auto-detected if omitted) |

## License

ISC
