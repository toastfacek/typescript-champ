import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '20-generic-functions',
  slug: 'generic-functions',
  title: 'Generic Functions',
  description: 'Write flexible functions that work with any type.',
  order: 20,
  estimatedMinutes: 14,
  difficulty: 'intermediate',
  xpReward: 80,
  prerequisites: ['19-discriminated-unions'],
  tags: ['generics', 'functions', 'advanced'],
  keyConcepts: [
    {
      id: 'generic',
      term: 'Generic',
      definition: 'A generic is a type parameter that represents a placeholder for a specific type. Instead of writing separate functions for strings, numbers, and objects, you write one generic function that works with any type. The type is determined when you call the function.',
      syntax: 'function name<T>(param: T): T { ... }',
      example: {
        code: 'function identity<T>(value: T): T {\n  return value;\n}\n\nlet str = identity<string>("hello");  // Returns string\nlet num = identity<number>(42);      // Returns number',
        explanation: 'The `<T>` is a type parameter. When you call `identity<string>`, T becomes string. When you call `identity<number>`, T becomes number. The same function works with any type.',
      },
      whyItMatters: 'Generics let you write reusable code without losing type safety. Instead of using `any` (which loses type checking) or writing duplicate functions for each type, you write one function that adapts to whatever type you use.',
    },
    {
      id: 'type-inference-generics',
      term: 'Type Inference with Generics',
      definition: 'TypeScript can often infer the generic type from the arguments you pass, so you don\'t need to explicitly specify it. If you call `identity("hello")`, TypeScript infers that T is string, so you can omit `<string>`.',
      syntax: 'functionName(value)  // TypeScript infers T',
      example: {
        code: 'function identity<T>(value: T): T {\n  return value;\n}\n\n// TypeScript infers T = string\nlet result = identity("hello");\n\n// TypeScript infers T = number\nlet num = identity(42);',
        explanation: 'You can write `identity("hello")` instead of `identity<string>("hello")`. TypeScript looks at the argument and figures out T automatically.',
      },
      whyItMatters: 'Type inference makes generics easier to use. You get the benefits of type safety without the verbosity of specifying types everywhere. The code is cleaner and still fully type-safe.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'What Are Generics?',
      content: `# Flexible Type Parameters

Generics let you write functions that work with **any type** while keeping type safety:

\`\`\`typescript
function identity<T>(value: T): T {
  return value;
}
\`\`\`

The \`<T>\` is a **type parameter** - a placeholder for whatever type you use.`,
    },
    {
      id: 'step-2-syntax',
      order: 2,
      type: 'instruction',
      title: 'Generic Function Syntax',
      content: `# Creating Generic Functions`,
      codeExample: {
        code: `// T is the type parameter
function identity<T>(value: T): T {
  return value;
}

// Explicit type (optional)
let str = identity<string>("hello");  // T = string
let num = identity<number>(42);       // T = number

// Type inference (TypeScript figures it out)
let str2 = identity("hello");  // T inferred as string
let num2 = identity(42);       // T inferred as number`,
        language: 'typescript',
        highlight: [2, 6, 7, 10, 11],
      },
    },
    {
      id: 'step-3-multiple',
      order: 3,
      type: 'instruction',
      title: 'Multiple Type Parameters',
      content: `# More Than One Generic

You can have multiple type parameters:`,
      codeExample: {
        code: `function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

let result = pair<string, number>("Alice", 25);
// result: [string, number]

let result2 = pair("Bob", true);
// TypeScript infers: [string, boolean]`,
        language: 'typescript',
        highlight: [1, 4],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Create a Generic Function',
      instructions: `Create a generic function \`getFirst\` that:
- Takes a type parameter \`T\`
- Takes an array parameter \`arr\` of type \`T[]\`
- Returns the first element (type \`T\`)
- Returns \`undefined\` if the array is empty`,
      starterCode: `// Create the getFirst function

`,
      solutionCode: `// Create the getFirst function
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'getFirst([1, 2, 3]) should return 1',
          testCode: `if (getFirst([1, 2, 3]) !== 1) throw new Error('getFirst([1, 2, 3]) should return 1');`,
        },
        {
          id: 'test-2',
          description: 'getFirst(["a", "b"]) should return "a"',
          testCode: `if (getFirst(["a", "b"]) !== "a") throw new Error('getFirst(["a", "b"]) should return "a"');`,
        },
        {
          id: 'test-3',
          description: 'getFirst([]) should return undefined',
          testCode: `if (getFirst([]) !== undefined) throw new Error('getFirst([]) should return undefined');`,
        },
      ],
      hints: [
        'Use function getFirst<T>(arr: T[]): T | undefined',
        'Return arr[0]',
      ],
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Generic Array Function',
      instructions: `Create a generic function \`last\` that:
- Takes a type parameter \`T\`
- Takes an array \`items\` of type \`T[]\`
- Returns the last element (type \`T | undefined\`)

Hint: Use \`items[items.length - 1]\``,
      starterCode: `// Create the last function

`,
      solutionCode: `// Create the last function
function last<T>(items: T[]): T | undefined {
  return items[items.length - 1];
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'last([1, 2, 3]) should return 3',
          testCode: `if (last([1, 2, 3]) !== 3) throw new Error('last([1, 2, 3]) should return 3');`,
        },
        {
          id: 'test-2',
          description: 'last(["x", "y", "z"]) should return "z"',
          testCode: `if (last(["x", "y", "z"]) !== "z") throw new Error('last(["x", "y", "z"]) should return "z"');`,
        },
      ],
      hints: [
        'Use items.length - 1 to get the last index',
        'Return items[lastIndex]',
      ],
    },
    {
      id: 'step-6-fill-blank',
      order: 6,
      type: 'fill-in-blank',
      title: 'Complete the Generic Function',
      instructions: 'Fill in the missing parts.',
      codeTemplate: `function swap<{{BLANK_1}}>(arr: T[]): T[] {
  if (arr.length < 2) return arr;
  let first = arr[0];
  let last = arr[arr.length - 1];
  return [{{BLANK_2}}, {{BLANK_3}}];
}`,
      blanks: [
        {
          id: 'BLANK_1',
          placeholder: 'type parameter',
          correctAnswers: ['T'],
          caseSensitive: true,
          hint: 'The generic type parameter name...',
        },
        {
          id: 'BLANK_2',
          placeholder: 'variable',
          correctAnswers: ['last'],
          caseSensitive: true,
          hint: 'Swap first and last, so return last first...',
        },
        {
          id: 'BLANK_3',
          placeholder: 'variable',
          correctAnswers: ['first'],
          caseSensitive: true,
          hint: 'Then return first...',
        },
      ],
      hints: [
        'The type parameter is T',
        'Swap means reverse the order',
      ],
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What is the main benefit of using generics?',
      options: [
        {
          id: 'a',
          text: 'Generics make code run faster',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'Generics allow you to write reusable code that works with any type while maintaining type safety',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'Generics are required for all functions',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Generics only work with arrays',
          isCorrect: false,
        },
      ],
      explanation: 'Generics let you write one function that works with multiple types, avoiding code duplication while keeping full type safety. Instead of writing separate functions for strings, numbers, etc., you write one generic function.',
    },
  ],
}


