import type { Lesson, Curriculum } from '@/types'

// First lesson: Hello TypeScript
const lesson01HelloTypescript: Lesson = {
  id: '01-hello-typescript',
  slug: 'hello-typescript',
  title: 'Hello, TypeScript!',
  description: 'Your first steps into the world of TypeScript. Learn what makes it special.',
  order: 1,
  estimatedMinutes: 8,
  difficulty: 'beginner',
  xpReward: 50,
  prerequisites: [],
  tags: ['basics', 'introduction'],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'Welcome to TypeScript!',
      content: `# Welcome to TypeScript!

You're about to learn one of the most powerful tools in modern development.

**TypeScript** is JavaScript with superpowers. It helps you catch mistakes *before* your code runs, making it perfect for building reliable applications.

## Why TypeScript?

- **Catch errors early** - Find bugs while coding, not in production
- **Better autocomplete** - Your editor understands your code better
- **Easier refactoring** - Change code confidently
- **Self-documenting** - Types explain what your code does

Let's write your first line of TypeScript!`,
    },
    {
      id: 'step-2-first-variable',
      order: 2,
      type: 'instruction',
      title: 'Your First Variable',
      content: `# Variables with Types

In TypeScript, you can tell the computer exactly what kind of data a variable holds.

Here's how you create a **typed variable**:`,
      codeExample: {
        code: `// A string variable
let greeting: string = "Hello, TypeScript!";

// A number variable
let age: number = 25;

// A boolean variable
let isLearning: boolean = true;`,
        language: 'typescript',
        highlight: [2],
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Create Your First Variable',
      instructions: `Create a variable called \`message\` that holds the text \`"Hello, World!"\`.

Don't forget to add the type annotation \`: string\` after the variable name!`,
      starterCode: `// Create your message variable below

`,
      solutionCode: `// Create your message variable below
let message: string = "Hello, World!";`,
      testCases: [
        {
          id: 'test-1',
          description: 'Variable `message` should exist',
          testCode: `if (typeof message === 'undefined') throw new Error('message is not defined');`,
        },
        {
          id: 'test-2',
          description: 'Variable should be a string',
          testCode: `if (typeof message !== 'string') throw new Error('message should be a string');`,
        },
        {
          id: 'test-3',
          description: 'Variable should equal "Hello, World!"',
          testCode: `if (message !== 'Hello, World!') throw new Error('message should be "Hello, World!"');`,
        },
      ],
      hints: [
        'Start with the keyword `let` followed by your variable name',
        'After the variable name, add `: string` to specify the type',
        'Use `=` to assign the value with quotes around the text',
      ],
      aiHintPrompt: 'The user is creating their first TypeScript variable with a type annotation.',
    },
    {
      id: 'step-4-type-safety',
      order: 4,
      type: 'instruction',
      title: 'Type Safety in Action',
      content: `# Why Types Matter

Watch what happens when you try to put the wrong type of data in a variable:`,
      codeExample: {
        code: `let name: string = "Alice";

// This works fine:
name = "Bob";

// But this would cause an error:
// name = 42;  // Error! Can't assign number to string`,
        language: 'typescript',
        highlight: [7],
      },
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Practice with Numbers',
      instructions: `Create a variable called \`score\` with the type \`number\` and set it to \`100\`.`,
      starterCode: `// Create your score variable below

`,
      solutionCode: `// Create your score variable below
let score: number = 100;`,
      testCases: [
        {
          id: 'test-1',
          description: 'Variable `score` should exist',
          testCode: `if (typeof score === 'undefined') throw new Error('score is not defined');`,
        },
        {
          id: 'test-2',
          description: 'Variable should be a number',
          testCode: `if (typeof score !== 'number') throw new Error('score should be a number');`,
        },
        {
          id: 'test-3',
          description: 'Variable should equal 100',
          testCode: `if (score !== 100) throw new Error('score should be 100');`,
        },
      ],
      hints: [
        'Use `let` to declare the variable',
        'The type annotation is `: number`',
        'Numbers don\'t need quotes',
      ],
      aiHintPrompt: 'The user is practicing number type annotations in TypeScript.',
    },
    {
      id: 'step-6-fill-blank',
      order: 6,
      type: 'fill-in-blank',
      title: 'Fill in the Types',
      instructions: 'Complete the code by filling in the correct type annotations.',
      codeTemplate: `let username: {{BLANK_1}} = "coder123";
let level: {{BLANK_2}} = 5;
let isPremium: {{BLANK_3}} = false;`,
      blanks: [
        {
          id: 'BLANK_1',
          placeholder: 'type',
          correctAnswers: ['string'],
          caseSensitive: true,
          hint: 'What type of value is "coder123"?',
        },
        {
          id: 'BLANK_2',
          placeholder: 'type',
          correctAnswers: ['number'],
          caseSensitive: true,
          hint: '5 is what type of value?',
        },
        {
          id: 'BLANK_3',
          placeholder: 'type',
          correctAnswers: ['boolean'],
          caseSensitive: true,
          hint: 'true and false are what type?',
        },
      ],
      hints: [
        'TypeScript has three basic types: string, number, and boolean',
        'Text in quotes is always a string',
        'true/false values are booleans',
      ],
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What will happen if you try to assign a number to a string variable in TypeScript?',
      codeContext: `let name: string = "Alice";
name = 42; // What happens?`,
      options: [
        {
          id: 'a',
          text: 'TypeScript converts the number to a string automatically',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'TypeScript shows an error before you run the code',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'The code crashes when it runs',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'The variable becomes undefined',
          isCorrect: false,
        },
      ],
      explanation: 'TypeScript catches type mismatches at compile time, before your code runs. This is one of its main benefits - finding bugs early!',
    },
  ],
}

