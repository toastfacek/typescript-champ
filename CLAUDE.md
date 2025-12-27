# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CodeHabit is an interactive coding learning platform modeled after Duolingo. It features 25-minute learning sessions, gamification (XP, streaks, levels), and AI-powered exercise generation using Gemini API. The platform supports multiple programming languages, currently TypeScript and Python.

## Commands

```bash
# Frontend (Vite + React)
npm install
npm run dev          # Start dev server at http://localhost:5173
npm run build        # TypeScript check + Vite build
npm run lint         # ESLint

# Backend API server (Express + Gemini API)
cd server
npm install
npm run dev          # Start API at http://localhost:3001
npm run typecheck    # TypeScript check without building
```

## Architecture

### Frontend (src/)

**State Management**: Three Zustand stores with localStorage persistence:
- `store/index.ts` - Main app state: user progress, XP, streaks, lesson completion
- `store/practice-store.ts` - Practice mode: sessions, AI-generated exercises, mastery tracking
- `store/recap-store.ts` - Welcome recap: cached recap exercises, pre-generation on lesson completion

**Lesson System**: Modular curriculum structure for scalability:
- **Lesson Files**: Each lesson in its own file (`src/content/modules/[module-name]/[lesson-id].ts`)
- **Module Structure**:
  ```
  src/content/modules/
  ├── 01-getting-started/          # TypeScript modules
  │   ├── 01-hello-typescript.ts
  │   ├── 02-basic-types.ts
  │   ├── 03-type-inference.ts
  │   └── index.ts
  ├── 14-zod-validation/           # New AI-focused modules
  │   ├── 01-zod-basics.ts
  │   └── index.ts
  ├── python-01-basics/            # Python modules (prefixed with 'python-')
  │   ├── py-01-hello-python.ts
  │   ├── py-02-variables-types.ts
  │   └── index.ts
  └── index.ts                     # Main aggregator (imports all modules)
  ```
- **curriculum.ts**: Thin re-export layer that imports from `modules/index.ts`
- **Language Support**: Lessons can specify `language: 'typescript' | 'python'` (defaults to 'typescript')
- **Step Types**: Four discriminated union types for lessons:
  - `instruction` - Tutorial content with optional code examples
  - `code-exercise` - Write code validated by test cases
  - `fill-in-blank` - Complete partial code
  - `quiz` - Multiple choice questions

The `LessonPlayer` component renders steps via discriminated union pattern - each step type has its own component (InstructionStep, CodeExerciseStep, etc.).

- **Key Concepts Glossary**: Expandable glossary panel for foundational concepts:
  - Floating panel in bottom-right corner (`KeyConceptsPanel.tsx`)
  - Each lesson can define `keyConcepts` array with terms, definitions, syntax, examples, and "why it matters" context
  - Helps beginners understand prerequisite knowledge without disrupting lesson flow
  - Currently implemented for lessons 01-04; remaining lessons need key concepts added

**Code Execution**: User code runs in-browser:
- **TypeScript**: Via `lib/typescript-runner.ts`:
  1. Code compiled using TypeScript compiler in a Web Worker (`typescript-worker-singleton.ts`)
  2. Compiled JS executed via `new Function()`
  3. Test validation runs by appending test code to user code before execution
- **Python**: Via `lib/python-runner.ts`:
  1. Uses Pyodide (Python runtime compiled to WebAssembly)
  2. Lazy-loaded on first Python lesson access (~10MB)
  3. Captures stdout/stderr for output display
  4. Test validation uses Python assert statements

**Path Aliases**: `@/` maps to `src/` (configured in vite.config.ts and tsconfig.json)

**Welcome Recap Feature**: Pre-generated recap card on home page:
- **Location**: `components/home/WelcomeRecapCard.tsx` and `ResumeLessonCard.tsx`
- **Trigger**: Automatically generates recap exercise when user completes a lesson (if challenge score is highest)
- **Challenge Scoring**: `lib/challenge-scorer.ts` calculates scores based on recency, attempts, difficulty, and mastery level
- **Cache**: Stored in `recap-store.ts` with 7-day TTL, regenerates for same concept after completion
- **Fallback**: Shows `ResumeLessonCard` if no cache exists but user has in-progress lesson
- **LLM Optimization**: Zero LLM calls on home page load - exercises pre-generated during lesson completion

### Backend (server/)

Express API server for AI-powered exercise generation:
- `routes/exercise.ts` - Single (`/generate`), batch (`/generate-batch`), focused practice (`/generate-focused`), and recap (`/generate-recap`) exercise generation
- `routes/goal.ts` - Learning goal analysis
- `services/gemini.ts` - Gemini API client (uses `gemini-3-flash-preview`)
- `prompts/` - Structured prompts for different exercise types:
  - `code-exercise.ts` - Full code exercises with tests
  - `fill-blank.ts` - Fill-in-the-blank exercises
  - `quiz.ts` - Multiple choice questions
  - `focused-practice.ts` - Mini-lessons for focused practice
  - `recap-exercise.ts` - Quick recap exercises (2-3 min, simpler than full practice)

API runs separately from frontend. Server binds to `0.0.0.0` for Railway deployment.

**Batch Generation**: Generates 5 exercises in parallel (3 concurrent max) for instant loading. Frontend maintains a queue and auto-refills when < 2 exercises remain.

