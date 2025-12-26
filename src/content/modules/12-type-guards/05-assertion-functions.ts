import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '05-assertion-functions',
  slug: 'assertion-functions',
  title: 'Assertion Functions',
  description: 'Learn how to use assertion functions to guarantee that a condition is true or throw an error.',
  order: 5,
  estimatedMinutes: 8,
  difficulty: 'advanced',
  xpReward: 60,
  prerequisites: ['04-user-defined-guards'],
  tags: ['type-guards', 'assertion'],
  keyConcepts: [
    {
      id: 'assertion-function',
      term: 'Assertion Function',
      definition: 'A function that asserts a certain state. If the function returns without throwing, TypeScript knows the state is true.',
      syntax: 'function assert(val: any): asserts val is Type { ... }',
      whyItMatters: 'Assertion functions are useful for validating inputs at the start of a function and ensuring the rest of the code can safely assume the types are correct.',
    },
  ],
  steps: [
    {
      id: 'step-1-basics',
      order: 1,
      type: 'instruction',
      title: 'Asserting Types',
      content: `# Assertion Functions

Assertion functions allow you to verify a condition and inform TypeScript of that condition's truth. If the condition is false, the function **must** throw an error.`,
      codeExample: {
        code: `function assertIsNumber(val: any): asserts val is number {
  if (typeof val !== "number") {
    throw new Error("Not a number!");
  }
}

function double(val: any) {
  assertIsNumber(val);
  // From here on, TypeScript knows 'val' is a number
  return val * 2;
}`,
        language: 'typescript',
        highlight: [1],
      },
    },
    {
      id: 'step-2-generic-assertion',
      order: 2,
      type: 'instruction',
      title: 'Generic Assertions',
      content: `# Generic Assertions

You can also create general assertion functions that check truthiness.`,
      codeExample: {
        code: `function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg || "Assertion failed");
  }
}

function process(name: string | null) {
  assert(name !== null, "Name is required");
  // TypeScript knows 'name' is NOT null here
  console.log(name.toUpperCase());
}`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Required User',
      instructions: `1. Define an interface \`User\` with a \`name: string\`.
2. Create an assertion function named \`assertIsUser\` that takes \`val: any\` and performs \`asserts val is User\`.
3. In the function, throw an error if \`val\` is not an object or does not have a \`name\` property.`,
      starterCode: `// Define User and assertIsUser here
`,
      solutionCode: `interface User {
  name: string;
}

function assertIsUser(val: any): asserts val is User {
  if (typeof val !== "object" || val === null || typeof val.name !== "string") {
    throw new Error("Not a valid user");
  }
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'assertIsUser should not throw for valid user',
          testCode: `assertIsUser({name: 'Alice'}); // Should not throw`,
        },
        {
          id: 'test-2',
          description: 'assertIsUser should throw for invalid user',
          testCode: `try {
  assertIsUser({age: 25});
  throw new Error('Should have thrown');
} catch (e) {
  if (e.message !== "Not a valid user") throw e;
}`,
        },
      ],
      hints: [
        'The return type must be `asserts val is User`',
        'Check `typeof val === "object"` and `typeof val.name === "string"`',
      ],
      aiHintPrompt: 'The user is learning assertion functions in TypeScript.',
    },
  ],
}
