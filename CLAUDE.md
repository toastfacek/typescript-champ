# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TypeScript Champ is an interactive TypeScript learning platform modeled after Duolingo. It features 25-minute learning sessions, gamification (XP, streaks, levels), and AI-powered exercise generation using Claude API.

## Commands

```bash
# Frontend (Vite + React)
npm install
npm run dev          # Start dev server at http://localhost:5173
npm run build        # TypeScript check + Vite build
npm run lint         # ESLint

# Backend API server (Express + Claude API)
cd server
npm install
npm run dev          # Start API at http://localhost:3001
npm run typecheck    # TypeScript check without building
```

## Architecture

### Frontend (src/)

**State Management**: Two Zustand stores with localStorage persistence:
- `store/index.ts` - Main app state: user progress, XP, streaks, lesson completion
- `store/practice-store.ts` - Practice mode: sessions, AI-generated exercises, mastery tracking

**Lesson System**: Modular curriculum structure for scalability:
- **Lesson Files**: Each lesson in its own file (`src/content/modules/[module-name]/[lesson-id].ts`)
- **Module Structure**:
  ```
  src/content/modules/
  ├── 01-getting-started/
  │   ├── 01-hello-typescript.ts
  │   ├── 02-basic-types.ts
  │   ├── 03-type-inference.ts
  │   └── index.ts                    # Aggregates lessons + module definition
  ├── 02-functions/
  │   ├── 04-function-basics.ts
  │   └── index.ts
  └── index.ts                        # Main aggregator (imports all modules)
  ```
- **curriculum.ts**: Thin re-export layer (12 lines) that imports from `modules/index.ts`
- **Step Types**: Four discriminated union types for lessons:
  - `instruction` - Tutorial content with optional code examples
  - `code-exercise` - Write code validated by test cases
  - `fill-in-blank` - Complete partial code
  - `quiz` - Multiple choice questions

The `LessonPlayer` component renders steps via discriminated union pattern - each step type has its own component (InstructionStep, CodeExerciseStep, etc.).

**TypeScript Execution**: User code runs in-browser via `lib/typescript-runner.ts`:
1. Code compiled using TypeScript compiler in a Web Worker (`typescript-worker-singleton.ts`)
2. Compiled JS executed via `new Function()`
3. Test validation runs by appending test code to user code before execution

**Path Aliases**: `@/` maps to `src/` (configured in vite.config.ts and tsconfig.json)

### Backend (server/)

Express API server for AI-powered exercise generation:
- `routes/exercise.ts` - Single (`/generate`) and batch (`/generate-batch`) exercise generation
- `routes/goal.ts` - Learning goal analysis
- `services/claude.ts` - Claude API client (uses `claude-sonnet-4-20250514`)
- `prompts/` - Structured prompts for different exercise types

API runs separately from frontend. Server binds to `0.0.0.0` for Railway deployment.

**Batch Generation**: Generates 5 exercises in parallel (3 concurrent max) for instant loading. Frontend maintains a queue and auto-refills when < 2 exercises remain.

## Key Types

```typescript
// Lesson step discriminated union (src/types/lesson.ts)
type LessonStep = InstructionStep | CodeExerciseStep | FillInBlankStep | QuizStep

// Practice topics (src/types/practice.ts)
type PracticeTopic = 'basic-types' | 'functions' | 'objects' | 'arrays' | ...

// XP level calculation uses thresholds: [0, 100, 250, 500, 850, 1300, ...]
```

## Environment Variables

Frontend (`.env.local` or Railway):
- `VITE_API_URL` - Backend API URL (e.g., `https://backend-xxx.up.railway.app`)
- `VITE_SUPABASE_URL` - Supabase project URL (optional, uses localStorage without it)
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key (optional)

Backend (Railway):
- `ANTHROPIC_API_KEY` - Anthropic API key for exercise generation
- `FRONTEND_URL` - Frontend origin for CORS (e.g., `https://frontend-xxx.up.railway.app`)
- `PORT` - Auto-set by Railway (server reads this)

## Deployment (Railway)

Both frontend and backend are deployed on Railway:
- **Frontend**: Vite preview with `--host 0.0.0.0`, uses `allowedHosts` in vite.config.ts
- **Backend**: Express server, root directory set to `server/`, port must match Railway networking config
- CORS is configured to allow the Railway frontend URL
