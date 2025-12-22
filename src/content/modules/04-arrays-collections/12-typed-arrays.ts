import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '12-typed-arrays',
  slug: 'typed-arrays',
  title: 'Typed Arrays',
  description: 'Work with arrays that have type-safe elements.',
  order: 12,
  estimatedMinutes: 12,
  difficulty: 'beginner',
  xpReward: 60,
  prerequisites: ['11-type-vs-interface'],
  tags: ['arrays', 'types', 'collections'],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'Arrays in TypeScript',
      content: `# Type-Safe Arrays

Arrays in TypeScript know what type of elements they contain. This prevents bugs like accidentally mixing numbers and strings.

There are two ways to write array types - both are equivalent!`,
    },
    {
      id: 'step-2-syntax',
      order: 2,
      type: 'instruction',
      title: 'Array Type Syntax',
      content: `# Two Ways to Type Arrays`,
      codeExample: {
        code: `// Method 1: Type followed by []
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob", "Charlie"];

// Method 2: Array<Type> generic syntax
let scores: Array<number> = [95, 87, 92];
let flags: Array<boolean> = [true, false, true];

// Both methods are identical - use whichever you prefer!
// Most developers prefer the [] syntax for simplicity`,
        language: 'typescript',
        highlight: [2, 6],
      },
    },
    {
      id: 'step-3-type-safety',
      order: 3,
      type: 'instruction',
      title: 'Array Type Safety',
      content: `# TypeScript Protects Your Arrays

Once you declare an array type, TypeScript enforces it:`,
      codeExample: {
        code: `let prices: number[] = [9.99, 19.99, 29.99];

// Adding matching types works:
prices.push(39.99);  // OK

// TypeScript catches mistakes:
// prices.push("free");  // Error! Can't add string to number[]

// Even array methods know the type:
let doubled = prices.map(p => p * 2);  // doubled is number[]
let first = prices[0];  // first is number`,
        language: 'typescript',
        highlight: [5, 8],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Create Typed Arrays',
      instructions: `Create three typed arrays:
1. \`ages\` - an array of numbers: [25, 30, 35]
2. \`cities\` - an array of strings: ["NYC", "LA", "Chicago"]
3. \`active\` - an array of booleans: [true, false, true]`,
      starterCode: `// Create your typed arrays

`,
      solutionCode: `// Create your typed arrays
let ages: number[] = [25, 30, 35];
let cities: string[] = ["NYC", "LA", "Chicago"];
let active: boolean[] = [true, false, true];`,
      testCases: [
        {
          id: 'test-1',
          description: 'ages should be [25, 30, 35]',
          testCode: `if (JSON.stringify(ages) !== JSON.stringify([25, 30, 35])) throw new Error('ages should be [25, 30, 35]');`,
        },
        {
          id: 'test-2',
          description: 'cities should be ["NYC", "LA", "Chicago"]',
          testCode: `if (JSON.stringify(cities) !== JSON.stringify(["NYC", "LA", "Chicago"])) throw new Error('cities should be ["NYC", "LA", "Chicago"]');`,
        },
        {
          id: 'test-3',
          description: 'active should be [true, false, true]',
          testCode: `if (JSON.stringify(active) !== JSON.stringify([true, false, true])) throw new Error('active should be [true, false, true]');`,
        },
      ],
      hints: [
        'Use type[] syntax: let ages: number[] = [...]',
        'String arrays use string[]',
        'Boolean arrays use boolean[]',
      ],
    },
    {
      id: 'step-5-object-arrays',
      order: 5,
      type: 'instruction',
      title: 'Arrays of Objects',
      content: `# Combining Arrays with Interfaces

Arrays can contain objects with a specific shape:`,
      codeExample: {
        code: `interface User {
  name: string;
  age: number;
}

let users: User[] = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 }
];

// TypeScript knows each element is a User:
let firstUser = users[0];       // User
let firstName = users[0].name;  // string`,
        language: 'typescript',
        highlight: [6],
      },
    },
    {
      id: 'step-6-exercise-2',
      order: 6,
      type: 'code-exercise',
      title: 'Array of Objects',
      instructions: `Create an interface \`Product\` with:
- \`name\` (string)
- \`price\` (number)

Then create a \`products\` array of type \`Product[]\` with at least 2 products.`,
      starterCode: `// Create the Product interface

// Create the products array
`,
      solutionCode: `// Create the Product interface
interface Product {
  name: string;
  price: number;
}

// Create the products array
let products: Product[] = [
  { name: "Laptop", price: 999 },
  { name: "Phone", price: 699 }
];`,
      testCases: [
        {
          id: 'test-1',
          description: 'products should have at least 2 items',
          testCode: `if (products.length < 2) throw new Error('products should have at least 2 items');`,
        },
        {
          id: 'test-2',
          description: 'Each product should have a name (string)',
          testCode: `if (typeof products[0].name !== 'string') throw new Error('products[0].name should be a string');`,
        },
        {
          id: 'test-3',
          description: 'Each product should have a price (number)',
          testCode: `if (typeof products[0].price !== 'number') throw new Error('products[0].price should be a number');`,
        },
      ],
      hints: [
        'Define the interface first, then use it as Product[]',
        'Each object in the array must match the interface',
      ],
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What type will TypeScript infer for `let items = [1, 2, 3]`?',
      options: [
        {
          id: 'a',
          text: 'Array<any>',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'number[]',
          isCorrect: true,
        },
        {
          id: 'c',
          text: '[number, number, number]',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'number',
          isCorrect: false,
        },
      ],
      explanation: 'TypeScript infers `number[]` because all elements are numbers. It\'s smart enough to see the pattern and create the appropriate array type!',
    },
  ],
}
