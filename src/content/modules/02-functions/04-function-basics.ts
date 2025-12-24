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
  keyConcepts: [
    {
      id: 'function',
      term: 'Function',
      definition: 'A function is a reusable block of code that performs a specific task. Instead of writing the same code multiple times, you write it once in a function and call it whenever you need it.',
      syntax: 'function functionName() { /* code */ }',
      example: {
        code: 'function greet() {\n  return "Hello!";\n}\n\nlet message = greet();  // Calls the function',
        explanation: 'The function is defined with `function greet()`. When you call `greet()`, it runs the code inside and returns "Hello!".',
      },
      whyItMatters: 'Functions let you organize your code into logical pieces, avoid repetition, and make your code easier to understand and maintain. They\'re one of the most important concepts in programming.',
    },
    {
      id: 'parameter',
      term: 'Parameter',
      definition: 'A parameter is a variable that a function accepts as input. When you call the function, you provide values (arguments) for these parameters. Parameters let functions work with different data.',
      syntax: 'function name(parameter: type) { /* code */ }',
      example: {
        code: 'function greet(name: string) {\n  return "Hello, " + name + "!";\n}\n\ngreet("Alice");  // "Hello, Alice!"\ngreet("Bob");    // "Hello, Bob!"',
        explanation: 'The `name` parameter lets the function work with any name. When you call `greet("Alice")`, the function uses "Alice" as the value for `name`.',
      },
      whyItMatters: 'Parameters make functions flexible and reusable. Instead of hardcoding values, functions can work with any data you pass in, making your code more powerful and versatile.',
    },
    {
      id: 'return-type',
      term: 'Return Type',
      definition: 'The return type tells TypeScript what type of value a function will give back when it finishes. It\'s written after the parameters with a colon: `function name(): returnType`.',
      syntax: 'function name(): returnType { return value; }',
      example: {
        code: 'function add(a: number, b: number): number {\n  return a + b;\n}\n\nlet result = add(5, 3);  // result is a number',
        explanation: 'The `: number` after the parameters means this function returns a number. TypeScript will check that you actually return a number, and that callers know what type to expect.',
      },
      whyItMatters: 'Return types make it clear what a function produces, help catch errors (like forgetting to return a value), and give you better autocomplete when using the function\'s result.',
    },
    {
      id: 'return-value',
      term: 'Return Value',
      definition: 'The return value is what a function gives back when it finishes. You use the `return` keyword followed by the value you want to send back. Functions can return any type: strings, numbers, booleans, or nothing at all.',
      syntax: 'return value;',
      example: {
        code: 'function getGreeting(): string {\n  return "Hello, World!";\n}\n\nlet message = getGreeting();  // message is "Hello, World!"',
        explanation: 'The `return` statement sends the value back to whoever called the function. The caller can then use that value.',
      },
      whyItMatters: 'Return values let functions produce results that other parts of your code can use. Without return values, functions would only be able to do things internally without sharing results.',
    },
    {
      id: 'void',
      term: 'void',
      definition: '`void` is a special return type that means "this function doesn\'t return any value". Use it for functions that perform actions (like logging or updating) but don\'t produce a result to use.',
      syntax: 'function name(): void { /* no return */ }',
      example: {
        code: 'function logMessage(msg: string): void {\n  console.log(msg);\n  // No return statement needed\n}\n\nlogMessage("Hello");  // Just performs the action',
        explanation: 'This function logs a message but doesn\'t return anything. The `void` type makes it clear that callers shouldn\'t expect a return value.',
      },
      whyItMatters: 'Using `void` makes it explicit that a function performs an action but doesn\'t produce a value. This prevents confusion and helps TypeScript catch errors if someone tries to use a non-existent return value.',
    },
  ],
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
