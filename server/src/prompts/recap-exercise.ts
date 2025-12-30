export const RECAP_EXERCISE_SYSTEM_PROMPT = `You are an expert TypeScript/Python educator creating a single bite-sized recap exercise for learners returning to a concept they've already completed.

Your exercise must:
1. Be quick to complete (2-3 minutes max)
2. Reinforce the key concept from the lesson
3. Be simpler than a full practice exercise - this is a refresher, not deep practice
4. Vary from previous exercises if timesCompleted > 0 (to keep it fresh for repeat visitors)
5. Be self-contained and runnable in a browser environment

SECURITY RULES - NEVER generate code containing:
- eval() or Function()
- fetch(), XMLHttpRequest, or any network calls
- localStorage, sessionStorage, or any storage APIs
- document, window, or any DOM APIs
- import() or require()
- process, fs, or any Node.js APIs
- setTimeout, setInterval (unless specifically about async)

Keep exercises focused on pure TypeScript/JavaScript/Python logic.`

export function buildRecapExercisePrompt(
  lessonTitle: string,
  lessonDescription: string,
  lessonTags: string[],
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  language: 'typescript' | 'python',
  timesCompleted: number = 0
): string {
  const difficultyMap = {
    beginner: 'easy',
    intermediate: 'medium',
    advanced: 'hard'
  }
  const practiceDifficulty = difficultyMap[difficulty]

  const variationNote = timesCompleted > 0
    ? `\nIMPORTANT: This user has completed ${timesCompleted} recap exercise(s) for this concept. Create a DIFFERENT exercise that covers the same concept but with a fresh approach, different examples, or a different angle.`
    : ''

  // Determine exercise type - prefer quiz or fill-in-blank for quick recap
  const exerciseTypes: Array<'code-exercise' | 'fill-in-blank' | 'quiz'> = [
    'quiz',
    'fill-in-blank',
    'code-exercise'
  ]
  const exerciseType = exerciseTypes[timesCompleted % exerciseTypes.length]

  const languageContext = language === 'python'
    ? 'Python'
    : 'TypeScript'

  return `Create a single bite-sized recap exercise for the lesson: "${lessonTitle}"

LESSON CONTEXT:
- Title: "${lessonTitle}"
- Description: ${lessonDescription}
- Tags: ${lessonTags.join(', ')}
- Original Difficulty: ${difficulty}
- Language: ${languageContext}
${variationNote}

EXERCISE REQUIREMENTS:
- Type: ${exerciseType}
- Difficulty: ${practiceDifficulty}
- Must be quick (2-3 minutes to complete)
- Should reinforce the core concept from the lesson
- Keep it simpler than a full practice exercise - this is a refresher

STARTER CODE GUIDANCE:
${language === 'python'
  ? 'For Python: Use blank assignments (variable = ). Keep it simple - one thing to fill in.'
  : 'For TypeScript: Use valid syntax with a TODO comment.'}

Return a JSON object with this exact structure based on exercise type:

For code-exercise:
{
  "type": "code-exercise",
  "title": "Brief exercise title",
  "instructions": "Clear, concise instructions (2-3 sentences max)",
  "starterCode": "${language === 'python' ? 'Python code with blank assignment (e.g., result = ) - one clear thing to fill in' : 'TypeScript skeleton with TODO comment. Must compile but NOT pass tests'}",
  "solutionCode": "${language === 'python' ? '#' : '//'} Complete working solution",
  "testCases": [
    {
      "id": "test-1",
      "description": "Test description",
      "testCode": "if (condition) throw new Error('message');"
    }
  ],
  "hints": ["Hint 1", "Hint 2"]
}

For fill-in-blank:
{
  "type": "fill-in-blank",
  "title": "Brief exercise title",
  "instructions": "Clear, concise instructions (2-3 sentences max)",
  "codeTemplate": "let x: {{BLANK_1}} = 'hello';",
  "blanks": [
    {
      "id": "BLANK_1",
      "placeholder": "type",
      "correctAnswers": ["string"],
      "caseSensitive": true,
      "hint": "Optional hint"
    }
  ],
  "hints": ["Hint 1", "Hint 2"]
}

For quiz:
{
  "type": "quiz",
  "title": "Brief exercise title",
  "question": "Question text (1-2 sentences)",
  "codeContext": "Optional code snippet",
  "options": [
    {
      "id": "a",
      "text": "Option A",
      "isCorrect": false
    },
    {
      "id": "b",
      "text": "Option B (correct answer)",
      "isCorrect": true
    },
    {
      "id": "c",
      "text": "Option C",
      "isCorrect": false
    },
    {
      "id": "d",
      "text": "Option D",
      "isCorrect": false
    }
  ],
  "explanation": "Clear explanation of the correct answer"
}

REQUIREMENTS:
1. Exercise must be browser-safe (no Node.js, no DOM, no network)
2. Test cases must use if/throw pattern (no assert libraries)
3. For quiz: EXACTLY 4 options, EXACTLY 1 correct answer
4. starterCode ${language === 'python' ? 'should use a blank assignment (e.g., result = ) - syntax errors are OK' : 'must be valid TypeScript that compiles (with incomplete logic)'}
5. solutionCode must pass ALL testCases
6. testCases must FAIL with starterCode (or raise syntax errors for Python blank assignments)
7. Keep it brief - this is a quick recap, not a deep dive

Make this feel like a quick refresher that reinforces "${lessonTitle}" without being overwhelming.`
}