// Second lesson: Basic Types
const lesson02BasicTypes: Lesson = {
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

// Third lesson: Type Inference
const lesson03TypeInference: Lesson = {
  id: '03-type-inference',
  slug: 'type-inference',
  title: 'Type Inference',
  description: 'Learn when TypeScript can figure out types automatically.',
  order: 3,
  estimatedMinutes: 8,
  difficulty: 'beginner',
  xpReward: 50,
  prerequisites: ['02-basic-types'],
  tags: ['basics', 'types', 'inference'],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'TypeScript is Smart',
      content: `# Type Inference

Here's something cool: TypeScript can often **figure out types automatically**!

When you assign a value right away, TypeScript infers the type:`,
      codeExample: {
        code: `// These are equivalent:
let message: string = "Hello";
let message2 = "Hello";  // TypeScript knows this is a string!

// Same with numbers and booleans:
let count = 42;        // TypeScript infers: number
let isReady = true;    // TypeScript infers: boolean`,
        language: 'typescript',
        highlight: [3],
      },
    },
    {
      id: 'step-2-when-to-use',
      order: 2,
      type: 'instruction',
      title: 'When to Add Types',
      content: `# Best Practices

**Let TypeScript infer** when the value is obvious:
\`\`\`typescript
let name = "Alice";     // Clearly a string
let age = 25;           // Clearly a number
\`\`\`

**Add types explicitly** when:
- Declaring without a value
- The type isn't obvious
- You want to document the expected type

\`\`\`typescript
let username: string;   // No value yet, need the type
let data: unknown;      // Intentionally flexible
\`\`\``,
    },
    {
      id: 'step-3-exercise',
      order: 3,
      type: 'code-exercise',
      title: 'Practice Inference',
      instructions: `Create these variables **without** type annotations (let TypeScript infer them):
1. \`playerName\` set to \`"Hero"\`
2. \`lives\` set to \`3\`
3. \`isPlaying\` set to \`true\``,
      starterCode: `// Create the variables without type annotations


`,
      solutionCode: `// Create the variables without type annotations
let playerName = "Hero";
let lives = 3;
let isPlaying = true;`,
      testCases: [
        {
          id: 'test-1',
          description: 'playerName should be "Hero"',
          testCode: `if (playerName !== "Hero") throw new Error('playerName should be "Hero"');`,
        },
        {
          id: 'test-2',
          description: 'lives should be 3',
          testCode: `if (lives !== 3) throw new Error('lives should be 3');`,
        },
        {
          id: 'test-3',
          description: 'isPlaying should be true',
          testCode: `if (isPlaying !== true) throw new Error('isPlaying should be true');`,
        },
      ],
      hints: [
        'Just use: let variableName = value',
        'No colon or type needed when assigning immediately',
        'TypeScript figures it out!',
      ],
    },
    {
      id: 'step-4-quiz',
      order: 4,
      type: 'quiz',
      question: 'What type will TypeScript infer for: `let items = 5;`',
      options: [
        {
          id: 'a',
          text: 'any',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'number',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'int',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'undefined',
          isCorrect: false,
        },
      ],
      explanation: 'TypeScript sees `5` and infers the type as `number`. It\'s smart enough to understand what kind of value you\'re working with!',
    },
  ],
}

// Export all lessons as a map
export const lessons: Record<string, Lesson> = {
  '01-hello-typescript': lesson01HelloTypescript,
  '02-basic-types': lesson02BasicTypes,
  '03-type-inference': lesson03TypeInference,
}

// Export curriculum structure
export const curriculum: Curriculum = {
  title: 'TypeScript Fundamentals',
  description: 'Master TypeScript from the ground up',
  modules: [
    {
      id: 'module-1',
      title: 'Getting Started',
      description: 'Your first steps with TypeScript',
      lessons: ['01-hello-typescript', '02-basic-types', '03-type-inference'],
    },
    {
      id: 'module-2',
      title: 'Working with Functions',
      description: 'Create reusable, typed functions',
      lessons: [], // Coming soon
    },
    {
      id: 'module-3',
      title: 'Objects & Interfaces',
      description: 'Structure your data with types',
      lessons: [], // Coming soon
    },
  ],
}
