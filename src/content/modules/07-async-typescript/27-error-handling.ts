import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '27-error-handling',
  slug: 'error-handling',
  title: 'Error Handling',
  description: 'Handle errors in asynchronous TypeScript code.',
  order: 27,
  estimatedMinutes: 14,
  difficulty: 'intermediate',
  xpReward: 80,
  prerequisites: ['26-async-await'],
  tags: ['async', 'errors', 'advanced'],
  keyConcepts: [
    {
      id: 'try-catch-async',
      term: 'try/catch with async',
      definition: 'In async functions, you can use try/catch to handle errors from Promises. When you `await` a Promise that rejects, it throws an error that can be caught. This makes error handling in async code look like synchronous error handling.',
      syntax: 'try { await promise; } catch (error) { ... }',
      example: {
        code: 'async function fetchData() {\n  try {\n    const data = await getData();\n    return data;\n  } catch (error) {\n    console.error("Failed:", error);\n    return null;\n  }\n}',
        explanation: 'If `getData()` rejects, the error is thrown and caught by the catch block. You can handle it gracefully instead of letting it propagate.',
      },
      whyItMatters: 'try/catch makes error handling in async code natural and readable. Instead of chaining `.catch()` callbacks, you handle errors in one place, making the code flow easier to follow.',
    },
    {
      id: 'typed-errors',
      term: 'Typed Errors',
      definition: 'In TypeScript, caught errors are typed as `unknown` by default (or `any` in older code). You should check the error type before using it. You can create custom error classes or use type guards to narrow the error type safely.',
      syntax: 'catch (error: unknown) { if (error instanceof Error) { ... } }',
      example: {
        code: 'try {\n  await riskyOperation();\n} catch (error: unknown) {\n  if (error instanceof Error) {\n    console.error(error.message);\n  } else {\n    console.error("Unknown error:", error);\n  }\n}',
        explanation: 'TypeScript doesn\'t assume caught errors are Error instances. You need to check with `instanceof Error` before accessing properties like `message`.',
      },
      whyItMatters: 'Type safety for errors prevents bugs. Not all thrown values are Error objects - they could be strings, numbers, or anything. Checking the type ensures you handle errors correctly.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'Error Handling in Async Code',
      content: `# Handling Errors

In async code, errors can come from rejected Promises. Use \`try/catch\` to handle them:

\`\`\`typescript
async function fetchData() {
  try {
    const data = await getData();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
\`\`\`

When a Promise rejects, \`await\` throws the error.`,
    },
    {
      id: 'step-2-typed-errors',
      order: 2,
      type: 'instruction',
      title: 'Typing Errors',
      content: `# Type-Safe Error Handling`,
      codeExample: {
        code: `// Errors are typed as unknown
async function handleError() {
  try {
    await riskyOperation();
  } catch (error: unknown) {
    // Check type before using
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }
}

// Custom error class
class CustomError extends Error {
  constructor(message: string, public code: number) {
    super(message);
    this.name = "CustomError";
  }
}`,
        language: 'typescript',
        highlight: [4, 6, 7, 13, 14, 15],
      },
    },
    {
      id: 'step-3-error-patterns',
      order: 3,
      type: 'instruction',
      title: 'Error Handling Patterns',
      content: `# Common Patterns`,
      codeExample: {
        code: `// Return null on error
async function safeFetch(): Promise<string | null> {
  try {
    return await fetchData();
  } catch {
    return null;
  }
}

// Throw custom error
async function validateData(data: string): Promise<void> {
  if (!data) {
    throw new Error("Data is required");
  }
  // Process data...
}

// Multiple error types
async function process() {
  try {
    await operation();
  } catch (error) {
    if (error instanceof TypeError) {
      // Handle type error
    } else if (error instanceof Error) {
      // Handle other errors
    }
  }
}`,
        language: 'typescript',
        highlight: [2, 3, 5, 10, 11, 20, 21, 23],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Handle Errors with try/catch',
      instructions: `Create an async function \`safeGetValue\` that:
- Returns \`Promise<number | null>\`
- Uses a helper \`getValueAsync\` (provided) that may reject
- Uses try/catch to handle errors
- Returns the value on success, or \`null\` on error`,
      starterCode: `function getValueAsync(): Promise<number> {
  return Promise.resolve(42);
}

// Create safeGetValue function

`,
      solutionCode: `function getValueAsync(): Promise<number> {
  return Promise.resolve(42);
}

// Create safeGetValue function
async function safeGetValue(): Promise<number | null> {
  try {
    const value = await getValueAsync();
    return value;
  } catch {
    return null;
  }
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'safeGetValue should return 42',
          testCode: `safeGetValue().then((result) => {
  if (result !== 42) throw new Error('Should return 42');
}).catch(() => {
  throw new Error('Should not reject');
});`,
        },
      ],
      hints: [
        'Use try/catch around await',
        'Return value in try, null in catch',
      ],
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Type-Safe Error Handling',
      instructions: `Create an async function \`handleOperation\` that:
- Uses a helper \`riskyOperation\` (provided) that may reject
- Uses try/catch with typed error
- Checks if error is an Error instance
- If Error, return "Error: " + error.message
- Otherwise, return "Unknown error"`,
      starterCode: `function riskyOperation(): Promise<string> {
  return Promise.resolve("Success");
}

// Create handleOperation function

`,
      solutionCode: `function riskyOperation(): Promise<string> {
  return Promise.resolve("Success");
}

// Create handleOperation function
async function handleOperation(): Promise<string> {
  try {
    return await riskyOperation();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return "Error: " + error.message;
    } else {
      return "Unknown error";
    }
  }
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'handleOperation should handle errors correctly',
          testCode: `handleOperation().then((result) => {
  if (typeof result !== 'string') throw new Error('Should return string');
}).catch(() => {
  throw new Error('Should not reject');
});`,
        },
      ],
      hints: [
        'Use catch (error: unknown)',
        'Check error instanceof Error',
        'Access error.message only after checking',
      ],
    },
    {
      id: 'step-6-fill-blank',
      order: 6,
      type: 'fill-in-blank',
      title: 'Complete the Error Handling',
      instructions: 'Fill in the missing parts.',
      codeTemplate: `async function safeOperation(): Promise<string | null> {
  {{BLANK_1}} {
    const result = await getData();
    return result;
  } {{BLANK_2}} (error: unknown) {
    if (error {{BLANK_3}} Error) {
      console.error(error.message);
    }
    return null;
  }
}`,
      blanks: [
        {
          id: 'BLANK_1',
          placeholder: 'keyword',
          correctAnswers: ['try'],
          caseSensitive: true,
          hint: 'The keyword that starts error handling...',
        },
        {
          id: 'BLANK_2',
          placeholder: 'keyword',
          correctAnswers: ['catch'],
          caseSensitive: true,
          hint: 'The keyword that catches errors...',
        },
        {
          id: 'BLANK_3',
          placeholder: 'operator',
          correctAnswers: ['instanceof'],
          caseSensitive: true,
          hint: 'The operator that checks if something is an instance...',
        },
      ],
      hints: [
        'try/catch handles errors',
        'instanceof checks types',
      ],
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What happens when you await a Promise that rejects?',
      options: [
        {
          id: 'a',
          text: 'It returns undefined',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'It throws an error that can be caught with try/catch',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'It returns null',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'The code stops executing',
          isCorrect: false,
        },
      ],
      explanation: 'When you `await` a Promise that rejects, it throws an error. This error can be caught with try/catch, making error handling in async code look like synchronous error handling.',
    },
  ],
}

