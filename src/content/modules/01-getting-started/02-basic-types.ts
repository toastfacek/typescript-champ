import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '02-basic-types',
  slug: 'basic-types',
  title: 'Basic Types',
  description: 'Master the fundamental types: string, number, and boolean.',
  order: 2,
  estimatedMinutes: 10,
  difficulty: 'beginner',
  xpReward: 60,
  prerequisites: ['01-hello-typescript'],
  tags: ['basics', 'types'],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'The Three Basic Types',
      content: `# The Building Blocks

Every program works with data. In TypeScript, the most common types of data are:

- **string** - Text like \`"hello"\` or \`'world'\`
- **number** - Any number like \`42\`, \`3.14\`, or \`-10\`
- **boolean** - Either \`true\` or \`false\`

Let's explore each one!`,
    },
    {
      id: 'step-2-strings',
      order: 2,
      type: 'instruction',
      title: 'Strings',
      content: `# Working with Strings

Strings hold text. You can use single quotes, double quotes, or backticks:`,
      codeExample: {
        code: `let single: string = 'Hello';
let double: string = "World";
let backticks: string = \`Hello, World!\`;

// Backticks allow embedding variables:
let name: string = "Alice";
let greeting: string = \`Hello, \${name}!\`;
// greeting is now "Hello, Alice!"`,
        language: 'typescript',
        highlight: [7],
      },
    },
    {
      id: 'step-3-exercise-strings',
      order: 3,
      type: 'code-exercise',
      title: 'String Practice',
      instructions: `Create two string variables:
1. \`firstName\` with your first name (or any name)
2. \`fullGreeting\` that combines them using backticks like: \`Hello, [name]!\``,
      starterCode: `// Create firstName
let firstName: string =

// Create fullGreeting using backticks and \${firstName}
let fullGreeting: string = `,
      solutionCode: `// Create firstName
let firstName: string = "Alex";

// Create fullGreeting using backticks and \${firstName}
let fullGreeting: string = \`Hello, \${firstName}!\`;`,
      testCases: [
        {
          id: 'test-1',
          description: 'firstName should be a string',
          testCode: `if (typeof firstName !== 'string') throw new Error('firstName should be a string');`,
        },
        {
          id: 'test-2',
          description: 'fullGreeting should contain firstName',
          testCode: `if (!fullGreeting.includes(firstName)) throw new Error('fullGreeting should include firstName');`,
        },
        {
          id: 'test-3',
          description: 'fullGreeting should start with "Hello, "',
          testCode: `if (!fullGreeting.startsWith('Hello, ')) throw new Error('fullGreeting should start with "Hello, "');`,
        },
      ],
      hints: [
        'Use any name you like in quotes for firstName',
        'Backticks look like this: `',
        'Inside backticks, use ${variableName} to insert a variable',
      ],
    },
    {
      id: 'step-4-numbers',
      order: 4,
      type: 'instruction',
      title: 'Numbers',
      content: `# Working with Numbers

TypeScript uses \`number\` for all numeric values - integers, decimals, negatives:`,
      codeExample: {
        code: `let age: number = 25;
let price: number = 19.99;
let temperature: number = -5;
let million: number = 1_000_000; // Underscores for readability

// Math operations work as expected:
let sum: number = 10 + 5;      // 15
let product: number = 4 * 3;   // 12`,
        language: 'typescript',
      },
    },
    {
      id: 'step-5-exercise-numbers',
      order: 5,
      type: 'code-exercise',
      title: 'Number Practice',
      instructions: `Create three number variables:
1. \`price\` set to \`29.99\`
2. \`quantity\` set to \`3\`
3. \`total\` that multiplies price by quantity`,
      starterCode: `// Create the variables


`,
      solutionCode: `// Create the variables
let price: number = 29.99;
let quantity: number = 3;
let total: number = price * quantity;`,
      testCases: [
        {
          id: 'test-1',
          description: 'price should be 29.99',
          testCode: `if (price !== 29.99) throw new Error('price should be 29.99');`,
        },
        {
          id: 'test-2',
          description: 'quantity should be 3',
          testCode: `if (quantity !== 3) throw new Error('quantity should be 3');`,
        },
        {
          id: 'test-3',
          description: 'total should be price * quantity',
          testCode: `if (Math.abs(total - 89.97) > 0.01) throw new Error('total should be price * quantity');`,
        },
      ],
      hints: [
        'Decimals are just numbers with a dot',
        'Use * for multiplication',
        'You can use other variables in calculations',
      ],
    },
    {
      id: 'step-6-booleans',
      order: 6,
      type: 'instruction',
      title: 'Booleans',
      content: `# Working with Booleans

Booleans are simple: just \`true\` or \`false\`. They're perfect for yes/no questions:`,
      codeExample: {
        code: `let isLoggedIn: boolean = true;
let hasPermission: boolean = false;

// Often used with comparisons:
let age: number = 18;
let isAdult: boolean = age >= 18;  // true

let score: number = 85;
let passed: boolean = score >= 70;  // true`,
        language: 'typescript',
        highlight: [5, 8],
      },
    },
    {
      id: 'step-7-exercise-booleans',
      order: 7,
      type: 'code-exercise',
      title: 'Boolean Practice',
      instructions: `Create:
1. A \`score\` variable set to \`75\`
2. A \`passed\` boolean that checks if score is 60 or higher
3. A \`excellent\` boolean that checks if score is 90 or higher`,
      starterCode: `// Create the variables


`,
      solutionCode: `// Create the variables
let score: number = 75;
let passed: boolean = score >= 60;
let excellent: boolean = score >= 90;`,
      testCases: [
        {
          id: 'test-1',
          description: 'score should be 75',
          testCode: `if (score !== 75) throw new Error('score should be 75');`,
        },
        {
          id: 'test-2',
          description: 'passed should be true (75 >= 60)',
          testCode: `if (passed !== true) throw new Error('passed should be true');`,
        },
        {
          id: 'test-3',
          description: 'excellent should be false (75 < 90)',
          testCode: `if (excellent !== false) throw new Error('excellent should be false');`,
        },
      ],
      hints: [
        'Use >= for "greater than or equal to"',
        'Comparisons return true or false automatically',
        '75 is >= 60 but not >= 90',
      ],
    },
    {
      id: 'step-8-quiz',
      order: 8,
      type: 'quiz',
      question: 'Which of these is the correct way to create a boolean variable?',
      options: [
        {
          id: 'a',
          text: 'let active: boolean = "true";',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'let active: boolean = true;',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'let active: bool = true;',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'let active: Boolean = True;',
          isCorrect: false,
        },
      ],
      explanation: 'Booleans use `true` and `false` without quotes. The type is `boolean` (lowercase), and the values are `true`/`false` (also lowercase).',
    },
  ],
}
