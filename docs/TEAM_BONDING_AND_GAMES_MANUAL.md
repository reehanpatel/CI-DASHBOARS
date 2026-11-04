# CI360 Team Lounge & Multiplayer Games Arena
## Comprehensive Technical Documentation & User Manual

---

### Executive Overview
The **Team Chat & Lounge (Team Bonding)** module in CI360 combines real-time workplace collaboration with interactive multiplayer gaming. Designed to foster teamwork, healthy workplace competition, and rapid communication, the system integrates 1-on-1 direct messaging, group team lounges, and an interactive games arena featuring **Ludo Royale (2P, 3P, 4P)**, **Chess Duel**, and **Tic-Tac-Toe**.

---

## 1. System Architecture & Routing Policy

### 1.1 Personal Chat Routing Guarantee
A core architectural requirement of CI360 is that **all game challenges are strictly private between the participating colleagues**:
- **Zero Group Contamination**: When a challenge is issued (even from within a group channel or the main Lounge), it is **never** broadcast to public or group rooms.
- **Automatic 1-on-1 Provisioning**: The backend automatically looks up the direct 1-on-1 channel (`type: 'direct'`) between the challenger and the recipient. If one does not already exist, it is created instantly.
- **Challenge Lifecycle in Private Chat**:
  1. The interactive challenge card appears solely inside the recipient's personal chat stream.
  2. The personal chat conversation is updated with a `challenge` badge and bumped to the top of both users' recent chat lists.
  3. Push/in-app notifications direct the recipient directly into the private 1-on-1 conversation.
  4. Once accepted, match start notices and game arena launchers are contained strictly within the personal thread.

```
[Challenger Issues Invite]
         │
         ▼
[Backend Intercepts] ──► Inspects target colleague
         │
         ├───► Locates or auto-creates 1-on-1 Direct Chat (`type: 'direct'`)
         ├───► Inserts interactive challenge card into 1-on-1 chat stream
         ├───► Dispatches high-priority notification to recipient
         └───► [Group Channels & Team Lounges remain completely clean]
```

---

## 2. Multiplayer Games Arena

### 2.1 Ludo Royale (2-Player, 3-Player, 4-Player)
An authentic, rule-compliant implementation of classic Ludo designed for cross-office multiplayer sessions.

#### A. Board Layout & Dimensions
- **15×15 Cross Track**:
  - **4 Corner Yards (6×6 each)**: Red (Top-Left), Green (Top-Right), Blue (Bottom-Left), Yellow (Bottom-Right).
  - **Safe Squares (`⭐`)**: Squares `0, 8, 13, 21, 26, 34, 39, 47` are designated safe zones where pawns cannot be captured.
  - **Start Squares (`➔`)**: Entry squares for released pawns.
  - **Home Stretches (5 squares per arm)**: Colored pathways leading directly to the center triangle.
  - **Home Triumph Core (`🏆`)**: Final square `56`. When all 4 pawns reach this center core, the player wins.

#### B. 3D Tactile Interactive Dice
The dice UI has been crafted to simulate a real, physical gaming die:
- **Ivory Acrylic Casing**: 64×64px rounded cube (`border-radius: 14px`) with soft top-down lighting and a 6px physical bottom shelf shadow (`box-shadow: 0 6px 0 #cbd5e1`).
- **Dynamic Turn Colors**: The border and ambient glow dynamically change according to whose turn it is:
  - 🔴 **Red**: `#ef4444`
  - 🟢 **Green**: `#10b981`
  - 🟡 **Yellow**: `#f59e0b`
  - 🔵 **Blue**: `#3b82f6`
- **Concave 3D Pips**:
  - Deep obsidian pips with radial shading and light reflection.
  - **Signature Ace Pip**: Face 1 features a classic enlarged crimson-red center pip.
  - **Reset Isolation**: Pips are explicitly isolated (`ludo-pip-filled` / `ludo-pip-empty`) so global page styles cannot distort the 3×3 grid.
- **Physical Feedback & Animations**:
  - **Idle / Your Turn**: Energetic `pulse-roll` 3D wobble encouraging the player to roll.
  - **Press Feel**: Compresses 3px downward on mouse down or tap, mimicking a tactile mechanical button.
  - **Rolling Tumbler**: Smooth 360° rotational tumble animation while the backend evaluates the outcome.
  - **Dual Click Action**: Both the 3D dice and the `[🎲 TAP TO ROLL]` badge underneath are clickable.

#### C. Gameplay Rules & Logic
1. **Pawn Release**: A roll of **6** is required to move a pawn from its Base Yard (`step: -1`) to the track (`step: 0`).
2. **Track Progression**: Pawns navigate clockwise around the 52 perimeter squares.
3. **Captures**: Landing on an opponent's pawn on a non-safe square captures it, sending it back to their Base Yard (`step: -1`).
4. **Auto-Advance**: If only a single pawn has a valid legal move following a roll, the game automatically advances it without requiring an extra tap, speeding up game pace.