**Recap Generation**: Single exercise endpoint (`/generate-recap`) optimized for quick refreshers:
- Pre-generated during lesson completion (zero LLM calls on home page)
- Varies exercise type based on `timesCompleted` to keep content fresh
- Simpler than full practice exercises (2-3 minutes to complete)
- Awards 5-10 XP on completion

## Key Types

```typescript
// Lesson step discriminated union (src/types/lesson.ts)
type LessonStep = InstructionStep | CodeExerciseStep | FillInBlankStep | QuizStep

// Key concept for glossary panel (src/types/lesson.ts)
interface KeyConcept {
  id: string
  term: string
  definition: string
  syntax?: string
  example?: { code: string; explanation: string }
  whyItMatters?: string
}

// Lesson interface includes optional keyConcepts
interface Lesson {
  // ... other fields
  keyConcepts?: KeyConcept[]
}

// Practice topics (src/types/practice.ts)
// Topics vary by language - see src/constants/practice-topics.ts
type PracticeTopic = 'basics' | 'types' | 'functions' | 'objects' | 'arrays' | 
  'generics' | 'advanced-types' | 'async' | 'classes' |  // TypeScript
  'input-output' | 'operators' | 'control-flow' | 'data-structures'  // Python

// XP level calculation uses thresholds: [0, 100, 250, 500, 850, 1300, ...]

// Recap cache (src/types/recap.ts)
interface RecapCache {
  lessonId: string
  lessonTitle: string
  lessonLanguage: 'typescript' | 'python'
  recapContent: string        // Static - from lesson keyConcepts/description
  exercise: PracticeExercise  // Pre-generated
  generatedAt: string         // ISO date
  challengeScore: number      // Used to determine if this replaces existing cache
  timesCompleted: number      // Track recaps done for this concept
  isRegenerating: boolean     // True while fetching next exercise
}

// Challenge scoring (src/lib/challenge-scorer.ts)
// Score = (1 / daysSinceCompletion) * attemptMultiplier * difficultyWeight * masteryBoost
// Higher score = more challenging/recent, prioritized for recap
```

## Environment Variables

Frontend (`.env.local` or Railway):
- `VITE_API_URL` - Backend API URL (e.g., `https://backend-xxx.up.railway.app`)
- `VITE_SUPABASE_URL` - Supabase project URL (optional, uses localStorage without it)
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key (optional)

Backend (`.env` or Railway):
- `GOOGLE_API_KEY` or `GEMINI_API_KEY` - Google Gemini API key for exercise generation
- `FRONTEND_URL` - Frontend origin for CORS (e.g., `https://frontend-xxx.up.railway.app`)
- `PORT` - Auto-set by Railway (server reads this)

## Deployment (Railway)

Both frontend and backend are deployed on Railway:
- **Frontend**: Vite preview with `--host 0.0.0.0`, uses `allowedHosts` in vite.config.ts
- **Backend**: Express server, root directory set to `server/`, port must match Railway networking config
- CORS is configured to allow the Railway frontend URL

## Database Schema Reference

```sql
-- Users (extends Supabase auth)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User progress
CREATE TABLE user_progress (
  user_id UUID PRIMARY KEY REFERENCES profiles(id),
  total_xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE
);

-- Lesson progress
CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  lesson_id TEXT NOT NULL,
  status TEXT DEFAULT 'not-started',
  current_step_index INTEGER DEFAULT 0,
  steps_completed TEXT[] DEFAULT '{}',
  xp_earned INTEGER DEFAULT 0,
  UNIQUE(user_id, lesson_id)
);

-- Practice stats
CREATE TABLE practice_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  topic TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  attempts INTEGER DEFAULT 0,
  completed INTEGER DEFAULT 0,
  avg_time_seconds INTEGER DEFAULT 0,
  last_practiced TIMESTAMPTZ,
  UNIQUE(user_id, topic)
);
```

## Lesson Specifications (Reference)

### Standard Lesson Format (YAML/Frontmatter Style)

```typescript
// Lesson Definition in src/content/modules/[module]/[lesson].ts
export const lesson: Lesson = {
  id: 'lesson-id',
  title: 'Lesson Title',
  type: 'instruction', // or code-exercise, etc.
  // ...
  steps: [
    {
      type: 'instruction',
      title: 'Step Title',
      content: 'Markdown content...',
    },
    {
      type: 'code-exercise',
      title: 'Exercise Title',
      instructions: 'Instructions...',
      starterCode: '...',
      solutionCode: '...',
      testCases: [
        { description: 'Test 1', code: 'assertions...' }
      ]
    }
  ]
}
```

### Python Curriculum Plan

**Phase 1: Foundations (Modules 1-4)**
- Basics (Hello Python, Variables)
- Control Flow (If/Else, Loops)
- Functions (Def, Return, Lambda)
- Strings (F-strings, Slicing)

**Phase 2: Intermediate (Modules 5-10)**
- Lists, Tuples, Dictionaries, Sets
- File Handling, Error Handling
- OOP Basics, Modules & Packages

**Phase 3: AI Foundations (Modules 11-13)**
- HTTP & APIs (httpx, Pydantic)
- LLM Concepts (Tokens, Roles)
- First AI Call (OpenAI/Anthropic SDKs)

**Phase 4: Agent Building (Modules 14-16)**
- Tools & Structured Outputs
- Agent Loops (ReAct)
- Capstone Projects
