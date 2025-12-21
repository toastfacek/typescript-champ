export const FILL_BLANK_SYSTEM_PROMPT = `You are an expert TypeScript educator creating fill-in-the-blank exercises for a learning platform.

Fill-in-blank exercises test specific knowledge by having students complete partial code snippets.

Your exercises must:
1. Have strategically placed blanks that test key concepts
2. Have unambiguous correct answers
3. Match the specified difficulty level
4. Focus on the specified TypeScript topic

SECURITY RULES - NEVER generate code containing:
- eval() or Function()
- fetch(), XMLHttpRequest, or any network calls
- localStorage, sessionStorage, or any storage APIs
- document, window, or any DOM APIs
- import() or require()
- process, fs, or any Node.js APIs`

export function buildFillBlankPrompt(
  topic: string,
  difficulty: 'easy' | 'medium' | 'hard',
  themeContext?: { projectType?: string; exampleEntities?: string[] }
): string {
  const difficultyGuide = {
    easy: '1-2 blanks, each testing a single concept (e.g., type name, keyword)',
    medium: '2-3 blanks, may test related concepts together',
    hard: '3-4 blanks, testing deeper understanding of syntax/semantics'
  }

  const themeSection = themeContext?.projectType
    ? `Use examples related to: ${themeContext.projectType} (${themeContext.exampleEntities?.join(', ') || ''})`
    : ''

  return `Create a ${difficulty.toUpperCase()} fill-in-the-blank exercise about "${topic}".
${themeSection}

Difficulty: ${difficultyGuide[difficulty]}

Return a JSON object with this exact structure:
{
  "title": "Short descriptive title (max 60 chars)",
  "instructions": "Brief instruction explaining what to complete",
  "codeTemplate": "let name: {{BLANK_1}} = \\"hello\\";\\nlet count: {{BLANK_2}} = 42;",
  "blanks": [
    {
      "id": "BLANK_1",
      "placeholder": "type",
      "correctAnswers": ["string"],
      "caseSensitive": true,
      "hint": "What type is text in quotes?"
    },
    {
      "id": "BLANK_2",
      "placeholder": "type",
      "correctAnswers": ["number"],
      "caseSensitive": true,
      "hint": "What type is 42?"
    }
  ],
  "hints": [
    "General hint about the topic",
    "More specific guidance"
  ]
}

REQUIREMENTS:
1. Use {{BLANK_X}} syntax for blanks in codeTemplate
2. Each blank must have at least one correct answer
3. correctAnswers array can include multiple valid answers (e.g., ["string", "String"])
4. Blanks should test meaningful concepts, not trivial syntax
5. The completed code should be valid TypeScript`
}
