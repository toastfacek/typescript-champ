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

**Lesson System**: Lessons are defined in `content/curriculum.ts` with four step types:
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
- `routes/exercise.ts` - Generate exercises via Claude API
- `routes/goal.ts` - Learning goal analysis
- `services/claude.ts` - Claude API client
- `prompts/` - Structured prompts for different exercise types

API runs separately from frontend - connect via `FRONTEND_URL` env var for CORS.

## Key Types

```typescript
// Lesson step discriminated union (src/types/lesson.ts)
type LessonStep = InstructionStep | CodeExerciseStep | FillInBlankStep | QuizStep

// Practice topics (src/types/practice.ts)
type PracticeTopic = 'basic-types' | 'functions' | 'objects' | 'arrays' | ...

// XP level calculation uses thresholds: [0, 100, 250, 500, 850, 1300, ...]
```

## Environment Variables

Frontend (`.env.local`):
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

Backend:
- `CLAUDE_API_KEY` - Anthropic API key for exercise generation
- `FRONTEND_URL` - Frontend origin for CORS (default: http://localhost:5173)
