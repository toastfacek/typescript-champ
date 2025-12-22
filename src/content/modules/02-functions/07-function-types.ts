import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '07-function-types',
  slug: 'function-types',
  title: 'Function Types',
  description: 'Learn to type functions as values and use callbacks.',
  order: 7,
  estimatedMinutes: 14,
  difficulty: 'beginner',
  xpReward: 70,
  prerequisites: ['06-arrow-functions'],
  tags: ['functions', 'types', 'callbacks'],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'Functions as Values',
      content: `# Functions Are Values Too!

In TypeScript, functions are values - you can store them in variables, pass them to other functions, and return them from functions.

When you do this, you need to describe the function's **type signature**:
- What parameters it accepts
- What it returns`,
    },
    {
      id: 'step-2-function-type-syntax',
      order: 2,
      type: 'instruction',
      title: 'Function Type Syntax',
      content: `# Writing Function Types

Here's how to describe a function's type:`,
      codeExample: {
        code: `// A variable that holds a function
let greet: (name: string) => string;

// Now we can assign any matching function
greet = (name) => "Hello, " + name;
greet = (name) => \`Hi, \${name}!\`;

// A function that takes two numbers and returns a number
let calculate: (a: number, b: number) => number;
calculate = (a, b) => a + b;
calculate = (a, b) => a * b;`,
        language: 'typescript',
        highlight: [2, 9],
      },
    },
    {
      id: 'step-3-callbacks',
      order: 3,
      type: 'instruction',
      title: 'Callback Functions',
      content: `# Passing Functions as Arguments

A "callback" is a function you pass to another function:`,
      codeExample: {
        code: `// A function that accepts a callback
function processNumber(
  value: number,
  callback: (n: number) => number
): number {
  return callback(value);
}

// Using it with different callbacks
processNumber(5, (n) => n * 2);     // 10
processNumber(5, (n) => n + 10);    // 15
processNumber(5, (n) => n * n);     // 25`,
        language: 'typescript',
        highlight: [4],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Declare a Function Type',
      instructions: `Declare a variable called \`mathOperation\` with a type that:
- Takes two numbers as parameters
- Returns a number

Then assign it an arrow function that subtracts the second number from the first.`,
      starterCode: `// Declare mathOperation with the correct type and assign a subtraction function

`,
      solutionCode: `// Declare mathOperation with the correct type and assign a subtraction function
let mathOperation: (a: number, b: number) => number;
mathOperation = (a, b) => a - b;`,
      testCases: [
        {
          id: 'test-1',
          description: 'mathOperation(10, 3) should return 7',
          testCode: `if (mathOperation(10, 3) !== 7) throw new Error('mathOperation(10, 3) should return 7');`,
        },
        {
          id: 'test-2',
          description: 'mathOperation(5, 5) should return 0',
          testCode: `if (mathOperation(5, 5) !== 0) throw new Error('mathOperation(5, 5) should return 0');`,
        },
      ],
      hints: [
        'Type syntax: (param1: type1, param2: type2) => returnType',
        'Declare with let mathOperation: ...',
        'Then assign with mathOperation = (a, b) => ...',
      ],
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Create a Function with Callback',
      instructions: `Create a function called \`transform\` that:
- Takes a \`value\` (number)
- Takes a \`transformer\` callback: \`(n: number) => number\`
- Returns the result of calling transformer with value

Example: \`transform(5, n => n * 2)\` should return \`10\``,
      starterCode: `// Create the transform function

`,
      solutionCode: `// Create the transform function
function transform(value: number, transformer: (n: number) => number): number {
  return transformer(value);
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'transform(5, n => n * 2) should return 10',
          testCode: `if (transform(5, n => n * 2) !== 10) throw new Error('transform(5, n => n * 2) should return 10');`,
        },
        {
          id: 'test-2',
          description: 'transform(3, n => n + 7) should return 10',
          testCode: `if (transform(3, n => n + 7) !== 10) throw new Error('transform(3, n => n + 7) should return 10');`,
        },
        {
          id: 'test-3',
          description: 'transform(4, n => n * n) should return 16',
          testCode: `if (transform(4, n => n * n) !== 16) throw new Error('transform(4, n => n * n) should return 16');`,
        },
      ],
      hints: [
        'The callback type is: (n: number) => number',
        'Call the callback with: transformer(value)',
        'Return what the callback returns',
      ],
    },
    {
      id: 'step-6-fill-blank',
      order: 6,
      type: 'fill-in-blank',
      title: 'Complete the Function Types',
      instructions: 'Fill in the missing function type annotations.',
      codeTemplate: `// A function that takes a string and returns its length
let getLength: (s: {{BLANK_1}}) => {{BLANK_2}};
getLength = (s) => s.length;

// A function that takes a callback and calls it
function runCallback(cb: () => {{BLANK_3}}): void {
  cb();
}`,
      blanks: [
        {
          id: 'BLANK_1',
          placeholder: 'type',
          correctAnswers: ['string'],
          caseSensitive: true,
          hint: 'We\'re getting the length of what type?',
        },
        {
          id: 'BLANK_2',
          placeholder: 'type',
          correctAnswers: ['number'],
          caseSensitive: true,
          hint: 'String length is what type?',
        },
        {
          id: 'BLANK_3',
          placeholder: 'type',
          correctAnswers: ['void'],
          caseSensitive: true,
          hint: 'The callback is called but we don\'t use its return value...',
        },
      ],
      hints: [
        'Think about what s.length produces',
        'void means no return value',
      ],
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What does this type describe: `(items: string[], fn: (s: string) => boolean) => string[]`?',
      options: [
        {
          id: 'a',
          text: 'A function that filters an array of strings',
          isCorrect: true,
        },
        {
          id: 'b',
          text: 'A function that returns a boolean',
          isCorrect: false,
        },
        {
          id: 'c',
          text: 'An array of functions',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'A function with no parameters',
          isCorrect: false,
        },
      ],
      explanation: 'This type describes a function that takes a string array and a predicate function (string → boolean), and returns a new string array. This is like the `.filter()` method!',
    },
  ],
}
