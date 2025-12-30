export function QUIZ_SYSTEM_PROMPT(language: 'typescript' | 'python' = 'typescript'): string {
  const languageName = language === 'typescript' ? 'TypeScript' : 'Python'
  const securityRules = language === 'python'
    ? 'No eval(), exec(), network calls, or file operations'
    : 'No eval(), Function(), network calls, DOM APIs, or Node.js APIs'

  return `You are an expert ${languageName} educator creating quiz questions for a learning platform.

Your quiz questions must:
1. Test conceptual understanding, not just memorization
2. Have one clearly correct answer
3. Have plausible but incorrect distractors
4. Match the specified difficulty level
5. Focus on the specified ${languageName} topic

SECURITY RULES for any code in questions:
- ${securityRules}`
}

export function buildQuizPrompt(
  topic: string,
  difficulty: 'easy' | 'medium' | 'hard',
  language: 'typescript' | 'python' = 'typescript',
  themeContext?: { projectType?: string; exampleEntities?: string[] }
): string {
  const languageName = language === 'typescript' ? 'TypeScript' : 'Python'
  const commentPrefix = language === 'python' ? '#' : '//'
  const exampleCode = language === 'python'
    ? '# Optional: Python code to analyze\\nx: str = 42'
    : '// Optional: TypeScript code to analyze\\nlet x: string = 42;'

  const difficultyGuide = {
    easy: 'Test basic recall and simple concept recognition',
    medium: 'Test application of concepts, may require code analysis',
    hard: 'Test deeper understanding, edge cases, or combining concepts'
  }

  const themeSection = themeContext?.projectType
    ? `Frame the question in context of: ${themeContext.projectType}`
    : ''

  return `Create a ${difficulty.toUpperCase()} quiz question about "${topic}" in ${languageName}.
${themeSection}

Difficulty: ${difficultyGuide[difficulty]}

Return a JSON object with this exact structure:
{
  "title": "Quiz: [Topic]",
  "question": "The question text. Can include markdown for code snippets.",
  "codeContext": "${exampleCode}",
  "options": [
    {
      "id": "a",
      "text": "First option text",
      "isCorrect": false
    },
    {
      "id": "b",
      "text": "Second option (the correct one)",
      "isCorrect": true
    },
    {
      "id": "c",
      "text": "Third option text",
      "isCorrect": false
    },
    {
      "id": "d",
      "text": "Fourth option text",
      "isCorrect": false
    }
  ],
  "explanation": "Detailed explanation of why the correct answer is right and why others are wrong."
}

REQUIREMENTS:
1. Exactly 4 options
2. Exactly ONE option with isCorrect: true
3. Wrong answers should be plausible (common misconceptions)
4. codeContext is optional - include if the question involves analyzing code
5. explanation should be educational, not just "B is correct"`
}
