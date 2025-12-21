# TypeScript Champ

An interactive TypeScript learning platform with 25-minute sessions, gamification, and AI-powered hints. Built for beginners who want to learn TypeScript for AI/agentic systems.

## Vision

Like Duolingo, but for coding — with real depth. Each session is designed for focused 25-minute learning blocks with interactive tutorials, hands-on exercises, and immediate feedback.

## Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Styling:** Tailwind CSS (gamified/playful theme)
- **Editor:** CodeMirror 6
- **State:** Zustand (with localStorage persistence)
- **Backend:** Supabase (auth, database, edge functions)
- **AI:** Claude API for contextual hints

## Current Status

### Completed (Phase 1)

- [x] Project setup (Vite + React + TypeScript)
- [x] Tailwind CSS with custom theme (primary teal, secondary orange)
- [x] React Router with page structure
- [x] Zustand store with localStorage persistence
- [x] CodeMirror editor integration
- [x] UI components (Button, Card, ProgressBar, Badge)
- [x] Gamification components (XPCounter, StreakBadge)
- [x] LessonPlayer with step navigation
- [x] Instruction steps with markdown-like rendering
- [x] Code exercise steps with test validation
- [x] Fill-in-the-blank exercises
- [x] Quiz questions with explanations
- [x] Lesson completion with confetti celebration
- [x] 3 starter lessons:
  - Hello, TypeScript!
  - Basic Types
  - Type Inference

## Running the App

```bash
npm install
npm run dev
# Open http://localhost:5173
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # Button, Card, ProgressBar, Badge
│   ├── editor/          # CodeEditor, OutputPanel
│   ├── lesson/          # LessonPlayer, step components
│   ├── gamification/    # XPCounter, StreakBadge
│   └── navigation/      # Header
├── pages/               # HomePage, LessonPage, CurriculumPage, ProfilePage
├── hooks/               # Custom React hooks
├── lib/                 # Supabase client, utilities
├── store/               # Zustand state management
├── types/               # TypeScript type definitions
├── content/             # Lesson content (curriculum.ts)
└── styles/              # Global CSS
```

## Lesson Format

Lessons are defined in `src/content/curriculum.ts` with these step types:

1. **instruction** - Tutorial content with optional code examples
2. **code-exercise** - Write code, validated by test cases
3. **fill-in-blank** - Complete partial code
4. **quiz** - Multiple choice questions

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
