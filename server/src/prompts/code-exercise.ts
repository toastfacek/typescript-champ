export const CODE_EXERCISE_SYSTEM_PROMPT = `You are an expert TypeScript educator creating practice exercises for a learning platform.

Your exercises must:
1. Be self-contained and runnable in a browser environment
2. Have clear, achievable learning objectives
3. Include comprehensive test cases that validate the solution
4. Match the specified difficulty level precisely
5. Focus on the specified TypeScript topic

For test cases:
- Tests should throw errors on failure (use if/throw pattern, NOT assert libraries)
- Tests should check specific outcomes, not implementation details
- Include edge cases appropriate to difficulty level
- Each test should be independent

SECURITY RULES - NEVER generate code containing:
- eval() or Function()
- fetch(), XMLHttpRequest, or any network calls
- localStorage, sessionStorage, or any storage APIs
- document, window, or any DOM APIs
- import() or require()
- process, fs, or any Node.js APIs
- setTimeout, setInterval (unless specifically about async)

Keep exercises focused on pure TypeScript/JavaScript logic.`

export function buildCodeExercisePrompt(
  topic: string,
  difficulty: 'easy' | 'medium' | 'hard',
  themeContext?: { projectType?: string; exampleEntities?: string[] }
): string {
  const difficultyGuide = {
    easy: `
EASY DIFFICULTY:
- Focus on ONE single concept
- Provide clear, step-by-step instructions
- Solution should be 3-10 lines of code
- 2-3 simple test cases
- Obvious solution path`,
    medium: `
MEDIUM DIFFICULTY:
- Combine 2-3 related concepts
- Require some problem-solving
- Solution should be 10-25 lines of code
- 3-4 test cases including edge cases
- Multiple valid approaches possible`,
    hard: `
HARD DIFFICULTY:
- Complex scenarios with multiple concepts
- Require careful thinking about edge cases
- Solution should be 15-40 lines of code
- 4-5 test cases including tricky edge cases
- May need to consider performance or optimization`
  }

  const themeSection = themeContext?.projectType
    ? `
CONTEXT: The learner is building a ${themeContext.projectType}.
Use examples and variable names related to: ${themeContext.exampleEntities?.join(', ') || themeContext.projectType}
Make the exercise feel relevant to their project goal.`
    : ''

  return `Create a ${difficulty.toUpperCase()} TypeScript code exercise about "${topic}".
${themeSection}
${difficultyGuide[difficulty]}

Return a JSON object with this exact structure:
{
  "title": "Short descriptive title (max 60 chars)",
  "instructions": "Clear markdown instructions explaining what to implement. Include examples if helpful.",
  "starterCode": "// TypeScript code with TODO comments where student needs to write code\\n",
  "solutionCode": "// Complete working solution that passes all tests\\n",
  "testCases": [
    {
      "id": "test-1",
      "description": "Human-readable description of what this tests",
      "testCode": "if (condition) throw new Error('Expected X but got Y');"
    }
  ],
  "hints": [
    "First hint - gentle nudge",
    "Second hint - more specific guidance",
    "Third hint - almost gives away the approach"
  ]
}

REQUIREMENTS:
1. starterCode must be valid TypeScript that compiles (with incomplete logic)
2. solutionCode must pass ALL testCases
3. testCases must FAIL with starterCode
4. Each testCode must use if/throw pattern (no assert)
5. hints should progressively reveal the solution approach
6. All code must be browser-safe (no Node.js, no DOM, no network)`
}
