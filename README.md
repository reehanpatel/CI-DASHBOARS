# CI360 — Productivity Intelligence Suite

A full-stack productivity tracker: **Node.js + Express backend** (`/backend`), **MongoDB** (via Mongoose) for storage, **JWT-based login**, and a **Vite-powered web frontend** (`/web`) with role-based dashboards — Super Admin, Employee, and Client.

## What's included

- **Auth**: email/password login, bcrypt-hashed passwords, JWT sessions (12h expiry).
- **Roles**:
  - **Super Admin** — full control: manage personnel, clients, services, users/logins, log & edit any job, manage the account/role roster, set throughput targets, manage salary grade bands, and view company-wide dashboards.
  - **Employee** — sees their own utilization/workload dashboard, logs jobs, edits/deletes self-logged jobs, and tracks targets.
  - **Client** — read-only portal scoped to their own account.
- **MongoDB models**: `User`, `Personnel`, `Client`, `Service`, `Job`, `Roster`, `Target`, `SalaryGrade`, `SalaryAssignment`.

## Project Structure

```
ci360/
├── package.json         # Root orchestration (dev, build, start, seed)
├── backend/             # Express API Server & Database
│   ├── package.json
│   ├── server.js        # Express app entry point
│   ├── config/          # Mongoose DB connection
│   ├── middleware/      # Auth & role guards
│   ├── models/          # Mongoose schemas
│   ├── routes/          # REST API endpoints
│   └── utils/           # Data aggregation helpers
└── web/                 # Vite Web Application
    ├── package.json
    ├── vite.config.js   # Vite server & API proxy config
    ├── index.html       # Entry landing page
    ├── login.html       # Authentication screen
    ├── admin.html       # Super Admin dashboard
    ├── employee.html    # Employee dashboard
    ├── client.html      # Client portal
    └── src/
        ├── css/style.css
        └── js/          # Frontend logic (api, admin, employee, client)
```

## Prerequisites

- Node.js 18+
- MongoDB connection string (local or MongoDB Atlas)

## Setup

```bash
cd ci360
npm install --prefix backend
npm install --prefix web
npm install
```

Copy `.env.example` to `.env` and fill in your credentials.

## Seed baseline data

```bash
npm run seed
```

## Local Development

Run both the **Node backend (port 4000)** and **Vite frontend (port 3000)** concurrently:

```bash
npm run dev
```

Visit `http://localhost:3000` to open the app. The Vite dev server proxies all `/api/*` requests to the Express backend on port 4000.

## Production Build & Run

```bash
npm run build
npm run start
```

Serves the compiled frontend from `web/dist` via Express on port 4000.
