import type { Lesson } from '@/types'

export const lesson: Lesson = {
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
  keyConcepts: [
    {
      id: 'variable',
      term: 'Variable',
      definition: 'A named container that stores a value. Think of it like a labeled box where you can put data. Variables let you save information and use it later in your code.',
      syntax: 'let variableName = value;',
      example: {
        code: 'let score = 100;',
        explanation: 'Creates a variable called "score" and stores the number 100 in it. You can use "score" anywhere in your code to refer to this value.',
      },
      whyItMatters: 'Variables let you save and reuse values throughout your program instead of typing them repeatedly. They make your code easier to read and modify.',
    },
    {
      id: 'let-keyword',
      term: 'let Keyword',
      definition: 'The `let` keyword is used to declare (create) a new variable. It tells TypeScript "I want to create a new container with this name".',
      syntax: 'let variableName = value;',
      example: {
        code: 'let name = "Alice";',
        explanation: 'The `let` keyword creates a new variable called "name" and assigns it the value "Alice".',
      },
      whyItMatters: 'Using `let` is the standard way to create variables in modern JavaScript and TypeScript. It makes your code clear and prevents accidental errors.',
    },
    {
      id: 'type-annotation',
      term: 'Type Annotation',
      definition: 'The ": type" part after a variable name that tells TypeScript what kind of data the variable holds. It\'s like a label on a box that says what can go inside.',
      syntax: 'let name: string = "value";',
      example: {
        code: 'let age: number = 25;',
        explanation: 'The ": number" tells TypeScript this variable will only hold numbers. If you try to put text in it, TypeScript will show an error.',
      },
      whyItMatters: 'Type annotations catch mistakes before your code runs - like trying to do math with text or calling a function with the wrong type of data. They make your code safer and easier to understand.',
    },
    {
      id: 'string',
      term: 'String',
      definition: 'A string is a type of data that represents text. It can contain letters, numbers, spaces, and symbols. Strings are always wrapped in quotes (single, double, or backticks).',
      syntax: 'let text: string = "your text here";',
      example: {
        code: 'let greeting: string = "Hello, World!";',
        explanation: 'Creates a string variable containing the text "Hello, World!". The quotes tell TypeScript this is text, not code.',
      },
      whyItMatters: 'Strings are used everywhere in programming - for displaying messages, storing user input, file names, and more. Understanding strings is essential for any programming task.',
    },
    {
      id: 'number',
      term: 'Number',
      definition: 'A number is a type of data that represents numeric values. It can be a whole number (like 42) or a decimal (like 3.14), positive or negative.',
      syntax: 'let count: number = 42;',
      example: {
        code: 'let price: number = 19.99;\nlet quantity: number = 5;',
        explanation: 'Creates number variables. Notice numbers don\'t have quotes - that\'s how TypeScript knows they\'re numbers, not text.',
      },
      whyItMatters: 'Numbers are used for calculations, counting, measurements, and any situation where you need to do math. They\'re fundamental to almost every program.',
    },
    {
      id: 'boolean',
      term: 'Boolean',
      definition: 'A boolean is a type that can only be `true` or `false`. It represents yes/no, on/off, or any situation with exactly two possible states.',
      syntax: 'let isActive: boolean = true;',
      example: {
        code: 'let isLoggedIn: boolean = true;\nlet hasPermission: boolean = false;',
        explanation: 'Booleans are perfect for flags and conditions. They help your code make decisions like "if the user is logged in, show this button".',
      },
      whyItMatters: 'Booleans are essential for controlling program flow - making decisions, checking conditions, and determining what your code should do next.',
    },
  ],
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
