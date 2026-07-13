# Features

A comprehensive guide to every feature in SpeakFlow.

---

## AI Script Generation

Generate professional speech scripts from natural-language prompts.

**How it works:**

1. Enter a topic or description in the home screen textarea.
2. Optionally select a category pill for tailored prompt suggestions.
3. Click **Generate with AI**.
4. The backend sends your prompt to an OpenAI-compatible model via LangChain.
5. A teleprompter-optimized script is returned and saved.

**AI formatting rules** (enforced by system prompt):

- Short, readable paragraphs separated by double newlines
- Conversational, spoken-word style
- Sentences under 15 words
- Delivery cues in square brackets (e.g., `[Pause]`, `[Smile]`)
- No markdown headers or bullet points

**Category presets:**

| Category | Example Prompt |
|----------|---------------|
| English Speaking | Constructive feedback in corporate environments |
| Storytelling | Learning from failure as a software engineer |
| Interview Practice | STAR-method scope-creep incident response |
| Public Speaking | Digital accessibility keynote opening |
| Presentation | SpeakFlow platform architecture overview |

---

## Professional Teleprompter

The core practice environment with read-optimized script display.

### Script Formatting

Raw script text is automatically formatted into comfortable reading lines:

- Split at sentence boundaries (`.`, `!`, `?`)
- Long sentences broken at commas, conjunctions, and word boundaries
- Maximum ~70 characters per line
- Paragraph breaks preserved with extra spacing

### Auto Scrolling

- Hardware-synchronized scrolling via `requestAnimationFrame`
- Speed range: **0.5× to 4×**
- Automatically pauses at end of script
- Play/pause toggle with visual feedback

### Reading Guide

The active line (closest to viewport center) is highlighted:

| Distance from Active | Opacity | Style |
|---------------------|---------|-------|
| Active line (0) | 100% | Accent color, 1.05× scale |
| ±1 line | 65% | Primary text |
| ±2 lines | 35% | Secondary text |
| ±3 lines | 15% | Muted text |
| ±4+ lines | 4–8% | Faded |

Click any line to jump to it with smooth scrolling.

---

## Display Controls

### Font Size

Five responsive presets accessible in the settings drawer:

| Preset | Mobile | Desktop |
|--------|--------|---------|
| T1 | `text-base` | `text-xl` |
| T2 | `text-lg` | `text-2xl` |
| T3 | `text-xl` | `text-3xl` |
| T4 | `text-2xl` | `text-4xl` |
| T5 | `text-3xl` | `text-5xl` |

### Reading Width

Scripts display in a centered **75% width** column for optimal eye tracking and reduced head movement.

### Scroll Speed

Controlled via a range slider (0.5× – 4×) with real-time speed indicator.

### Mirror Mode

Horizontally flips the script text (`scale-x-[-1]`) for use with physical teleprompter mirror rigs.

### Focus Mode

Reduces visual chrome with:

- Black background in focus state
- Fade gradients at top and bottom
- Controls that fade during playback and appear on hover

### Fullscreen Mode

- Native browser fullscreen via the Fullscreen API
- Header and footer hidden during fullscreen practice
- Body scroll locked to prevent page movement
- Exit with the on-screen button or `Esc` key

---

## Script Management

### Create Scripts

- **AI generation** — From a prompt on the home screen
- **Manual writing** — Click "Start Writing" to open the editor
- **New blank script** — From the My Scripts page

### Edit Scripts

The editor view provides:

- Title editing
- Full content textarea
- Category selection
- Auto-calculated read time
- Save and discard actions

### Organize Scripts

The My Scripts view displays all scripts with:

- Title, category badge, and content preview
- Read time estimate
- Edit, practice, and delete actions
- Grid layout with hover animations

### Recent Scripts

The home screen shows your three most recent scripts for quick access.

---

## Practice Tracking

### Session Logging

When you finish a practice session:

- **Duration** — Recorded in seconds
- **WPM** — Calculated from word count ÷ duration
- **Pace Rating** — Compared against your target WPM:
  - Too Slow (< target − 20 WPM)
  - Perfect (within ±20 WPM)
  - Too Fast (> target + 20 WPM)

### Practice History

View all past sessions with:

- Script title and date
- Duration, WPM, and pace rating
- Satisfaction score
- Delete individual log entries

### Target WPM

Configure your ideal speaking pace (80–240 WPM) in the global practice settings panel.

---

## Microphone Recording

The teleprompter includes a recording interface:

- Start/stop recording toggle
- Duration timer (MM:SS format)
- Animated sound bar visualizer
- Recording status indicator

> Full voice recording and playback is planned for a future release.

---

## Themes & Design

### Light Theme

Paper-like off-white interface (`#F9F9FB`) with clean white surfaces.

### Dark Theme

Rich charcoal interface (`#121214`) with elevated dark surfaces.

### Glassmorphism

- Frosted glass surfaces with `backdrop-blur`
- Semi-transparent backgrounds
- Subtle border highlights
- Layered depth with shadows

### Typography

- **Outfit** — Display headings and brand text
- **Inter** — Body text and UI elements

### Accent Color

Consistent indigo (`#4F46E5`) across both themes for buttons, highlights, and active states.

---

## Responsive Design

| Breakpoint | Layout |
|------------|--------|
| Mobile (< 768px) | Single column, stacked controls, compact navigation |
| Tablet (768px – 1024px) | Two-column grids, expanded navigation |
| Desktop (> 1024px) | Three-column grids, full navigation bar, wide teleprompter |

---

## Inspiration Cards

Pre-built prompt suggestions on the home screen:

| Card | Description |
|------|-------------|
| Tell a motivational story | 3-minute narrative about overcoming challenges |
| 5-minute English practice | Business idioms and clear articulation |
| Mock Interview Answers | STAR-method behavioral responses |
| Wedding Toast | Lighthearted 2-minute best man speech |

Click any card to populate the prompt textarea.

---

## Legal & Support Pages

- **About** — Project information and developer details
- **Support** — Contact and help resources
- **Privacy Policy** — Data handling practices
- **Terms & Conditions** — Usage terms

---

## Planned Features

See the [Roadmap](../README.md#roadmap) for upcoming features including voice recording, AI feedback, cloud sync, authentication, and mobile apps.
