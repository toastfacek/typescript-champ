import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '06-arrow-functions',
  slug: 'arrow-functions',
  title: 'Arrow Functions',
  description: 'Learn the modern, concise arrow function syntax.',
  order: 6,
  estimatedMinutes: 10,
  difficulty: 'beginner',
  xpReward: 50,
  prerequisites: ['05-parameters-defaults'],
  tags: ['functions', 'arrow-functions', 'es6'],
  keyConcepts: [
    {
      id: 'arrow-functions',
      term: 'Arrow Functions',
      definition: 'Arrow functions are a shorter, more concise way to write functions in TypeScript and JavaScript. They use the `=>` symbol (an arrow) instead of the `function` keyword. Arrow functions are especially useful for short, simple functions.',
      syntax: 'const name = (param: type): returnType => expression;',
      example: {
        code: '// Regular function\nfunction add(a: number, b: number): number {\n  return a + b;\n}\n\n// Arrow function\nconst add = (a: number, b: number): number => a + b;',
        explanation: 'Both functions do the same thing, but the arrow function is shorter. The `=>` replaces `function` and `return` when you have a single expression.',
      },
      whyItMatters: 'Arrow functions make code more concise and readable, especially for simple operations. They\'re widely used in modern JavaScript and TypeScript codebases.',
    },
    {
      id: 'this-binding',
      term: 'this Binding',
      definition: 'Arrow functions handle `this` differently than regular functions. In arrow functions, `this` is "bound" to the surrounding context where the arrow function was created, rather than changing based on how it\'s called. This makes arrow functions predictable and avoids common `this` confusion.',
      syntax: 'const method = () => { /* this refers to outer context */ }',
      example: {
        code: 'class Counter {\n  count = 0;\n  \n  // Arrow function: this always refers to Counter instance\n  increment = () => {\n    this.count++;\n  }\n}',
        explanation: 'In arrow functions, `this` refers to the `Counter` instance, not the calling context. This makes it safe to pass `increment` around without losing the reference to `this`.',
      },
      whyItMatters: 'Arrow functions solve a common problem where `this` changes unexpectedly. They\'re especially useful in callbacks and class methods where you want `this` to stay consistent.',
    },
    {
      id: 'implicit-returns',
      term: 'Implicit Returns',
      definition: 'When an arrow function has a single expression (no braces `{}`), it automatically returns that expression without needing the `return` keyword. This is called an "implicit return" - the return happens automatically.',
      syntax: 'const name = (param: type): returnType => expression;',
      example: {
        code: '// Explicit return (with braces)\nconst double = (n: number): number => {\n  return n * 2;\n};\n\n// Implicit return (no braces)\nconst double = (n: number): number => n * 2;',
        explanation: 'Both functions return `n * 2`, but the second one doesn\'t need `return` or braces. The expression after `=>` is automatically returned.',
      },
      whyItMatters: 'Implicit returns make arrow functions even more concise. They\'re perfect for simple transformations and make code easier to read when you have short, single-purpose functions.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'Arrow Functions',
      content: `# A Shorter Way to Write Functions

Arrow functions (\`=>\`) are a more concise syntax for writing functions. They're especially popular in modern JavaScript and TypeScript.

The "arrow" is the \`=>\` symbol (equals sign followed by greater-than).`,
    },
    {
      id: 'step-2-syntax',
      order: 2,
      type: 'instruction',
      title: 'Arrow Function Syntax',
      content: `# From Regular to Arrow

Here's how a regular function becomes an arrow function:`,
      codeExample: {
        code: `// Regular function
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const add = (a: number, b: number): number => {
  return a + b;
};

// Even shorter: implicit return (no braces!)
const add = (a: number, b: number): number => a + b;`,
        language: 'typescript',
        highlight: [7, 12],
      },
    },
    {
      id: 'step-3-implicit-return',
      order: 3,
      type: 'instruction',
      title: 'Implicit Returns',
      content: `# Skip the Return Keyword

When your function body is a single expression, you can skip the braces AND the return keyword:`,
      codeExample: {
        code: `// With braces: need explicit return
const square = (n: number): number => {
  return n * n;
};

// Without braces: implicit return
const square = (n: number): number => n * n;

// More examples:
const double = (n: number): number => n * 2;
const isEven = (n: number): boolean => n % 2 === 0;
const greet = (name: string): string => \`Hello, \${name}!\`;`,
        language: 'typescript',
        highlight: [7],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Convert to Arrow Function',
      instructions: `Convert this regular function to an arrow function with implicit return:

\`\`\`typescript
function triple(n: number): number {
  return n * 3;
}
\`\`\`

Store it in a const called \`triple\`.`,
      starterCode: `// Convert to arrow function with implicit return
const triple = `,
      solutionCode: `// Convert to arrow function with implicit return
const triple = (n: number): number => n * 3;`,
      testCases: [
        {
          id: 'test-1',
          description: 'triple(4) should return 12',
          testCode: `if (triple(4) !== 12) throw new Error('triple(4) should return 12');`,
        },
        {
          id: 'test-2',
          description: 'triple(0) should return 0',
          testCode: `if (triple(0) !== 0) throw new Error('triple(0) should return 0');`,
        },
      ],
      hints: [
        'Start with: (n: number): number =>',
        'After =>, just write the expression: n * 3',
        'No braces or return keyword needed for single expressions',
      ],
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Create Arrow Functions',
      instructions: `Create two arrow functions:

1. \`isNegative\`: takes a number, returns true if it's less than 0
2. \`getLength\`: takes a string, returns its length (use \`.length\`)

Use implicit returns for both!`,
      starterCode: `// Create isNegative arrow function

// Create getLength arrow function
`,
      solutionCode: `// Create isNegative arrow function
const isNegative = (n: number): boolean => n < 0;

// Create getLength arrow function
const getLength = (s: string): number => s.length;`,
      testCases: [
        {
          id: 'test-1',
          description: 'isNegative(-5) should return true',
          testCode: `if (isNegative(-5) !== true) throw new Error('isNegative(-5) should return true');`,
        },
        {
          id: 'test-2',
          description: 'isNegative(5) should return false',
          testCode: `if (isNegative(5) !== false) throw new Error('isNegative(5) should return false');`,
        },
        {
          id: 'test-3',
          description: 'getLength("hello") should return 5',
          testCode: `if (getLength("hello") !== 5) throw new Error('getLength("hello") should return 5');`,
        },
        {
          id: 'test-4',
          description: 'getLength("") should return 0',
          testCode: `if (getLength("") !== 0) throw new Error('getLength("") should return 0');`,
        },
      ],
      hints: [
        'isNegative checks if n < 0',
        'String length is accessed with .length',
        'Both can be one-liners with implicit returns',
      ],
    },
    {
      id: 'step-6-fill-blank',
      order: 6,
      type: 'fill-in-blank',
      title: 'Complete the Arrow Functions',
      instructions: 'Fill in the blanks to complete these arrow functions.',
      codeTemplate: `// Arrow function to check if number is positive
const isPositive = (n: number): boolean {{BLANK_1}} n > 0;

// Arrow function with a block body
const greet = (name: string): string {{BLANK_2}} {
  return "Hello, " + name;
};`,
      blanks: [
        {
          id: 'BLANK_1',
          placeholder: 'arrow',
          correctAnswers: ['=>'],
          caseSensitive: true,
          hint: 'What symbol creates an arrow function?',
        },
        {
          id: 'BLANK_2',
          placeholder: 'arrow',
          correctAnswers: ['=>'],
          caseSensitive: true,
          hint: 'Same symbol, even with block bodies',
        },
      ],
      hints: [
        'The arrow is: =>',
        'Used for both implicit and block-body arrow functions',
      ],
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'Which arrow function correctly squares a number?',
      options: [
        {
          id: 'a',
          text: 'const square = n: number => n * n;',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'const square = (n: number): number => n * n;',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'const square = (n: number): number => return n * n;',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'const square => (n: number): number = n * n;',
          isCorrect: false,
        },
      ],
      explanation: 'Arrow functions need parentheses around parameters (with types), then `: returnType =>`, then the expression. Don\'t use `return` with implicit returns!',
    },
  ],
}
