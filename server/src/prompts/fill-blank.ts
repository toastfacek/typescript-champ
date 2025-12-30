export function FILL_BLANK_SYSTEM_PROMPT(language: 'typescript' | 'python' = 'typescript'): string {
  const languageName = language === 'typescript' ? 'TypeScript' : 'Python'
  const securityRules = language === 'python'
    ? `- eval() or exec()
- open(), file operations
- requests, urllib, or any network calls
- os, sys, or subprocess modules
- import statements`
    : `- eval() or Function()
- fetch(), XMLHttpRequest, or any network calls
- localStorage, sessionStorage, or any storage APIs
- document, window, or any DOM APIs
- import() or require()
- process, fs, or any Node.js APIs`

  return `You are an expert ${languageName} educator creating fill-in-the-blank exercises for a learning platform.

Fill-in-blank exercises test specific knowledge by having students complete partial code snippets.

Your exercises must:
1. Have strategically placed blanks that test key concepts
2. Have unambiguous correct answers
3. Match the specified difficulty level
4. Focus on the specified ${languageName} topic

SECURITY RULES - NEVER generate code containing:
${securityRules}`
}

export function buildFillBlankPrompt(
  topic: string,
  difficulty: 'easy' | 'medium' | 'hard',
  language: 'typescript' | 'python' = 'typescript',
  themeContext?: { projectType?: string; exampleEntities?: string[] }
): string {
  const languageName = language === 'typescript' ? 'TypeScript' : 'Python'
  const exampleTemplate = language === 'python'
    ? 'name: {{BLANK_1}} = "hello"\\ncount: {{BLANK_2}} = 42'
    : 'let name: {{BLANK_1}} = "hello";\\nlet count: {{BLANK_2}} = 42;'

  const difficultyGuide = {
    easy: '1-2 blanks, each testing a single concept (e.g., type name, keyword)',
    medium: '2-3 blanks, may test related concepts together',
    hard: '3-4 blanks, testing deeper understanding of syntax/semantics'
  }

  const themeSection = themeContext?.projectType
    ? `Use examples related to: ${themeContext.projectType} (${themeContext.exampleEntities?.join(', ') || ''})`
    : ''

  return `Create a ${difficulty.toUpperCase()} fill-in-the-blank exercise about "${topic}" in ${languageName}.
${themeSection}

Difficulty: ${difficultyGuide[difficulty]}

Return a JSON object with this exact structure:
{
  "title": "Short descriptive title (max 60 chars)",
  "instructions": "Brief instruction explaining what to complete",
  "codeTemplate": "${exampleTemplate}",
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
3. correctAnswers array can include multiple valid answers (e.g., ["string", "String"] or ["str", "string"])
4. Blanks should test meaningful concepts, not trivial syntax
5. The completed code should be valid ${languageName}`
}
