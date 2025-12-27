# CodeHabit

Build your coding habit through interactive, gamified lessons. Learn TypeScript, Python, and more with hands-on practice and AI-powered exercises.

> **Vision**: Like Duolingo, but for coding—with real depth. Each session is designed for focused 25-minute learning blocks with interactive tutorials, hands-on exercises, and immediate feedback.

## Features

- 🎯 **Multi-Language Support**: Learn TypeScript and Python (with more languages coming)
- 🎮 **Gamification**: Earn XP, maintain streaks, and level up as you learn
- 🤖 **AI-Powered Practice**: Generate unlimited practice exercises with AI
- 📚 **Structured Curriculum**: Step-by-step lessons with code exercises, quizzes, and fill-in-the-blank challenges
- 💻 **In-Browser Execution**: Write and run code directly in your browser
- 📖 **Key Concepts Glossary**: Expandable glossary panel for foundational concepts
- 🔄 **Welcome Recap**: Pre-generated recap exercises on home page from your most challenging recent lessons
- ⚡ **Zero-Load LLM Calls**: Recap exercises pre-generated during lesson completion for instant home page loading
- 🎨 **Vibe Tutor**: Generate entire custom learning paths for your project ideas with AI guidance and cloud persistence

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- (Optional) Supabase account for cloud sync
- (Optional) Google Gemini API key for AI-powered practice

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd typescript-champ

# Install dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### Development

```bash
# Start frontend dev server
npm run dev
# Opens at http://localhost:5173

# Start backend API server (in another terminal)
cd server
npm run dev
# Runs at http://localhost:3001
```

### Building

```bash
# Build frontend
npm run build

# Type check backend
cd server
npm run typecheck
```

## Project Structure

```
├── src/
│   ├── components/        # React components
│   │   ├── editor/        # Code editor components
│   │   ├── home/         # Home page components (WelcomeRecapCard, ResumeLessonCard)
│   │   ├── lesson/        # Lesson step components
│   │   ├── practice/      # Practice mode components
│   │   ├── vibe-tutor/    # Vibe Tutor components (VibeTutorScoping)
│   │   └── ui/           # Reusable UI components
│   ├── content/           # Lesson content
│   │   └── modules/      # Organized by module
│   │       ├── 01-getting-started/    # TypeScript modules
│   │       └── python-01-basics/      # Python modules
│   ├── lib/              # Core utilities
│   │   ├── challenge-scorer.ts      # Challenge scoring for recap feature
│   │   ├── typescript-runner.ts      # TypeScript execution
│   │   ├── python-runner.ts          # Python execution (Pyodide)
│   │   └── pyodide-loader.ts         # Pyodide initialization
│   ├── store/            # Zustand state management
│   │   ├── index.ts                  # Main app state
│   │   ├── practice-store.ts         # Practice mode state
│   │   ├── recap-store.ts           # Welcome recap cache state
│   │   └── vibe-tutor-store.ts      # Vibe Tutor cloud sync state
│   ├── pages/            # Page components
│   └── types/            # TypeScript type definitions
├── server/               # Express API server
│   ├── src/
│   │   ├── routes/       # API routes
│   │   │   └── exercise.ts  # Exercise generation endpoints (generate, generate-batch, generate-focused, generate-recap)
│   │   ├── services/    # Business logic
│   │   └── prompts/     # AI prompts (code-exercise, fill-blank, quiz, focused-practice, recap-exercise)
└── public/               # Static assets
```

## Environment Variables

### Frontend

Create `.env.local`:

```env
VITE_API_URL=http://localhost:3001
VITE_SUPABASE_URL=your_supabase_url  # Optional
VITE_SUPABASE_ANON_KEY=your_supabase_key  # Optional
```

### Backend

Create `server/.env`:

```env
GOOGLE_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173
PORT=3001
```

## Technologies

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **State Management**: Zustand
- **Code Execution**: TypeScript Compiler (Web Worker), Pyodide (Python)
- **Backend**: Express, Gemini API
- **Database**: Supabase (optional, falls back to localStorage)

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

[Add your license here]


## Supabase Setup (Optional)

Complete this guide to enable cloud sync, magic link auth, and progress tracking across devices.

### 1. Create Project
1. Go to [supabase.com](https://supabase.com) and create a new project.
2. In **Project Settings > API**, copy your **Project URL** and **anon/public key**.

### 2. Configure Environment
Create `.env.local` in the root directory:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_API_URL=http://localhost:3001
```

### 3. Run Migrations
Run the SQL in `supabase/migrations/001_initial_schema.sql` in the Supabase SQL Editor to create tables:
- `profiles` & `user_settings`
- `user_progress` & `lesson_progress`
- `practice_stats`
- `studio_projects` (run `005_studio_projects.sql`)

### 4. Auth Settings
1. Enable **Email** provider in Authentication > Providers.
2. Set **Site URL** in Authentication > URL Configuration to `http://localhost:5173` (dev) or your production URL.

---
