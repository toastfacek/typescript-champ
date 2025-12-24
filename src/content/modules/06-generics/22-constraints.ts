import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '22-constraints',
  slug: 'constraints',
  title: 'Generic Constraints',
  description: 'Limit generic types with the extends keyword.',
  order: 22,
  estimatedMinutes: 14,
  difficulty: 'intermediate',
  xpReward: 80,
  prerequisites: ['21-generic-interfaces'],
  tags: ['generics', 'constraints', 'advanced'],
  keyConcepts: [
    {
      id: 'constraint',
      term: 'Generic Constraint',
      definition: 'A constraint limits what types can be used for a generic parameter. You use the `extends` keyword to specify that the type must have certain properties or be a subtype of another type. This lets you use properties of the constrained type inside the generic code.',
      syntax: 'function name<T extends Constraint>(param: T) { ... }',
      example: {
        code: 'interface HasLength {\n  length: number;\n}\n\nfunction getLength<T extends HasLength>(item: T): number {\n  return item.length;\n}\n\ngetLength("hello");  // OK, string has length\ngetLength([1, 2, 3]); // OK, array has length',
        explanation: 'The constraint `T extends HasLength` means T must have a `length` property. This lets you safely access `item.length` inside the function.',
      },
      whyItMatters: 'Constraints let you write generic code that uses specific properties or methods. Without constraints, you can\'t access any properties because TypeScript doesn\'t know what T has. Constraints give you the flexibility of generics with the safety of specific types.',
    },
    {
      id: 'keyof',
      term: 'keyof',
      definition: '`keyof` is a TypeScript operator that gets all the keys of a type as a union of string literals. Combined with generics, it lets you create functions that work with object properties in a type-safe way.',
      syntax: 'keyof Type',
      example: {
        code: 'interface User {\n  name: string;\n  age: number;\n}\n\ntype UserKeys = keyof User;  // "name" | "age"\n\nfunction getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}',
        explanation: '`keyof User` gives you `"name" | "age"`. The constraint `K extends keyof T` ensures K is a valid key of T, so `obj[key]` is type-safe.',
      },
      whyItMatters: '`keyof` enables type-safe property access. You can create functions that work with any object and any property, while TypeScript ensures you only use valid property names and knows the return type.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'What Are Constraints?',
      content: `# Limiting Generic Types

Sometimes you want generics to work with **any type**, but you need to use specific properties. Constraints let you require certain properties:

\`\`\`typescript
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}
\`\`\`

The \`extends\` keyword means "T must have these properties".`,
    },
    {
      id: 'step-2-syntax',
      order: 2,
      type: 'instruction',
      title: 'Constraint Syntax',
      content: `# Using extends`,
      codeExample: {
        code: `// Constraint: T must have a length property
interface HasLength {
  length: number;
}

function getLength<T extends HasLength>(item: T): number {
  return item.length;  // Safe! T has length
}

getLength("hello");     // OK, string has length
getLength([1, 2, 3]);   // OK, array has length
getLength(42);          // Error! number doesn't have length`,
        language: 'typescript',
        highlight: [6, 9, 10, 11],
      },
    },
    {
      id: 'step-3-keyof',
      order: 3,
      type: 'instruction',
      title: 'The keyof Operator',
      content: `# Working with Object Keys

\`keyof\` gets all keys of a type:`,
      codeExample: {
        code: `interface User {
  name: string;
  age: number;
}

type UserKeys = keyof User;  // "name" | "age"

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

let user = { name: "Alice", age: 25 };
let name = getProperty(user, "name");  // string
let age = getProperty(user, "age");   // number`,
        language: 'typescript',
        highlight: [6, 8, 13, 14],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Create a Constrained Generic',
      instructions: `Create a generic function \`getLength\` that:
- Has a type parameter \`T\` constrained to have a \`length\` property (number)
- Takes a parameter \`item\` of type \`T\`
- Returns the \`length\` property as a number`,
      starterCode: `// Create the getLength function

`,
      solutionCode: `// Create the getLength function
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'getLength("hello") should return 5',
          testCode: `if (getLength("hello") !== 5) throw new Error('getLength("hello") should return 5');`,
        },
        {
          id: 'test-2',
          description: 'getLength([1, 2, 3]) should return 3',
          testCode: `if (getLength([1, 2, 3]) !== 3) throw new Error('getLength([1, 2, 3]) should return 3');`,
        },
      ],
      hints: [
        'Use: function getLength<T extends { length: number }>(item: T)',
        'Return item.length',
      ],
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Use keyof Constraint',
      instructions: `Create a generic function \`getValue\` that:
- Has type parameters \`T\` and \`K\` where \`K extends keyof T\`
- Takes parameters \`obj\` (type \`T\`) and \`key\` (type \`K\`)
- Returns \`obj[key]\` (type \`T[K]\`)`,
      starterCode: `// Create the getValue function

`,
      solutionCode: `// Create the getValue function
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'getValue({ name: "Alice", age: 25 }, "name") should return "Alice"',
          testCode: `if (getValue({ name: "Alice", age: 25 }, "name") !== "Alice") throw new Error('Should return "Alice"');`,
        },
        {
          id: 'test-2',
          description: 'getValue({ name: "Alice", age: 25 }, "age") should return 25',
          testCode: `if (getValue({ name: "Alice", age: 25 }, "age") !== 25) throw new Error('Should return 25');`,
        },
      ],
      hints: [
        'Use: function getValue<T, K extends keyof T>(obj: T, key: K): T[K]',
        'Return obj[key]',
      ],
    },
    {
      id: 'step-6-fill-blank',
      order: 6,
      type: 'fill-in-blank',
      title: 'Complete the Constraint',
      instructions: 'Fill in the missing constraint.',
      codeTemplate: `interface HasId {
  id: number;
}

function getId<T {{BLANK_1}} HasId>(item: T): number {
  return item.{{BLANK_2}};
}`,
      blanks: [
        {
          id: 'BLANK_1',
          placeholder: 'keyword',
          correctAnswers: ['extends'],
          caseSensitive: true,
          hint: 'The keyword that creates a constraint...',
        },
        {
          id: 'BLANK_2',
          placeholder: 'property',
          correctAnswers: ['id'],
          caseSensitive: true,
          hint: 'The property from HasId interface...',
        },
      ],
      hints: [
        'Constraints use the extends keyword',
        'What property does HasId have?',
      ],
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What does `T extends { length: number }` mean?',
      options: [
        {
          id: 'a',
          text: 'T must be exactly { length: number }',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'T must have at least a length property of type number',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'T cannot have a length property',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'T must be a number',
          isCorrect: false,
        },
      ],
      explanation: 'The `extends` keyword means T must be a subtype of the constraint. So T must have at least the properties specified (like `length: number`), but can have additional properties too.',
    },
  ],
}

