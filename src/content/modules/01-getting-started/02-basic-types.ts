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
  keyConcepts: [
    {
      id: 'quotes',
      term: 'Quotes (Single, Double, Backticks)',
      definition: 'In TypeScript, you can wrap text in three types of quotes. Single quotes (\'), double quotes ("), and backticks (`). Single and double quotes work the same way, but backticks allow special features like embedding variables.',
      syntax: `let single: string = 'text';\nlet double: string = "text";\nlet backticks: string = \`text\`;`,
      example: {
        code: `let name = "Alice";\nlet greeting = 'Hello';\nlet message = \`Hello, \${name}!\`;`,
        explanation: 'Single and double quotes create regular strings. Backticks allow you to use ${} to insert variables directly into the text.',
      },
      whyItMatters: 'Understanding quotes helps you work with text effectively. Backticks are especially powerful for creating dynamic strings with embedded values.',
    },
    {
      id: 'template-literals',
      term: 'Template Literals',
      definition: 'Template literals use backticks (`) and allow you to embed variables and expressions directly into strings using ${}. This makes it easy to combine text with values.',
      syntax: 'let message = `Text ${variable} more text`;',
      example: {
        code: 'let name = "Alice";\nlet greeting = `Hello, ${name}!`;\n// greeting is now "Hello, Alice!"',
        explanation: 'The ${name} part gets replaced with the value of the name variable. This is much cleaner than using + to combine strings.',
      },
      whyItMatters: 'Template literals make it easy to create dynamic strings - like personalized messages, formatted output, or combining multiple pieces of data. They\'re cleaner and more readable than string concatenation.',
    },
    {
      id: 'operators',
      term: 'Operators',
      definition: 'Operators are symbols that perform operations on values. Common operators include + (addition), - (subtraction), * (multiplication), / (division), and = (assignment).',
      syntax: 'let result = value1 + value2;',
      example: {
        code: 'let sum = 10 + 5;      // 15\nlet product = 4 * 3;   // 12\nlet quotient = 20 / 4; // 5',
        explanation: 'Operators let you perform calculations. The + adds numbers, * multiplies, and / divides.',
      },
      whyItMatters: 'Operators are the building blocks of all calculations in programming. You\'ll use them constantly for math, comparisons, and combining values.',
    },
    {
      id: 'comparison-operators',
      term: 'Comparison Operators',
      definition: 'Comparison operators compare two values and return a boolean (true or false). Common ones are: > (greater than), < (less than), >= (greater than or equal), <= (less than or equal), === (equal), !== (not equal).',
      syntax: 'let result: boolean = value1 >= value2;',
      example: {
        code: 'let age = 18;\nlet isAdult = age >= 18;  // true\nlet score = 85;\nlet passed = score >= 70;  // true',
        explanation: 'Comparisons check relationships between values. age >= 18 checks if age is 18 or more, returning true or false.',
      },
      whyItMatters: 'Comparisons let your code make decisions - "if the score is high enough, pass the test" or "if the user is old enough, show this content". They\'re essential for program logic.',
    },
  ],
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
      concept: {
        id: 'template-literals',
        name: 'Template Literals',
        description: 'Using backticks and ${} syntax to create strings with embedded expressions'
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
      concept: {
        id: 'template-literals',
        name: 'Template Literals',
        description: 'Using backticks and ${} syntax to create strings with embedded expressions'
      },
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
      concept: {
        id: 'number-operations',
        name: 'Number Operations',
        description: 'Performing arithmetic operations with number types'
      },
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
      concept: {
        id: 'comparison-operators',
        name: 'Comparison Operators',
        description: 'Using >=, <=, >, <, ===, !== to compare values and create boolean results'
      },
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
