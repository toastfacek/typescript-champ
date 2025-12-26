import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '02-equality-narrowing',
  slug: 'equality-narrowing',
  title: 'Equality Narrowing',
  description: 'Learn how to use equality and truthiness checks to narrow union types.',
  order: 2,
  estimatedMinutes: 8,
  difficulty: 'beginner',
  xpReward: 50,
  prerequisites: ['01-typeof-instanceof'],
  tags: ['type-guards', 'narrowing'],
  keyConcepts: [
    {
      id: 'equality-narrowing',
      term: 'Equality Narrowing',
      definition: 'TypeScript uses switch statements and equality checks like === and !== to narrow types.',
      syntax: 'if (val === "specific value") { ... }',
      whyItMatters: 'It allows you to narrow a union of literal types to a single literal type.',
    },
    {
      id: 'truthiness-narrowing',
      term: 'Truthiness Narrowing',
      definition: 'Using logical operators (&&, ||, !) and if statements to check if a value is truthy or falsy.',
      whyItMatters: 'It is commonly used to narrow away null or undefined from a type.',
    },
  ],
  steps: [
    {
      id: 'step-1-equality',
      order: 1,
      type: 'instruction',
      title: 'The Power of Equality',
      content: `# Equality Narrowing

TypeScript is smart enough to understand that if two variables are equal, their types must also be compatible.`,
      codeExample: {
        code: `function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // Both x and y must be strings here!
    x.toUpperCase();
    y.toLowerCase();
  }
}`,
        language: 'typescript',
        highlight: [2],
      },
    },
    {
      id: 'step-2-truthiness',
      order: 2,
      type: 'instruction',
      title: 'Truthiness Narrowing',
      content: `# Handling null and undefined

Truthiness checks are the most common way to filter out \`null\` or \`undefined\`.`,
      codeExample: {
        code: `function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    // strs is string[]
    for (const s of strs) { console.log(s); }
  } else if (typeof strs === "string") {
    // strs is string
    console.log(strs);
  }
}`,
        language: 'typescript',
        highlight: [2],
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Secure Path',
      instructions: `1. Create a function named \`getPath\` that takes a \`path\` of type \`string | string[] | undefined\`.
2. If \`path\` is \`undefined\`, return the string \`"default"\`.
3. If \`path\` is an array, return the first element.
4. If \`path\` is a string, return the string itself.`,
      starterCode: `function getPath(path: string | string[] | undefined) {
  // Implement narrowing here
}
`,
      solutionCode: `function getPath(path: string | string[] | undefined) {
  if (path === undefined) {
    return "default";
  }
  if (Array.isArray(path)) {
    return path[0];
  }
  return path;
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'Should handle undefined',
          testCode: `if (getPath(undefined) !== 'default') throw new Error('Fail');`,
        },
        {
          id: 'test-2',
          description: 'Should handle array',
          testCode: `if (getPath(['home', 'users']) !== 'home') throw new Error('Fail');`,
        },
        {
          id: 'test-3',
          description: 'Should handle string',
          testCode: `if (getPath('settings') !== 'settings') throw new Error('Fail');`,
        },
      ],
      hints: [
        'Use `if (path === undefined)` first',
        'Use `Array.isArray(path)` to check for an array',
      ],
      aiHintPrompt: 'The user is practicing equality and array narrowing.',
    },
  ],
}
