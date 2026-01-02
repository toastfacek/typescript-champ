# AGENTS.md

## Overview
- CodeHabit: Vite + React + TypeScript learning app with gamified sessions, XP/streaks, and AI-powered exercises (TypeScript + Python). Backend is Express using Google Gemini for generation.
- Path alias: `@/` resolves to `src/`.

## Dev Commands
- Frontend: `npm install`, `npm run dev` (http://localhost:5173), `npm run build`, `npm run lint`.
- Backend: `cd server && npm install && npm run dev` (http://localhost:3001), `npm run typecheck`. Node >= 20 for the server.

## Environment
- Root `.env.local`: `VITE_API_URL` (backend URL), optional `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
- `server/.env`: `GOOGLE_API_KEY` or `GEMINI_API_KEY`, `FRONTEND_URL`, `PORT` (set by Railway in deploys).

## Frontend Architecture
- Lesson content lives in `src/content/modules/**`; each lesson file exports `Lesson` with `steps` (instruction | code-exercise | fill-in-blank | quiz). `src/content/modules/index.ts` aggregates; `curriculum.ts` re-exports.
- Key concepts glossary: lessons can define `keyConcepts`; rendered by `components/lesson/KeyConceptsPanel.tsx` via `LessonPlayer`.
- State (Zustand, localStorage-backed): `store/index.ts` (progress/XP/streaks), `store/practice-store.ts` (practice sessions + exercise queue), `store/recap-store.ts` (pre-generated recap cache, 7-day TTL), `store/vibe-tutor-store.ts` (Supabase-backed project persistence).
- Code execution: TypeScript via `lib/typescript-runner.ts` + worker; Python via `lib/python-runner.ts` with Pyodide; Pyodide loader in `lib/pyodide-loader.ts`.

## Backend (server/)
- Routes: `routes/exercise.ts` (`/generate`, `/generate-batch`, `/generate-focused`, `/generate-recap`), `routes/goal.ts`.
- Services: `services/gemini.ts` (Gemini client), `services/validator.ts` (schema + security validation). Prompts in `prompts/` by exercise type.
- Batch generation defaults: 5 exercises, 3 concurrent max.
- Railway-friendly: binds `0.0.0.0`; `PORT` env required.

## Supabase/Database
- Migrations in `supabase/migrations/` (includes `profiles`, `user_progress`, `lesson_progress`, `practice_stats`, `studio_projects` tables). Use Supabase SQL editor to apply.
- Auth setup for Supabase: enable Email provider and set Site URL to `http://localhost:5173` in dev.

## Design Notes
- Colors: primary teal `#0ea5e9`, secondary orange `#f97316`; typography: Inter (UI) + JetBrains Mono (code); Tailwind for styling.
