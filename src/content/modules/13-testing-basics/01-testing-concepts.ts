import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '01-testing-concepts',
  slug: 'testing-concepts',
  title: 'Testing Concepts',
  description: 'Understand why we test code and the different types of tests used in modern development.',
  order: 1,
  estimatedMinutes: 8,
  difficulty: 'beginner',
  xpReward: 50,
  prerequisites: ['01-getting-started'],
  tags: ['testing', 'basics'],
  keyConcepts: [
    {
      id: 'unit-test',
      term: 'Unit Test',
      definition: 'A test that verifies a single "unit" of code (like a function or a class) in isolation.',
      whyItMatters: 'Unit tests catch bugs early and allow you to refactor your code with confidence, knowing that you haven\'t broken existing functionality.',
    },
    {
      id: 'assertion',
      term: 'Assertion',
      definition: 'A statement that checks if a value meets a certain condition. If the condition is false, the test fails.',
      syntax: 'expect(value).toBe(expected);',
      whyItMatters: 'Assertions are the core of testing. They define what "correct" behavior looks like for your code.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'Why Test?',
      content: `# Why do we Test?

As your code grows, it becomes harder to manually check that everything still works. Testing automates this process.

Building a "test suite" is like hiring a helper who constantly double-checks your work to ensure you never break something that was already working.`,
    },
    {
      id: 'step-2-isolated-logic',
      order: 2,
      type: 'instruction',
      title: 'Testing in Isolation',
      content: `# Pure Functions

The easiest code to test is a "pure function" — a function that always returns the same output for the same input and has no side effects.`,
      codeExample: {
        code: `// Function to test
function add(a: number, b: number) {
  return a + b;
}

// A simple manual "test"
if (add(2, 2) !== 4) {
  throw new Error("Add test failed: 2+2 should be 4");
}`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Write a manual test',
      instructions: `1. You are given a function \`multiply(a, b)\`.
2. Write a simple check that throws an \`Error\` if \`multiply(3, 4)\` does not equal \`12\`.`,
      starterCode: `function multiply(a: number, b: number) {
  return a * b;
}

// Write your test check below
`,
      solutionCode: `function multiply(a: number, b: number) {
  return a * b;
}

if (multiply(3, 4) !== 12) {
  throw new Error("Multiply failed");
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'Test should pass',
          testCode: `// The user code itself should execute and not throw.`,
        },
      ],
      hints: [
        'Use an `if` statement to check the result',
        'Use `throw new Error(...)` if the result is wrong',
      ],
      aiHintPrompt: 'The user is learning the basic concept of an assertion/check.',
    },
  ],
}
