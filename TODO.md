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

### Key Concepts Glossary Panel ✅ (Dec 2024)
- [x] **Type System**: Added `KeyConcept` interface and `keyConcepts` field to `Lesson` type
- [x] **UI Component**: Created `KeyConceptsPanel.tsx` with floating panel, accordion expansion, and concept details
- [x] **Integration**: Integrated panel into `LessonPlayer` component
- [x] **Content**: Added key concepts to Foundation lessons (01-15) and Intermediate lessons (16-31):
  - [x] Foundation lessons (01-15): All lessons include key concepts covering foundational programming concepts
  - [x] Intermediate lessons (16-31): All lessons include key concepts for advanced TypeScript topics

### Practice Mode MVP ✅ (Dec 2024)
- [x] **Backend API (Railway-ready)**
  - Express server with CORS (`server/src/index.ts`)
  - Gemini API wrapper (`server/src/services/gemini.ts`)
  - Exercise validation with security checks (`server/src/services/validator.ts`)
  - Exercise generation endpoints (`server/src/routes/exercise.ts`):
    - `/generate` - Single exercise
    - `/generate-batch` - Batch generation (5 exercises)
    - `/generate-focused` - Focused practice mini-lessons
    - `/generate-recap` - Quick recap exercises
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

### Key Concepts Glossary - Remaining Work
- [x] Add key concepts to remaining Foundation lessons (05-15):
  - [x] 05-parameters-defaults.ts (Optional Parameters, Default Parameters, Required Parameters)
  - [x] 06-arrow-functions.ts (Arrow Functions, this binding, Implicit Returns)
  - [x] 07-function-types.ts (Function Types, Type Aliases, Higher-Order Functions)
  - [x] 08-object-types.ts (Object Types, Property Types, Nested Objects)
  - [x] 09-interfaces.ts (Interfaces, Interface Extension, Interface vs Type)
  - [x] 10-optional-readonly.ts (Optional Properties, Readonly Properties, Partial/Readonly utilities)
  - [x] 11-type-vs-interface.ts (Type Aliases, Interface Declaration Merging, When to Use Each)
  - [x] 12-typed-arrays.ts (Array Types, Array Syntax, Array Initialization)
  - [x] 13-array-methods.ts (Array Methods, map/filter/reduce, Method Chaining)
  - [x] 14-tuples.ts (Tuples, Fixed-Length Arrays, Tuple Destructuring)
  - [x] 15-records-maps.ts (Record Type, Map Type, Object vs Map)
- [x] Add key concepts to Intermediate lessons (16-31) as they're created
- [ ] Add key concepts to AI/Agent lessons (32-63) as they're created

**Implementation Notes for Key Concepts**:
- Review each lesson's content to identify foundational concepts that beginners might not know
- Focus on: programming basics (what is X?), syntax explanation (what does Y mean?), and context (why do we need Z?)
- Follow the pattern from lessons 01-04: 2-6 concepts per lesson, each with definition, syntax, example, and "why it matters"
- Concepts should explain prerequisite knowledge, not just repeat lesson content
- Use plain language suitable for absolute beginners

### Practice Mode - Remaining Work
- [x] Deploy server to Railway with `GOOGLE_API_KEY` (migrated from Claude to Gemini)
- [x] Set `VITE_API_URL` in frontend to Railway URL
- [x] Test end-to-end exercise generation
- [x] Add batch exercise generation (5 exercises pre-loaded per session)
- [x] Practice XP integration (50% of normal XP)

### Goal-Driven Learning Paths
- [ ] GoalSetupPage with goal input and path preview
- [ ] LearningPathPage for path navigation
- [ ] Learning path store (`src/store/learning-path-store.ts`)
- [ ] Content personalization with theme context
- [ ] Manual skip functionality for known topics

---

## Upcoming Phases

### Phase 2: TypeScript Execution Improvements
- [x] Create TypeScript Web Worker for background compilation
- [x] Add real-time type error highlighting in CodeMirror
- [x] Improve test runner with better error messages
- [ ] Add TypeScript autocomplete support

### Phase 3: Progress System (Supabase)
- [x] Set up Supabase database tables
- [x] Add Row Level Security policies
- [x] Create progress service to sync with Supabase
- [x] Resume lesson from last step on page load
- [x] Track time spent per lesson

### Phase 4: Gamification Enhancements
- [x] Achievement definitions and unlock logic (types defined in `gamification.ts`, but unlock logic not implemented)
- [ ] Achievement popup component with animations
- [ ] Sound effects for milestones (setting exists but no implementation)
- [x] Daily goal system (setting exists and synced to Supabase, but UI display not implemented)

