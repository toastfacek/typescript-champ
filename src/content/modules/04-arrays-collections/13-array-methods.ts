import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '13-array-methods',
  slug: 'array-methods',
  title: 'Array Methods',
  description: 'Master map, filter, reduce with TypeScript types.',
  order: 13,
  estimatedMinutes: 15,
  difficulty: 'beginner',
  xpReward: 70,
  prerequisites: ['12-typed-arrays'],
  tags: ['arrays', 'methods', 'functional'],
  keyConcepts: [
    {
      id: 'array-methods',
      term: 'Array Methods',
      definition: 'Array methods are built-in functions that operate on arrays. Methods like `map`, `filter`, `reduce`, `forEach`, and `find` let you transform, search, and manipulate arrays without writing loops. TypeScript ensures these methods are type-safe.',
      syntax: 'array.method(callback)',
      example: {
        code: 'let numbers = [1, 2, 3, 4, 5];\n\n// map: transform each element\nlet doubled = numbers.map(n => n * 2);  // [2, 4, 6, 8, 10]\n\n// filter: keep only matching elements\nlet evens = numbers.filter(n => n % 2 === 0);  // [2, 4]',
        explanation: 'Array methods take a callback function and apply it to each element. `map` transforms elements, `filter` keeps matching elements, and so on.',
      },
      whyItMatters: 'Array methods make code more readable and functional. They\'re the standard way to work with arrays in modern JavaScript and TypeScript, replacing manual loops.',
    },
    {
      id: 'map-filter-reduce',
      term: 'map/filter/reduce',
      definition: '`map`, `filter`, and `reduce` are three fundamental array methods. `map` transforms each element into a new value. `filter` keeps only elements that match a condition. `reduce` combines all elements into a single value. Together, they handle most array operations.',
      syntax: 'map(fn) | filter(fn) | reduce(fn, initial)',
      example: {
        code: 'let numbers = [1, 2, 3, 4];\n\n// map: transform\nlet doubled = numbers.map(n => n * 2);        // [2, 4, 6, 8]\n\n// filter: select\nlet evens = numbers.filter(n => n % 2 === 0);  // [2, 4]\n\n// reduce: combine\nlet sum = numbers.reduce((acc, n) => acc + n, 0);  // 10',
        explanation: '`map` creates a new array with transformed values. `filter` creates a new array with only matching values. `reduce` combines all values into one result.',
      },
      whyItMatters: 'These three methods cover most array operations. Mastering them lets you write concise, functional code that\'s easier to understand and maintain.',
    },
    {
      id: 'method-chaining',
      term: 'Method Chaining',
      definition: 'Method chaining is calling multiple array methods in sequence, where each method returns a new array. You can chain methods like `map().filter().map()` to perform complex transformations in a single, readable expression.',
      syntax: 'array.method1().method2().method3()',
      example: {
        code: 'let numbers = [1, 2, 3, 4, 5, 6];\n\n// Chain multiple operations\nlet result = numbers\n  .filter(n => n % 2 === 0)  // [2, 4, 6]\n  .map(n => n * 2)           // [4, 8, 12]\n  .reduce((sum, n) => sum + n, 0);  // 24',
        explanation: 'Each method returns a new array, so you can immediately call another method on it. This creates a pipeline of transformations that\'s easy to read.',
      },
      whyItMatters: 'Method chaining makes complex array operations readable and declarative. Instead of nested loops and temporary variables, you express the transformation as a clear sequence.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'Typed Array Methods',
      content: `# Array Methods with Type Safety

JavaScript array methods like \`map\`, \`filter\`, and \`reduce\` become even more powerful with TypeScript.

TypeScript tracks the types through each transformation!`,
    },
    {
      id: 'step-2-map',
      order: 2,
      type: 'instruction',
      title: 'The map() Method',
      content: `# Transform Arrays with map()

\`map()\` creates a new array by transforming each element:`,
      codeExample: {
        code: `let numbers: number[] = [1, 2, 3, 4, 5];

// Transform numbers to their squares
let squares: number[] = numbers.map(n => n * n);
// [1, 4, 9, 16, 25]

// Transform numbers to strings
let labels: string[] = numbers.map(n => "Item " + n);
// ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]

// TypeScript knows the return type changes!`,
        language: 'typescript',
        highlight: [4, 8],
      },
    },
    {
      id: 'step-3-filter',
      order: 3,
      type: 'instruction',
      title: 'The filter() Method',
      content: `# Select Elements with filter()

\`filter()\` creates a new array with elements that pass a test:`,
      codeExample: {
        code: `let scores: number[] = [45, 82, 91, 67, 55, 88];

// Keep only passing scores (>= 60)
let passing: number[] = scores.filter(s => s >= 60);
// [82, 91, 67, 88]

// Keep only high scores (>= 90)
let highScores: number[] = scores.filter(s => s >= 90);
// [91]

// TypeScript knows filter returns the same type`,
        language: 'typescript',
        highlight: [4],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Practice map()',
      instructions: `Given an array of numbers, use \`map()\` to create:
1. \`doubled\` - each number multiplied by 2
2. \`asStrings\` - each number converted to a string`,
      starterCode: `let numbers: number[] = [1, 2, 3, 4, 5];

// Create doubled array

// Create asStrings array
`,
      solutionCode: `let numbers: number[] = [1, 2, 3, 4, 5];

// Create doubled array
let doubled: number[] = numbers.map(n => n * 2);

// Create asStrings array
let asStrings: string[] = numbers.map(n => String(n));`,
      testCases: [
        {
          id: 'test-1',
          description: 'doubled should be [2, 4, 6, 8, 10]',
          testCode: `if (JSON.stringify(doubled) !== JSON.stringify([2, 4, 6, 8, 10])) throw new Error('doubled should be [2, 4, 6, 8, 10]');`,
        },
        {
          id: 'test-2',
          description: 'asStrings should be ["1", "2", "3", "4", "5"]',
          testCode: `if (JSON.stringify(asStrings) !== JSON.stringify(["1", "2", "3", "4", "5"])) throw new Error('asStrings should be ["1", "2", "3", "4", "5"]');`,
        },
      ],
      hints: [
        'Use .map(n => n * 2) for doubling',
        'Convert to string with String(n) or n.toString() or "" + n',
      ],
    },
    {
      id: 'step-5-reduce',
      order: 5,
      type: 'instruction',
      title: 'The reduce() Method',
      content: `# Combine Elements with reduce()

\`reduce()\` combines all elements into a single value:`,
      codeExample: {
        code: `let prices: number[] = [10, 20, 30, 40];

// Sum all prices
let total: number = prices.reduce((sum, price) => sum + price, 0);
// 100

// Find the maximum
let max: number = prices.reduce((m, p) => p > m ? p : m, prices[0]);
// 40

// The second argument (0, prices[0]) is the initial value`,
        language: 'typescript',
        highlight: [4, 8],
      },
    },
    {
      id: 'step-6-exercise-2',
      order: 6,
      type: 'code-exercise',
      title: 'Practice filter() and reduce()',
      instructions: `Given an array of scores:
1. Use \`filter()\` to create \`passed\` - scores >= 70
2. Use \`reduce()\` to create \`sum\` - total of all original scores`,
      starterCode: `let scores: number[] = [85, 62, 91, 78, 45, 88];

// Create passed array (scores >= 70)

// Create sum of all scores
`,
      solutionCode: `let scores: number[] = [85, 62, 91, 78, 45, 88];

// Create passed array (scores >= 70)
let passed: number[] = scores.filter(s => s >= 70);

// Create sum of all scores
let sum: number = scores.reduce((total, s) => total + s, 0);`,
      testCases: [
        {
          id: 'test-1',
          description: 'passed should be [85, 91, 78, 88]',
          testCode: `if (JSON.stringify(passed) !== JSON.stringify([85, 91, 78, 88])) throw new Error('passed should be [85, 91, 78, 88]');`,
        },
        {
          id: 'test-2',
          description: 'sum should be 449',
          testCode: `if (sum !== 449) throw new Error('sum should be 449');`,
        },
      ],
      hints: [
        'Filter with: scores.filter(s => s >= 70)',
        'Reduce with: scores.reduce((total, s) => total + s, 0)',
        'The 0 in reduce is the initial value for total',
      ],
    },
    {
      id: 'step-7-chaining',
      order: 7,
      type: 'instruction',
      title: 'Method Chaining',
      content: `# Chaining Array Methods

You can chain multiple methods together:`,
      codeExample: {
        code: `interface Product {
  name: string;
  price: number;
  inStock: boolean;
}

let products: Product[] = [
  { name: "Laptop", price: 999, inStock: true },
  { name: "Phone", price: 699, inStock: false },
  { name: "Tablet", price: 499, inStock: true }
];

// Get names of in-stock products
let availableNames: string[] = products
  .filter(p => p.inStock)      // Keep in-stock
  .map(p => p.name);           // Get names
// ["Laptop", "Tablet"]`,
        language: 'typescript',
        highlight: [15, 16],
      },
    },
    {
      id: 'step-8-quiz',
      order: 8,
      type: 'quiz',
      question: 'What is the return type of `[1, 2, 3].map(n => n > 1)`?',
      options: [
        {
          id: 'a',
          text: 'number[]',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'boolean[]',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'boolean',
          isCorrect: false,
        },
        {
          id: 'd',
          text: '(number | boolean)[]',
          isCorrect: false,
        },
      ],
      explanation: 'The callback `n => n > 1` returns a boolean (true or false), so `map()` returns `boolean[]`. TypeScript tracks the type transformation!',
    },
  ],
}
