# Architecture

This document describes the technical architecture of SpeakFlow — how the frontend, backend, and data layers interact.

---

## System Overview

SpeakFlow is a **single-page application (SPA)** with a **REST API backend**. The frontend handles UI, teleprompter logic, and local data persistence. The backend handles AI script generation and database operations.

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client (Browser)                         │
│                                                                  │
│  ┌────────────┐   ┌─────────────┐   ┌────────────────────────┐ │
│  │   Views    │   │    Hooks     │   │   Local Storage        │ │
│  │            │   │              │   │   • speakflow_scripts  │ │
│  │ HomeView   │   │ useLocal     │   │   • speakflow_logs     │ │
│  │ Telepromp  │   │ Storage      │   └────────────────────────┘ │
│  │ EditorView │   │ useCreate    │                              │
│  │ MyScripts  │   │ Script       │                              │
│  └─────┬──────┘   └──────┬───────┘                              │
│        │                 │                                       │
│        └────────┬────────┘                                       │
│                 ▼                                                │
│          ┌─────────────┐                                         │
│          │ API Service │  Axios + TanStack Query                 │
│          │  (src/      │                                         │
│          │   service/) │                                         │
│          └──────┬──────┘                                         │
└─────────────────┼────────────────────────────────────────────────┘
                  │ HTTP (REST)
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API Server (Express)                          │
│                                                                  │
│  ┌──────────┐    ┌──────────────┐    ┌───────────────────────┐ │
│  │  Routes   │───▶│ Controllers  │───▶│ Services              │ │
│  │           │    │              │    │ • AIServices (LangChain)│ │
│  │ /scripts  │    │ scriptCtrl   │    │ • db (Prisma)         │ │
│  │ /generate │    │              │    └───────────┬───────────┘ │
│  └──────────┘    └──────────────┘                │               │
│                                                   ▼               │
│                                          ┌──────────────┐        │
│                                          │  PostgreSQL   │        │
│                                          │  (via Prisma) │        │
│                                          └──────────────┘        │
└─────────────────────────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                   External AI Provider                             │
│              (OpenAI-compatible API endpoint)                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

### State Management

SpeakFlow uses a **hybrid state model**:

| State Type | Storage | Examples |
|------------|---------|----------|
| **UI state** | React `useState` | Active tab, theme, scroll speed, font size |
| **Persistent state** | `localStorage` via `useLocalStorage` hook | Scripts, practice logs |
| **Server state** | TanStack Query | AI generation mutations |

There is no global state manager (Redux, Zustand). State is lifted to `App.tsx` and passed down via props.

### Routing

Navigation is handled by a `activeTab` state variable in `App.tsx` — no client-side router library. Views are conditionally rendered:

```
activeTab === "home"           → HomeView
activeTab === "my-scripts"     → MyScriptsView
activeTab === "practice-history" → PracticeHistoryView
isPracticing === true          → TeleprompterView
editingScript !== null         → EditorView
```

### Component Hierarchy

```
App
├── Header
├── Main
│   ├── HomeView
│   ├── MyScriptsView
│   ├── PracticeHistoryView
│   ├── EditorView
│   ├── TeleprompterView
│   ├── SupportView
│   ├── PrivacyPolicyView
│   ├── TermsConditionsView
│   └── AboutView
└── Footer
```

### Teleprompter Engine

The teleprompter is the most performance-critical subsystem:

1. **Script formatting** — Raw text is split into read-optimized lines at sentence and phrase boundaries (`formatScriptLines`).
2. **Scroll loop** — A `requestAnimationFrame` loop updates `scrollTop` via a ref, bypassing React re-renders.
3. **Active line tracking** — On scroll, the line closest to the viewport center is highlighted with graduated opacity.
4. **Layout measurement** — `ResizeObserver` tracks container height for dynamic padding calculations.

### Design Token System

Themes are implemented via CSS custom properties in `src/index.css`:

```css
:root { --accent: #4f46e5; --app-bg: #f9f9fb; ... }
.dark { --accent: #4f46e5; --app-bg: #121214; ... }
```

Tailwind CSS 4 maps these to utility classes via `@theme` directives.

---

## Backend Architecture

### API Layer

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/scripts` | `GET` | List all scripts |
| `/api/scripts/:id` | `GET` | Get script by ID |
| `/api/scripts` | `POST` | Create script (with AI generation) |
| `/api/scripts/:id` | `PUT` | Update script |
| `/api/scripts/:id` | `DELETE` | Delete script |
| `/api/scripts/generate` | `POST` | Generate AI script |

### AI Pipeline

```
User prompt → Controller → AIServices (LangChain)
  → SystemMessage (teleprompter-optimized prompt)
  → HumanMessage (user topic)
  → ChatOpenAI.invoke()
  → Response content → Prisma create → JSON response
```

The system prompt (`api/src/prompts/systemPrompts.ts`) enforces teleprompter-friendly formatting: short paragraphs, conversational tone, delivery cues, and no markdown.

### Database Schema

```prisma
model Script {
  id        String   @id @default(uuid())
  title     String
  content   String
  category  String   @default("General")
  editedAt  String   @default("Just now")
  readTime  String   @default("1 min read")
  createdAt DateTime @default(now())
}

model PracticeLog {
  id           String   @id @default(uuid())
  scriptTitle  String
  date         String
  duration     Int
  wpm          Int
  paceRating   String
  satisfaction Int      @default(3)
  createdAt    DateTime @default(now())
}
```

---

## Data Flow

### AI Script Generation

```
1. User enters prompt in HomeView
2. useCreateScript mutation fires
3. Axios POST → /api/scripts { topic }
4. Controller calls GnerateScriptService(topic)
5. LangChain invokes AI model with system + human messages
6. Response saved to PostgreSQL via Prisma
7. Script returned to frontend
8. Script added to localStorage + teleprompter opens
```

### Practice Session

```
1. User selects script → startPractice()
2. TeleprompterView renders formatted lines
3. User adjusts settings (speed, font, mirror)
4. Play → RAF scroll loop activates
5. User finishes → WPM calculated from word count / duration
6. PracticeLog saved to localStorage
7. User redirected to practice history
```

---

## Deployment Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Vercel     │     │   Vercel     │     │  PostgreSQL  │
│   (Frontend) │────▶│   (API)      │────▶│  (Database)  │
│   Static SPA │     │   Serverless │     │              │
└──────────────┘     └──────────────┘     └──────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │  AI Provider │
                     │  (External)  │
                     └──────────────┘
```

The `vercel.json` configuration proxies `/api/*` requests to the backend deployment.

---

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| Local storage for scripts | Instant reads, offline-friendly, no auth required for v1 |
| No client-side router | Lightweight SPA with few views; state-based routing is sufficient |
| RAF scroll loop | Smooth 60fps scrolling without React re-render overhead |
| LangChain for AI | Flexible provider switching, structured prompt management |
| Prisma + PostgreSQL | Type-safe queries, easy schema migrations, production-ready |
| shadcn/ui patterns | Accessible, composable components without heavy dependencies |

---

## Further Reading

- [Features Guide](features.md)
- [Deployment Guide](deployment.md)
- [Getting Started](getting-started.md)
