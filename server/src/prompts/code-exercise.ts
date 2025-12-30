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
EASY DIFFICULTY - Keep it SIMPLE:
- ONE single concept ONLY (e.g., just string formatting OR just basic math)
- NO combining multiple operations (no parsing + transforming + filtering)
- Direct, straightforward task with obvious solution
- Solution: 3-8 lines of code maximum
- 2-3 simple test cases with expected inputs
- If student knows the concept, they should finish in 2-3 minutes

AVOID for easy:
- Multiple string operations in sequence
- Nested loops or complex conditionals
- Dictionary/object transformations
- Type conversions combined with other logic`,
    medium: `
MEDIUM DIFFICULTY - Focused practice:
- 2 closely related concepts from the SAME topic area
- Example: "loop over list AND filter items" NOT "parse string AND create dict AND convert types"
- One clear problem to solve, not a multi-step pipeline
- Solution: 8-15 lines of code (if longer, it's too hard)
- 3-4 test cases including one edge case
- Should take 5-7 minutes to complete

AVOID for medium:
- Chaining 3+ different operations (parsing → transforming → filtering → converting)
- Combining concepts from different topic areas
- Nested data structure transformations
- Complex string parsing with multiple delimiters`,
    hard: `
HARD DIFFICULTY - Challenge but focused:
- 3-4 related concepts that test deeper understanding
- Still focused on the sprint topic, not a general programming test
- Solution: 15-30 lines of code (if more, break into steps)
- 4-5 test cases including tricky edge cases
- Should take 8-12 minutes to complete

AVOID for hard:
- Exercises that require knowledge outside the module scope
- Overly complex multi-step pipelines
- Production-level code with extensive error handling`
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

CRITICAL - TOPIC FOCUS:
The exercise MUST focus specifically on "${topic}" - do NOT add unrelated complexity.
- If topic is "strings", focus on string operations, NOT parsing complex data structures
- If topic is "loops", focus on iteration, NOT data transformations
- If topic is "functions", focus on function syntax/parameters, NOT complex algorithms
- Keep the exercise scope narrow and aligned with what "${topic}" actually teaches

${starterCodePatterns}

Return a JSON object with this exact structure:
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
