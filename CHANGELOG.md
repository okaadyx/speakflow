# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-07-13

### Added

#### AI & Content
- AI script generation from natural-language prompts via LangChain and OpenAI-compatible APIs
- Category presets: English Speaking, Storytelling, Interview Practice, Public Speaking, Presentation
- Inspiration cards with curated prompt suggestions
- Script editor with title, content, category, and estimated read time
- Manual script creation and editing workflow

#### Teleprompter Studio
- Professional teleprompter with read-optimized line formatting
- Smooth auto-scrolling powered by `requestAnimationFrame`
- Adjustable scroll speed (0.5× – 4×)
- Five responsive font size presets (T1–T5)
- Centered reading width (75%) for comfortable eye tracking
- Active-line reading guide with graduated opacity highlighting
- Focus mode styling with minimal chrome and fade gradients
- Mirror mode for physical teleprompter setups
- Fullscreen mode with native browser fullscreen API
- Play, pause, and restart controls
- Click-to-jump line navigation

#### Organization & Tracking
- Script management — create, edit, delete, and browse scripts
- Recent scripts section on the home screen
- Practice history with session logging
- WPM (words per minute) calculation and pace rating (Too Slow / Perfect / Too Fast)
- Configurable target WPM in practice settings
- Microphone recording UI with duration timer and visualizer

#### Design & Experience
- Glassmorphism UI with backdrop blur and frosted surfaces
- Light and dark theme support with consistent indigo accent palette
- Responsive design for desktop, tablet, and mobile
- Custom design token system with CSS custom properties
- Outfit display font and Inter body font
- Sticky header with navigation pills
- Animated transitions and hover effects

#### Backend API
- Express REST API with TypeScript
- Prisma ORM with PostgreSQL
- Script CRUD endpoints (`GET`, `POST`, `PUT`, `DELETE`)
- AI script generation endpoint (`POST /api/scripts/generate`)
- LangChain integration with configurable AI model and endpoint
- Teleprompter-optimized system prompts for speech generation

#### Infrastructure
- Vite 8 build tooling with React 19
- TanStack Query for server state management
- Local storage persistence for scripts and practice logs
- Vercel deployment configuration
- ESLint setup with TypeScript support

#### Documentation
- Comprehensive README with feature overview, setup, and architecture
- Contributing guidelines, Code of Conduct, and Security policy
- Extended documentation in `docs/` folder
- Environment variable templates

[1.0.0]: https://github.com/okaadyx/speakflow/releases/tag/v1.0.0
