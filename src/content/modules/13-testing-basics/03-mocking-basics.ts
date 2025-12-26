import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '03-mocking-basics',
  slug: 'mocking-basics',
  title: 'Mocking Basics',
  description: 'Learn how to mock functions and dependencies to test code in isolation.',
  order: 3,
  estimatedMinutes: 12,
  difficulty: 'advanced',
  xpReward: 70,
  prerequisites: ['02-jest-vitest-intro'],
  tags: ['testing', 'mocking'],
  keyConcepts: [
    {
      id: 'mock-function',
      term: 'Mock Function',
      definition: 'A "fake" function that tracks how it was called (with what arguments, how many times) instead of executing its original logic.',
      syntax: 'const myMock = vi.fn();',
      whyItMatters: 'Mocking allows you to test a function without actually calling slow or unpredictable dependencies like an API or a database.',
    },
    {
      id: 'spy',
      term: 'Spying',
      definition: 'The process of observing a mock function to verify that it was called correctly.',
      syntax: 'expect(myMock).toHaveBeenCalledWith("arg");',
      whyItMatters: 'Spying ensures that your code is interacting with its dependencies as expected.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'Why Mock?',
      content: `# Isolation with Mocking

Mocking is used when your code depends on something else that is hard to test, like:
- A network request (API)
- A complex database query
- A function that returns a random value

Instead of using the real dependency, we use a **mock** version that we can control.`,
      codeExample: {
        code: `// Imagine we're using Vitest:
import { vi, test, expect } from "vitest";

test("calls the callback", () => {
  const mockCb = vi.fn(); // Create a mock function
  
  runProcess(mockCb); // Call our function under test
  
  expect(mockCb).toHaveBeenCalled(); // Verify it was called!
});`,
        language: 'typescript',
      },
    },
    {
      id: 'step-2-mock-returns',
      order: 2,
      type: 'instruction',
      title: 'Controlling Mocks',
      content: `# Controlling Return Values

You can tell a mock exactly what it should return, which is perfect for testing different scenarios.`,
      codeExample: {
        code: `const mockApi = vi.fn();
mockApi.mockReturnValue({ data: "success" });

const result = await useApi(mockApi);
expect(result.data).toBe("success");`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Mocking a Notifier',
      instructions: `1. You are given a function \`performAction(notifier)\`.
2. Create a mock function named \`mockNotifier\` using \`vi.fn()\`.
3. Call \`performAction(mockNotifier)\`.
4. Use \`expect(mockNotifier).toHaveBeenCalled()\` to verify it was called.`,
      starterCode: `// Assume vi and expect are available
function performAction(notifier: () => void) {
  notifier();
}

// Write your mock test below
`,
      solutionCode: `const mockNotifier = vi.fn();
performAction(mockNotifier);
expect(mockNotifier).toHaveBeenCalled();`,
      testCases: [
        {
          id: 'test-1',
          description: 'mockNotifier should have been called',
          testCode: `// Mocking environment simulation
const vi = { fn: () => {
  const fn: any = () => { fn.called = true; };
  fn.called = false;
  return fn;
}};
const expect = (actual: any) => ({
  toHaveBeenCalled: () => {
    if (!actual.called) throw new Error('Expected mock to be called');
  }
});
// (Eval user code)
`,
        },
      ],
      hints: [
        'Use `const mock = vi.fn();`',
        'Pass the mock to `performAction` as an argument',
      ],
      aiHintPrompt: 'The user is learning basic mocking with vi.fn().',
    },
  ],
}
