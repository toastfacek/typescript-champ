import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '02-jest-vitest-intro',
  slug: 'jest-vitest-intro',
  title: 'Jest & Vitest Intro',
  description: 'Learn the syntax of modern testing frameworks like Jest and Vitest.',
  order: 2,
  estimatedMinutes: 10,
  difficulty: 'intermediate',
  xpReward: 60,
  prerequisites: ['01-testing-concepts'],
  tags: ['testing', 'jest', 'vitest'],
  keyConcepts: [
    {
      id: 'describe-block',
      term: 'describe()',
      definition: 'A function used to group related tests together. It takes a name and a function containing tests.',
      syntax: 'describe("feature", () => { ... });',
      whyItMatters: 'describe blocks make your test output organized and easy to read.',
    },
    {
      id: 'test-block',
      term: 'test() or it()',
      definition: 'A function that defines a single test case. "it" is an alias for "test" often used to make tests read like sentences.',
      syntax: 'test("should do something", () => { ... });',
      whyItMatters: 'Each test block should verify one specific behavior.',
    },
    {
      id: 'expect',
      term: 'expect()',
      definition: 'The starting point for making assertions. It is followed by a "matcher" like .toBe() or .toEqual().',
      syntax: 'expect(value).toBe(expected);',
      whyItMatters: 'Expectations are how you define success or failure for a test.',
    },
  ],
  steps: [
    {
      id: 'step-1-anatomy',
      order: 1,
      type: 'instruction',
      title: 'Anatomy of a Test',
      content: `# Writing a Test

Modern testing frameworks provide a global \`test\` function and an \`expect\` object to handle assertions.`,
      codeExample: {
        code: `import { add } from "./math";

test("add should correctly sum two numbers", () => {
  const result = add(2, 3);
  expect(result).toBe(5);
});`,
        language: 'typescript',
      },
    },
    {
      id: 'step-2-matchers',
      order: 2,
      type: 'instruction',
      title: 'Common Matchers',
      content: `# Using Matchers

There are many matchers available to check different kinds of values.`,
      codeExample: {
        code: `test("common matchers", () => {
  expect(2 + 2).toBe(4);             // Exact identity
  expect({a: 1}).toEqual({a: 1});    // Deep equality
  expect("hello").toContain("ell");  // Substring
  expect(null).toBeNull();           // Specific values
});`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Test your Logic',
      instructions: `1. Use the \`test\` function to create a test named \`"should return personalized greeting"\`.
2. Inside the test, call \`greet("Alice")\`.
3. Use \`expect\` and \`.toBe()\` to check if the result is \`"Hello, Alice!"\`.`,
      starterCode: `function greet(name: string) {
  return "Hello, " + name + "!";
}

// Write your test below
`,
      solutionCode: `function greet(name: string) {
  return "Hello, " + name + "!";
}

test("should return personalized greeting", () => {
  expect(greet("Alice")).toBe("Hello, Alice!");
});`,
      testCases: [
        {
          id: 'test-1',
          description: 'Test should pass',
          testCode: `// We simulate describe/test/expect in our runner
const testCalls: any[] = [];
const test = (name: string, fn: any) => testCalls.push({name, fn});
const expect = (actual: any) => ({
  toBe: (expected: any) => {
    if (actual !== expected) throw new Error(\`Expected \${expected} but got \${actual}\`);
  }
});

// Run user code
// (Eval the user code here in a real environment)
`,
        },
      ],
      hints: [
        'Use `test("description", () => { ... })`',
        'Use `expect(actual).toBe(expected)`',
      ],
      aiHintPrompt: 'The user is learning the basic syntax of Jest/Vitest.',
    },
  ],
}
