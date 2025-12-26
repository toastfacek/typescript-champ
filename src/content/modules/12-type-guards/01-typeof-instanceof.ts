import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '01-typeof-instanceof',
  slug: 'typeof-instanceof',
  title: 'typeof & instanceof',
  description: 'Learn how to use native JavaScript operators to narrow down types in TypeScript.',
  order: 1,
  estimatedMinutes: 8,
  difficulty: 'beginner',
  xpReward: 50,
  prerequisites: ['01-getting-started'],
  tags: ['type-guards', 'narrowing'],
  keyConcepts: [
    {
      id: 'narrowing',
      term: 'Type Narrowing',
      definition: 'The process of moving from a less specific type to a more specific type using logical checks.',
      whyItMatters: 'Narrowing allows you to safely use properties and methods that only exist on certain types within a union.',
    },
    {
      id: 'typeof',
      term: 'typeof operator',
      definition: 'A JavaScript operator that returns a string indicating the type of the unevaluated operand. Common values: "string", "number", "boolean", "object", "function", "undefined", "symbol".',
      syntax: 'typeof value === "string"',
      whyItMatters: 'Using typeof allows TypeScript to understand that within a block, a value is guaranteed to be a specific primitive.',
    },
    {
      id: 'instanceof',
      term: 'instanceof operator',
      definition: 'A JavaScript operator that tests whether an object has in its prototype chain the prototype property of a constructor.',
      syntax: 'value instanceof Date',
      whyItMatters: 'Using instanceof allows TypeScript to narrow a value to a specific class or constructor type.',
    },
  ],
  steps: [
    {
      id: 'step-1-typeof',
      order: 1,
      type: 'instruction',
      title: 'Narrowing with typeof',
      content: `# Using typeof

The \`typeof\` operator is great for checking primitive types like \`string\`, \`number\`, or \`boolean\`.`,
      codeExample: {
        code: `function printLength(value: string | number) {
  if (typeof value === "string") {
    // In this block, TypeScript knows 'value' is a string
    console.log(value.length);
  } else {
    // In this block, TypeScript knows 'value' is a number
    console.log(value.toFixed(2));
  }
}`,
        language: 'typescript',
        highlight: [2],
      },
    },
    {
      id: 'step-2-instanceof',
      order: 2,
      type: 'instruction',
      title: 'Narrowing with instanceof',
      content: `# Using instanceof

The \`instanceof\` operator is used to check if an object is an instance of a specific class.`,
      codeExample: {
        code: `function processDate(value: string | Date) {
  if (value instanceof Date) {
    // TypeScript knows 'value' is a Date
    console.log(value.getFullYear());
  } else {
    // TypeScript knows 'value' is a string
    console.log(value.toUpperCase());
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
      title: 'Smart Formatter',
      instructions: `1. Create a function named \`formatInput\` that takes a \`value\` of type \`string | number\`.
2. If the value is a \`string\`, return it in lowercase.
3. If the value is a \`number\`, return it formatted to 2 decimal places using \`.toFixed(2)\`.`,
      starterCode: `function formatInput(value: string | number) {
  // Implement narrowing here
}
`,
      solutionCode: `function formatInput(value: string | number) {
  if (typeof value === "string") {
    return value.toLowerCase();
  } else {
    return value.toFixed(2);
  }
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'Should handle string',
          testCode: `if (formatInput('HELLO') !== 'hello') throw new Error('Fail');`,
        },
        {
          id: 'test-2',
          description: 'Should handle number',
          testCode: `if (formatInput(10) !== '10.00') throw new Error('Fail');`,
        },
      ],
      hints: [
        'Use `if (typeof value === "string")`',
        'Use `.toLowerCase()` for strings and `.toFixed(2)` for numbers',
      ],
      aiHintPrompt: 'The user is practicing type narrowing using typeof.',
    },
  ],
}
