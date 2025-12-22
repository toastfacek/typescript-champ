# TypeScript Champ - Development TODO

## Vision Update (Dec 2024)

**New Goal**: Take learners from zero to building AI agents with TypeScript using the **Vercel AI SDK** and **Claude Agent SDK**.

See [CURRICULUM_ROADMAP.md](./CURRICULUM_ROADMAP.md) for the complete 63-lesson curriculum.

---

## Curriculum Overview

| Phase | Modules | Lessons | Focus |
|-------|---------|---------|-------|
| **Foundation** | 1-4 | 15 | TypeScript fundamentals |
| **Intermediate** | 5-8 | 16 | Async, APIs, Node.js |
| **AI Basics** | 9-11 | 12 | LLM concepts, first API calls |
| **Agent Building** | 12-15 | 16 | Tools, agents, patterns |
| **Capstone** | 16 | 4 | Build complete agents |

**Total: 16 Modules, 63 Lessons**

---

## Completed Work

### Phase 1: Core Infrastructure ✅
- [x] Project setup (React + TypeScript + Vite + Tailwind)
- [x] Lesson system with 4 step types (Instruction, CodeExercise, FillInBlank, Quiz)
- [x] TypeScript execution via Web Worker
- [x] Zustand state management with localStorage persistence
- [x] 3 starter lessons (Hello TypeScript, Basic Types, Type Inference)
- [x] Gamification basics (XP, levels, streaks)
- [x] UI component library

### Practice Mode MVP ✅ (Dec 2024)
- [x] **Backend API (Railway-ready)**
  - Express server with CORS (`server/src/index.ts`)
  - Claude API wrapper (`server/src/services/claude.ts`)
  - Exercise validation with security checks (`server/src/services/validator.ts`)
  - Exercise generation endpoint (`server/src/routes/exercise.ts`)
  - Goal analysis endpoint (`server/src/routes/goal.ts`)
  - Prompt templates for all exercise types (`server/src/prompts/`)

- [x] **Frontend Practice Mode**
  - Practice types (`src/types/practice.ts`, `src/types/learning-path.ts`)
  - Practice store with Zustand (`src/store/practice-store.ts`)
  - API client (`src/services/api-client.ts`)
  - PracticePage with topic/difficulty selection
  - PracticeSessionPage with exercise display
  - Components: TopicSelector, DifficultyPicker, ExerciseTypeSelector
  - Routes added to App.tsx, Header updated

---

## In Progress

### Practice Mode - Remaining Work
- [x] Deploy server to Railway with `ANTHROPIC_API_KEY`
- [x] Set `VITE_API_URL` in frontend to Railway URL
- [x] Test end-to-end exercise generation
- [x] Add batch exercise generation (5 exercises pre-loaded per session)
- [ ] Practice XP integration (50% of normal XP)

### Goal-Driven Learning Paths
- [ ] GoalSetupPage with goal input and path preview
- [ ] LearningPathPage for path navigation
- [ ] Learning path store (`src/store/learning-path-store.ts`)
- [ ] Content personalization with theme context
- [ ] Manual skip functionality for known topics

---

## Upcoming Phases

### Phase 2: TypeScript Execution Improvements
- [ ] Create TypeScript Web Worker for background compilation
- [ ] Add real-time type error highlighting in CodeMirror
- [ ] Improve test runner with better error messages
- [ ] Add TypeScript autocomplete support

### Phase 3: Progress System (Supabase)
- [ ] Set up Supabase database tables
- [ ] Add Row Level Security policies
- [ ] Create progress service to sync with Supabase
- [ ] Resume lesson from last step on page load
- [ ] Track time spent per lesson

### Phase 4: Gamification Enhancements
- [ ] Achievement definitions and unlock logic
- [ ] Achievement popup component with animations
- [ ] Sound effects for milestones
- [ ] Daily goal system

### Phase 5: AI Hints
- [ ] Create Supabase Edge Function for Claude API proxy
- [ ] AI hint hook with rate limiting
- [ ] Contextual hint display UI
- [ ] Track AI hint usage for analytics

### Phase 6: Content Creation
**Sprint 1: Foundations (Lessons 4-15)**
- [ ] Module 2: Functions (4 lessons)
- [ ] Module 3: Objects & Interfaces (4 lessons)
- [ ] Module 4: Arrays & Collections (4 lessons)

**Sprint 2: Intermediate (Lessons 16-31)**
- [ ] Module 5: Advanced Types (4 lessons)
- [ ] Module 6: Generics (4 lessons)
- [ ] Module 7: Async TypeScript (4 lessons)
- [ ] Module 8: Node.js & npm (4 lessons)

**Sprint 3: AI Foundations (Lessons 32-43)**
- [ ] Module 9: HTTP & APIs (4 lessons)
- [ ] Module 10: LLM Concepts (4 lessons)
- [ ] Module 11: First AI Call (4 lessons)

**Sprint 4: Agent Building (Lessons 44-59)**
- [ ] Module 12: Vercel AI SDK Basics (4 lessons)
- [ ] Module 13: Tools & Function Calling (4 lessons)
- [ ] Module 14: Agent Loops (4 lessons)
- [ ] Module 15: Claude Agent SDK (4 lessons)

**Sprint 5: Capstone (Lessons 60-63)**
- [ ] Module 16: Build Real Agents (4 lessons)

---

## New Features Implemented

### Practice Mode Architecture
```
server/
├── src/
│   ├── index.ts                    # Express app (0.0.0.0 binding for Railway)
│   ├── routes/
│   │   ├── exercise.ts             # POST /api/exercise/generate, /generate-batch
│   │   └── goal.ts                 # POST /api/goal/analyze
│   ├── services/
│   │   ├── claude.ts               # Claude API wrapper
│   │   └── validator.ts            # Schema + security validation
│   └── prompts/
│       ├── code-exercise.ts
│       ├── fill-blank.ts
│       ├── quiz.ts
│       └── goal-analysis.ts

src/
├── types/
│   ├── practice.ts                 # Practice types
│   └── learning-path.ts            # Learning path types
├── store/
│   └── practice-store.ts           # Practice session state
├── services/
│   └── api-client.ts               # API client
├── components/practice/
│   ├── TopicSelector.tsx
│   ├── DifficultyPicker.tsx
│   └── ExerciseTypeSelector.tsx
└── pages/
    ├── PracticePage.tsx
    └── PracticeSessionPage.tsx
```

### Exercise Generation Flow
1. User selects topic + difficulty + exercise type
2. Session starts → batch generation begins (5 exercises in background)
3. Frontend calls `POST /api/exercise/generate-batch` for batch or `/generate` for single
4. Backend generates exercises with Claude (3 concurrent max to avoid rate limits)
5. Backend validates each (schema + security + tests)
6. Frontend queues exercises → instant loading for subsequent exercises
7. When queue < 2, automatically fetches more in background

### Validation Rules
- Schema validation with Zod
- Security scan (no eval, fetch, DOM, Node.js APIs)
- Test cases must use throw pattern
- Solution must pass all tests

---

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

-- Learning paths
CREATE TABLE learning_paths (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  goal_description TEXT NOT NULL,
  theme_context JSONB,
  modules JSONB NOT NULL,
  progress FLOAT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Design Notes

**Color Palette:**
- Primary: Teal (#0ea5e9)
- Secondary: Orange (#f97316)
- Success: Green (#22c55e)
- Error: Red (#ef4444)

**Typography:**
- UI: Inter
- Code: JetBrains Mono

**Animations:**
- Micro-interactions on buttons
- XP counter animates on gain
- Confetti on lesson completion
- Smooth step transitions
- Shake on wrong answer
