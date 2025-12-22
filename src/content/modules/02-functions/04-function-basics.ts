import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '04-function-basics',
  slug: 'function-basics',
  title: 'Function Basics',
  description: 'Learn to create typed functions with return types in TypeScript.',
  order: 4,
  estimatedMinutes: 12,
  difficulty: 'beginner',
  xpReward: 60,
  prerequisites: ['03-type-inference'],
  tags: ['functions', 'basics'],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'Functions in TypeScript',
      content: `# Functions: Reusable Code Blocks

Functions let you write code once and use it many times. In TypeScript, you can specify:
- What **types of values** the function accepts (parameters)
- What **type of value** it returns

This makes your code safer and easier to understand!`,
    },
    {
      id: 'step-2-basic-function',
      order: 2,
      type: 'instruction',
      title: 'Your First Typed Function',
      content: `# Function Syntax

Here's how to create a typed function:`,
      codeExample: {
        code: `// Function that takes a string and returns a string
function greet(name: string): string {
  return "Hello, " + name + "!";
}

// Using the function
let message = greet("Alice");  // "Hello, Alice!"`,
        language: 'typescript',
        highlight: [2],
      },
    },
    {
      id: 'step-3-return-types',
      order: 3,
      type: 'instruction',
      title: 'Return Types',
      content: `# Specifying Return Types

The type after the \`:\` following the parameters is the **return type**:`,
      codeExample: {
        code: `// Returns a number
function add(a: number, b: number): number {
  return a + b;
}

// Returns a boolean
function isAdult(age: number): boolean {
  return age >= 18;
}

// Returns nothing (void)
function logMessage(msg: string): void {
  console.log(msg);
  // No return statement needed
}`,
        language: 'typescript',
        highlight: [2, 7, 12],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Create a Greeting Function',
      instructions: `Create a function called \`greet\` that:
- Takes a \`name\` parameter (string)
- Returns a string in the format: \`"Hello, [name]!"\`

Don't forget the return type annotation!`,
      starterCode: `// Create your greet function here

`,
      solutionCode: `// Create your greet function here
function greet(name: string): string {
  return "Hello, " + name + "!";
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'greet("World") should return "Hello, World!"',
          testCode: `if (greet("World") !== "Hello, World!") throw new Error('greet("World") should return "Hello, World!"');`,
        },
        {
          id: 'test-2',
          description: 'greet("TypeScript") should return "Hello, TypeScript!"',
          testCode: `if (greet("TypeScript") !== "Hello, TypeScript!") throw new Error('greet("TypeScript") should return "Hello, TypeScript!"');`,
        },
      ],
      hints: [
        'Start with: function greet(name: string)',
        'Add the return type after the parentheses: ): string',
        'Use + to concatenate strings, or use template literals',
      ],
      aiHintPrompt: 'The user is learning to write basic typed functions in TypeScript.',
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Create a Math Function',
      instructions: `Create a function called \`multiply\` that:
- Takes two number parameters: \`a\` and \`b\`
- Returns their product (a number)`,
      starterCode: `// Create your multiply function here

`,
      solutionCode: `// Create your multiply function here
function multiply(a: number, b: number): number {
  return a * b;
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'multiply(3, 4) should return 12',
          testCode: `if (multiply(3, 4) !== 12) throw new Error('multiply(3, 4) should return 12');`,
        },
        {
          id: 'test-2',
          description: 'multiply(5, 0) should return 0',
          testCode: `if (multiply(5, 0) !== 0) throw new Error('multiply(5, 0) should return 0');`,
        },
        {
          id: 'test-3',
          description: 'multiply(-2, 3) should return -6',
          testCode: `if (multiply(-2, 3) !== -6) throw new Error('multiply(-2, 3) should return -6');`,
        },
      ],
      hints: [
        'Function signature: function multiply(a: number, b: number): number',
        'Use * for multiplication',
        'Return the result of a * b',
      ],
    },
    {
      id: 'step-6-fill-blank',
      order: 6,
      type: 'fill-in-blank',
      title: 'Complete the Functions',
      instructions: 'Fill in the missing types to complete these function declarations.',
      codeTemplate: `function square(n: {{BLANK_1}}): {{BLANK_2}} {
  return n * n;
}

function isPositive(num: number): {{BLANK_3}} {
  return num > 0;
}`,
      blanks: [
        {
          id: 'BLANK_1',
          placeholder: 'type',
          correctAnswers: ['number'],
          caseSensitive: true,
          hint: 'We\'re doing math with n, so it must be a...',
        },
        {
          id: 'BLANK_2',
          placeholder: 'type',
          correctAnswers: ['number'],
          caseSensitive: true,
          hint: 'n * n produces what type?',
        },
        {
          id: 'BLANK_3',
          placeholder: 'type',
          correctAnswers: ['boolean'],
          caseSensitive: true,
          hint: 'The > comparison returns true or false...',
        },
      ],
      hints: [
        'Think about what type of value each function returns',
        'Math operations return numbers',
        'Comparisons return booleans',
      ],
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What does `void` mean as a return type?',
      codeContext: `function logScore(score: number): void {
  console.log("Score: " + score);
}`,
      options: [
        {
          id: 'a',
          text: 'The function returns null',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'The function returns undefined',
          isCorrect: false,
        },
        {
          id: 'c',
          text: 'The function doesn\'t return any value',
          isCorrect: true,
        },
        {
          id: 'd',
          text: 'The function can return any type',
          isCorrect: false,
        },
      ],
      explanation: '`void` indicates the function performs an action but doesn\'t return a value. It\'s commonly used for functions that log, display, or modify state without producing a result.',
    },
  ],
}
