# CI360 Productivity Intelligence Suite
## Complete End-User & Administrator Operating Manual

---

## Welcome to CI360
CI360 is an enterprise productivity tracker, work logging system, Jira-style support ticket desk, financial invoicing hub, and team bonding lounge designed for digital agencies, consultants, and project teams.

---

## Table of Contents
1. [Getting Started & Logging In](#1-getting-started--logging-in)
2. [Interface Overview & Global Controls](#2-interface-overview--global-controls)
3. [Module 1: Executive Dashboard (Admin & Super Admin)](#3-module-1-executive-dashboard-admin--super-admin)
4. [Module 2: Employee Workspace & Workload Tracking](#4-module-2-employee-workspace--workload-tracking)
5. [Module 3: Daily Planner & Task Management](#5-module-3-daily-planner--task-management)
6. [Module 4: Job Logging & Time Tracking](#6-module-4-job-logging--time-tracking)
7. [Module 5: Support Tickets (Jira Scrum Board)](#7-module-5-support-tickets-jira-scrum-board)
8. [Module 6: Proposal Studio & Client Signoffs](#8-module-6-proposal-studio--client-signoffs)
9. [Module 7: Accounts, Invoicing & GST Billing](#9-module-7-accounts-invoicing--gst-billing)
10. [Module 8: Team Chat, Lounge & Multiplayer Games Arena](#10-module-8-team-chat-lounge--multiplayer-games-arena)
11. [Module 9: Settings, Roster, Targets & Salaries (Super Admin)](#11-module-9-settings-roster-targets--salaries-super-admin)
12. [Module 10: Client Extranet Portal](#12-module-10-client-extranet-portal)
13. [Troubleshooting & Frequently Asked Questions (FAQ)](#13-troubleshooting--frequently-asked-questions-faq)

---

## 1. Getting Started & Logging In

### 1.1 Accessing the Platform
1. Open your web browser (Google Chrome, Microsoft Edge, Safari, or Firefox).
2. Navigate to your agency's CI360 URL (e.g. `http://localhost:4000` or your production domain).
3. If not already signed in, you will be directed to the login portal.

### 1.2 Signing In
1. Enter your registered work **Email** and **Password**.
2. Click **Sign In to Workspace**.
3. You will be automatically routed to your assigned workspace based on your role:
   - **Super Admin & Admin** ➔ Redirected to `admin.html`
   - **Employee** ➔ Redirected to `employee.html`
   - **Client** ➔ Redirected to `client.html`

### 1.3 Theme Toggle & Password Management
- **Switch Themes**: Click the ☀️/🌙 icon in the top-right header to toggle between **Light Theme** and **Dark Theme** instantly.
- **Change Password**: Click your user profile avatar in the upper right, select **Settings / Change Password**, enter your current password, your new password, and click **Update Password**.

---

## 2. Interface Overview & Global Controls

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ CI360   [ 🔍 Search or Jump (Ctrl+K) ]      [+ Log Job]  [🔔 2]  [👤 User]  │
├──────────────┬──────────────────────────────────────────────────────────────┤
│  SIDEBAR     │  MAIN CONTENT AREA                                           │
│  ──────────  │  (Standard 20px padding, 71px side margins on widescreen)    │
│  📊 Dashboard│                                                              │
│  📅 Planner  │  ┌────────────────────────────────────────────────────────┐  │
│  🎫 Tickets  │  │ KPI & Metric Cards                                     │  │
│  💼 Jobs     │  └────────────────────────────────────────────────────────┘  │
│  📑 Proposals│  ┌────────────────────────────────────────────────────────┐  │
│  💰 Billing  │  │ Interactive Module Views & Tables                      │  │
│  💬 Lounge   │  └────────────────────────────────────────────────────────┘  │
│  ⚙️ Settings │                                                              │
└──────────────┴──────────────────────────────────────────────────────────────┘
```

### 2.1 The Global Command Palette (`Ctrl + K` or `Cmd + K`)
Press **Ctrl + K** (or **Cmd + K** on Mac) from anywhere in CI360 to open the Command Palette:
- Jump to any navigation tab (e.g. type `tickets`, `planner`, `billing`, `lounge`).
- Search for specific clients, tickets, or colleagues instantly.
- Use `↑` and `↓` arrow keys to navigate and `Enter` to select.

### 2.2 Global Quick Action Button (`+ Log Job`)
Located prominently in the top header, this button allows team members to quickly log hours and deliverables on any client project without navigating away from their current screen.

---

## 3. Module 1: Executive Dashboard (Admin & Super Admin)

The Executive Dashboard provides leadership with total visibility into revenue, client distribution, team efficiency, and utilization benchmarks.

### 3.1 Time Period Filters
Use the period selector pill bar to filter business performance:
- **This Month** (Default)
- **Last Month**
- **This Quarter**
- **Year to Date (YTD)**
- **Custom Date Range**

### 3.2 Key Executive Metrics
- **Total Revenue Logged**: Value of billable project jobs logged across all active clients.
- **Team Utilization**: Average employee capacity utilization across the agency.
- **Active Job Count**: Total active jobs currently in flight.
- **Client Retainer Performance**: Comparison of consumed retainer hours vs. contractual quotas.

### 3.3 Capacity & Burnout Warnings
The dashboard monitors employee capacity (160 hours/month default):
- 🔴 **Over-Capacity (>100%)**: Flagged in red with actionable guidance to reassign workloads or bring in freelance support.
- 🟡 **Optimal (80% - 100%)**: Peak team efficiency.
- 🟢 **Available Bandwidth (<75%)**: Ready for new job assignments.

---

## 4. Module 2: Employee Workspace & Workload Tracking

Employees see a dedicated, focused workspace highlighting their daily responsibilities, hours, and targets.

### 4.1 Utilization Gauge
Displays your current month's logged hours against your target capacity (e.g. `124h / 160h logged (78%)`).

### 4.2 Lead Management (Mansi & Urna Lead Workspaces)
Special lead personnel (e.g. Mansi & Urna) have team oversight views enabling them to review duties, reassign subtasks, and track department output.

---

## 5. Module 3: Daily Planner & Task Management

The Daily Planner gives team members a clear personal checklist and team Kanban board.

### 5.1 Creating a Daily Task
1. Navigate to **Daily Planner** from the sidebar.
2. In the **New Task** input box, enter your task title.
3. Select **Priority** (`Low`, `Medium`, `High`, `Urgent`).
4. Set an optional **Due Date** and **Assignee**.
5. Click **Add Task**.

### 5.2 Task Progress & Checklists
- **Checklist Subtasks**: Click on any task to add itemized checklists. As items are checked off, a progress bar automatically calculates the completion percentage.
- **Status Updates**: Click or drag tasks between **Pending**, **In Progress**, **Under Review**, and **Completed**.

---

## 6. Module 4: Job Logging & Time Tracking

Job logging records client work and divides credit accurately among participating employees.

### 6.1 How to Log a Job
1. Click **+ Log Job** in the topbar or navigate to **Log a Job** in the sidebar.
2. Enter the **Job Title / Deliverable Description**.
3. Select the **Client** from the dropdown menu.
4. Select one or more **Services** applied (e.g. `Design`, `Copy`, `SEO`, `Edit`).
5. Choose the **Job Date**.
6. Enter the **Total Job Value (₹)** or hourly billing rate.
7. **Allocate Multi-Person Work Split**:
   - Assign the primary employee (e.g. `Person 1: 70%`).
   - Assign the supporting colleague (e.g. `Person 2: 30%`).
   - The system automatically validates that total splits equal 100% and calculates logged hours accordingly.
8. Click **Save Job Record**.

---

## 7. Module 5: Support Tickets (Jira Scrum Board)

A complete Jira-style issue tracking and Scrum management desk.

### 7.1 The Scrum Columns
Tickets flow across standard lifecycle stages:
1. **To Do**: Backlog tickets awaiting initiation.
2. **Content**: Copywriting and briefing stage.
3. **Creative**: Design, video editing, and visual asset preparation.
4. **Under Review**: Internal quality check and client feedback.
5. **Ready to Leave**: Approved and queued for publication or deployment.
6. **Resolved / Closed**: Completed tickets.

### 7.2 Submitting a Support Ticket
1. Click **Create Ticket** on the Scrum toolbar.
2. Enter a descriptive **Title** (e.g. `SUP-104: Fix checkout currency rounding`).
3. Select **Category** (`Bug`, `Feature`, `Task`, `Internal`, `Infrastructure`, `Client Request`).
4. Set **Priority** (`Low`, `Medium`, `High`, `Critical`).
5. Assign one or more **Assignees**.
6. Attach screenshots or files using the fast parallel streaming file uploader or paste external links (Figma, Google Drive, GitHub PRs).
7. Click **Create Ticket**.

### 7.3 Ticket Deletion Security Policy
> 🔒 **Security Notice**: To prevent accidental data loss and maintain accountability, **only the user who originally created the ticket OR a Superadmin can delete it**. Other users will see deletion options restricted with a clear permission notice.

---

## 8. Module 6: Proposal Studio & Client Signoffs

The Proposal Studio enables rapid generation of commercial proposals and contract agreements.

### 8.1 Creating a Client Proposal
1. Open **Proposal Studio** from the sidebar.
2. Click **Create Proposal**.
3. Choose the client, project title, and validity period.
4. Add **Deliverables & Milestones**:
   - Item title, description, estimated timeline, and commercial fee.
5. Review total project valuation and payment schedule terms (e.g. `50% Advance, 50% on Delivery`).
6. Click **Generate Proposal**.

### 8.2 Client Review & E-Signature Portal
1. Click **Share Link** to copy the secure, tokenized client URL (`/proposal.html?token=...`).
2. Send the link to the client.
3. When the client opens the link:
   - They review the detailed scope of work.
   - They enter their full legal name and type/draw their signature.
   - Upon clicking **Accept & Sign Proposal**, the proposal status flips to **Accepted**, triggering an instant notification to the admin team.

---

## 9. Module 7: Accounts, Invoicing & GST Billing

Manage client invoices, accounts receivable, and Indian GST tax calculations.

### 9.1 Generating an Invoice
1. Open **Accounts & Billing** from the sidebar (or navigate to `/accounts`).
2. Click **New Invoice**.
3. Select the **Client**. The system automatically pulls their GSTIN, address, and legal billing profile.
4. Add line items, quantities, and unit rates.
5. Select tax configuration:
   - **Intra-State**: CGST (9%) + SGST (9%)
   - **Inter-State**: IGST (18%)
6. The subtotal, tax amounts, and grand total are calculated automatically.
7. Click **Save as Draft** or **Issue & Send**.

### 9.2 Recording Payments
1. Locate the invoice under **Invoices Roster**.
2. Click **Record Payment**.
3. Enter the amount received, payment date, payment mode (`NEFT`, `RTGS`, `UPI`, `Cheque`), and transaction reference ID.
4. The invoice status updates to **Paid** or **Partially Paid**.

---

## 10. Module 8: Team Chat, Lounge & Multiplayer Games Arena

A workplace hub for team communication and friendly competition.

### 10.1 Direct 1-on-1 Chats vs. Group Lounges
- **1-on-1 Direct Chats**: Private end-to-end messaging between any two colleagues.
- **Group Lounges**: Topic channels (e.g. `#general`, `#design-team`, `#coffee-break`) for group discussion.

### 10.2 Game Challenge Personal Chat Guarantee
> 🛡️ **Privacy Rule**: All game challenges are **strictly delivered to the opponent's personal 1-on-1 direct chat**, never into public channels or group rooms.

#### Sending a Challenge:
1. Click **`⚔️ Challenge`** in the top action toolbar, or click **`Play`** in the Games Lounge.
2. Select the game: **Ludo Royale**, **Chess Duel**, or **Tic-Tac-Toe**.
3. For Ludo: Choose **2 Players**, **3 Players**, or **4 Players**.
4. Select your opponent(s).
5. Click **Send Challenge 🚀**.
6. The challenge card is delivered directly into your opponent's personal chat thread.

#### Accepting a Challenge:
1. The opponent receives a notification and sees a **`⚔️ Game Challenge`** tag on their direct chat list.
2. They open the private chat and click **`⚔️ Accept Challenge`**.
3. The live match arena modal opens automatically on both screens.

### 10.3 Ludo Royale: Rules & 3D Tactile Dice
- **15×15 Track**: 4 pawns per player. Pawns release from Base Yard (`step: -1`) to the track on rolling a **6**.
- **Safe Squares (`⭐`)**: Squares marked with stars protect your pawns from being captured.
- **Home Triumph (`🏆`)**: Pawns advance through their colored home stretch into the center crown square `56`.
- **3D Tactile Dice**: Click either the 3D ivory die or the **`[🎲 TAP TO ROLL]`** button below it.
- **Auto-Advance**: When only one pawn has a legal move following your roll, the system automatically advances it to keep the game fast and fluid.

### 10.4 Chess Duel
- Full chess rules powered by `chess.js`.
- Click any piece to view legal move dots (`🟢`); tap the destination square to make your move.
- Choose from Untimed or timed Blitz/Rapid clocks.
- Sidebar moves notation records every turn.

---

## 11. Module 9: Settings, Roster, Targets & Salaries (Super Admin)

Super Admins have exclusive administrative tools:
- **Personnel Roster Management**: Add new staff, set monthly hours capacity, and assign departments.
- **Monthly Targets**: Configure revenue targets for individuals and teams.
- **Salary Grades**: Confidential salary bands and compensation management.
- **User Accounts**: Create logins, assign roles, toggle account active states, and perform password resets.

---

## 12. Module 10: Client Extranet Portal

Clients who sign in with client credentials receive a simplified, branded extranet view:
- Review in-progress projects and milestones.
- View deliverable attachments and approved assets.
- Download issued invoices and payment receipts.
- Cannot access internal team chats, salary data, or employee logs.

---

## 13. Troubleshooting & Frequently Asked Questions (FAQ)

### Q1: The dice in Ludo was showing a blank square. Is this resolved?
**A:** Yes. The blank square was caused by a CSS name conflict with a global `.empty` class that had 52px padding. The pip styles have been isolated with `.ludo-pip-filled` and `.ludo-pip-empty`, reset protection, and enhanced 3D tactile cubic styling.

### Q2: Why did my game challenge appear in a group room?
**A:** In earlier versions, sending a challenge while inside a group chat could post the invitation to that channel. The system now strictly intercepts all game challenges and routes them **exclusively into the 1-on-1 personal direct chat** between you and your colleague.

### Q3: Why can't I delete a support ticket?
**A:** To ensure data integrity, support tickets can only be deleted by the person who originally reported/created the ticket, or by a Superadmin.

### Q4: How do I change margins or padding across the app?
**A:** The entire software conforms to the `.app-content` standard: `padding: 20px !important; margin: 0px 71px !important;` on desktop displays, scaling down automatically for mobile and tablet devices.

