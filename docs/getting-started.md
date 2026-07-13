# Getting Started with SpeakFlow

Welcome to **SpeakFlow** — your AI-powered teleprompter for confident public speaking. This guide walks you through setting up the project locally and running your first practice session.

---

## Prerequisites

Before you begin, ensure you have the following installed:

| Tool | Version | Check |
|------|---------|-------|
| Node.js | 20.x+ | `node --version` |
| npm | 10.x+ | `npm --version` |
| PostgreSQL | 14+ | `psql --version` |
| Git | Latest | `git --version` |

You will also need an **OpenAI-compatible API key** for AI script generation.

---

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/okaadyx/speakflow.git
cd speakflow
```

### 2. Install Dependencies

```bash
# Frontend
npm install

# Backend
cd api
npm install
cd ..
```

### 3. Configure Environment Variables

```bash
# Frontend
cp .env.example .env

# Backend
cp api/.env.example api/.env
```

Edit `api/.env` with your credentials:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/speakflow
AI_API_KEY=sk-your-api-key-here
AI_ENDPOINT=https://api.openai.com/v1
AI_MODEL=gpt-4o-mini
```

### 4. Set Up the Database

```bash
cd api
npx prisma generate
npx prisma db push
cd ..
```

### 5. Start Development Servers

Open two terminal windows:

**Terminal 1 — Frontend:**

```bash
npm run dev
```

**Terminal 2 — API:**

```bash
cd api && npm run dev
```

### 6. Open SpeakFlow

Navigate to [http://localhost:5173](http://localhost:5173) in your browser.

---

## Your First Practice Session

1. **Enter a prompt** on the home screen — e.g., *"Write a 2-minute speech about the importance of clear communication."*
2. **Select a category** pill (English Speaking, Storytelling, etc.) for tailored suggestions.
3. Click **Generate with AI** to create a script, or **Start Writing** to compose manually.
4. Once your script is ready, click **Practice** to enter the teleprompter studio.
5. Adjust **font size**, **scroll speed**, and **mirror mode** in the settings drawer.
6. Press **Play** to start auto-scrolling and rehearse your delivery.
7. Click **Finish & Log Practice** to save your session to practice history.

---

## Project Structure Overview

| Path | Description |
|------|-------------|
| `src/components/views/` | Page-level views (Home, Teleprompter, Editor, etc.) |
| `src/components/ui/` | Reusable UI primitives (Button, Card, Sheet, etc.) |
| `src/hooks/` | Custom React hooks |
| `src/service/` | API client layer |
| `api/src/` | Express backend source code |
| `api/prisma/` | Database schema and migrations |

---

## Next Steps

- Read the [Features Guide](features.md) for a complete feature overview
- Explore the [Architecture Guide](architecture.md) for technical details
- Follow the [Deployment Guide](deployment.md) to deploy to production
- Check the [FAQ](faq.md) for common questions
- Visit [Troubleshooting](troubleshooting.md) if you run into issues

---

## Getting Help

- [GitHub Issues](https://github.com/okaadyx/speakflow/issues)
- [Contributing Guide](../CONTRIBUTING.md)
- Email: [support@speakflow.app](mailto:support@speakflow.app)
