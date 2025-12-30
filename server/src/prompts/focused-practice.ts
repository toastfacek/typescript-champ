export const FOCUSED_PRACTICE_SYSTEM_PROMPT = `You are an expert TypeScript and Python educator creating focused practice mini-lessons for learners who want to deepen their understanding of a specific lesson topic.

Your mini-lessons must:
1. Start with a clear, comprehensive explanation of the lesson's key concepts
2. Address common points of confusion learners have with this topic
3. Include 2-3 varied exercises (mix of code-exercise, fill-in-blank, and quiz)
4. Progress from easier to more challenging within the mini-lesson
5. Be self-contained and runnable in a browser environment
6. Build understanding through explanation → practice → reinforcement
7. Provide more detailed explanations than the original lesson, especially for concepts that often confuse learners

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
  lessonContext: {
    lessonId: string
    lessonTitle: string
    lessonDescription: string
    lessonTags: string[]
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    language?: 'typescript' | 'python'
  },
  practiceDifficulty: 'easy' | 'medium' | 'hard',
  language: 'typescript' | 'python' = 'typescript'
): string {
  // Determine language context for prompts
  const effectiveLanguage = language || lessonContext.language || 'typescript'
  const languageContext = effectiveLanguage === 'python' ? 'Python' : 'TypeScript'
  const commentStyle = effectiveLanguage === 'python' ? '#' : '//'

  const contextSection = `
LESSON CONTEXT:
- Title: "${lessonContext.lessonTitle}"
- Description: ${lessonContext.lessonDescription}
- Tags: ${lessonContext.lessonTags.join(', ')}
- Original Difficulty: ${lessonContext.difficulty}

The learner has completed this lesson but wants more practice with deeper explanations. Focus on:
1. Explaining concepts that commonly confuse learners
2. Providing more examples and use cases
3. Clarifying edge cases and nuances
4. Reinforcing understanding through varied exercises`

  const difficultyGuide = {
    easy: `
PRACTICE DIFFICULTY: EASY - Keep exercises SIMPLE
- Clear explanations with straightforward examples
- Exercises reinforce ONE core concept from the lesson
- Code exercises: 3-8 lines, single concept only
- 2 exercises total (1 code-exercise, 1 quiz or fill-in-blank)
- Students should complete in 8-10 minutes total`,
    medium: `
PRACTICE DIFFICULTY: MEDIUM - Focused practice
- Deeper explanations with multiple examples
- Exercises combine 2 closely related concepts from the lesson
- Code exercises: 8-15 lines, avoid multi-step pipelines
- Include one edge case per exercise
- 3 exercises total (mix of types)
- Students should complete in 12-15 minutes total`,
    hard: `
PRACTICE DIFFICULTY: HARD - Challenge but focused
- Nuanced explanations with advanced examples
- Exercises test deeper understanding, still focused on lesson topic
- Code exercises: 15-30 lines, no overly complex pipelines
- Include tricky edge cases specific to the lesson concepts
- 3 exercises total (mix of types, at least one code-exercise)
- Students should complete in 15-20 minutes total`
  }

  const starterCodeGuidance = effectiveLanguage === 'python'
    ? 'For Python: Use blank assignments (variable = ) to show exactly what to fill in'
    : 'For TypeScript: Use valid syntax with TODO comments'

  return `Create a focused practice mini-lesson for the ${languageContext} lesson: "${lessonContext.lessonTitle}"

${contextSection}
${difficultyGuide[practiceDifficulty]}

STARTER CODE GUIDANCE:
${starterCodeGuidance}

Return a JSON object with this exact structure:
{
  "instruction": {
    "title": "Clear title reviewing and expanding on the lesson topic",
    "content": "Markdown content that reviews the lesson's key concepts with deeper explanations. Address common points of confusion. Use examples, analogies, and practical use cases. Should be comprehensive (3-5 paragraphs) with more detail than the original lesson.",
    "codeExample": {
      "code": "${commentStyle} ${languageContext} code demonstrating the concept\\n${commentStyle} Include comments explaining key points",
      "language": "${effectiveLanguage}",
      "highlight": [1, 2] // Optional: line numbers to highlight
    }
  },
  "exercises": [
    {
      "type": "code-exercise",
      "title": "Exercise title",
      "instructions": "Clear instructions",
      "starterCode": "${effectiveLanguage === 'python' ? 'Python code with blank assignments (e.g., result = ) - syntax errors OK' : 'TypeScript skeleton with TODO comments. Must compile but NOT pass tests'}",
      "solutionCode": "${commentStyle} Complete working solution that passes all tests",
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
      "title": "Exercise title",
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
9. For quiz exercises: EXACTLY 4 options, EXACTLY 1 correct answer (isCorrect: true)
10. starterCode ${effectiveLanguage === 'python' ? 'should use blank assignments (e.g., result = ) - syntax errors are OK' : 'must be valid TypeScript that compiles (with incomplete logic)'}
11. solutionCode must pass ALL testCases
12. testCases must FAIL with starterCode (or raise syntax errors for Python blank assignments)
13. starterCode should ${effectiveLanguage === 'python' ? 'show exactly what variable to assign' : 'have TODO comments showing where to write code'}
14. All code examples, exercises, and explanations must be in ${languageContext}
15. Use ${languageContext}-specific syntax, idioms, and best practices

Make this feel like a focused, cohesive mini-lesson that deepens understanding of "${lessonContext.lessonTitle}". Provide explanations that go beyond what was covered in the original lesson, especially for concepts that learners often find confusing.`
}

