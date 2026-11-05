# CI360 Productivity Intelligence Suite
## Complete Technical Architecture & System Documentation

**Version:** 2.0.0  
**Environment:** Node.js (v18+) · Express.js · MongoDB (Mongoose) · Vite · Vanilla ES Modules  
**Architecture:** Monorepo (Express API Backend + Vite Web Client)

---

## Table of Contents
1. [System Architecture Overview](#1-system-architecture-overview)
2. [Database Schema & Data Models](#2-database-schema--data-models)
3. [REST API Endpoints Reference](#3-rest-api-endpoints-reference)
4. [Authentication & Authorization Framework](#4-authentication--authorization-framework)
5. [Real-time Polling & Synchronization Engine](#5-real-time-polling--synchronization-engine)
6. [Design System, Theming & Layout Spacing Standard](#6-design-system-theming--layout-spacing-standard)
7. [Subsystem Architecture](#7-subsystem-architecture)
   - 7.1 [Executive Dashboard & Capacity Intelligence](#71-executive-dashboard--capacity-intelligence)
   - 7.2 [Job Logging & Billable Split Engine](#72-job-logging--billable-split-engine)
   - 7.3 [Daily Planner & Task Kanban](#73-daily-planner--task-kanban)
   - 7.4 [Support Tickets & Jira Scrum System](#74-support-tickets--jira-scrum-system)
   - 7.5 [Proposal Studio & Rate Card Engine](#75-proposal-studio--rate-card-engine)
   - 7.6 [Accounts, Invoicing & GST Financials](#76-accounts-invoicing--gst-financials)
   - 7.7 [Team Chat, Lounge & Multiplayer Games Arena](#77-team-chat-lounge--multiplayer-games-arena)
8. [Production Build, Deployment & DevOps](#8-production-build-deployment--devops)

---

## 1. System Architecture Overview

CI360 operates as a high-performance, single-instance or distributed Node.js/Express service coupled with a pre-compiled Vite front-end. It provides role-based workspaces for **Super Admins**, **Admins**, **Employees**, and **Clients**.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             CLIENT BROWSERS                                 │
│       Desktop (Edge, Chrome, Safari, Firefox) · Tablets · Mobile Web        │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ HTTPS / WSS
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                             EXPRESS BACKEND                                 │
│  Port 4000 (Production entry: server.js -> backend/server.js)              │
│                                                                             │
│  ┌───────────────────────┐ ┌──────────────────────┐ ┌────────────────────┐  │
│  │    Auth Middleware    │ │   REST API Routes    │ │ Static File Server │  │
│  │ JWT Verify / RBAC     │ │ /api/* Endpoints     │ │ web/dist & uploads │  │
│  └───────────────────────┘ └──────────────────────┘ └────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                    Sync State & Notification Hub                      │  │
│  │        Last-Update In-Memory Timestamps & Notification Dispatch       │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ Mongoose ODM
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            MONGODB DATABASE                                 │
│  Collections: users, personnel, clients, services, jobs, tasks, tickets,    │
│  proposals, invoices, payments, bonding_channels, bonding_messages, matches │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Directory Structure
```
CIJOB/ci360/
├── package.json               # Root scripts (build, dev, start, seed)
├── server.js                  # Production entry point
├── docs/                      # Technical specs and user manuals
├── backend/                   # Node.js + Express API Server
│   ├── config/db.js           # MongoDB connection with Mongoose
│   ├── middleware/auth.js     # JWT verification & role authorization
│   ├── models/                # 21 Mongoose Data Schemas
│   ├── routes/                # 18 Modular Express Routers
│   ├── services/              # Business logic services
│   ├── utils/                 # Notification, time & math helpers
│   └── uploads/               # Ticket & invoice attachment storage
└── web/                       # Modern Frontend (Vite + Vanilla JS + CSS)
    ├── vite.config.js         # Build pipeline & development proxy
    ├── index.html             # Role router landing page
    ├── login.html             # Multi-tenant authentication screen
    ├── admin.html             # Superadmin & Admin Workspace
    ├── employee.html          # Employee Workspace
    ├── client.html            # Client Extranet Portal
    ├── accounts.html          # Financial Invoicing Dashboard
    ├── proposals.html         # Proposal Studio Workspace
    ├── proposal.html          # Client Proposal Review & Signoff
    ├── src/
    │   ├── css/               # style.css, tokens.css, supporttickets.css
    │   └── js/                # api.js, admin.js, employee.js, planner.js,
    │                          # supporttickets.js, proposals.js, teambonding.js
    └── dist/                  # Optimized production bundle
```

---

## 2. Database Schema & Data Models

The system maintains 21 core collections in MongoDB:

### 2.1 Core Identity & Operations
- **`User`**: System logins, email, bcrypt password hash, role (`superadmin`, `admin`, `employee`, `client`), status flag (`active`), personnel reference.
- **`Personnel`**: Staff directory, duties, employment dates, monthly hour capacity (default 160h/month), department assignment.
- **`Client`**: Client brand names, contact details, account managers, retainers, billing profiles, and project links.
- **`Service`**: Agency service offerings (Strategy, CS, Website, Design, Copy, Edit, Shoot, SEO, SMO, QC) with standard rates.
- **`Job`**: Work records tracking title, client ID, service IDs, date, completion status, value, and multi-employee percentage/hour splits.
- **`Roster`**: Staffing matrix mapping personnel to clients and ongoing assignments.
- **`SalaryGrade` & `SalaryAssignment`**: Confidential tier grades, pay scales, and personnel compensations (restricted strictly to Super Admin).

### 2.2 Task, Ticket & Project Workflow
- **`Task`**: Daily Planner tasks with title, priority (`Low`, `Medium`, `High`, `Urgent`), status (`Pending`, `In Progress`, `Review`, `Completed`), subtask checklist items, and assignees.
- **`SupportTicket`**: Scrum ticket system supporting categories (`Bug`, `Feature`, `Task`, `Internal`, `Infrastructure`, `Client Request`, `General`), statuses (`To Do`, `Content`, `Creative`, `Under Review`, `Ready to Leave`, `In Progress`, `Resolved`, `Closed`), priority levels, rich attachments, reporters, and linked issues (`relates to`, `blocks`, `is blocked by`, `duplicates`).
- **`Target`**: Monthly/quarterly revenue and productivity goals assigned to personnel and teams.

### 2.3 Sales & Billing Subsystem
- **`Proposal`**: Client proposals containing company info, scope items, deliverable milestones, pricing calculations, status (`draft`, `sent`, `viewed`, `accepted`, `declined`), and e-signature records.
- **`ProposalRateCard`**: Configurable service rate benchmarks.
- **`Invoice`**: Client invoices with invoice numbers, line items, CGST/SGST/IGST tax computations, payment status (`Draft`, `Sent`, `Paid`, `Overdue`, `Cancelled`), due dates, and PDF exports.
- **`Payment`**: Financial records tracking payment amounts, dates, bank transaction IDs, and methods.
- **`BillingProfile`**: Legal entity details, GSTIN, PAN, bank account coordinates, and payment instructions.

### 2.4 Team Lounge & Multiplayer Games
- **`BondingChannel`**: Communication rooms with `type: 'direct'` (1-on-1 private chat) or `type: 'channel'` (group/team lounge), membership arrays, and latest message snapshots.
- **`BondingMessage`**: Individual messages supporting text, emojis, attachments, system alerts, and interactive game challenge cards (`type: 'challenge'`).
- **`GameInvitation`**: Match invites specifying `gameType` (`chess`, `tictactoe`, `ludo`), sender, recipient, match settings, status (`pending`, `accepted`, `declined`, `cancelled`), and target private channel ID.
- **`GameMatch`**: Active match state storing player allocations, turn state, move logs, tournament clocks, and game-specific payloads (Chess FEN / Ludo 15×15 pawn matrices).
- **`BondingScore`**: Employee gamification scores, points awarded for challenges, wins, and daily interactions.
- **`Notification`**: System notifications for tickets, chat mentions, game challenges, and approval alerts.

---

## 3. REST API Endpoints Reference

All API routes are prefixed with `/api`. Protected routes require a valid `Bearer <token>` HTTP header.

### 3.1 Authentication (`/api/auth`)
| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Public | Validates credentials; returns JWT session token (12h) & user payload |
| `GET` | `/api/auth/me` | Authenticated | Fetches current user profile and role |
| `POST` | `/api/auth/change-password` | Authenticated | Updates current user's password |
| `POST` | `/api/auth/reset-password` | Super Admin | Resets a specific employee's password |

### 3.2 Analytics & Productivity (`/api/dashboard`, `/api/jobs`)
| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/dashboard/admin` | Admin / Super Admin | Company-wide revenue, utilization, profit margin, capacity warnings |
| `GET` | `/api/dashboard/employee` | Employee | Personal logged hours, targets, utilization percentage |
| `GET` | `/api/jobs` | Authenticated | Lists jobs with period, client, and personnel filters |
| `POST` | `/api/jobs` | Authenticated | Logs a new job with percentage and hour splits |
| `PUT` | `/api/jobs/:id` | Authenticated | Updates existing job |
| `DELETE` | `/api/jobs/:id` | Super Admin / Creator | Deletes a job record |

### 3.3 Daily Tasks & Support Tickets (`/api/tasks`, `/api/tickets`)
| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tasks` | Authenticated | Retrieves daily planner tasks with status filters |
| `POST` | `/api/tasks` | Authenticated | Creates a new task |
| `PUT` | `/api/tasks/:id` | Authenticated | Updates task status, checklist, or priority |
| `GET` | `/api/tickets` | Authenticated | Retrieves support tickets for Scrum board |
| `POST` | `/api/tickets` | Authenticated | Submits a new support ticket with attachments |
| `PUT` | `/api/tickets/:id` | Authenticated | Updates ticket status, assignees, priority, comments |
| `DELETE` | `/api/tickets/:id` | Creator / Superadmin | Strictly deletes a ticket (guarded by creator ID or superadmin role) |

### 3.4 Proposals & Billing (`/api/proposals`, `/api/accounts`)
| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/proposals` | Authenticated | Lists client proposals |
| `POST` | `/api/proposals` | Admin / Super Admin | Creates a proposal draft |
| `GET` | `/api/proposals/public/:token` | Public | Client access to view and sign proposal |
| `POST` | `/api/proposals/public/:token/sign` | Public | Records client e-signature and accepts proposal |
| `GET` | `/api/accounts/invoices` | Admin / Super Admin | Invoicing list with payment tracking |
| `POST` | `/api/accounts/invoices` | Admin / Super Admin | Generates invoice draft with tax calculations |
| `POST` | `/api/accounts/payments` | Admin / Super Admin | Records client payment receipts |

### 3.5 Team Bonding & Games (`/api/bonding`)
| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/bonding/channels` | Authenticated | Lists available 1-on-1 direct chats and group channels |
| `POST` | `/api/bonding/channels` | Authenticated | Creates group channel or direct message thread |
| `GET` | `/api/bonding/channels/:id/messages` | Authenticated | Loads message stream with pagination |
| `POST` | `/api/bonding/channels/:id/messages` | Authenticated | Posts message or media attachment |
| `POST` | `/api/bonding/invitations` | Authenticated | **Creates a game challenge delivered strictly to personal direct chat** |
| `GET` | `/api/bonding/invitations` | Authenticated | Lists pending incoming and sent challenges |
| `PUT` | `/api/bonding/invitations/:id/respond`| Authenticated | Accepts or declines challenge |
| `POST` | `/api/bonding/matches/instant-ludo` | Authenticated | Launches 2P, 3P, or 4P Ludo match |
| `GET` | `/api/bonding/matches/:id` | Authenticated | Fetches live game board state |
| `POST` | `/api/bonding/matches/:id/move` | Authenticated | Submits move or rolls 3D dice (verified turn) |
| `DELETE` | `/api/bonding/matches/:id` | Players / Admin | Cleans up and archives game match record |

---

## 4. Authentication & Authorization Framework

### 4.1 JWT Token Handling
Authentication is implemented via JSON Web Tokens (JWT). Upon successful credentials validation:
1. The server signs a payload containing `{ id, role, email, name }` using `JWT_SECRET` with a 12-hour expiration.
2. The client stores this token in `localStorage.getItem('ci360_token')`.
3. Every API call attaches the header: `Authorization: Bearer <token>`.
4. Token expiration or `401 Unauthorized` responses automatically trigger redirection to `/login.html`.

### 4.2 Role-Based Access Control (RBAC) Matrix
| Feature / Module | Super Admin | Admin | Employee | Client |
| :--- | :---: | :---: | :---: | :---: |
| Company Financial Dashboard | ✅ Full | ✅ Full | ❌ Blocked | ❌ Blocked |
| Personal Utilization & Jobs | ✅ Full | ✅ Full | ✅ Self Only | ❌ Blocked |
| Log & Edit Jobs | ✅ All | ✅ All | ✅ Self Only | ❌ Blocked |
| Client & Service Directory | ✅ Manage | ✅ Manage | 👁️ Read | ❌ Blocked |
| Salaries & Compensation | ✅ Full | ❌ Blocked | ❌ Blocked | ❌ Blocked |
| User Accounts & Access | ✅ Manage | ❌ Blocked | ❌ Blocked | ❌ Blocked |
| Support Tickets (Create/Edit) | ✅ Full | ✅ Full | ✅ Full | ❌ Blocked |
| Support Tickets (Delete) | ✅ Full | ❌ Blocked | 🔒 Creator Only | ❌ Blocked |
| Proposal Studio & Signoffs | ✅ Full | ✅ Full | 👁️ Read | 🔒 Client Review |
| Invoicing & GST Accounts | ✅ Full | ✅ Full | ❌ Blocked | ❌ Blocked |
| Team Chat & Games Arena | ✅ Full | ✅ Full | ✅ Full | ❌ Blocked |

---

## 5. Real-time Polling & Synchronization Engine

To eliminate server overhead and maintain resilient connections across firewalls, CI360 uses an **Event-Driven Synchronization Hub**:

1. **In-Memory Timestamp Counters**:
   The backend tracks global modification timestamps:
   - `__ci360LastGlobalUpdate`
   - `__ci360LastTicketUpdate`
   - `__ci360LastTaskUpdate`
   - `__ci360LastInvoiceUpdate`
   - `__ci360LastChatUpdate`
   - `__ci360LastBondingUpdate`
2. **Lightweight Heartbeat Polling**:
   Clients ping `/api/notifications/sync-status` every 3 seconds:
   - If timestamps match the client's cached state, the server returns `{ modified: false }` with zero database overhead.
   - If an entity was updated (e.g., ticket moved, dice rolled, chat sent), the client re-fetches only the affected view without re-rendering the whole page.

---

## 6. Design System, Theming & Layout Spacing Standard

### 6.1 Theme Tokens & Dark Mode
CI360 supports **Light Theme** (default) and **Dark Theme** via CSS custom variables (`[data-theme="dark"]`). Tokens adapt typography, borders, surfaces, and shadows seamlessly across all screens.

### 6.2 Global Content Spacing Standard
All primary views inside the application shell are governed by an explicit CSS container standard in [`style.css`](file:///c:/Users/reeha/OneDrive/Desktop/CIJOB/ci360/web/src/css/style.css):

```css
.app-content {
    max-width: none !important;
    width: auto !important;
    box-sizing: border-box !important;
    flex: 1 1 0%;
    padding: 20px !important;
    margin: 0px 71px !important;
}

@media (max-width: 992px) {
  .app-content {
    margin: 0 32px !important;
    padding: 20px !important;
  }
}

@media (max-width: 768px) {
  .app-content {
    margin: 0 16px !important;
    padding: 16px !important;
  }
}
```

- **Uniform 20px Padding**: Applied inside the main viewport on top, right, bottom, and left.
- **71px Horizontal Desktop Margin**: Establishes a comfortable reading margin on widescreen desktop displays.
- **Responsive Fallback**: Gracefully scales to 32px on tablets and 16px on mobile viewports.

---

## 7. Subsystem Architecture

### 7.1 Executive Dashboard & Capacity Intelligence
Aggregates billable hours against employee capacity (default 160 hrs/mo) and calculates workload utilization percentages:
$$\text{Utilization \%} = \left(\frac{\text{Logged Billable Hours}}{\text{Monthly Target Hours}}\right) \times 100$$
- Highlights over-utilized (>100%) and under-utilized (<70%) team members with proactive capacity redistribution advice.

### 7.2 Job Logging & Billable Split Engine
Supports multi-person work distribution on a single job:
- Multiple team members can be assigned percentage splits $\sum \% = 100\%$ or individual logged hours.
- Revenue recognition automatically divides client billings across participating personnel.

### 7.3 Daily Planner & Task Kanban
Features a priority matrix (Urgent, High, Medium, Low), inline task creation, subtask checklist completion percentages, and drag-and-drop or click-to-move status updates.

### 7.4 Support Tickets & Jira Scrum System
- 5-Column to 8-Column Scrum board with drag/select progression.
- Fast streaming multi-file upload system and external reference URL linking.
- **Strict Security Guard**: Only the original ticket reporter or a Superadmin may delete a ticket.

### 7.5 Proposal Studio & Rate Card Engine
Interactive proposal generator:
- Scopes deliverables, milestones, payment schedules, and terms.
- Generates secure public client links for digital signature and acceptance.

### 7.6 Accounts, Invoicing & GST Financials
- Automatically formats invoices compliant with Indian GST (CGST 9% + SGST 9% or IGST 18%).
- Tracks accounts receivable, aging buckets (0-30 days, 31-60 days, 60+ days), and payment logs.

### 7.7 Team Chat, Lounge & Multiplayer Games Arena
- **Personal Chat Challenge Delivery**: Every challenge generates an invitation strictly into the 1-on-1 direct conversation between the two colleagues.
- **Ludo Royale**: 15×15 grid cross track, 4 pawns per color, auto-advance for single valid moves, safe squares, and a 3D tactile dice with realistic animations and isolated styling.
- **Chess Duel**: Standard FEN validation via `chess.js`, legal move dot indicators, live clocks, and notation.
- **Tic-Tac-Toe**: Turn-based fast match.

---

## 8. Production Build, Deployment & DevOps

### 8.1 Build Pipeline
The web client is compiled using Vite:
```bash
cd web
npm run build
```
This builds production bundles into `web/dist/`, minifying JavaScript, optimizing stylesheets, and tree-shaking unused libraries.

### 8.2 Production Server Execution
The Express application serves the API and the compiled frontend simultaneously:
```bash
# In project root
npm run start
```
Runs `node server.js` which loads environment variables and serves `web/dist` on port 4000.

