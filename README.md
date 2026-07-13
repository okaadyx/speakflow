<div align="center">

# SpeakFlow

### AI-Powered Teleprompter for Confident Public Speaking

**Write, rehearse, and deliver speeches with clarity — in a distraction-free studio built for practice.**

<br />

![SpeakFlow Banner](docs/assets/banner.svg)

<br />

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Design_System-000000?logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Live Demo](#) · [Documentation](docs/getting-started.md) · [Report Bug](https://github.com/okaadyx/speakflow/issues) · [Request Feature](https://github.com/okaadyx/speakflow/issues)

</div>

---

## Overview

**SpeakFlow** is an AI-powered teleprompter designed to help you practice speaking with confidence. Whether you are preparing for a keynote, rehearsing an interview answer, or refining a presentation, SpeakFlow gives you a polished, distraction-free environment to write scripts, generate content with AI, and rehearse with professional scrolling controls.

SpeakFlow is built for:

| Audience | Use Case |
|----------|----------|
| **English Speaking Practice** | Build fluency, articulation, and natural pacing |
| **Storytelling** | Craft and rehearse narrative speeches |
| **Public Speaking** | Prepare keynotes, toasts, and live talks |
| **Interview Preparation** | Practice STAR-method and behavioral responses |
| **Presentation Practice** | Rehearse slides and structured talks |
| **Speech Rehearsal** | Fine-tune delivery before the real event |
| **Content Creators** | Script videos, podcasts, and live streams |
| **Students** | Prepare class presentations and debates |
| **Professionals** | Polish pitches, demos, and team updates |

---

## Features

### AI & Content

| Feature | Description |
|---------|-------------|
| **AI Script Generation** | Generate speech scripts from natural-language prompts using LangChain and an OpenAI-compatible API |
| **Category Presets** | Quick-start templates for English Speaking, Storytelling, Interview Practice, Public Speaking, and Presentations |
| **Inspiration Cards** | Curated prompt ideas to jump-start your next session |
| **Script Editor** | Write and edit scripts with title, category, and estimated read time |

### Teleprompter Studio

| Feature | Description |
|---------|-------------|
| **Professional Teleprompter** | Read-optimized line formatting with natural sentence and phrase boundaries |
| **Smooth Auto Scrolling** | Hardware-synchronized `requestAnimationFrame` scrolling for buttery-smooth playback |
| **Adjustable Speed** | Fine-tune scroll speed from 0.5× to 4× |
| **Adjustable Font Size** | Five responsive text size presets (T1–T5) |
| **Reading Width** | Centered 75% reading column for comfortable eye tracking |
| **Reading Guide** | Active-line highlighting with graduated opacity for focus |
| **Focus Mode** | Minimal chrome with fade gradients to reduce visual distraction |
| **Mirror Mode** | Horizontal flip for physical teleprompter mirror setups |
| **Fullscreen Mode** | Immersive practice view with native browser fullscreen support |

### Organization & Tracking

| Feature | Description |
|---------|-------------|
| **Script Management** | Create, edit, delete, and organize your speech library |
| **Recent Scripts** | Quick access to your latest scripts from the home screen |
| **Practice History** | Log sessions with duration, WPM, and pace ratings |
| **Target WPM** | Configure your ideal words-per-minute speaking pace |

### Design & Experience

| Feature | Description |
|---------|-------------|
| **Responsive Design** | Optimized layouts for desktop, tablet, and mobile |
| **Glassmorphism UI** | Frosted-glass surfaces with backdrop blur and subtle depth |
| **Light & Dark Theme** | System-aware themes with consistent indigo accent palette |
| **Accessibility** | Semantic HTML, focus states, readable contrast, and keyboard-friendly controls |
| **Keyboard Shortcuts** | Browser-native fullscreen controls and on-screen teleprompter actions |

---

## Screenshots

| Home Screen | AI Generator |
|:-----------:|:------------:|
| ![Home Screen](docs/assets/screenshots/home.png) | ![AI Generator](docs/assets/screenshots/ai-generator.png) |

| Teleprompter | Fullscreen Mode |
|:------------:|:---------------:|
| ![Teleprompter](docs/assets/screenshots/teleprompter.png) | ![Fullscreen](docs/assets/screenshots/fullscreen.png) |

| Dark Theme | Mobile View |
|:----------:|:-----------:|
| ![Dark Theme](docs/assets/screenshots/dark-theme.png) | ![Mobile View](docs/assets/screenshots/mobile.png) |

---

## Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| [React 19](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe development |
| [Vite 8](https://vite.dev/) | Build tool and dev server |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| [shadcn/ui patterns](https://ui.shadcn.com/) | Accessible, composable UI components |
| [TanStack Query](https://tanstack.com/query) | Server state and mutations |
| [Axios](https://axios-http.com/) | HTTP client |
| [Lucide React](https://lucide.dev/) | Icon system |

### Backend

| Technology | Purpose |
|------------|---------|
| [Express](https://expressjs.com/) | REST API server |
| [Prisma](https://www.prisma.io/) | ORM and database access |
| [PostgreSQL](https://www.postgresql.org/) | Persistent data storage |
| [LangChain](https://js.langchain.com/) | AI orchestration |
| [OpenAI-compatible API](https://platform.openai.com/) | Script generation |

### Tooling & Deployment

| Technology | Purpose |
|------------|---------|
| [ESLint](https://eslint.org/) | Code linting |
| [Vercel](https://vercel.com/) | Frontend and API hosting |

---

## Folder Structure

```
speakflow/
├── api/                          # Express + Prisma backend
│   ├── prisma/
│   │   └── schema.prisma         # Database schema
│   ├── src/
│   │   ├── controllers/          # Route handlers
│   │   ├── models/               # Data models
│   │   ├── prompts/              # AI system prompts
│   │   ├── routes/               # API route definitions
│   │   ├── services/             # AI and database services
│   │   └── server.ts             # Application entry point
│   ├── package.json
│   └── tsconfig.json
├── docs/                         # Extended documentation
│   ├── architecture.md
│   ├── deployment.md
│   ├── faq.md
│   ├── features.md
│   ├── getting-started.md
│   └── troubleshooting.md
├── public/                       # Static assets
├── src/                          # React frontend
│   ├── components/
│   │   ├── layout/               # Header, Footer
│   │   ├── ui/                   # Reusable UI primitives
│   │   └── views/                # Page-level views
│   ├── config/                   # App configuration
│   ├── hooks/                    # Custom React hooks
│   ├── service/                  # API client layer
│   ├── utils/                    # Shared utilities
│   ├── App.tsx                   # Root application component
│   ├── index.css                 # Global styles and design tokens
│   ├── main.tsx                  # Frontend entry point
│   └── types.ts                  # Shared TypeScript types
├── .env.example                  # Environment variable template
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── SECURITY.md
├── package.json
├── tsconfig.json
├── vercel.json                   # Vercel deployment config
└── vite.config.ts
```

---

## Installation

### Prerequisites

- **Node.js** 20.x or later
- **npm** 10.x or later
- **PostgreSQL** 14+ (for the API)
- An **OpenAI-compatible API key** (for AI script generation)

### 1. Clone the repository

```bash
git clone https://github.com/okaadyx/speakflow.git
cd speakflow
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install and configure the API

```bash
cd api
npm install
cp .env.example .env
# Edit .env with your database and AI credentials
```

### 4. Set up the database

```bash
npx prisma generate
npx prisma db push
```

### 5. Start development servers

**Frontend** (from project root):

```bash
npm run dev
```

**API** (from `api/`):

```bash
npm run dev
```

The frontend runs at `http://localhost:5173` and the API at `http://localhost:3000` by default.

For a detailed walkthrough, see the [Getting Started Guide](docs/getting-started.md).

---

## Environment Variables

### Frontend (`.env`)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_API_BASE_URL` | Yes | Base URL for the SpeakFlow API | `http://localhost:3000/api` |

### Backend (`api/.env`)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `PORT` | No | API server port (default: `3000`) | `3000` |
| `DATABASE_URL` | Yes | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/speakflow` |
| `DIRECT_URL` | No | Direct DB URL for Prisma migrations | `postgresql://user:pass@localhost:5432/speakflow` |
| `AI_API_KEY` | Yes | API key for the AI provider | `sk-your-api-key` |
| `AI_ENDPOINT` | Yes | OpenAI-compatible API base URL | `https://api.openai.com/v1` |
| `AI_MODEL` | Yes | Model identifier for script generation | `gpt-4o-mini` |

Copy the example files to get started:

```bash
cp .env.example .env
cp api/.env.example api/.env
```

> **Never commit `.env` files or secrets to version control.**

---

## Available Scripts

### Frontend (root)

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start Vite development server with HMR |
| `build` | `npm run build` | Type-check and build for production |
| `preview` | `npm run preview` | Preview the production build locally |
| `lint` | `npm run lint` | Run ESLint across the project |

### Backend (`api/`)

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start API with hot reload via `tsx` |
| `build` | `npm run build` | Generate Prisma client and compile TypeScript |
| `start` | `npm run start` | Run the compiled production server |
| `postinstall` | `npm run postinstall` | Auto-generate Prisma client on install |

---

## Build Instructions

### Development

```bash
# Terminal 1 — Frontend
npm run dev

# Terminal 2 — API
cd api && npm run dev
```

### Production

```bash
# Frontend
npm run build
# Output: dist/

# API
cd api
npm run build
npm run start
```

### Preview

Preview the production frontend build locally:

```bash
npm run build
npm run preview
```

### Deployment

SpeakFlow is configured for [Vercel](https://vercel.com/) deployment:

1. Connect your GitHub repository to Vercel.
2. Set environment variables in the Vercel dashboard.
3. Update `vercel.json` with your production API URL.
4. Deploy — Vercel builds the frontend and can proxy `/api` routes.

See the full [Deployment Guide](docs/deployment.md) for step-by-step instructions.

---

## Project Architecture

SpeakFlow follows a **decoupled client–server architecture**:

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (React SPA)                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐ │
│  │  Views   │  │   Hooks  │  │  Local Storage State  │ │
│  └────┬─────┘  └────┬─────┘  └──────────────────────┘ │
│       │              │                                   │
│       └──────┬───────┘                                   │
│              ▼                                           │
│       ┌─────────────┐                                    │
│       │ API Service │  (Axios + TanStack Query)          │
│       └──────┬──────┘                                    │
└──────────────┼──────────────────────────────────────────┘
               │ HTTPS
               ▼
┌──────────────────────────────────────────────────────────┐
│              Express API (Node.js)                        │
│  ┌──────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │  Routes  │→ │ Controllers  │→ │  AI Service     │  │
│  └──────────┘  └──────┬───────┘  │  (LangChain)    │  │
│                       │           └─────────────────┘  │
│                       ▼                                 │
│                ┌─────────────┐                          │
│                │   Prisma    │→ PostgreSQL             │
│                └─────────────┘                          │
└──────────────────────────────────────────────────────────┘
```

**Key design decisions:**

- **Client-side state** for scripts and practice logs via `localStorage` for instant, offline-friendly access.
- **Server-side AI generation** to keep API keys secure and enable consistent prompt engineering.
- **View-based routing** with React state (no client-side router) for a lightweight SPA.
- **Component-driven UI** with reusable primitives inspired by shadcn/ui patterns.

Read the full [Architecture Guide](docs/architecture.md) for deeper technical details.

---

## UI Design Principles

SpeakFlow's interface is guided by these principles:

1. **Clarity over decoration** — Content is the hero; UI chrome stays minimal during practice.
2. **Glassmorphism with purpose** — Frosted surfaces create depth without obscuring readability.
3. **Consistent accent palette** — Indigo (`#4F46E5`) anchors both light and dark themes.
4. **Typography hierarchy** — Outfit for display headings, Inter for body text.
5. **Motion with intent** — Subtle transitions and scroll animations enhance focus, never distract.
6. **Responsive by default** — Mobile-first layouts that scale gracefully to large displays.
7. **Accessible contrast** — WCAG-aware color tokens for text, surfaces, and interactive states.

---

## Performance Optimizations

| Optimization | Implementation |
|--------------|----------------|
| **RAF-based scrolling** | Auto-scroll runs outside the React render cycle via `requestAnimationFrame` |
| **Ref-synchronized state** | Play/pause and speed values stored in refs to avoid re-render thrashing |
| **ResizeObserver** | Reactive layout measurement without polling |
| **Compositor-friendly transforms** | Opacity and `scale` for line highlighting — no layout shifts |
| **Code splitting ready** | Vite's ES module bundling with tree-shaking |
| **Local-first data** | Scripts and logs persist in `localStorage` for zero-latency reads |
| **CSS custom properties** | Theme tokens enable instant light/dark switching without JS recalculation |

---

## Accessibility

SpeakFlow is built with accessibility in mind:

- **Semantic HTML** — Proper heading hierarchy, landmarks, and button elements
- **Keyboard-friendly controls** — All interactive elements are focusable and operable
- **Visible focus states** — Ring indicators on form inputs and interactive components
- **Color contrast** — Theme tokens designed for readable text in both light and dark modes
- **Screen reader labels** — `title` attributes on icon-only controls
- **Reduced motion respect** — CSS transitions can be extended with `prefers-reduced-motion` queries
- **Responsive text sizing** — Five font presets with mobile-optimized defaults

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Exit fullscreen | `Esc` |
| Toggle browser fullscreen | `F11` (browser-dependent) |
| Play / Pause auto-scroll | Use on-screen controls |
| Restart from beginning | Use on-screen controls |
| Open prompter settings | Use on-screen controls |

> Dedicated keyboard shortcut bindings for play/pause and speed control are planned for a future release.

---

## Browser Support

| Browser | Minimum Version | Status |
|---------|----------------|--------|
| Chrome | 100+ | ✅ Fully supported |
| Firefox | 100+ | ✅ Fully supported |
| Safari | 15+ | ✅ Fully supported |
| Edge | 100+ | ✅ Fully supported |
| Mobile Safari | iOS 15+ | ✅ Supported |
| Chrome Android | Latest | ✅ Supported |

> Fullscreen API and `localStorage` are required. Internet Explorer is not supported.

---

## Roadmap

| Feature | Status | Description |
|---------|--------|-------------|
| Voice Recording | 🔜 Planned | Capture and replay practice sessions |
| AI Feedback | 🔜 Planned | AI-powered delivery and content suggestions |
| Pronunciation Analysis | 🔜 Planned | Speech-to-text pronunciation scoring |
| Cloud Sync | 🔜 Planned | Sync scripts and history across devices |
| Authentication | 🔜 Planned | User accounts with secure sign-in |
| Workspace Support | 🔜 Planned | Organize scripts into workspaces |
| Team Collaboration | 🔜 Planned | Shared scripts and team practice rooms |
| Mobile App | 🔜 Planned | Native iOS and Android applications |
| Offline Support | 🔜 Planned | Full offline mode with service workers |
| Keyboard Shortcuts | 🔜 Planned | Global hotkeys for teleprompter controls |

---

## Contributing

We welcome contributions from the community! Please read our [Contributing Guide](CONTRIBUTING.md) before submitting a pull request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## Author

**Aajad Yadav** — Developer

| | |
|---|---|
| Portfolio | [okaadyx.vercel.app](https://okaadyx.vercel.app) |
| GitHub | [@okaadyx](https://github.com/okaadyx) |
| LinkedIn | [aajad-yadav](https://www.linkedin.com/in/aajad-yadav/) |

---

## Support

- **Documentation** — Browse the [docs/](docs/) folder
- **Issues** — [GitHub Issues](https://github.com/okaadyx/speakflow/issues)
- **Email** — [support@speakflow.app](mailto:support@speakflow.app)
- **Security** — [security@speakflow.app](mailto:security@speakflow.app) (see [SECURITY.md](SECURITY.md))

---

## Acknowledgements

SpeakFlow is made possible by the open-source community and these incredible projects:

- [React](https://react.dev/) · [Vite](https://vite.dev/) · [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) · [Lucide](https://lucide.dev/) · [TanStack Query](https://tanstack.com/query)
- [Express](https://expressjs.com/) · [Prisma](https://www.prisma.io/) · [LangChain](https://js.langchain.com/)

Thank you to every contributor, tester, and open-source maintainer who makes projects like this possible.

---

<div align="center">

**Built with care by [Aajad Yadav](https://okaadyx.vercel.app)**

⭐ Star this repo if SpeakFlow helps you speak with confidence!

</div>
