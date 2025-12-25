# CodeHabit

Build your coding habit through interactive, gamified lessons. Learn TypeScript, Python, and more with hands-on practice and AI-powered exercises.

## Features

- 🎯 **Multi-Language Support**: Learn TypeScript and Python (with more languages coming)
- 🎮 **Gamification**: Earn XP, maintain streaks, and level up as you learn
- 🤖 **AI-Powered Practice**: Generate unlimited practice exercises with AI
- 📚 **Structured Curriculum**: Step-by-step lessons with code exercises, quizzes, and fill-in-the-blank challenges
- 💻 **In-Browser Execution**: Write and run code directly in your browser
- 📖 **Key Concepts Glossary**: Expandable glossary panel for foundational concepts

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
│   │   ├── lesson/        # Lesson step components
│   │   ├── practice/      # Practice mode components
│   │   └── ui/           # Reusable UI components
│   ├── content/           # Lesson content
│   │   └── modules/      # Organized by module
│   │       ├── 01-getting-started/    # TypeScript modules
│   │       └── python-01-basics/      # Python modules
│   ├── lib/              # Core utilities
│   │   ├── typescript-runner.ts      # TypeScript execution
│   │   ├── python-runner.ts          # Python execution (Pyodide)
│   │   └── pyodide-loader.ts         # Pyodide initialization
│   ├── store/            # Zustand state management
│   ├── pages/            # Page components
│   └── types/            # TypeScript type definitions
├── server/               # Express API server
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── services/    # Business logic
│   │   └── prompts/     # AI prompts
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

