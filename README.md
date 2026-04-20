# Digvijay Portfolio

Premium full-stack portfolio rebuilt as a production-style monorepo with a dedicated `frontend/` and `backend/`.

The old static HTML portfolio has been replaced with:

- `frontend/`: Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion, GSAP, Zustand, shadcn/ui
- `backend/`: Express.js, MongoDB-ready content system, GitHub integration, Nodemailer contact API
- `shared/`: central portfolio content source used by the backend and synced into the frontend fallback layer

## Live References

- Current portfolio: `https://dsc-portfolio-website.netlify.app/`
- GitHub: `https://github.com/chauhandigvijay1`
- Main repository: `https://github.com/chauhandigvijay1/web-dev-journey`

## What is Included

- Cinematic hero section with rotating roles and subtle GSAP motion
- Editorial about section with education, journey, and interactive timeline
- Clickable stack explorer that maps technologies to projects and implemented features
- Premium case-study treatment for:
  - JobPilot AI
  - DsSyncHub
  - DevFlow AI
- GitHub activity section powered by the backend
- Contact form API with validation, rate limiting, optional MongoDB storage, and Nodemailer delivery
- Dark/light theming with persistence
- Command palette navigation
- SEO metadata, `sitemap.xml`, and `robots.txt`

## Project Structure

```text
.
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── scripts/
│   │   ├── services/
│   │   └── utils/
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── assets/
│   ├── scripts/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── data/
│   │   ├── lib/
│   │   ├── store/
│   │   └── types/
│   └── .env.example
└── shared/
    └── portfolio-content.json
```

## Content System

`shared/portfolio-content.json` is the main content source for the portfolio.

- The backend reads it directly and can seed MongoDB from it.
- The frontend mirrors it into `frontend/src/data/portfolio-fallback.json` via:

```bash
cd frontend
npm.cmd run sync:content
```

This sync also runs automatically before `dev`, `build`, and `lint`.

## Local Setup

### 1. Install backend dependencies

```bash
cd backend
npm.cmd install
```

### 2. Install frontend dependencies

```bash
cd frontend
npm.cmd install
```

### 3. Create environment files

Backend:

```bash
cd backend
Copy-Item .env.example .env
```

Frontend:

```bash
cd frontend
Copy-Item .env.example .env.local
```

### 4. Start the backend

```bash
cd backend
npm.cmd run dev
```

### 5. Start the frontend

```bash
cd frontend
npm.cmd run dev
```

Frontend runs on `http://localhost:3000`

Backend runs on `http://localhost:5000`

## Environment Variables

### Frontend

`frontend/.env.example`

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

### Backend

`backend/.env.example`

```env
PORT=5000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:3000
MONGODB_URI=
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
MAIL_FROM=
MAIL_TO=chauhandigvijay669@gmail.com
GITHUB_USERNAME=chauhandigvijay1
GITHUB_TOKEN=
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
CONTACT_RATE_LIMIT_MAX=5
```

## Backend API

Base URL: `http://localhost:5000/api`

- `GET /health`
- `GET /content/site`
- `GET /content/profile`
- `GET /content/highlights`
- `GET /content/timeline`
- `GET /content/projects`
- `GET /content/projects/:slug`
- `GET /content/technologies`
- `GET /content/technologies/:slug`
- `GET /content/certifications`
- `GET /content/contact`
- `GET /github/summary`
- `POST /contact`

## MongoDB Seeding

If `MONGODB_URI` is configured, seed the portfolio content with:

```bash
cd backend
npm.cmd run seed
```

If MongoDB is not configured, the API still runs using the seed content in `shared/portfolio-content.json`.

## Deployment Guide

### Frontend on Vercel

- Import the repository in Vercel
- Set root directory to `frontend`
- Add environment variables:
  - `NEXT_PUBLIC_SITE_URL=https://your-domain.com`
  - `NEXT_PUBLIC_API_BASE_URL=https://your-render-backend.onrender.com`
- Build command: `npm.cmd run build`
- Install command: `npm.cmd install`

### Backend on Render

- Create a new Web Service
- Set root directory to `backend`
- Install command: `npm.cmd install`
- Start command: `npm.cmd run start`
- Add environment variables from `backend/.env.example`
- Set `CLIENT_ORIGIN` to the deployed frontend URL

## Verification

Validated during implementation:

- `frontend`: `npm.cmd run lint`
- `frontend`: `npm.cmd run build`
- `backend`: live smoke test against `/api/health` and `/api/content/site`

Not covered in an automated browser session:

- pixel-level visual QA across devices
- form delivery with real SMTP credentials
- production GitHub contribution calendar with a live `GITHUB_TOKEN`
