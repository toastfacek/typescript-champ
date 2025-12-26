import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '03-custom-error-classes',
  slug: 'custom-error-classes',
  title: 'Custom Error Classes',
  description: 'Learn how to extend the base Error class to create specialized error types for better error handling.',
  order: 3,
  estimatedMinutes: 12,
  difficulty: 'intermediate',
  xpReward: 60,
  prerequisites: ['02-throwing-errors', '09-classes'],
  tags: ['error-handling', 'classes'],
  keyConcepts: [
    {
      id: 'custom-error',
      term: 'Custom Error',
      definition: 'A class that extends the built-in Error class. This allows you to add extra properties or use instanceof to check for specific error types.',
      syntax: 'class MyError extends Error { ... }',
      whyItMatters: 'Custom errors allow you to provide more context about what went wrong and enable more precise error handling using instanceof.',
    },
  ],
  steps: [
    {
      id: 'step-1-basics',
      order: 1,
      type: 'instruction',
      title: 'Extending Error',
      content: `# Creating Custom Error Types

Sometimes a generic \`Error\` doesn't provide enough information. You can create your own error types by extending the built-in \`Error\` class.`,
      codeExample: {
        code: `class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

try {
  throw new ValidationError("Invalid email address");
} catch (error) {
  if (error instanceof ValidationError) {
    // Handle validation errors specifically
    console.log("Validation failed: " + error.message);
  }
}`,
        language: 'typescript',
      },
    },
    {
      id: 'step-2-extra-props',
      order: 2,
      type: 'instruction',
      title: 'Adding Extra Data',
      content: `# Custom Properties

You can add extra properties to your custom error classes to provide even more context.`,
      codeExample: {
        code: `class HttpError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = "HttpError";
  }
}

throw new HttpError(404, "Not Found");`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Database Error',
      instructions: `1. Create a class named \`DatabaseError\` that extends \`Error\`.
2. Add a \`public\` property named \`query\` (string) to the class.
3. Implement a constructor that takes \`query\` (string) and \`message\` (string).
4. Call \`super(message)\` and set \`this.query = query\`.
5. Set the \`name\` property to \`"DatabaseError"\`.`,
      starterCode: `// Implement DatabaseError here
`,
      solutionCode: `class DatabaseError extends Error {
  public query: string;
  constructor(query: string, message: string) {
    super(message);
    this.query = query;
    this.name = "DatabaseError";
  }
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'Should extend Error',
          testCode: `const err = new DatabaseError('SELECT *', 'Fail');
if (!(err instanceof Error)) throw new Error('DatabaseError must extend Error');`,
        },
        {
          id: 'test-2',
          description: 'Should have name and query',
          testCode: `const err = new DatabaseError('UPDATE users', 'Timeout');
if (err.name !== 'DatabaseError') throw new Error('name property should be "DatabaseError"');
if (err.query !== 'UPDATE users') throw new Error('query property should be correctly set');`,
        },
      ],
      hints: [
        'Use `class DatabaseError extends Error`',
        'In constructor, call `super(message)` first',
      ],
      aiHintPrompt: 'The user is learning how to create custom error classes.',
    },
  ],
}