---

### 2.2 Chess Duel
- **Legal Validation**: Full chess engine powered by `chess.js`, enforcing legal moves, castling, en passant, pawn promotion, check, checkmate, and stalemate.
- **Interactive Board**: Click piece to reveal green highlighted legal move dots (`.legal-dot`); click destination square to execute move.
- **Time Controls**: Supports Untimed, 1 min (Bullet), 3 min (Blitz), 5 min (Rapid), and 10 min matches.
- **Notation Feed**: Sidebar live notation recording every move in algebraic standard format.

---

### 2.3 Tic-Tac-Toe Showdown
- Lightweight 3×3 quick-play game.
- Turn-based alternating moves (`X` vs `O`).
- Instant line-check win detection and tie recognition.

---

## 3. User Manual & Step-by-Step Operator Guide

### 3.1 How to Challenge a Colleague
1. Navigate to **Team Chat & Lounge** from the left navigation sidebar.
2. You can initiate a challenge in three ways:
   - Click the **`⚔️ Challenge`** button in the top action toolbar.
   - Click the **`🎮 Challenge Colleague`** button inside any colleague's 1-on-1 chat header.
   - Switch to the **Lounge & Games Arena** view and click **`Play`** on your desired game.
3. In the Challenge Modal:
   - **Step 1**: Select the game type (**Ludo Royale**, **Chess Duel**, or **Tic-Tac-Toe**).
   - **Step 2 (Ludo Only)**: Choose the player count (**2 Players**, **3 Players**, or **4 Players**).
   - **Step 3**: Search or select your opponent(s) from the colleague list.
   - **Step 4 (Chess Only)**: Choose time controls (e.g. Untimed or 5 Minutes).
4. Click **`Send Challenge 🚀`**.
5. The challenge card is delivered directly into your colleague's personal 1-on-1 chat.

---

### 3.2 How to Accept and Join a Match
1. When a colleague challenges you:
   - An in-app badge notification appears on your bell icon.
   - The colleague's direct conversation will display a **`⚔️ Game Challenge`** tag.
2. Open their personal direct chat.
3. On the interactive Game Challenge Card, click **`⚔️ Accept Challenge`**.
4. The live match arena modal will open immediately on both screens.

---

### 3.3 Playing a Match
1. **Rolling the Dice (Ludo)**:
   - When the banner shows **`👉 It is your turn!`**, click either the 3D dice or the **`🎲 TAP TO ROLL`** badge.
   - If you roll a 6, tap a pawn in your yard to release it.
   - If multiple pawns can move, movable pawns will pulse with a blue glow. Click the desired pawn to advance it.
   - If only one pawn can move, it will auto-advance automatically.
2. **Moving Pieces (Chess)**:
   - Click on your piece to see highlighted dots on valid destination squares.
   - Tap the desired green dot to complete your turn.
3. **Resigning or Concluding**:
   - At any time during an active game, click **`🏳️ Resign`** to concede the match gracefully.
   - To leave or review the board, click the **`✕`** close button in the upper-right corner. Matches stay live and can be resumed at any time from the Lounge or personal chat.

---

## 4. UI Layout & Global Spacing Standards

The application layout conforms to a strict, standardized spacing hierarchy:

| Element | Property | Value | Purpose |
| :--- | :--- | :--- | :--- |
| **Main Content Container** | `padding` | `20px !important` | Clean uniform buffer on all sides |
| **Main Content Container** | `margin` | `0px 71px !important` | Precise horizontal alignment on desktop |
| **Main Content Container** | `flex` | `1 1 0%` | Fluid vertical and horizontal filling |
| **Main Content Container** | `max-width` | `none !important` | Prevents cramped container cutoffs |
| **Dashboard & Metric Cards** | `padding` | `20px` | Consistent interior padding |
| **Mobile Breakpoint (≤768px)** | `margin` | `0px 16px !important` | Responsive buffer for handheld screens |
| **Mobile Breakpoint (≤768px)** | `padding` | `16px !important` | Preserves maximum screen real estate |

---

## 5. Security & Permission Reference

1. **Role Access**:
   - **Super Admin & Admin**: Can participate in challenges, create direct and group channels, manage member rosters, and delete concluded matches.
   - **Employee**: Can challenge colleagues, participate in all games, manage personal chats, and view leaderboard scores.
   - **Client**: Restricted to client dashboard; cannot access the internal employee lounge or games arena.
2. **Turn Authentication**:
   - Every move request to `/api/bonding/matches/:id/move` verifies the user's JWT token. Players cannot move opponent pieces, roll out of turn, or submit unauthorized moves.
3. **Data Sanitization**:
   - All messages, player tags, and game moves are HTML-escaped to prevent cross-site scripting (XSS).
