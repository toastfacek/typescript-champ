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
- `store/vibe-tutor-store.ts` - Vibe Tutor: custom project persistence via Supabase

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

**Speed Sprint Drills**: Fast-paced, card-based fundamental drilling (think "Kumon for coding"):
- **UI/UX**: Full-screen card view with single challenge per card
  - `components/drill/SprintCardView.tsx` - Main card component with compact Monaco editor (~150-200px)
  - `components/drill/DrillProgressHeader.tsx` - Fixed header showing progress, correct/wrong counts, timer
  - `components/drill/CorrectFeedback.tsx` - Green checkmark animation + XP float-up (1.5s celebration)
  - `components/drill/SolutionReveal.tsx` - Slide-up overlay comparing user code vs solution (3s auto-advance)

- **Session Flow**: Fast check/next cycle optimized for rapid drilling
  1. User enters code in mini editor → clicks "Check Answer"
  2. Silent test validation via `lib/typescript-runner.ts` or `lib/python-runner.ts` (new `runTestsSilently()` function)
  3. If correct: Celebration animation → award 15 XP → auto-advance to next card (1.5s)
  4. If wrong: Add to "wrong pile" → show solution overlay → auto-advance (3s) or manual continue
  5. Session completion → navigate to comprehensive summary page

- **Wrong Answer Tracking**:
  - Each wrong answer stored with: exercise, user code, solution code, test results, time spent
  - Tracked in `practice-store.ts` via `wrongPile: WrongAnswer[]` state
  - Persisted to localStorage (Zustand middleware) for session restoration

- **Post-Sprint Summary** (`pages/DrillSummaryPage.tsx`):
  - Session stats: X/Y correct, total time, XP earned
  - Topic breakdown grid: Accuracy % per topic (e.g., "Arrays: 2/5 correct, 40%")
  - Concept gap insights: Pattern matching identifies repeated mistakes (e.g., "Struggled with array methods")
  - Wrong answer carousel: Flip through each mistake with side-by-side code comparison
  - Action buttons: Retry wrong answers, start new sprint, focused practice on weak topics

- **Analytics Engine** (`lib/drill-analytics.ts`):
  - `analyzeDrillSession()` - Generates comprehensive DrillSummary from session data
  - `identifyConceptGaps()` - Pattern matching on wrong answers to detect recurring issues
  - `generateRecommendations()` - Actionable suggestions based on gaps and topic accuracy
  - Client-side only (no backend calls) for instant summary generation

- **Key Types** (`types/drill-cards.ts`):
  - `DrillCardSession` - Session state with correct/wrong counts, topic accuracy tracking
  - `WrongAnswer` - Exercise + user code + solution + test results + metadata
  - `DrillSummary` - Post-sprint analytics (session stats, wrong pile, concept gaps, recommendations)
  - `ConceptGap` - Identified weakness with occurrences, related topics, difficulty level
  - `TopicAccuracy` - Per-topic stats (attempted, correct, accuracy %)

- **Module Progression**: XP-gated unlocking system
  - TypeScript: 8 modules (Fundamentals, Functions, Objects, Arrays, Advanced Types, Generics, Async, AI)
  - Python: 7 modules (Basics, Control Flow, Functions, Data Structures, Strings, OOP, AI)
  - Unlock thresholds: 0, 120, 270, 450, 650, 900, 1200, 1500 XP
  - Managed by `store/sprints-store.ts` (module progress, unlocks) + `practice-store.ts` (session execution)

- **Pre-generation**: All exercises loaded upfront for smooth UX
  - Config: `constants/sprint-config.ts` (PRE_GENERATE_ALL: true, BATCH_SIZE: 5, MAX_CONCURRENT: 3)
  - 8-15 exercises per module (2-4 lines, single concept, 30-60s each)
  - One loading screen at start, then instant card transitions

- **State Management**: Dual-store architecture
  - `practice-store.ts` - Session execution, exercise queue, wrong pile, drill card state, analytics
  - `sprints-store.ts` - Module progression, unlock status, per-module XP tracking

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
- Bonus XP: Awards 5-10 XP for completing recap exercises

**Vibe Tutor**: Dynamic course generator for building mini-projects:
- **Scoping UI**: `components/vibe-tutor/VibeTutorScoping.tsx` - Chat-based interface to refine project ideas
- **Projects Dashboard**: `pages/ProjectsPage.tsx` - List and manage cloud-synced projects
- **Workspace**: `pages/VibeTutorPage.tsx` - AI-guided build environment with roadmap and code editor
- **Persistence**: Projects stored in `studio_projects` table on Supabase (syncs files, modules, and progress)
- **State Management**: `vibe-tutor-store.ts` handles cloud CRUD and active session state

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

// Sprint drill types (src/types/drill-cards.ts)
interface DrillCardSession {
  sessionId: string
  moduleId: string
  moduleTitle: string
  language: 'typescript' | 'python'
  startedAt: Date
  totalCards: number
  correctCount: number
  wrongCount: number
  topicAccuracy: Record<PracticeTopic, TopicAccuracy>  // Per-topic stats
}

interface WrongAnswer {
  exerciseId: string
  exercise: PracticeExercise     // Full exercise data
  userCode: string                // User's incorrect attempt
  solutionCode: string            // Correct solution
  testResults: TestResult[]       // Which tests failed
  attemptedAt: Date
  timeSpentSeconds: number
}

interface DrillSummary {
  session: DrillCardSession
  wrongPile: WrongAnswer[]        // All mistakes for review
  conceptGaps: ConceptGap[]       // Identified weaknesses
  recommendations: string[]       // "Practice more X", "Review Y"
}

interface ConceptGap {
  concept: string                 // e.g., "array methods"
  occurrences: number            // How many times failed
  relatedTopics: PracticeTopic[] // Which topics to practice
  difficulty: 'minor' | 'moderate' | 'significant'
}

interface TopicAccuracy {
  topic: PracticeTopic
  attempted: number
  correct: number
  accuracyPercent: number
}
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

-- Studio Projects
CREATE TABLE studio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  language TEXT NOT NULL CHECK (language IN ('typescript', 'python')),
  modules JSONB NOT NULL DEFAULT '[]',
  current_module_id TEXT,
  current_step_id TEXT,
  files JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

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
