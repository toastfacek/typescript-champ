import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '04-optional-catch',
  slug: 'optional-catch',
  title: 'Optional Catch Binding',
  description: 'Learn how to use catch blocks without specifying an error variable when you dont need it.',
  order: 4,
  estimatedMinutes: 5,
  difficulty: 'beginner',
  xpReward: 40,
  prerequisites: ['01-try-catch'],
  tags: ['error-handling'],
  keyConcepts: [
    {
      id: 'optional-catch',
      term: 'Optional Catch Binding',
      definition: 'A syntax that allows you to omit the error variable in a catch block if you don\'t need to use it.',
      syntax: 'try { ... } catch { ... }',
      whyItMatters: 'It makes your code cleaner when you only care that an error happened, but don\'t need the details of the error itself.',
    },
  ],
  steps: [
    {
      id: 'step-1-basics',
      order: 1,
      type: 'instruction',
      title: 'Catching without a Variable',
      content: `# Optional Catch Binding

Starting with ES2019, you can omit the variable in a \`catch\` block if you don't need to use it.`,
      codeExample: {
        code: `// Old way:
try {
  // ...
} catch (unusedError) {
  console.log("Failed");
}

// New way (Starting ES2019):
try {
  // ...
} catch {
  console.log("Failed");
}`,
        language: 'typescript',
      },
    },
    {
      id: 'step-2-when-to-use',
      order: 2,
      type: 'instruction',
      title: 'When to Use It',
      content: `# When is it Useful?

Optional catch is useful when you simply want to ignore an error or provide a default fallback without needing to inspect the error object.`,
      codeExample: {
        code: `function loadConfig() {
  try {
    return JSON.parse(localStorage.getItem("config") || "");
  } catch {
    return { theme: "light" }; // Default fallback
  }
}`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Quiet Parser',
      instructions: `1. Create a function named \`quietParse\` that takes a \`string\`.
2. Try to return \`JSON.parse(string)\`.
3. Use an **optional catch block** to return \`undefined\` if an error occurs.`,
      starterCode: `function quietParse(str: string) {
  // Implement here
}
`,
      solutionCode: `function quietParse(str: string) {
  try {
    return JSON.parse(str);
  } catch {
    return undefined;
  }
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'Should return parsed object',
          testCode: `if (quietParse('{"a": 1}').a !== 1) throw new Error('Fail');`,
        },
        {
          id: 'test-2',
          description: 'Should return undefined on error',
          testCode: `if (quietParse('invalid') !== undefined) throw new Error('Fail');`,
        },
      ],
      hints: [
        'Use `try { ... } catch { ... }` without `(error)`',
      ],
      aiHintPrompt: 'The user is learning optional catch binding syntax.',
    },
  ],
}
