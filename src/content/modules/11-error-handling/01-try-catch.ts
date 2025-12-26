import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '01-try-catch',
  slug: 'try-catch',
  title: 'Try/Catch Basics',
  description: 'Learn how to handle runtime errors gracefully using try and catch blocks.',
  order: 1,
  estimatedMinutes: 8,
  difficulty: 'beginner',
  xpReward: 50,
  prerequisites: ['01-getting-started'],
  tags: ['error-handling', 'basics'],
  keyConcepts: [
    {
      id: 'try-catch',
      term: 'try...catch',
      definition: 'A code block used to handle errors. The "try" block contains code that might fail, and the "catch" block contains code to execute if an error occurs.',
      syntax: 'try { ... } catch (error) { ... }',
      whyItMatters: 'Try/catch prevents your entire application from crashing when something unexpected happens, like a failed network request or invalid user input.',
    },
    {
      id: 'unknown-error',
      term: 'unknown error',
      definition: 'In modern TypeScript, the error in a catch block is often typed as "unknown" because we can\'t be sure what was thrown.',
      whyItMatters: 'Treating errors as "unknown" forces you to check the type of the error before using it, making your error handling safer.',
    },
  ],
  steps: [
    {
      id: 'step-1-basics',
      order: 1,
      type: 'instruction',
      title: 'Handling Errors',
      content: `# Handling Errors with try/catch

Errors happen. A file might be missing, a network might be down, or a user might enter invalid data.

To prevent these errors from crashing your app, use a \`try...catch\` block.`,
      codeExample: {
        code: `try {
  // Code that might throw an error
  const result = JSON.parse("invalid json");
} catch (error) {
  // Code to run if an error happens
  console.log("Something went wrong!");
}`,
        language: 'typescript',
      },
    },
    {
      id: 'step-2-unknown',
      order: 2,
      type: 'instruction',
      title: 'The unknown Error',
      content: `# The unknown Type

In TypeScript, the error caught in a \`catch\` block is of type \`any\` or \`unknown\`. It's best practice to treat it as \`unknown\` and check its type.`,
      codeExample: {
        code: `try {
  // ...
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log("An unexpected error occurred");
  }
}`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Safe JSON Parsing',
      instructions: `1. Create a function named \`parseSettings\` that takes a \`string\` named \`json\`.
2. Wrap \`JSON.parse(json)\` in a \`try...catch\` block.
3. If parsing succeeds, return the parsed object.
4. If parsing fails, return \`null\`.`,
      starterCode: `function parseSettings(json: string) {
  // Implement here
}
`,
      solutionCode: `function parseSettings(json: string) {
  try {
    return JSON.parse(json);
  } catch (error) {
    return null;
  }
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'Should return object for valid JSON',
          testCode: `const result = parseSettings('{"theme": "dark"}');
if (result?.theme !== 'dark') throw new Error('Should parse valid JSON');`,
        },
        {
          id: 'test-2',
          description: 'Should return null for invalid JSON',
          testCode: `const result = parseSettings('invalid');
if (result !== null) throw new Error('Should return null for invalid JSON');`,
        },
      ],
      hints: [
        'Put `return JSON.parse(json);` inside the `try` block',
        'Put `return null;` inside the `catch` block',
      ],
      aiHintPrompt: 'The user is learning basic try/catch usage.',
    },
  ],
}
