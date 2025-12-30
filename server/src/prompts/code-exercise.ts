export function CODE_EXERCISE_SYSTEM_PROMPT(language: 'typescript' | 'python' = 'typescript'): string {
  const languageName = language === 'typescript' ? 'TypeScript' : 'Python'
  const securityRules = language === 'python'
    ? `- eval() or exec()
- open(), file operations
- requests, urllib, or any network calls
- os, sys, or subprocess modules
- import statements (use only built-in functions)`
    : `- eval() or Function()
- fetch(), XMLHttpRequest, or any network calls
- localStorage, sessionStorage, or any storage APIs
- document, window, or any DOM APIs
- import() or require()
- process, fs, or any Node.js APIs
- setTimeout, setInterval (unless specifically about async)`

  return `You are an expert ${languageName} educator creating practice exercises for a learning platform.

Your exercises must:
1. Be self-contained and runnable in a ${language === 'python' ? 'Python' : 'browser'} environment
2. Have clear, achievable learning objectives
3. Include comprehensive test cases that validate the solution
4. Match the specified difficulty level precisely
5. Focus on the specified ${languageName} topic

For test cases:
- Tests should throw errors on failure (use ${language === 'python' ? 'assert or if/raise pattern' : 'if/throw pattern, NOT assert libraries'})
- Tests should check specific outcomes, not implementation details
- Include edge cases appropriate to difficulty level
- Each test should be independent

SECURITY RULES - NEVER generate code containing:
${securityRules}

Keep exercises focused on pure ${languageName} logic.`
}

export function buildCodeExercisePrompt(
  topic: string,
  difficulty: 'easy' | 'medium' | 'hard',
  language: 'typescript' | 'python' = 'typescript',
  themeContext?: { projectType?: string; exampleEntities?: string[] }
): string {
  const languageName = language === 'typescript' ? 'TypeScript' : 'Python'
  const commentPrefix = language === 'python' ? '#' : '//'
  const testPattern = language === 'python' ? 'assert or if/raise pattern' : 'if/throw pattern'

  const difficultyGuide = {
    easy: `
EASY: ONE concept only, 3-8 lines max, 2-3 min to complete
- Direct task with obvious solution (e.g., just string formatting OR just basic math)
- NO combining operations, NO nested logic, NO data transformations`,
    medium: `
MEDIUM: 2 related concepts from same topic, 8-15 lines max, 5-7 min to complete
- One clear problem, NOT a multi-step pipeline
- Example: "loop AND filter" ✓  vs "parse AND transform AND filter AND convert" ✗
- Avoid chaining 3+ operations or complex parsing`,
    hard: `
HARD: 3-4 related concepts, 15-30 lines max, 8-12 min to complete
- Still focused on module topic, not a general programming test
- Avoid exercises needing knowledge outside module scope`
  }

  const themeSection = themeContext?.projectType
    ? `
CONTEXT: The learner is building a ${themeContext.projectType}.
Use examples and variable names related to: ${themeContext.exampleEntities?.join(', ') || themeContext.projectType}
Make the exercise feel relevant to their project goal.`
    : ''

  const starterCodePatterns = language === 'python'
    ? `
PYTHON STARTER CODE PATTERNS:
Use blank assignments to show exactly what students need to fill in:
- Simple: result =
- Multiple: filtered = \\ncount = len(filtered)
- Function: def process(data):\\n    result = \\n    return result

AVOID: pass statements (confusing), complete valid syntax

Examples by difficulty:
- Easy: "# Calculate the sum\\ntotal = "
- Medium: "# Filter even numbers\\nevens = \\ncount = len(evens)"
- Hard: "def process_data(items):\\n    # Initialize result\\n    result = \\n    # Calculate total\\n    total = \\n    return result"
`
    : `
TYPESCRIPT STARTER CODE PATTERNS:
Use valid syntax with TODO comments and placeholder values:
- Simple: "// TODO: Calculate the sum\\nconst total = 0"
- Functions: "// TODO: implement\\nreturn null"
- Arrays: "const filtered = []"

The goal: Students replace placeholder values with working logic.
`

  const testCodeExample = language === 'python'
    ? 'if condition: raise AssertionError("Expected X but got Y")'
    : 'if (condition) throw new Error(\'Expected X but got Y\');'

  return `Create a ${difficulty.toUpperCase()} ${languageName} code exercise about "${topic}".
${themeSection}
${difficultyGuide[difficulty]}

TOPIC FOCUS: Exercise must focus specifically on "${topic}" - no unrelated complexity.
Keep scope narrow and aligned with what "${topic}" teaches.

${starterCodePatterns}

IMPORTANT: Return ONLY valid JSON, no other text. Use this exact structure:
{
  "title": "Short descriptive title (max 60 chars)",
  "instructions": "Clear markdown instructions explaining what to implement. Include examples if helpful.",
  "starterCode": "${language === 'python' ? 'Python code with blank assignments (e.g., result = ) showing exactly what to fill in' : 'TypeScript code with TODO comments and valid syntax with placeholder logic'}\\n",
  "solutionCode": "${commentPrefix} Complete working solution that passes all tests\\n",
  "testCases": [
    {
      "id": "test-1",
      "description": "Human-readable description of what this tests",
      "testCode": "${testCodeExample}"
    }
  ],
  "hints": [
    "First hint - gentle nudge",
    "Second hint - more specific guidance",
    "Third hint - almost gives away the approach"
  ]
}

REQUIREMENTS:
1. starterCode ${language === 'python' ? 'should use blank assignments (e.g., result = ) - syntax errors are OK, students will complete the code' : 'must be valid TypeScript that compiles (with incomplete logic)'}
2. solutionCode must pass ALL testCases
3. testCases must FAIL with starterCode (or raise syntax errors for Python blank assignments)
4. Each testCode must use ${testPattern}
5. hints should progressively reveal the solution approach
6. All code must be ${language === 'python' ? 'pure Python (no imports)' : 'browser-safe (no Node.js, no DOM, no network)'}`
}
