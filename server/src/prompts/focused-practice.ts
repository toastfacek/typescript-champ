export const FOCUSED_PRACTICE_SYSTEM_PROMPT = `You are an expert TypeScript educator creating focused practice mini-lessons for learners who want to deepen their understanding of a specific concept.

Your mini-lessons must:
1. Start with a clear, concise explanation of the concept
2. Include 2-3 varied exercises (mix of code-exercise, fill-in-blank, and quiz)
3. Progress from easier to more challenging within the mini-lesson
4. Be self-contained and runnable in a browser environment
5. Build understanding through explanation → practice → reinforcement

SECURITY RULES - NEVER generate code containing:
- eval() or Function()
- fetch(), XMLHttpRequest, or any network calls
- localStorage, sessionStorage, or any storage APIs
- document, window, or any DOM APIs
- import() or require()
- process, fs, or any Node.js APIs
- setTimeout, setInterval (unless specifically about async)

Keep exercises focused on pure TypeScript/JavaScript logic.`

export function buildFocusedPracticePrompt(
  concept: { id: string; name: string; description: string },
  difficulty: 'easy' | 'medium' | 'hard',
  lessonContext?: { lessonId: string; lessonTitle: string; relatedConcepts?: string[] }
): string {
  const contextSection = lessonContext
    ? `
CONTEXT: The learner just completed the lesson "${lessonContext.lessonTitle}" and wants focused practice on "${concept.name}".
${lessonContext.relatedConcepts ? `Related concepts they've seen: ${lessonContext.relatedConcepts.join(', ')}` : ''}
Make the practice feel like a natural extension of what they learned.`
    : ''

  const difficultyGuide = {
    easy: `
DIFFICULTY: EASY
- Keep explanations simple and direct
- Exercises should reinforce the core concept clearly
- Use straightforward examples
- 2 exercises total (1 code-exercise, 1 quiz or fill-in-blank)`,
    medium: `
DIFFICULTY: MEDIUM
- Provide a bit more depth in the explanation
- Exercises should require some problem-solving
- Include edge cases
- 3 exercises total (mix of types)`,
    hard: `
DIFFICULTY: HARD
- Deep dive into the concept with nuanced explanation
- Exercises should challenge understanding
- Include tricky edge cases and advanced applications
- 3 exercises total (mix of types, at least one code-exercise)`
  }

  return `Create a focused practice mini-lesson for the concept: "${concept.name}"

CONCEPT DETAILS:
- ID: ${concept.id}
- Description: ${concept.description}
${contextSection}
${difficultyGuide[difficulty]}

Return a JSON object with this exact structure:
{
  "instruction": {
    "title": "Clear title explaining what this concept is",
    "content": "Markdown content explaining the concept clearly. Use examples, analogies, and practical use cases. Should be comprehensive but concise (2-4 paragraphs).",
    "codeExample": {
      "code": "// TypeScript code demonstrating the concept\\n// Include comments explaining key points",
      "language": "typescript",
      "highlight": [1, 2] // Optional: line numbers to highlight
    }
  },
  "exercises": [
    {
      "type": "code-exercise",
      "title": "Exercise title",
      "instructions": "Clear instructions",
      "starterCode": "// Starter code",
      "solutionCode": "// Solution",
      "testCases": [
        {
          "id": "test-1",
          "description": "Test description",
          "testCode": "if (condition) throw new Error('message');"
        }
      ],
      "hints": ["Hint 1", "Hint 2", "Hint 3"]
    },
    {
      "type": "fill-in-blank",
      "title": "Exercise title",
      "instructions": "Clear instructions",
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
    },
    {
      "type": "quiz",
      "question": "Question text",
      "codeContext": "Optional code snippet",
      "options": [
        {
          "id": "a",
          "text": "Option A",
          "isCorrect": false
        },
        {
          "id": "b",
          "text": "Option B",
          "isCorrect": true
        }
      ],
      "explanation": "Clear explanation of the correct answer"
    }
  ],
  "estimatedMinutes": 10
}

REQUIREMENTS:
1. Start with ONE instruction step that explains the concept clearly
2. Include 2-3 exercises (for easy: 2 exercises, for medium/hard: 3 exercises)
3. Mix exercise types: at least one code-exercise, and include fill-in-blank or quiz
4. Exercises should progress in difficulty within the mini-lesson
5. All code must be browser-safe (no Node.js, no DOM, no network)
6. Test cases must use if/throw pattern (no assert libraries)
7. The instruction should reference the concept name and provide practical context
8. estimatedMinutes should reflect total time (instruction + exercises)

Make this feel like a focused, cohesive mini-lesson that deepens understanding of "${concept.name}".`
}