### Phase 5: AI Hints
- [ ] Create Supabase Edge Function for Gemini API proxy (Gemini used in Express backend, not Edge Function)
- [ ] AI hint hook with rate limiting
- [ ] Contextual hint display UI (static hints exist, but not AI-generated contextual hints)
- [ ] Track AI hint usage for analytics

### Phase 6: Content Creation
**Sprint 1: Foundations (Lessons 1-15)** ✅ **COMPLETE**
- [x] Module 1: Getting Started (3 lessons) - Hello TypeScript, Basic Types, Type Inference
- [x] Module 2: Functions (4 lessons) - Function Basics, Parameters & Defaults, Arrow Functions, Function Types
- [x] Module 3: Objects & Interfaces (4 lessons) - Object Types, Interfaces, Optional & Readonly, Type vs Interface
- [x] Module 4: Arrays & Collections (4 lessons) - Typed Arrays, Array Methods, Tuples, Records & Maps
- [x] **Curriculum Refactor**: Modular file structure implemented
  - [x] Each lesson in its own file (`src/content/modules/[module-name]/[lesson-id].ts`)
  - [x] Module index files aggregating lessons
  - [x] Main aggregator at `src/content/modules/index.ts`
  - [x] `curriculum.ts` reduced from ~3,400 lines to 12 lines (thin re-export layer)
  - [x] Scalable architecture ready for 48 more lessons

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

### Welcome Recap Feature (Dec 2025)

**Purpose**: Show a pre-generated recap card on the home page with a bite-sized exercise from the user's most challenging recent lesson, helping reinforce concepts and providing a quick practice opportunity.

**Architecture**:
```
src/
├── types/
│   └── recap.ts                      # RecapCache, GenerateRecapRequest, ChallengeScore
├── lib/
│   └── challenge-scorer.ts          # Challenge scoring algorithm
├── store/
│   └── recap-store.ts                # Recap cache state with pre-generation
├── components/home/
│   ├── WelcomeRecapCard.tsx          # Recap card with exercise
│   └── ResumeLessonCard.tsx           # Fallback for in-progress lessons
└── pages/
    └── HomePage.tsx                   # Integrates recap/resume cards

server/
└── src/
    ├── routes/
    │   └── exercise.ts               # POST /api/exercise/generate-recap
    └── prompts/
        └── recap-exercise.ts          # Quick recap exercise prompt
```

**Features**:
- **Zero LLM calls on home page load**: Exercises pre-generated during lesson completion
- **Challenge scoring**: Prioritizes recent, difficult, or retried lessons (recency × attempts × difficulty × mastery boost)
- **Regeneration**: After completing a recap, automatically generates a new exercise for the same concept
- **Fallback**: Shows ResumeLessonCard if no cache exists but user has in-progress lesson
- **7-day TTL**: Cache expires after 7 days
- **Bonus XP**: Awards 5-10 XP for completing recap exercises

**Flow**:
1. User completes a lesson → challenge score calculated
2. If score > current cache score → background API call generates recap exercise
3. Home page loads → shows WelcomeRecapCard if valid cache exists
4. User completes recap → awards XP, triggers regeneration for same concept
5. Next visit → shows fresh exercise on same topic

**Status**: ✅ Complete and integrated

### Key Concepts Glossary Panel (Dec 2024)

**Purpose**: Help beginners understand foundational programming concepts, syntax, and context without disrupting lesson flow.

**Architecture**:
```
src/
├── types/
│   └── lesson.ts                    # KeyConcept interface, keyConcepts field on Lesson
├── components/lesson/
│   ├── KeyConceptsPanel.tsx         # Floating panel with accordion UI
│   └── LessonPlayer.tsx             # Renders panel when keyConcepts exist
└── content/modules/
    └── [module]/[lesson].ts         # Each lesson defines keyConcepts array
```

**Features**:
- Floating panel in bottom-right corner (collapsible)
- Accordion expansion for each concept
- Displays: definition, syntax pattern, code example with explanation, "why it matters" context
- Badge showing concept count
- Stays accessible throughout entire lesson
- Uses existing design tokens (glass effect, surface colors)

**Content Structure**:
Each `KeyConcept` includes:
- `term`: Concept name (e.g., "Variable")
- `definition`: Plain-language explanation
- `syntax`: Optional syntax pattern
- `example`: Code example with explanation
- `whyItMatters`: Real-world context and importance

**Status**: Implemented for lessons 01-04. Remaining lessons need key concepts added.

### Practice Mode Architecture
```
server/
├── src/
│   ├── index.ts                    # Express app (0.0.0.0 binding for Railway)
│   ├── routes/
│   │   ├── exercise.ts             # POST /api/exercise/generate, /generate-batch
│   │   └── goal.ts                 # POST /api/goal/analyze
│   ├── services/
│   │   ├── gemini.ts               # Gemini API wrapper
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
4. Backend generates exercises with Gemini (3 concurrent max to avoid rate limits)
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
